$(function () {
    //global empty variables
    let name = ''
    let startDate = ''
    let endDate = ''


    //CREATE NEW SUBSCRIPTION - front end api call that sends user generated data to server
    const createSubscription = payload => {
        $.ajax({
            method: "POST",
            url: "/api/subscriptions",
            data: payload
        }).then(() => {
            // reset form inputs
            $("#name").val("")
            $("#startDate").val("")
            $("#endDate").val("")

            // navigate to "/"
            window.location.href = "/"
        }).catch(err => console.log(err))
    }

    //SHOW ALL SUBSCRIPTIONS - front end api call that fetches all data from the database and appends to page
    const fetchSubscriptions = () => {
        $.ajax({
            method: "GET",
            url: "/api/subscriptions"
        }).then(subscriptions => {
            console.log(subscriptions)

            // append new node for each subscription
            subscriptions.forEach(subscription => {
                // destructure subscription
                const {
                    name,
                    startDate,
                    endDate,
                } = subscription

                // format subscription as bootstrap card
                const card = `
                    <div class="col-sm-12 col-md-6 col-lg-4 col-xl-3">
                        <div class="card">
                            <div class="card-body">
                                <h5 class="card-title">${name}</h5>
                                <p class="card-text">Start Date: <i>${startDate}</i></p>
                                <p class="card-text">End Date: <i>${endDate}</i></p>
                                <a href="/edit" type="edit" class="edit btn btn-primary">Edit</a>
                                <a href="/delete" type="button" class="btn btn-danger">Delete</a>
                            </div>
                        </div>
                    </div>
                `
                // append card to dom
                $("#subscriptions").append(card)
            })
        }).catch(err => console.log(err))
    }

    // HEY GUYS THIS DOESNT WORK, THIS IS WHERE I LEFT OFF
    //update SUBSCRIPTION - front end api call that sends user generated data to server
    const updateSubscription = payload => {

        $.ajax({
            method: "PUT",
            url: "/api/subscriptions",
            data: payload
        }).then(() => {
            // reset form inputs
            console.log("HERE I AM" + payload)
            // fill fields with existing dataTypes
            $("#name").val(payload.name)
            $("#startDate").val(payload.startDate)
            $("#endDate").val(payload.endDate)

            // navigate to "/"
            window.location.href = "/"
        }).catch(err => console.log(err))
    }

    // handle change event for adding subscription name
    $("#name").on("change", event => {
        // destructure event
        name = event.target.value
    })

    // handle change event for adding start date
    $("#startDate").on("change", event => {
        // destructure event
        startDate = event.target.value
    })

    // handle change event for adding end date
    $("#endDate").on("change", event => {
        // destructure event
        endDate = event.target.value
    })

    // handle submit event
    $("form").on("submit", event => {
        // prevent default
        event.preventDefault()

        // create payload
        const payload = {
            name: name,
            startDate: startDate,
            endDate: endDate
        }

        // create subscription
        createSubscription(payload)
    })

    // fetch Subscriptions
    fetchSubscriptions()
})