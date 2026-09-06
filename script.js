// Change this to the email address where you want commission requests sent.
const COMMISSION_EMAIL = "your-email@example.com";

document.getElementById("commissionForm").addEventListener("submit", function (event) {
  event.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const type = document.getElementById("type").value;
  const details = document.getElementById("details").value.trim();
  const message = document.getElementById("formMessage");

  if (!name || !email || !type || !details) {
    message.textContent = "Please fill out every field.";
    return;
  }

  const subject = encodeURIComponent(`Commission Request — ${type}`);
  const body = encodeURIComponent(
`Hi InkRealm!

I'd like to request a commission.

Name: ${name}
Email: ${email}
Commission type: ${type}

My idea:
${details}

Thanks!`
  );

  if (COMMISSION_EMAIL === "your-email@example.com") {
    message.textContent = "Almost ready! Open script.js and replace the example email with your commission email.";
    return;
  }

  window.location.href = `mailto:${COMMISSION_EMAIL}?subject=${subject}&body=${body}`;
  message.textContent = "Opening your email app...";
});
