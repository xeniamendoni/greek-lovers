let order = {
  pita: "",
  meat: "",
  sauces: [],
  vegetables: [],
  fries: "",
  drink: "",
  fullName: "",
  phone: "",
  email: "",
  pickupTime: "",
  payment: "",
  total: 0
};

const prices = {

  pita: {
    "Greek Pita": 7.5,
    "Cypriot Pita": 8.5
  },

  meat: {
    "Chicken (€0)": 0,
    "Pork (+€0.50)": 0.5,
    "Beef (+€1.50)": 1.5
  },

  fries: {
    "Yes (+€2.00)": 2,
    "No": 0
  },

  drink: {
    "No": 0,
    "Water (€1.00)": 1,
    "Apple Juice (€2.50)": 2.5,
    "Orange Juice (€2.50)": 2.5,
    "Coca-Cola (€2.50)": 2.5,
    "Seven Up (€2.50)": 2.5
  }

};

function loadOrder() {

  const saved = localStorage.getItem("order");

  if (saved) {

    order = JSON.parse(saved);

  }

}

function saveOrder() {

  localStorage.setItem(

    "order",

    JSON.stringify(order)

  );

}

function updateTotal() {

  let total = 0;

  total += prices.pita[order.pita] || 0;

  total += prices.meat[order.meat] || 0;

  total += prices.fries[order.fries] || 0;

  total += prices.drink[order.drink] || 0;

  order.total = total;

  const totalBox = document.getElementById("liveTotal");

  if (totalBox) {

    totalBox.textContent =

      "€" + total.toFixed(2);

  }

}

document.addEventListener(

  "change",

  function(e){

    if(e.target.name === "pita"){

      order.pita = e.target.value;

    }

    if(e.target.name === "meat"){

      order.meat = e.target.value;

    }

    if(e.target.name === "fries"){

      order.fries = e.target.value;

    }

    if(e.target.name === "drink"){

      order.drink = e.target.value;

    }

    if(e.target.name === "payment"){

      order.payment = e.target.value;

    }

    if(e.target.name === "sauces"){

      const checked =

      document.querySelectorAll(

      'input[name="sauces"]:checked'

      );

      order.sauces =

      Array.from(checked)

      .map(item => item.value);

    }

    if(e.target.name === "vegetables"){

      const checked =

      document.querySelectorAll(

      'input[name="vegetables"]:checked'

      );

      order.vegetables =

      Array.from(checked)

      .map(item => item.value);

    }

    updateTotal();

    saveOrder();

  }

);

document.addEventListener(

  "input",

  function(e){

    if(e.target.name === "fullName"){

      order.fullName = e.target.value;

    }

    if(e.target.name === "phone"){

      order.phone = e.target.value;

    }

    if(e.target.name === "email"){

      order.email = e.target.value;

    }

    if(e.target.name === "pickupTime"){

      order.pickupTime = e.target.value;

    }

    saveOrder();

  }

);

const orderForm =

document.getElementById(

"orderForm"

);

if(orderForm){

  orderForm.addEventListener(

    "submit",

    function(e){

      e.preventDefault();

      saveOrder();

      window.location.href =

      "payment.html";

    }

  );

}

const paymentForm =

document.getElementById(

"paymentForm"

);

if(paymentForm){

  paymentForm.addEventListener(

    "submit",

    function(e){

      e.preventDefault();

      saveOrder();

      window.location.href =

      "summary.html";

    }

  );

}

document.addEventListener(

"DOMContentLoaded",

function(){

  loadOrder();

  const summary =

  document.getElementById(

  "summaryContent"

  );

  if(summary){

    summary.innerHTML = `

      <p><strong>Pita:</strong> ${order.pita || "-"}</p>

      <p><strong>Meat:</strong> ${order.meat || "-"}</p>

      <p><strong>Sauces:</strong> ${order.sauces.join(", ") || "-"}</p>

      <p><strong>Vegetables:</strong> ${order.vegetables.join(", ") || "-"}</p>

      <p><strong>French Fries:</strong> ${order.fries || "-"}</p>

      <p><strong>Drink:</strong> ${order.drink || "-"}</p>

      <hr>

      <p><strong>Full Name:</strong> ${order.fullName || "-"}</p>

      <p><strong>Phone:</strong> ${order.phone || "-"}</p>

      <p><strong>Email:</strong> ${order.email || "-"}</p>

      <p><strong>Pickup Time:</strong> ${order.pickupTime || "-"}</p>

      <p><strong>Payment:</strong> ${order.payment || "-"}</p>

      <hr>

      <h2>Total: €${order.total.toFixed(2)}</h2>

    `;

  }

});