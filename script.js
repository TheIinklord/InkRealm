// Replace this example with the dedicated email address where you receive commission requests.
// Do not put passwords, payment keys, or private account information in this file.
const COMMISSION_EMAIL = "bw6773714@gmail.com";

const form = document.getElementById("commissionForm");
const message = document.getElementById("formMessage");
const menuToggle = document.querySelector(".menu-toggle");
const navigation = document.getElementById("site-nav");

menuToggle.addEventListener("click", () => {
  const open = menuToggle.getAttribute("aria-expanded") === "true";
  menuToggle.setAttribute("aria-expanded", String(!open));
  navigation.classList.toggle("is-open", !open);
});

navigation.querySelectorAll("a").forEach((link) => link.addEventListener("click", () => {
  menuToggle.setAttribute("aria-expanded", "false");
  navigation.classList.remove("is-open");
}));

document.querySelectorAll("[data-commission]").forEach((link) => link.addEventListener("click", () => {
  document.getElementById("type").value = link.dataset.commission;
}));

const priceMap = {
  "Single PFP": "$10 + tax",
  "Couple PFP": "$10 per character + tax",
  "Character Art — Head": "$10 + tax",
  "Character Art — Head & Torso": "$15 + tax",
  "Character Art — Full Body": "$25 + tax",
  "Comic Page": "$8 per page + tax",
  "Short Animation": "$20 + tax",
  "Long Animation": "Above $20 — custom quote",
  "Something else": "Custom quote"
};

const updateSummary = () => {
  const type = document.getElementById("type").value || "Choose a commission";
  const plan = document.querySelector('input[name="paymentPlan"]:checked')?.value || "Choose a plan";
  const privacy = document.querySelector('input[name="publication"]:checked')?.value || "Choose an option";
  document.getElementById("summaryType").textContent = type;
  document.getElementById("summaryPrice").textContent = priceMap[type] || "Custom quote";
  document.getElementById("summaryPlan").textContent = plan;
  document.getElementById("summaryPrivacy").textContent = privacy.includes("private") ? "Keep private" : privacy.includes("Yes") ? "Can be published" : "Choose an option";
};

document.getElementById("type").addEventListener("change", updateSummary);
document.querySelectorAll('input[name="paymentPlan"], input[name="publication"]').forEach((input) => input.addEventListener("change", updateSummary));

form.addEventListener("submit", (event) => {
  event.preventDefault();
  if (!form.checkValidity()) {
    message.textContent = "Please choose a commission, payment plan, privacy choice, and complete the required fields.";
    form.reportValidity();
    return;
  }
  const value = (id) => document.getElementById(id).value.trim() || "Not provided";
  const paymentPlan = document.querySelector('input[name="paymentPlan"]:checked')?.value || "Not selected";
  const paymentMethod = document.querySelector('input[name="paymentMethod"]:checked')?.value || "Not selected";
  const publication = document.querySelector('input[name="publication"]:checked')?.value || "Not selected";
  const selectedType = value("type");
  const price = priceMap[selectedType] || "Custom quote";
  const subject = encodeURIComponent(`InkRealm commission request — ${selectedType}`);
  const body = encodeURIComponent(`Hello InkRealm!\n\nI'd like to request a commission.\n\nWHAT I WANT\nCommission type: ${selectedType}\nStarting price: ${price}\nCharacters: ${value("characters")}\nNeeded by: ${value("deadline")}\nReference link: ${value("references")}\n\nMy idea:\n${value("details")}\n\nPAYMENT\nPayment plan: ${paymentPlan}\nPreferred payment method: ${paymentMethod}\nCash App destination: $thegmaerz09\n\nARTWORK PRIVACY\n${publication}\n\nName or username: ${value("name")}\nEmail: ${value("email")}\n\nThank you!`);
  window.location.href = `mailto:${COMMISSION_EMAIL}?subject=${subject}&body=${body}`;
  message.textContent = "Your request is ready to review. Check the email before sending it.";
});

updateSummary();
