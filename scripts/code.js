"use strict";

new Splide(".splide").mount();

// Header-ის toggle რესპონსივზე
setTimeout(() => {
  $("#icon").click(function () {
    $(".header-ul").toggleClass("show");
  });
}, 800);

// მენიუზე active როდესაც კონკრეტულ გვერდზე გადადიხარ
setTimeout(() => {
  // $("li a").removeClass("active");
  let navLinks = document.querySelectorAll(".nav_link");
  let windowPathname = window.location.pathname;

  console.log(windowPathname);

  navLinks.forEach((navLink) => {
    let navLinkPathname = new URL(navLink.href).pathname;

    if (windowPathname === navLinkPathname) {
      navLink.classList.add("active");
    }
  });
}, 10);

// Set ACTIVE class to meni items
setTimeout(() => {
  $("ul li a").click(function () {
    $("li a").removeClass("active");
    $(this).addClass("active");
  });
}, 10);

// მონაცემთა გაპარსვა API-დან და HTML-ში დახატვა
let page = 2;
let currentPage = 2;

function getUsersInfoFetch(page) {
  fetch("https://fakestoreapi.com/products?limit=" + page, {
    method: "GET",
  })
    .then(function (responseFetch) {
      console.log(responseFetch);
      if (responseFetch.status !== 200) {
        throw responseFetch.status;
      }
      return responseFetch.json();
    })
    .then(function (responseDataFetch) {
      console.log(responseDataFetch);

      const fragment = document.createDocumentFragment();

      responseDataFetch.forEach((element) => {
        let li = document.createElement("li");
        li.classList.add("li-item");
        // li.innerText = element.first_name + " " + element.last_name;

        li.innerHTML =
          '<div id="prods-card" class="product-card">' +
          '<div class="badge">Hot</div>' +
          '<div class="product-tumb"><img id="prods-image" src=' +
          element.image +
          ' alt=""/></div>' +
          '<div class="product-details">' +
          ' <span id="prods-category" class="product-catagory">' +
          element.category +
          "</span>" +
          '<h4><a id="prods-title" href="">' +
          element.title +
          "</a></h4>" +
          '<p id="prods-description">' +
          element.description +
          "</p>" +
          '<div class="product-bottom-details">' +
          '<div id="prods-price" class="product-price">' +
          "<small>$2900.00</small>" +
          element.price +
          "" +
          " </div>" +
          ' <div class="product-links"><a href=""><i class="fa fa-heart"></i></a>' +
          '<a href=""><i class="fa fa-shopping-cart"></i></a>' +
          "</div>";
        " </div>" + " </div>";

        fragment.appendChild(li);
      });

      document.getElementById("prods").innerHTML = " ";
      document.getElementById("prods").appendChild(fragment);
    })

    .catch(function (errorFetch) {
      console.log(errorFetch);
      if (errorFetch == 404) {
        let p = document.createElement("p");
        p.textContent = "Page Not Found";
      }
    });
}

// მეტის ჩატვირთვა (Load More)
document.getElementById("loadmore").addEventListener("click", function () {
  currentPage += 2;
  getUsersInfoFetch(currentPage);
});
getUsersInfoFetch(currentPage);

// Scroll To Top
let intervalId = 0; // Stop scrolling at top
const $scrollButton = document.querySelector(".scroll");

function scrollStep() {
  // Stop scrolling when get TOP
  if (window.scrollY === 0) {
    clearInterval(intervalId);
  }
  window.scroll(0, window.scrollY - 50);
  document.getElementById("totop").style.display = "none";
}

function scrollToTop() {
  // Call the function scrollStep() every 10 millisecons
  intervalId = setInterval(scrollStep, 10);
}

// When the DOM is loaded, this click handler is added to our scroll button
$scrollButton.addEventListener("click", scrollToTop);

window.addEventListener("scroll", () => {
  const scroll = window.scrollY;

  if (scroll > 150) {
    document.getElementById("totop").style.display = "block";
  } else if (scroll < 150) {
    document.getElementById("totop").style.display = "none";
  }
});

// Cookies JS
const cookieBox = document.querySelector(".wrapper-cookies"),
  buttons = document.querySelectorAll(".button");

const executeCodes = () => {
  //if cookie contains codinglab it will be returned and below of this code will not run
  if (document.cookie.includes("codinglab")) return;
  cookieBox.classList.add("show");

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      cookieBox.classList.remove("show");

      //if button has acceptBtn id
      if (button.id == "acceptBtn") {
        //set cookies for 1 month. 60 = 1 min, 60 = 1 hours, 24 = 1 day, 30 = 30 days
        document.cookie = "cookieBy= codinglab; max-age=" + 60 * 60 * 24 * 30;
      }
    });
  });
};

//executeCodes function will be called on webpage load
window.addEventListener("load", executeCodes);

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
