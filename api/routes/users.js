var express = require("express");
var router = express.Router();
var mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const process = require("./../../nodemon.json");

const customerModel = require("../../models/customers");

/* GET users listing. */
router.get("/all", function(req, res, next) {
  customerModel
    .find()
    .exec()
    .then(users => {
      res.status(200).json({
        error: false,
        response: users
      });
    })
    .catch(err => error(res, err));
});

// router.get("/user/:userId", function(req, res, next) {
//   let userId = req.params.userId;
//   console.log(userId);
//   res.status(200).send("user ID is" + userId);
// });

// SIGN UP
router.post("/signup", function(req, res, next) {
  customerModel
    .find({ email: req.body.email })
    .exec()
    .then(users => {
      if (users.length > 0) {
        res.status(409).json({
          message: "Email Exists"
        });
      } else {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          console.log(err);
          if (err) {
            return res.status(500).json({
              error: err
            });
          } else {
            const customer = new customerModel({
              _id: new mongoose.Types.ObjectId(),
              name: req.body.name,
              email: req.body.email,
              password: hash
            });
            console.log(customer);
            customer
              .save()
              .then(response => {
                res.status(201).json({
                  error: false,
                  Message: "User Created Successfully"
                });
              })
              .catch(err => error(res, err));
          }
        });
      }
    })
    .catch(err => error(res, err));
});

router.post("/login", function(req, res, next) {
  customerModel
    .find({ email: req.body.email })
    .exec()
    .then(user => {
      // if (users.length > 0) {
      //   res.status(409).json({
      //     message: "Email Exists"
      //   });
      // } else {
        if (user.length < 1) {
          return res.status(401).json({
            message: "Email Not Found"
          });
        }

        const token = jwt.sign(
          {
            email: req.body.email,
            userId: req.body.email,
            dateTime: new Date()
          },
          process.env.JWT_KEY,
          {
            expiresIn: "1h"
          }
        );

        bcrypt.compare(req.body.password, user[0].password, function(
          err,
          response
        ) {
          if (err) {
            return res.status(401).json({
              message: "Invalid password"
            });
          }
          if (response) {
            return res.status(200).json({
              message: "Auth Successful",
              token: token
            });
          }
          return res.status(401).json({
            message: "Invalid password"
          });
        });
      // }
    })
    .catch(err => error(res, err));
});

router.delete("/:customerId", (req, res, next) => {
  customerModel
    .remove({ _id: req.params.customerId })
    .exec()
    .then(response => {
      res.status(201).json({
        error: false,
        message: "User Deleted",
        response: response
      });
    })
    .catch(err => error(res, err));
});

function error(res, err) {
  console.log(err);
  return res.status(500).json({
    error: err
  });
}

module.exports = router;
