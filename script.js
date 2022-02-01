const mainButton = document.getElementById("main-button");
const popUpMenu = document.getElementById("item-input");
const addIncomeButton = document.getElementById("add-income");
const addExpenseButton = document.getElementById("add-expense");
const clearButton = document.getElementById("clear");
const amountInput = document.getElementById("amount-input");
const nameInput = document.getElementById("name-input");
const itemsList = document.getElementById("items-ul");
const balanceAmount = document.getElementById("balance-amount");

itemsList.innerHTML = "";

let balance = 10000;
let itemsCounter = 0;

parseStorage();

mainButton.addEventListener("click", () => {
  if (popUpMenu.classList.contains("active")) {
    popUpMenu.classList.remove("active");
  } else {
    popUpMenu.classList.add("active");
  }
});

addIncomeButton.addEventListener("click", () => {
  if (amountInput.value < 1) {
    amountInput.placeholder = "Missing Value";
  } else if (nameInput.value === "") {
    nameInput.placeholder = "Missing Value";
  } else {
    addLi(nameInput.value, parseFloat(amountInput.value).toFixed(2), "income");
  }
});

addExpenseButton.addEventListener("click", () => {
  if (amountInput.value < 1) {
    amountInput.placeholder = "Missing Value";
  } else if (nameInput.value === "") {
    nameInput.placeholder = "Missing Value";
  } else {
    addLi(nameInput.value, parseFloat(amountInput.value).toFixed(2), "expense");
  }
});

clearButton.addEventListener("click", () => {
  itemsList.innerHTML = "";
  resetInput();
  localStorage.clear();
});

itemsList.addEventListener("dblclick", (e) => {
  if (!(itemsList.innerHTML == "")) {
    e.target.parentElement.removeChild(e.target);
    itemsList.innerHTML = "";
  }
});

function addLi(name, amount, type) {
  let liItem = document.createElement("li");
  liItem.appendChild(document.createTextNode(`${name}: $${amount}`));
  if (type === "income") {
    liItem.classList.add("income");
    balance += parseFloat(amount);
    balanceAmount.textContent = `$${balance}`;
  } else {
    balance -= parseFloat(amount);
    balanceAmount.textContent = `$${balance}`;
    liItem.classList.add("expense");
  }

  itemsCounter += 1;
  let obj = new liObject(name, amount, type);
  let obj_serialized = JSON.stringify(obj);

  localStorage.setItem("itemsCounter", itemsCounter);
  localStorage.setItem(`obj${itemsCounter}`, obj_serialized);

  itemsList.appendChild(liItem);
  resetInput();
}

function resetInput() {
  amountInput.value = "";
  nameInput.value = "";

  nameInput.placeholder = "Name";
  amountInput.placeholder = "$";
}

class liObject {
  constructor(name, amount, type) {
    this.name = name;
    this.amount = amount;
    this.type = type;
  }
}

function parseStorage() {
  itemsCounter = parseInt(localStorage.getItem("itemsCounter"));
  localStorage.setItem("itemsCounter", itemsCounter);

  for (let i = 1; i <= itemsCounter; i++) {
    let obj_deserialized = JSON.parse(localStorage.getItem(`obj${i}`));
    let liItem = document.createElement("li");

    liItem.appendChild(
      document.createTextNode(
        `${obj_deserialized.name}: $${obj_deserialized.amount}`
      )
    );

    if (obj_deserialized.type === "income") {
      liItem.classList.add("income");
      balance += parseFloat(obj_deserialized.amount);
      balanceAmount.textContent = `$${balance}`;
    } else {
      liItem.classList.add("expense");
      balance -= parseFloat(obj_deserialized.amount);
      balanceAmount.textContent = `$${balance}`;
    }

    itemsList.appendChild(liItem);
  }
}
