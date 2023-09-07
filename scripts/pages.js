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
