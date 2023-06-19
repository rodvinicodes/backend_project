const express = require("express")
const path = require("path")
require("dotenv").config()

const app = express()

var mustacheExpress = require("mustache-express");
var engine = mustacheExpress();
app.engine("mustache", engine);

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'mustache');

app.use(express.json())
app.use(express.static(path.join(__dirname, 'public')))

app.use("/", require("./controller/main_controller"))
app.use("/ingredient", require("./controller/ingredient_controller"))
app.use("/recipe", require("./controller/recipe_controller"))
app.use("/recipe-category", require('./controller/recipe_category_controller'))
app.use("/install", require('./controller/install_controller'))
app.use("/user", require('./controller/user_controller'))



app.listen(process.env.PORT, () => {
    console.log("Listenning...")
})