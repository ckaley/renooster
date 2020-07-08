var db = require("../models");

module.exports = function(app) {
  app.get("/api", function(req, res) {
    // Here we add an "include" property to our options in our findAll query
    // We set the value to an array of the models we want to include in a left outer join
    // In this case, just db.Post
    db.Subscription.findAll({
      include: [db.Subscription]
    }).then(function(dbSubscription) {
      res.json(dbSubscription);
    });
  });

  app.get("/api/:id", function(req, res) {
    // Here we add an "include" property to our options in our findOne query
    // We set the value to an array of the models we want to include in a left outer join
    // In this case, just db.Post
    db.Subscription.findOne({
      where: {
        id: req.params.id
      },
      include: [db.Subscription]
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
