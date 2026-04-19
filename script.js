let items = [
    { name: "Gold", price: 100 },
    { name: "Silver", price: 50 },
    { name: "Crude Oil", price: 70 },
    { name: "Wheat", price: 20 },
    { name: "Rice", price: 25 },
    { name: "Copper", price: 60 }
];

let selectedItem = null;
let orders = [];

function login() {
    let u = document.getElementById("username").value;
    let p = document.getElementById("password").value;

    if(u && p) {
        document.getElementById("login").style.display = "none";
        document.getElementById("dashboard").style.display = "block";
    } else {
        alert("Enter valid login details");
    }
}

// Show items
function showItems() {
    let html = "";

    items.forEach((item, index) => {
        html += `
        <div class="item-card">
            <h4>${item.name}</h4>
            <p>₹${item.price}</p>
            <button onclick="selectItem(${index})">Select</button>
        </div>`;
    });

    document.getElementById("items").innerHTML = html;
}

// Select item
function selectItem(index) {
    selectedItem = items[index];
    document.getElementById("orderSection").style.display = "block";
    document.getElementById("selectedItem").innerText =
        "Selected: " + selectedItem.name;
}

// Place order
function placeOrder() {
    let qty = document.getElementById("quantity").value;

    if(qty > 0 && selectedItem) {
        let total = qty * selectedItem.price;

        let order = {
            item: selectedItem.name,
            quantity: qty,
            total: total,
            date: new Date()
        };

        orders.push(order);

        document.getElementById("bill").innerText =
            `Item: ${order.item}
Quantity: ${order.quantity}
Total: ₹${order.total}`;

        document.getElementById("billSection").style.display = "block";
    } else {
        alert("Enter quantity and select item");
    }
}

// Payment
function pay() {
    alert("✅ Payment Successful!");
}

// Logout
function logout() {
    location.reload();
}

//////////////////////////////////////////////////
// REPORT FEATURE
//////////////////////////////////////////////////

function generateReport(type) {
    let now = new Date();
    let filtered = [];

    orders.forEach(order => {
        let diff = (now - new Date(order.date)) / (1000 * 60 * 60 * 24);

        if(type === "month" && diff <= 30) filtered.push(order);
        if(type === "year" && diff <= 365) filtered.push(order);
    });

    if(filtered.length === 0) {
        alert("No records found");
        return;
    }

    downloadCSV(filtered, type);
}

function downloadCSV(data, type) {
    let csv = "Item,Quantity,Total,Date\n";

    data.forEach(o => {
        csv += `${o.item},${o.quantity},${o.total},${o.date.toLocaleDateString()}\n`;
    });

    let blob = new Blob([csv], { type: "text/csv" });
    let link = document.createElement("a");

    link.href = URL.createObjectURL(blob);
    link.download = type + "_report.csv";
    link.click();
}
