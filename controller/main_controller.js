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

router.get("/register-receipts",
    // AuthServices.validateToken, 
    (req, res) => {
        res.render("receipts");
    })

router.get("/register-ingredients",
    // AuthServices.validateToken,
    (req, res) => {
        res.render("ingredients");
    })
router.get("/register-receipt-category",
    // AuthServices.validateToken,
    (req, res) => {
        res.render("recipe_category");
    })

router.get("/logout", (req, res) => {
    res.redirect("/");
})

module.exports = router