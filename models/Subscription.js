module.exports = function (sequelize, DataTypes) {
    var Subscription = sequelize.define("Subscription", {
        name: DataTypes.STRING,
        startDate: DataTypes.DATEONLY,
        endDate: DataTypes.DATEONLY
    });

    return Subscription;
};
