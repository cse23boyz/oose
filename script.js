let items = [
    { name: "Gold", price: 100, category: "metal" },
    { name: "Silver", price: 50, category: "metal" },
    { name: "Copper", price: 60, category: "metal" },
    { name: "Aluminium", price: 40, category: "metal" },

    { name: "Wheat", price: 20, category: "agri" },
    { name: "Rice", price: 25, category: "agri" },
    { name: "Corn", price: 18, category: "agri" },
    { name: "Soybean", price: 30, category: "agri" },

    { name: "Crude Oil", price: 70, category: "energy" },
    { name: "Natural Gas", price: 55, category: "energy" }
];

let orders = [];
let selectedItem = null;

function login() {
    let u = document.getElementById("username").value;
    let p = document.getElementById("password").value;

    if(u && p) {
        document.getElementById("login").style.display = "none";
        document.getElementById("dashboard").style.display = "block";
    } else {
        alert("Enter valid details");
    }
}

function showItems() {
    displayItems(items);
}

// FILTER
function filterItems() {
    let search = document.getElementById("search").value.toLowerCase();
    let category = document.getElementById("category").value;

    let filtered = items.filter(item => {
        return (category === "all" || item.category === category) &&
               item.name.toLowerCase().includes(search);
    });

    displayItems(filtered);
}

// DISPLAY
function displayItems(list) {
    let html = "";

    list.forEach((item, index) => {
        html += `
        <div class="item-card">
            <h4>${item.name}</h4>
            <p>₹${item.price}</p>
            <button onclick="selectItem(${index})">Select</button>
        </div>`;
    });

    document.getElementById("items").innerHTML = html;
}

// SELECT
function selectItem(index) {
    selectedItem = items[index];
    document.getElementById("orderSection").style.display = "block";
    document.getElementById("selectedItem").innerText =
        "Selected: " + selectedItem.name;
}

// ORDER
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

        updateSummary();
    } else {
        alert("Select item & enter quantity");
    }
}

// SUMMARY
function updateSummary() {
    let html = "";

    orders.forEach(o => {
        html += `<p>${o.item} - ${o.quantity} pcs - ₹${o.total}</p>`;
    });

    document.getElementById("summary").innerHTML = html;
}

// PAYMENT
function pay() {
    alert("✅ Payment Successful!");
}

// REPORT
function generateReport(type) {
    let now = new Date();

    let filtered = orders.filter(o => {
        let diff = (now - new Date(o.date)) / (1000 * 60 * 60 * 24);
        return (type === "month" && diff <= 30) ||
               (type === "year" && diff <= 365);
    });

    if(filtered.length === 0) {
        alert("No data");
        return;
    }

    let csv = "Item,Quantity,Total,Date\n";

    filtered.forEach(o => {
        csv += `${o.item},${o.quantity},${o.total},${o.date.toLocaleDateString()}\n`;
    });

    let blob = new Blob([csv], { type: "text/csv" });
    let link = document.createElement("a");

    link.href = URL.createObjectURL(blob);
    link.download = type + "_report.csv";
    link.click();
}

// LOGOUT
function logout() {
    location.reload();
}
