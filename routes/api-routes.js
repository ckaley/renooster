var db = require("../models");

module.exports = function(app) {
  app.get("/api", function(req, res) {
    db.Subscription.findAll({
    }).then(function(dbSubscription) {
      res.json(dbSubscription);
    });
  });

  app.get("/api/:id", function(req, res) {
    db.Subscription.findOne({
      where: {
        id: req.params.id
      },
    }).then(function(dbSubscription) {
      res.json(dbSubscription);
    });
  });

  app.post("/api/subscriptions", function(req, res) {
    db.Subscription.create(req.body).then(function(dbSubscription) {
      res.json(dbSubscription);
    });
  });

  app.delete("/api/subscriptions/:id", function(req, res) {
    db.Subscritions.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(dbSubscription) {
      res.json(dbSubscription);
    });
  });

};
