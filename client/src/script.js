const logo = document.getElementById("logo");

const sunIcon = document.querySelector(".sun-icon");
const moonIcon = document.querySelector(".moon-icon");

const userThem = localStorage.getItem("theme");
const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches;

const iconToggle = () => {
  sunIcon.classList.toggle("block");
  moonIcon.classList.toggle("hidden");
};

const themeCheck = () => {
  if (userThem === "dark" || (!userThem && systemTheme)) {
    document.documentElement.classList.add("dark");
    moonIcon.classList.add("block");
    logo.src = "logo-d.png";
    return;
  }
  logo.src = "logo-l.png";
  sunIcon.classList.add("block");
};

const themeSwitch = () => {
  if (document.documentElement.classList.contains("dark")) {
    document.documentElement.classList.remove("dark");
    localStorage.setItem("theme", "light");
    iconToggle();
    logo.src = "logo-l.png";
    return;
  }
  document.documentElement.classList.add("dark");
  localStorage.setItem("theme", "dark");
  iconToggle();
  logo.src = "logo-d.png";
  return;
};

sunIcon.addEventListener("click", () => {
  themeSwitch();
});
moonIcon.addEventListener("click", () => {
  themeSwitch();
});

themeCheck();

// Handle sending data to the API
const form = document.querySelector("form");
form.addEventListener("submit", function (event) {
  event.preventDefault();

  var formData = new FormData(this);
  var productValue = formData.get("product");

  fetch(`http://localhost:3000/${productValue}`, {
    method: "POST",
  })
    .then(function (response) {
      if (response.ok) {
        console.log("Form data sent successfully!");
      } else {
        console.error("Error sending form data to the backend.");
      }
    })
    .catch(function (error) {
      console.error("An error occurred while sending form data:", error);
    });
});
