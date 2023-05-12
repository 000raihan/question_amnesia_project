const { QuestionModel } = require("../models");
const { sequelize } = require("../models");
const moment = require("moment");
const { allQuestion } = require("../data/questions");

const getPoint = async (userId) => {
  const userAppliedQuizs = await QuestionModel.findAll({
    where: {
      user_id: userId,
    },
    raw: true,
  });
  console.log("all quisz is : ", userAppliedQuizs);

  const point = userAppliedQuizs.reduce(function (accumulator, currentValue) {
    return Number(accumulator) + Number(currentValue.point);
  }, 0);

  console.log("Point is : ", point);
  return point;
};

exports.getQuestion = async (req, res, next) => {
  const userId = req.session.userId;
  const mobile = req.session.mobile_number;

  const today = moment().format("DD/MM/YYYY");
  const sendToday = moment().format("Do MMMM, YYYY")

  console.log("today is : ", today);

  const question = await allQuestion.find((q) => q.date === today);

  console.log("todays question is : ", question)

  const point = await getPoint(userId);

  if (!question) {
    return res.render("index", {
      status: 1,
      message: "No question found today!",
      date: sendToday,
      point: point,
    });
  }

  console.log("question is : ", question);

  const userAns = await QuestionModel.findOne({
    where: { question_no: question.id, user_id:userId},
  });

  if (userAns) {
    return res.render("index", {
      status: 2,
      message: "Thank you for participating in today's Quiz",
      date: sendToday,
      point: point,
    });
  }

  return res.render("index", {
    status: 3,
    message: "Please select & submit today's quiz",
    date: sendToday,
    q: question,
    userId: userId,
    point: point,
  });
};

exports.saveQuestion = async (req, res, next) => {
  const errorHandler = (err) => {
    return res.status(500).json({
      success: false,
      error: err,
    });
  };

  let inputData = req.body;

  inputData.ans_result = inputData.correct_ans == inputData.user_ans ? "true" : "false";
  inputData.point = inputData.correct_ans == inputData.user_ans ? 10 : 0;

  console.log("Input body data is : ", inputData);

  const savedQuz = await QuestionModel.create(inputData, {raw:true});

  // console.log("saved quiz is :", savedQuz.correct_ans)

  if (savedQuz) {
    if (savedQuz.correct_ans == savedQuz.user_ans) {
      return res.status(200).json({
        status: 1,
        message: "Congratulations!",
      });
    }

    return res.status(200).json({
      status: 2,
      message: "Wrong Answer!", 
      correct : savedQuz.correct_ans
    });
  }
  return res.status(500).json({
    status: 3,
    message: "Quiz not saved",
  });
};
