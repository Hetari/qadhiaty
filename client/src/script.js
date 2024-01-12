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
        form.reset();
        return response.json();
      } else {
        throw new Error("Error sending data to the server.");
      }
    })
    .then(function (result) {
      if (result.error) {
        Swal.fire({
          title: "Error!",
          text: result.error,
          icon: "error",
          confirmButtonText: "Close",
        });
        return;
      }
      if (result.barcode) {
        if (result.buy) {
          Swal.fire({
            title: "Success!",
            text: "You can buy this product!",
            icon: "success",
            confirmButtonText: "Close",
          });
        } else {
          Swal.fire({
            title: "Error!",
            text: "You can't buy this product!",
            icon: "error",
            confirmButtonText: "Close",
          });
        }
      } else {
        Swal.fire({
          title: "I don't know!",
          text: "Product not found in our database!",
          icon: "info",
          confirmButtonText: "Close",
        });
      }
    })
    .catch(function (error) {
      console.error("An error occurred while sending form data:", error);
    });
});
