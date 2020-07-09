$(function () {
    let name = ''
    let startDate = ''
    let endDate = ''

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

            // navigate to "/subscriptions"
            window.location.href = "/subscriptions"
        }).catch(err => console.log(err))
    }

    const fetchSubscriptions = () => {
        $.ajax({
            method: "GET",
            url: "/api/subscriptions"
        }).then(subscriptions => {
            console.log(subscriptions)

            // append new node for each post
            subscriptions.forEach(subscription => {
                // destructure subscription
                const {
                    name,
                    startDate,
                    endDate,
                } = subscription

                // format subscritioin as bootstrap card
                const card = `
                    <div class="col-sm-12 col-md-6 col-lg-4 col-xl-3">
                        <div class="card">
                            <div class="card-body">
                                <h5 class="card-title">${name}</h5>
                                <p class="card-text">Start Date: <i>${startDate}</i></p>
                                <p class="card-text">End Date: <i>${endDate}</i></p>
                                <button type="button" class="btn btn-primary">Edit</button>
                                <button type="button" class="btn btn-danger">Delete</button>
                            </div>
                        </div>
                    </div>
                `
                // append card to dom
                $("#subscriptions").append(card)
            })
        }).catch(err => console.log(err))
    }

    // handle change event for my title input
    $("#name").on("change", event => {
        // destructure event
        name = event.target.value
    })

    // handle change event for my body input
    $("#startDate").on("change", event => {
        // destructure event
        startDate = event.target.value
    })

       // handle change event for my body input
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

        // create post
        createSubscription(payload)
    })

    // fetch Subscriptions
    fetchSubscriptions()
})
