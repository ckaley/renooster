var db = require("../models");

module.exports = function(app) {
  // @route:  GET /
  // @desc:   Read all records from subscriptions table
  app.get("/api/subscriptions", function(req, res) {
    db.Subscription.findAll({
    }).then(function(dbSubscription) {
      res.json(dbSubscription);
    });
  });

  // @route:  GET /
  // @desc:   Read one record from subscriptions table by ID
  app.get("/api/:id", function(req, res) {
    db.Subscription.findOne({
      where: {
        id: req.params.id
      },
    }).then(function(dbSubscription) {
      res.json(dbSubscription);
    });
  });

  // @route:  POST /
  // @desc:   Add one record to the subscriptions table
  app.post("/api/subscriptions", function(req, res) {
    db.Subscription.create(req.body).then(function(dbSubscription) {
      res.json(dbSubscription);
    });
  });


  // @route:  DELETE /
  // @desc:   Erase one record from the subscriptions table by ID
  app.delete("/api/subscriptions/:id", function(req, res) {
    db.Subscription.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(dbSubscription) {
      res.json(dbSubscription);
    });
  });
  

  // @route:  PUT /
  // @desc:   Update one record from the subscriptions table by ID
  app.put("/api/edit/:id", function(req, res){
    console.log("I am here, please acknowledge that I am here")
    //Update takes in object descriping the properties we want to update. Uses WHERE to specify the object that is to be updated
    db.Subscription.update({
      name: req.body.name,
      startDate: req.body.startDate,
      endDate: req.body.endDate,
      price: req.body.price,
      frequency: req.body.frequency
      }, {
        where: {
          id: req.params.id
        }
      })
      .then(function(dbSubscription) {
        res.json(dbSubscription)
      });
  });
};
