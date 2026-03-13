// HTML Elements
const ingredientInput = document.getElementById("ingredientInput");
const createOrderBtn = document.getElementById("createOrderBtn");

const ordersContainer = document.getElementById("ordersContainer");

const completeOrderInput = document.getElementById("completeOrderInput");
const completeOrderBtn = document.getElementById("completeOrderBtn");

const message = document.getElementById("message");
const loading = document.getElementById("loading");


// Format ingredient
function formatIngredient(text){

return text
.toLowerCase()
.trim()
.replace(/\s+/g,"_");

}


// Fetch meals from API
async function fetchMeals(ingredient){

const url =
`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`;

const response = await fetch(url);

const data = await response.json();

return data.meals;

}


// Choose random meal
function chooseRandomMeal(meals){

const index = Math.floor(Math.random() * meals.length);

return {
name: meals[index].strMeal,
image: meals[index].strMealThumb
};

}


// Get orders from storage
function getOrders(){

const stored = sessionStorage.getItem("orders");

if(stored){
return JSON.parse(stored);
}

return [];

}


// Save orders
function saveOrders(orders){

sessionStorage.setItem("orders", JSON.stringify(orders));

}


// Generate order number
function generateOrderNumber(){

let last = sessionStorage.getItem("lastOrderNumber");

if(!last){
last = 0;
}

last++;

sessionStorage.setItem("lastOrderNumber", last);

return last;

}


// Create order
async function createOrder(){

const rawIngredient = ingredientInput.value;

if(rawIngredient === ""){
message.textContent = "Enter an ingredient";
return;
}

const ingredient = formatIngredient(rawIngredient);

loading.style.display = "block";

const meals = await fetchMeals(ingredient);

loading.style.display = "none";

if(!meals){
message.textContent = "No meals found.";
return;
}

const meal = chooseRandomMeal(meals);

const orders = getOrders();

const newOrder = {

orderNumber: generateOrderNumber(),
description: meal.name,
image: meal.image,
completed: false

};

orders.push(newOrder);

saveOrders(orders);

message.textContent =
"Order created: " + meal.name;

displayOrders();
updateStats();

}


// Display orders
function displayOrders(){

const orders = getOrders();

const incomplete = orders.filter(o => !o.completed);

ordersContainer.innerHTML = "";

incomplete.forEach(order => {

const card = document.createElement("div");

card.className = "order-card";

card.innerHTML = `

<h3>Order #${order.orderNumber}</h3>

<img src="${order.image}">

<p>${order.description}</p>

`;

ordersContainer.appendChild(card);

});

}


// Complete order
function completeOrder(){

const number =
parseInt(completeOrderInput.value);

const orders = getOrders();

const order =
orders.find(o => o.orderNumber === number);

if(!order){

message.textContent =
"Order number does not exist";

return;

}

order.completed = true;

saveOrders(orders);

message.textContent =
"🎉 Order completed!";

displayOrders();
updateStats();

}


// Stats
function updateStats(){

const orders = getOrders();

const total = orders.length;

const completed =
orders.filter(o => o.completed).length;

const pending = total - completed;

document.getElementById("stats").textContent =
`Total: ${total} | Completed: ${completed} | Pending: ${pending}`;

}


// Events
createOrderBtn.addEventListener("click", createOrder);

completeOrderBtn.addEventListener("click", completeOrder);

window.onload = () => {

displayOrders();
updateStats();

};