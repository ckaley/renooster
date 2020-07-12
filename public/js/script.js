$(function () {
  //==========================================================================================================================
  //GLOBAL EMPTY VARIABLES
  //==========================================================================================================================

  let editId;
  let deleteId;
  let name = "";
  let startDate = "";
  let endDate = "";
  let price = 0.0;
  let frequency = "";
  let subStore = [];
  var audioElement = new Audio("../sounds/cowmoo.mp3");

  //==========================================================================================================================
  //FUNCTIONS FOR CRUD FUNCTIONALITY
  //==========================================================================================================================

  //CREATE NEW SUBSCRIPTION - front end api call that sends user generated data to server
  const createSubscription = (payload) => {
    $.ajax({
      method: "POST",
      url: "/api/subscriptions",
      data: payload,
    })
      .then(() => {
        // reset form inputs
        $("#name").val("");
        $("#startDate").val("");
        $("#endDate").val("");
        $("#price").val("");
        $("#frequency").val("");

        // navigate to "/"
        window.location.href = "/";
      })
      .catch((err) => console.log(err));
  };

  //SHOW ALL SUBSCRIPTIONS - front end api call that fetches all data from the database and appends to page
  //--------------------------------------------------------------------------------------------------------------------------
  const fetchSubscriptions = () => {
    $.ajax({
      method: "GET",
      url: "/api/subscriptions",
    })
      .then((subscriptions) => {
        console.log(subscriptions);

        // append new node for each subscription
        subscriptions.forEach((subscription) => {
          // destructure subscription
          const {
            id,
            name,
            startDate,
            endDate,
            price,
            frequency,
          } = subscription;

          // format subscription as bootstrap card
          const card = `
                    <div class="col-sm-12 col-md-6 col-lg-4 col-xl-3">
                        <div class="card">
                            <div class="card-body">
                                <h5 class="card-title">${name}</h5>
                                <p class="card-text">Start Date: <i>${startDate}</i></p>
                                <p class="card-text">End Date: <i>${endDate}</i></p>
                                <p class="card-text">Price: <i>${price}</i></p>
                                <p class="card-text">Frequency: <i>${frequency}</i></p>
                                <button class="btn btn-secondary editBtn" id="${id}">Edit</button>
                                <!-- Button trigger modal -->
                                <button type="button" class="btn btn-danger deleteBtn" data-toggle="modal" data-target="#exampleModal" id="${id}">
                                  Delete
                                </button>
                            </div>
                        </div>
                    </div>
                `;

          // append card to dom
          $("#subscriptions").append(card);
          subStore.push(subscription);
          localStorage.setItem("savedSubs", JSON.stringify(subStore));
        });
      })
      .catch((err) => console.log(err));
  };

    //SHOW ALL EXPIRING SOON SUBSCRIPTIONS - front end api call that fetches date specific data from the database and appends to page
    //--------------------------------------------------------------------------------------------------------------------------
    const expireSubscriptions = () => {
      $.ajax({
          method: "GET",
          url: "/api/subscriptions/expire"
      }).then(subscriptions => {
          console.log("expiring soon:")
          console.log(subscriptions)
          // append new node for each subscription
          subscriptions.forEach(subscription => {
              // destructure subscription
              const {
                  id,
                  name,
                  startDate,
                  endDate,
                  price,
                  frequency
              } = subscription
              // format subscription as bootstrap card
              const expiringCards = `
                  <div class="col-sm-12 col-md-6 col-lg-4 col-xl-3">
                      <div class="card">
                          <div class="card-body">
                              <h5 class="card-title">${name}</h5>
                              <p class="card-text">Start Date: <i>${startDate}</i></p>
                              <p class="card-text expireWarning">End Date: <i>${endDate}</i></p>
                              <p class="card-text">Price: <i>${price}</i></p>
                              <p class="card-text">Frequency: <i>${frequency}</i></p>
                              <button class="btn btn-secondary editBtn" id="${id}">Edit</button>
                              <button class="btn btn-danger deleteBtn" id="${id}">Delete</button>
                          </div>
                      </div>
                  </div>
              `
              console.log("appending to page....")
              //clear the page
              
              // append cards to dom
              $("#subscriptions").append(expiringCards)
              subStore.push(subscription)
              localStorage.setItem("savedSubs", JSON.stringify(subStore))

          })
      }).catch(err => console.log(err))
  }

  //UPDATE SUBSCRIPTION - front end api call that allows user to update data in database by ID
  //--------------------------------------------------------------------------------------------------------------------------
  const updateSubscription = (payload) => {
    console.log(payload);
    $.ajax({
      method: "PUT",
      url: "/api/edit/" + payload.id,
      data: payload,
    })
      .then(() => {
        // reset form inputs
        console.log("HERE I AM" + payload);
        console.log(payload);

        // fill fields with existing dataTypes
        $("#name").val();
        $("#startDate").val(payload.startDate);
        $("#endDate").val(payload.endDate);
        $("#price").val(payload.price);
        $("#frequency").val(payload.frequency);

        // navigate to "/"
        window.location.href = "/";
      })
      .catch((err) => console.log(err));
  };

  //DELETE SUBSCRIPTION - front end api call that allows user to delete data from database by ID
  //--------------------------------------------------------------------------------------------------------------------------
  const deleteSubscription = (deleteId) => {
    console.log(deleteId);
    $.ajax({
      method: "DELETE",
      url: "/api/subscriptions/" + deleteId,
      data: deleteId,
    }).then(() => {
      console.log("You deleted subscription with id: " + deleteId);
      location.reload();
    });
  };

  //==========================================================================================================================
  //EVENT HANDLERS
  //==========================================================================================================================

  //ADDING A NEW SUBSCRIPTION
  //--------------------------------------------------------------------------------------------------------------------------
  // handle change event for adding subscription name
  $("#name").on("change", (event) => {
    // destructure event
    name = event.target.value;
  });

  // handle change event for adding start date
  $("#startDate").on("change", (event) => {
    // destructure event
    startDate = event.target.value;
  });

  // handle change event for adding end date
  $("#endDate").on("change", (event) => {
    // destructure event
    endDate = event.target.value;
  });

  // handle change event for adding price
  $("#price").on("change", (event) => {
    // destructure event
    price = event.target.value;
  });

  // handle change event for adding frequency
  $("#frequency").on("change", (event) => {
    // destructure event
    frequency = event.target.value;
  });

  // handle submit event
  $("#addSubForm").on("submit", (event) => {
    // prevent default
    event.preventDefault();
    console.log("new subscription added");
    // create payload
    const payload = {
      name: name,
      startDate: startDate,
      endDate: endDate,
      price: price,
      frequency,
    };
    // create subscription
    createSubscription(payload);
  });

  //EDITING A SUBSCRIPTION
  //--------------------------------------------------------------------------------------------------------------------------

  //event handler for editBtn
  $("div").on("click", ".editBtn", (event) => {
    console.log("gonna edit a sub");
    console.log(event.target.id);
    var id = event.target.id;
    editId = id;
    console.log(editId);
    event.stopPropagation();

    $.ajax({
      method: "GET",
      url: "/edit/" + id,
      data: id,
    }).then((subscriptions) => {
      console.log(subscriptions);
      window.location.href = `/edit/${id}`;
    });
  });

  // handle change event for updating subscription name
  $("#edit-name").on("change", (event) => {
    // destructure event
    name = event.target.value;
  });

  // handle change event for updating start date
  $("#edit-startDate").on("change", (event) => {
    // destructure event
    startDate = event.target.value;
  });

  // handle change event for updating end date
  $("#edit-endDate").on("change", (event) => {
    // destructure event
    endDate = event.target.value;
  });

  // handle change event for updating price
  $("#edit-price").on("change", (event) => {
    // destructure event
    price = event.target.value;
  });
  // handle change event for updating frequency
  $("#edit-frequency").on("change", (event) => {
    // destructure event
    frequency = event.target.value;
  });

  // handle edit event (submit update form)
  $("#editSubForm").on("submit", (event) => {
    // prevent default
    event.preventDefault();
    //grab the id from the button
    console.log("button clicked");
    // create payload
    console.log(editId); //---undefined
    if (!name) {
      name = localStorage.getItem("name");
    }
    if (!startDate) {
      startDate = localStorage.getItem("startDate");
    }
    if (!endDate) {
      endDate = localStorage.getItem("endDate");
    }
    if (!price) {
      price = localStorage.getItem("price");
    }
    if (!frequency) {
      frequency = localStorage.getItem("frequency");
    }
    const payload = {
      id: $("#editSubmitBtn").attr("data"),
      name: name,
      startDate: startDate,
      endDate: endDate,
      price: price,
      frequency: frequency,
    };
    console.log(payload);
    updateSubscription(payload);
  });

  //DELETING A SUBSCRIPTION
  //--------------------------------------------------------------------------------------------------------------------------
  //event handler for deleteBtn
  $(document).on("click", ".deleteBtn", (event) => {
    console.log("gonna delete a sub");
    console.log(event.target.id);
    var id = event.target.id;
    deleteId = id;
    console.log(deleteId);
    audioElement.play();
  });

  //EXPIRING SOON
    //--------------------------------------------------------------------------------------------------------------------------
    //event handler for expireBtn
    $("div").on("click", "#expireBtn", event => {
      event.stopPropagation()
      $("#subscriptions").empty()
      expireSubscriptions()

  })

  //==========================================================================================================================
  //FUNCTION TO POPULATE PAGE
  //==========================================================================================================================
  // call function to render all existing subscription records to page
  fetchSubscriptions();
  

  //==========================================================================================================================
  //MODAL FUNCTIONALITY
  //==========================================================================================================================
  // event listener for the modal button
  $("#myModal").on("shown.bs.modal", function () {
    $("#myInput").trigger("focus");
  });

  // when user clicks "yes" on warning modal delete subscription
  $(".yesBtn").on("click", function (event) {
    console.log(event.target);
    event.preventDefault();
    deleteSubscription(deleteId);
  });
});
