let price = 100;
let selectedItem = "Gold";

function login() {
    let user = document.getElementById("username").value;
    let pass = document.getElementById("password").value;

    if(user && pass) {
        document.getElementById("login").style.display = "none";
        document.getElementById("dashboard").style.display = "block";
    } else {
        alert("Enter valid details");
    }
}

function showItems() {
    document.getElementById("items").innerHTML = 
        "<p>Item: Gold | Price: 100</p>";
    document.getElementById("orderSection").style.display = "block";
}

function placeOrder() {
    let qty = document.getElementById("quantity").value;

    if(qty > 0) {
        let total = qty * price;
        document.getElementById("bill").innerText = 
            "Total Amount: " + total;

        document.getElementById("billSection").style.display = "block";
    } else {
        alert("Enter valid quantity");
    }
}

function pay() {
    alert("Payment Successful!");
}

function logout() {
    location.reload();
}