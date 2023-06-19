const express = require('express')
const router = express.Router()


router.get("/", (req, res) => {
    let error = ""
    if (req.session.messages != undefined) {
        error = req.session.messages.pop()
    }
    res.render("auth")
})

router.get("/logout", (req, res) => {
    req.logout()
    res.redirect("/")
})

module.exports = router