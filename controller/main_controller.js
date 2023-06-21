const express = require('express')
const router = express.Router()

const AuthServices = require('../services/auth_services');


router.get("/", (req, res) => {
    res.render("auth");
})

router.get("/home",
    // AuthServices.validateToken,
    (req, res) => {
        res.render("index");
    })

router.get("/register-recipes",
    // AuthServices.validateToken, 
    (req, res) => {
        res.render("recipes");
    })

router.get("/register-ingredients",
    // AuthServices.validateToken,
    (req, res) => {
        res.render("ingredients");
    })
router.get("/register-recipe-category",
    // AuthServices.validateToken,
    (req, res) => {
        res.render("recipe_category");
    })

router.get("/logout", (req, res) => {
    res.redirect("/");
})

module.exports = router