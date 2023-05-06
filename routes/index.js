var express = require("express");
var router = express.Router();

// const base_url = "http://localhost:6055"
const base_url = "http://116.68.200.97:6055";

const Questions = require("../controllers/Question");

const magazine_list = [
  {
    id: 1,
    url: `${base_url}/magazine2022_february`,
    thumb: "images/2022_1/Cronical-11-01.jpg",
    title: "Chronicle",
    sub_title: "February - April 2022",
  },
];

router.get("/", function (req, res, next) {
  console.log("session data is : ", req.session.loggedIn);

  if (req.session.loggedIn) {
    // res.render("index", {
    //   title: "Index page",
    //   // magazine_list: magazine_list,
    // });
    Questions.getQuestion(req, res, next);
  } else {
    res.redirect("/login");
  }
});

router.post("/save_quiz", function (req, res, next) {
  Questions.saveQuestion(req, res, next);
});

router.get("/login", function (req, res, next) {
  res.render("login", {
    title: "Radiant Chronicle",
    magazine_list: magazine_list,
  });
});

router.get("/signup", function (req, res, next) {
  res.render("signup", {
    title: "Radiant Chronicle",
    magazine_list: magazine_list,
  });
});

module.exports = router;
