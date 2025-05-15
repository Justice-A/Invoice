function loadCardsFromStorage() {
  const savedCards = localStorage.getItem("invoiceCards");
  if (savedCards) {
    document.getElementById("invoice-cards").innerHTML = savedCards;
  }
}

document.addEventListener("DOMContentLoaded", loadCardsFromStorage);
document.getElementById("newInvoice").addEventListener("click", function () {
  const sectionOne = document.getElementById("sectionOne");
  const isHidden = window.getComputedStyle(sectionOne).display === "none";

  if (isHidden) {
    sectionOne.style.display = "block";
    this.textContent = "Hide Section";
  } else {
    sectionOne.style.display = "none";
    this.textContent = "+ New invoice";
  }
});
document
  .getElementById("invoice-cards")
  .addEventListener("click", function (e) {
    if (e.target.closest(".invoice-card")) {
      document.querySelector(".main-content").style.display = "none";
      document.querySelector(".pending-content").style.display = "block";
    }
  });
document.querySelector(".go-back").addEventListener("click", function (e) {
  e.preventDefault();
  document.querySelector(".main-content").style.display = "block";
  document.querySelector(".pending-content").style.display = "none";
});
document.getElementById("discard").addEventListener("click", function () {
  const sectionOne = document.getElementById("sectionOne");
  sectionOne.style.display = "none";
  const newInvoiceBtn = document.getElementById("newInvoice");
  if (newInvoiceBtn) {
    newInvoiceBtn.textContent = "+ New invoice";
  }
});

document.getElementById("addItem").addEventListener("click", function () {
  const template = document.getElementById("newItems");
  const clone = template.cloneNode(true);

  clone.style.display = "block";
  clone.removeAttribute("id");
  clearInputs(clone);

  document.getElementById("itemsContainer").appendChild(clone);
});

function clearInputs(section) {
  const inputs = section.querySelectorAll("input");
  inputs.forEach((input) => (input.value = ""));
}
document
  .getElementById("itemsContainer")
  .addEventListener("click", function (e) {
    if (e.target.closest(".delete-item")) {
      e.target.closest(".new-items").remove();
    }
  });
document.querySelector(".save-send").addEventListener("click", function (e) {
  e.preventDefault();
  document.getElementById("save-draft").click();
});

document.getElementById("save-draft").addEventListener("click", function (e) {
  e.preventDefault();

  const invoiceId = "E" + Math.floor(10000 + Math.random() * 90000);

  const invoiceDate = document.getElementById("invoice-date").value;
  const clientName = document.getElementById("name").value;
  const clientEmail = document.getElementById("client-email").value;

  let amount = 0;
  document.querySelectorAll("#itemsContainer .new-items").forEach((item) => {
    const qty =
      parseFloat(item.querySelector('input[type="number"]').value) || 0;
    const price =
      parseFloat(item.querySelectorAll('input[type="number"]')[1].value) || 0;
    amount += qty * price;
  });

  const status = "pending";

  const card = document.createElement("div");
  card.className = "invoice-card";

  card.innerHTML = `
  <div class="details">
    <p class="invoice-id">${invoiceId}</p>
    <p>${invoiceDate}</p>
    <p>${clientName}</p>
  </div>
  <div class="amount-status">
    <p class="amount">$${amount.toFixed(2)}</p>
    <p class="status-paid">●${status}</p>
  </div>
`;

  document.getElementById("invoice-cards").appendChild(card);
  this.closest("form").reset();
});
function saveCardsToStorage() {
  const cardsContainer = document.getElementById("invoice-cards");
  localStorage.setItem("invoiceCards", cardsContainer.innerHTML);
}
