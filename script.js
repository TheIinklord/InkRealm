// Replace this example with the dedicated email address where you receive commission requests.
// Do not put passwords, payment keys, or private account information in this file.
const COMMISSION_EMAIL = "theinklord@gmail.com";

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

form.addEventListener("submit", (event) => {
  event.preventDefault();
  if (!form.checkValidity()) {
    message.textContent = "Please complete the required fields and confirm the terms.";
    form.reportValidity();
    return;
  }
  if (COMMISSION_EMAIL === "your-email@example.com") {
    message.textContent = "This form is ready, but the artist still needs to add a commission email in script.js before requests can be sent.";
    return;
  }
  const value = (id) => document.getElementById(id).value.trim() || "Not provided";
  const subject = encodeURIComponent(`InkRealm commission request — ${value("type")}`);
  const body = encodeURIComponent(`Hello InkRealm!\n\nI'd like to request a commission.\n\nName or username: ${value("name")}\nEmail: ${value("email")}\nCommission type: ${value("type")}\nCharacters: ${value("characters")}\nNeeded by: ${value("deadline")}\nReference link: ${value("references")}\n\nMy idea:\n${value("details")}\n\nThank you!`);
  window.location.href = `mailto:${COMMISSION_EMAIL}?subject=${subject}&body=${body}`;
  message.textContent = "Thanks! Your email app should open with your request ready to review and send.";
});
