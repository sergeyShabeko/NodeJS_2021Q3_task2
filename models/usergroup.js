'use strict';

// import User from './user';
// import Group from './group';

const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserGroup extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  UserGroup.init({
    userId: {
      type: DataTypes.STRING,
      primaryKey: true,
      references: {
        model: "Users",
        key: 'id',
      }
    },
    userId: {
      type: DataTypes.STRING,
      primaryKey: true,
      references: {
        model: "Groups",
        key: 'id',
      }
    }
  }, {
    sequelize,
    modelName: 'UserGroup',
  });
  return UserGroup;
};