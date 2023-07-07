const getProducts = function () {
  const URL = "https://striveschool-api.herokuapp.com/api/product/"
  fetch(URL, {
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGE3YmRhZjEyYjUwYzAwMTQ5ZTRlZjUiLCJpYXQiOjE2ODg3NDIyMDEsImV4cCI6MTY4OTk1MTgwMX0.IqMpclsSn9uL_htDhzoLzs_dljw8WKwqou8KVyMzZ3g",
    },
  })
    .then((res) => {
      console.log("Response della GET", res)
      if (res.ok) {
        return res.json()
      } else {
        if (res.status === 404) {
          throw new Error("Non trovato")
        } else if (res.status === 500) {
          throw new Error("Errore interno del server")
        } else {
          throw new Error("Errore nella chiamata API")
        }
      }
    })
    .then((products) => {
      console.log("products", products)
      const spinnerContainer = document.getElementById("spinner-container")
      spinnerContainer.classList.add("d-none")
      products.forEach((product) => {
        let newCol = document.createElement("div")
        newCol.classList.add("col", "col-12", "col-sm-6", "col-md-3")
        newCol.innerHTML = `
          <div class="card mb-4 shadow-sm">
            <img src="${product.imageUrl}" class="card-img-top" alt="image" style="height: 15em"/>
            <div class="card-body">
              <h5 class="card-title">${product.name}</h5>
              <p class="card-text">${product.description}
              </p>
              <p class="card-text fst-italic">
              Brand: ${product.brand}
            </p>
            <p class="card-text fw-bold text-end">
              Price: ${product.price}€
            </p>
              <div class="d-flex justify-content-between">
              <a href="./details.html?id=${product._id}" class="btn btn-primary me-2">Dettagli prodotto</a>
              <a href="./backoffice.html?id=${product._id}" class="btn btn-warning">Modifica prodotto</a>
            </div>
            </div>
          </div>
        `
        const productsRow = document.getElementById("products-row")
        productsRow.appendChild(newCol)
      })
    })
    .catch((err) => {
      console.log(err)
    })
}

function searchProducts(event) {
  event.preventDefault()

  const searchInput = document
    .querySelector("#navbarSupportedContent input[type=search]")
    .value.toLowerCase()
  const products = document.querySelectorAll("#products-row .col")

  products.forEach((product) => {
    const productName = product
      .querySelector(".card-title")
      .textContent.toLowerCase()
    const productDescription = product
      .querySelector(".card-text")
      .textContent.toLowerCase()
    const isVisible =
      productName.includes(searchInput) ||
      productDescription.includes(searchInput)

    product.style.display = isVisible ? "block" : "none"
  })
}

document
  .querySelector("#navbarSupportedContent form")
  .addEventListener("submit", searchProducts)

getProducts()
