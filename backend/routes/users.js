// routes/users.js
var express = require('express');
var router = express.Router();
const User = require("../models/users");
const { checkBody } = require("../modules/checkBody");
const { isValidEmail } = require("../modules/validateEmail");
const bcrypt = require("bcrypt");
const uid2 = require("uid2");

//* INSCRIPTION
router.post("/signup", (req, res) => {
  if (!checkBody(req.body, ["username","email", "password"])) {
    res.json({ result: false, error: "Missing or empty fields" });
    return;
  }
  
  if (!isValidEmail(req.body.email)) {
    res.json({result: false, error: "Invalid email format"});
    return;
  }

  User.findOne({ username: req.body.username }).then((data) => {
    if (data === null) {
      const { username, email, password } = req.body;

      // Hash du mot de passe : méthode 1
      const hash = bcrypt.hashSync(req.body.password, 10);
      const newUser = new User({
        username: username,
        email: email,
        password: hash,
        token: uid2(32),
      });
      newUser.save().then(newDoc => {
          res.json({ result: true, token: newDoc.token });
        });

      // // Hachage du mot de passe METHODE 2
      // bcrypt.hash(password, 10, (err, hash) => {
      //   if (err) {
      //     res.json({ result: false, error: "Error hashing password"});
      //     return;
      //   }
      //   const newUser = new User({
      //     username: username,
      //     email: email,
      //     password: hash,
      //     token: uid2(32),
      //   });

      //   newUser.save().then(newDoc => {
      //     res.json({ result: true, token: newDoc.token });
      //   });
      // });
      
    } else {
      res.json({ result: false, error: "User already exists!" });
    }
  });
});

//* CONNEXION
router.post("/signin", (req, res) => {
  if (!checkBody(req.body, ["username", "password"])) {
    res.json({ result: false, error: "Missing or empty fields" });
    return;
  }
  User.findOne({ username: req.body.username }).then((data) => {
    // if (data) {
    //   bcrypt.compare(req.body.password, data.password, (err, result) => {
    //     if (result) {
    //       res.json({ result: true, token: data.token });
    //     } else {
    //       res.json({result: false, error: "Invalid password"});
    //     }
    //   });

    // if(data && bcrypt.compareSync(req.body.password, data.password)){
    //   res.json({ result: true, token: data.token });
    //   console.log(data);
    // } else {
    //   res.json({ result: false, error: "User not found" });
    // }

    if (!data || !bcrypt.compareSync(req.body.password, data.password)) {
      res.json({ result: false, error: "Nom d'utilisateur ou mot de passe incorrect", });
      return;
    }

    const token = data.token;
    res.json({ result: true, token: token });
    
  });
});

module.exports = router;
