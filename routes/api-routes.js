var db = require("../models");
var moment = require("moment");

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

  // @route: GET /
  // @desc: Read all records that have endDate within 30 days from today
  app.get("/api/subscriptions/expire", function(req, res){
    const { Op } = require('sequelize')
    db.Subscription.findAll({
      where: {
        endDate: {
          [Op.lte]: moment().add(30, 'days').toDate()
        }
      }
    }).then(function(dbSubscription){
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
  app.put("/api/subscriptions/:id", function(req, res){
    //Update takes in object descriping the properties we want to update. Uses WHERE to specify the object that is to be updated
    db.Subscription.update({
      name: req.body.name,
      startDate: req.body.startDate,
      endDate: req.body.endDate
      }, {
        where: {
          id: req.body.id
        }
      })
      .then(function(dbSubscription) {
        res.json(dbSubscription)
      });
  });
};
