module.exports = function (sequelize, DataTypes) {
    var Subscription = sequelize.define("Subscription", {
        name: DataTypes.STRING,
        startDate: DataTypes.DATE,
        endDate: DataTypes.DATE
    });

    return Subscription;
};
