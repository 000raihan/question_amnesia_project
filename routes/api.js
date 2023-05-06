const express = require('express');
const router = express.Router();
const Register = require("../controllers/Register");

router.post('/register', function(req, res, next) {
    Register.Save(req, res, next);
});
router.post('/login', function(req, res, next) {
    Register.Login(req, res, next);
});


module.exports = router;
