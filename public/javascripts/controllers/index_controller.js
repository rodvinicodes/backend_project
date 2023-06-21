import authServices from "../services/auth_services.js"
import ingredientsServices from "../services/ingredients_services.js"
import recipesServices from "../services/recipe_services.js"
import recipeCategoriesServices from "../services/recipe_category_services.js"


async function refreshAll() {
    let respIngredients = await ingredientsServices.getAll();

    if (respIngredients && respIngredients.status == true) {
        setIngredients(respIngredients.data);
    }
    // let respIngredients = await ingredientsServices.getAll();

    let respCategories = await recipeCategoriesServices.getAll();

    console.log(respCategories);

    if (respCategories && respCategories.status == true) {
        setCategories(respCategories.data);
    }
    // let respIngredients = await ingredientsServices.getAll();
    console.log(respIngredients);

    // if (resp.status) {
    //     resetError();
    //     setrecipes(resp.data.filter((e) => e.situation == 'waiting'));
    //     setIngredients(resp.data.filter((e) => e.situation == 'inprogress'));
    //     setTaskDone(resp.data.filter((e) => e.situation == 'done'));
    // }
}

async function setRecipes(items) {
    let ul = document.querySelector("#ingredients");
    ul.innerHTML = "";

    items.forEach((item) => {
        let li = document.createElement("li")
        let label = document.createElement("label")

        li.addEventListener("click", function () {
            // li.style.backgroundColor = getRandomColor();
        })

        label.innerText = item.name;

        li.appendChild(label)

        ul.appendChild(li)
    })
}

async function setIngredients(items) {
    let ul = document.querySelector("#ingredients");
    ul.innerHTML = "";

    items.forEach((item) => {
        let li = document.createElement("li")
        let label = document.createElement("label")

        li.addEventListener("click", function () {
            // li.style.backgroundColor = getRandomColor();
        })

        label.innerText = item.name;

        li.appendChild(label)

        ul.appendChild(li)
    })
}

async function setCategories(items) {
    let ul = document.querySelector("#categories");
    ul.innerHTML = "";

    items.forEach((item) => {
        let li = document.createElement("li")
        let label = document.createElement("label")

        li.addEventListener("click", function () {
            // li.style.backgroundColor = getRandomColor();
        })

        label.innerText = item.name;

        li.appendChild(label)

        ul.appendChild(li)
    })
}

function setError(message) {
    var div = document.querySelector("#error");
    div.innerHTML = "";

    let label = document.createElement("label")
    label.innerText = message;
    label.className = 'error';

    console.log(label);

    div.appendChild(label);
}

function resetError() {
    var div = document.querySelector("#error");
    div.innerHTML = "";
}

window.addEventListener("load", function () {
    refreshAll();

    // document.querySelector("form").addEventListener("submit", async function (evt) {
    //     evt.preventDefault();
    //     createTask();
    // })
})