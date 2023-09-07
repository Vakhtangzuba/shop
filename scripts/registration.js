"use strict";
// მენიუს ღილაკი მცირე ზომის მოწყობილობებზე
setTimeout(() => {
  $("#icon").click(function () {
    $(".header-ul").toggleClass("show");
  });
}, 800);

// Set ACTIVE class to meni items
setTimeout(() => {
  $("ul li a").click(function () {
    $("li a").removeClass("active");
    $(this).addClass("active");
  });
}, 800);

window.onload = function () {
  let form = document.main_form;
  let info = document.getElementById("info");
  let name = form.name;
  let lastname = form.lastname;
  let surname = form.surname;
  let date = form.birthday;
  let email = form.email;
  let password = form.password;
  let confirmPassword = form.confirmPassword;

  form.addEventListener("submit", formValidation);
  function formValidation() {
    let wrongFields = false;
    for (let i = 0; i < form.length; i++) {
      if (form[i].value == "" && form[i].type != "radio") {
        form[i].classList.add("not-valid");
        wrongFields = true;
      } else form[i].classList.remove("not-valid");
    }
    if (form.password.value != form.confirmPassword.value) {
      info.innerHTML = "Passwords is not same";
      event.preventDefault();
    } else info.innerHTML = "";
    if (!wrongFields) alert("Thanks for registration");
    else event.preventDefault();
  }

  for (let i = 0; i < form.length; i++) {
    form[i].onchange = function () {
      if (this.value != "") this.classList.remove("not-valid");
    };
  }
};

// Import Templates
// Import header
const headerBAR = document.querySelector(".header");
fetch("./templates/header.html")
  .then((res) => res.text())
  .then((data) => {
    headerBAR.innerHTML = data;
  });

// Import Footer
const footerBAR = document.querySelector(".footer");
fetch("./templates/footer.html")
  .then((res) => res.text())
  .then((data) => {
    footerBAR.innerHTML = data;
  });
