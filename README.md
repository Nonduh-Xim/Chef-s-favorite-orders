# Chef-s-favorite-orders
# 👨‍🍳 Chef's Favourite Orders

## 📌 Project Overview

Chef's Favourite Orders is a JavaScript web application that allows users to generate and manage food orders based on meals retrieved from **TheMealDB API**.

Users enter a main ingredient, and the system randomly selects a chef's favourite meal containing that ingredient. The order is then stored in **sessionStorage**, displayed in the interface, and can later be marked as completed.

This project demonstrates modern JavaScript concepts including **API integration, DOM manipulation, session storage, and event-driven programming.**

---

## 🚀 Features

• Enter a main ingredient to create an order
• Fetch meals from **TheMealDB API**
• Randomly select a chef's favourite meal
• Store orders using **sessionStorage**
• Display incomplete orders dynamically
• Mark orders as completed
• Display order statistics
• Responsive user interface

---

## 🛠 Technologies Used

* HTML5
* CSS3
* JavaScript (ES6)
* Fetch API
* sessionStorage
* JSON
* TheMealDB API

---

## 🌐 API Used

The application uses **TheMealDB API** to retrieve meals based on a main ingredient.

Example endpoint:

https://www.themealdb.com/api/json/v1/1/filter.php?i=beef

---

## 📂 Project Structure

chef-orders-capstone

index.html
style.css
script.js
README.md

---

## ⚙️ How the Application Works

1. The user enters a **main ingredient**.
2. The ingredient is formatted to match the API requirements.
3. A request is sent to **TheMealDB API** using the Fetch API.
4. The application retrieves a list of meals containing that ingredient.
5. A random meal is selected as the chef's favourite order.
6. The order is saved in **sessionStorage** with:

   * order number
   * meal description
   * meal image
   * completion status
7. The application displays all incomplete orders.
8. Users can mark orders as complete by entering the order number.

---

## 📊 Example Order Object

{
"orderNumber": 1,
"description": "Beef Wellington",
"image": "meal-image-url",
"completed": false
}

---

## 🎯 Learning Outcomes

This project demonstrates the ability to:

• Work with external APIs
• Manipulate the DOM dynamically
• Handle user input with event listeners
• Store and retrieve data using sessionStorage
• Manage application state using JSON objects

---

## 👩‍💻 Author

Nonduh

JavaScript Capstone Project
