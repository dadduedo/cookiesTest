'use strict';
const {Model} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Cookies extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Cookies.init({
    cName: DataTypes.STRING,
    cValue: DataTypes.INTEGER,
    cDate: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Cookies',
  });
  return Cookies;
};