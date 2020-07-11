module.exports = function (sequelize, DataTypes) {
    var Subscription = sequelize.define("Subscription", {
        name: DataTypes.STRING,
        startDate: DataTypes.DATEONLY,
        endDate: DataTypes.DATEONLY,
        price: DataTypes.DECIMAL(8,2),
        frequency: DataTypes.TEXT
    });

    return Subscription;
};
