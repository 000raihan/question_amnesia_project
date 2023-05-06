const {
    DataTypes
  } = require('sequelize');
  const Sequelize = require("sequelize");
  

  module.exports = sequelize => {
    const attributes = {
      id: {
        type: DataTypes.INTEGER(10).UNSIGNED,
        allowNull: false,
        defaultValue: null,
        primaryKey: true,
        autoIncrement: true,
        comment: null,
        field: "id"
      },
      user_id: {
        type: DataTypes.STRING(255),
        allowNull: true,
        defaultValue: null,
        primaryKey: false,
        autoIncrement: false,
        comment: null,
        field: "user_id"
      },
      question_no: {
        type: DataTypes.STRING(30),
        allowNull: true,
        defaultValue: null,
        primaryKey: false,
        autoIncrement: false,
        comment: null,
        field: "question_no"
      },
      question: {
        type: DataTypes.STRING(30),
        allowNull: true,
        defaultValue: null,
        primaryKey: false,
        autoIncrement: false,
        comment: null,
        field: "question"
      },
      correct_ans: {
        type: DataTypes.STRING(255),
        allowNull: true,
        defaultValue: null,
        primaryKey: false,
        autoIncrement: false,
        comment: null,
        field: "correct_ans"
      },
      user_ans: {
        type: DataTypes.STRING(255),
        allowNull: true,
        defaultValue: null,
        primaryKey: false,
        autoIncrement: false,
        comment: null,
        field: "user_ans"
      },
      ans_result: {
        type: DataTypes.STRING(255),
        allowNull: true,
        defaultValue: null,
        primaryKey: false,
        autoIncrement: false,
        comment: null,
        field: "ans_result"
      },
      point: {
        type: DataTypes.STRING(255),
        allowNull: true,
        defaultValue: null,
        primaryKey: false,
        autoIncrement: false,
        comment: null,
        field: "point"
      },
      status: {
        type: DataTypes.INTEGER(1),
        allowNull: true,
        defaultValue: null,
        primaryKey: false,
        autoIncrement: false,
        comment: null,
        field: "status"
      },
      created_at: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        primaryKey: false,
        autoIncrement: false,
        comment: null,
        field: "created_at"
      },
      updated_at: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: null,
        primaryKey: false,
        autoIncrement: false,
        comment: null,
        field: "updated_at"
      },
    };
    const options = {
      tableName: "questions",
      comment: "",
      indexes: [],
      createdAt: false,
      updatedAt: false
    };
    const UsersModel = sequelize.define("QuestionModel", attributes, options);
    return UsersModel;
  };
  