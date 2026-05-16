// WhatsApp order button
function order(product) {
  let phone = "27764895262"; // Replace with your WhatsApp number
  let message = "Hi, I want to order " + product + " from Kasi Candy 🍭";
  let url = "https://wa.me/" + phone + "?text=" + encodeURIComponent(message);
  window.open(url, "_blank");
}

// Form validation
function validateForm() {
  const name = document.getElementById("name").value.trim();
  const message = document.getElementById("message").value.trim();

  if (name === "" || message === "") {
    alert("Please fill in both your name and message!");
    return false; // prevents form submission
  }

  alert("Thank you! Your message has been sent."); // optional
  return true;
}

