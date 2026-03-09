//Get HTML Elements//

const ingredientInput = document.getElementById("ingredientInput");
const createOrderBtn = document.getElementById("createOrderBtn");

const ordersContainer = document.getElementById("ordersContainer");

const completeOrderInput = document.getElementById("completeOrderInput");
const completeOrderBtn = document.getElementById("completeOrderBtn");

const message = document.getElementById("message");



//Format Ingredient for API//
function formatIngredient(text){

return text
.toLowerCase()
.trim()
.replace(/\s+/g,"_");

}


//Fetching Meals From The API
async function fetchMeals(ingredient){

const url = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`;

const response = await fetch(url);

const data = await response.json();

return data.meals;

}

//Random Chef Selection//
function chooseRandomMeal(meals){

const index = Math.floor(Math.random() * meals.length);

return {
name: meals[index].strMeal,
image: meals[index].strMealThumb
};

}



//Retrieve Orders From Storage//
function getOrders(){

const storedOrders = sessionStorage.getItem("orders");

if(storedOrders){

return JSON.parse(storedOrders);

}

return [];

}

//saving orders to storage//
function saveOrders(orders){

sessionStorage.setItem("orders", JSON.stringify(orders));

}
  //generating order numbers//
  function generateOrderNumber(){

let last = sessionStorage.getItem("lastOrderNumber");

if(!last){

last = 0;

}

last++;

sessionStorage.setItem("lastOrderNumber", last);

return last;

}


//creating orders//
async function createOrder(){

const rawIngredient = ingredientInput.value;

const ingredient = formatIngredient(rawIngredient);

const meals = await fetchMeals(ingredient);

if(!meals){

message.textContent = "No meals found. Try another ingredient.";

return;

}

const mealName = chooseRandomMeal(meals);

const orders = getOrders();

const newOrder = {

orderNumber: generateOrderNumber(),

description: mealName,

completed: false

};

orders.push(newOrder);

saveOrders(orders);

message.textContent = "Order created: " + mealName;

displayOrders();

}

document.getElementById("loading").style.display = "block";

const meals = await fetchMeals(ingredient);

document.getElementById("loading").style.display = "none";




//displaying incomplete orders
function displayOrders(){

const orders = getOrders();

const incompleteOrders = orders.filter(order => !order.completed);

ordersContainer.innerHTML = "";

incompleteOrders.forEach(order => {

const card = document.createElement("div");

card.className = "order-card";

card.innerHTML = `

<h3>Order #${order.orderNumber}</h3>

<img src="${order.image}" width="200">

<p>${order.description}</p>

`;

ordersContainer.appendChild(card);

});

}



//completing orders//
function completeOrder(){

const number = parseInt(completeOrderInput.value);

if(number === 0){

message.textContent = "No order completed.";

return;

}

const orders = getOrders();

const order = orders.find(o => o.orderNumber === number);

if(!order){

message.textContent = "Order number does not exist.";

return;

}

order.completed = true;

saveOrders(orders);

message.textContent = "🎉Order completed successfully.";

displayOrders();

}

//event//
createOrderBtn.addEventListener("click", createOrder);

completeOrderBtn.addEventListener("click", completeOrder);

window.onload = displayOrders;


//order stats//
function updateStats(){

const orders = getOrders();

const total = orders.length;

const completed = orders.filter(o => o.completed).length;

const incomplete = total - completed;

document.getElementById("stats").textContent =
`Total Orders: ${total} | Completed: ${completed} | Pending: ${incomplete}`;

}
