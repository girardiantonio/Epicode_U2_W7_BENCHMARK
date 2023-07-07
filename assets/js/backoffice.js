const URL = "https://striveschool-api.herokuapp.com/api/product/"

const addressBarContent = new URLSearchParams(location.search)
const productId = addressBarContent.get("id")

const nameInput = document.getElementById("product-name")
const desInput = document.getElementById("product-description")
const brandInput = document.getElementById("product-brand")
const imageInput = document.getElementById("product-image")
const priceInput = document.getElementById("product-price")

if (productId) {
  document.querySelector("h1").innerText = "Modifica prodotto"
  document.querySelector(".btn-primary").innerText = "Modifica prodotto"
  fetch(URL + productId, {
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGE3YmRhZjEyYjUwYzAwMTQ5ZTRlZjUiLCJpYXQiOjE2ODg3NDIyMDEsImV4cCI6MTY4OTk1MTgwMX0.IqMpclsSn9uL_htDhzoLzs_dljw8WKwqou8KVyMzZ3g",
    },
  })
    .then((res) => {
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
    .then((detail) => {
      console.log("DETAIL", detail)
      nameInput.value = detail.name
      desInput.value = detail.description
      priceInput.value = detail.price
      brandInput.value = detail.brand
      imageInput.value = detail.imageUrl
    })
    .catch((err) => console.log(err))

  let deleteButton = document.querySelector(".btn-danger")
  deleteButton.classList.remove("d-none")

  let resetForm = document.querySelector(".btn-secondary")
  resetForm.classList.add("d-none")

  deleteButton.addEventListener("click", function (e) {
    e.preventDefault()

    let modalDel = document.querySelector("#exampleModal1 .btn-primary")
    modalDel.addEventListener("click", function () {
      fetch(URL + productId, {
        method: "DELETE",
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGE3YmRhZjEyYjUwYzAwMTQ5ZTRlZjUiLCJpYXQiOjE2ODg3NDIyMDEsImV4cCI6MTY4OTk1MTgwMX0.IqMpclsSn9uL_htDhzoLzs_dljw8WKwqou8KVyMzZ3g",
        },
      })
        .then((res) => {
          if (res.ok) {
            alert("prodotto eliminato!")
            location.assign("homepage.html")
          } else {
            throw new Error("Problema nell'eliminazione del prodotto")
          }
        })
        .catch((err) => {
          console.log(err)
        })
    })
  })
}

const productForm = document.getElementById("product-form")
productForm.addEventListener("submit", function (e) {
  e.preventDefault()

  const newProduct = {
    name: nameInput.value,
    description: desInput.value,
    price: priceInput.value,
    imageUrl: imageInput.value,
    brand: brandInput.value,
  }

  console.log("valori del form:", newProduct)

  const URL = "https://striveschool-api.herokuapp.com/api/product/"

  let urlToUse
  if (productId) {
    urlToUse = URL + productId
  } else {
    urlToUse = URL
  }

  let methodToUse
  if (productId) {
    methodToUse = "PUT"
  } else {
    methodToUse = "POST"
  }

  fetch(urlToUse, {
    method: methodToUse,
    body: JSON.stringify(newProduct),
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGE3YmRhZjEyYjUwYzAwMTQ5ZTRlZjUiLCJpYXQiOjE2ODg3NDIyMDEsImV4cCI6MTY4OTk1MTgwMX0.IqMpclsSn9uL_htDhzoLzs_dljw8WKwqou8KVyMzZ3g",
      "Content-Type": "application/json",
    },
  })
    .then((res) => {
      if (res.ok) {
        nameInput.value = ""
        desInput.value = ""
        priceInput.value = ""
        imageInput.value = ""
        brandInput.value = ""
        location.assign("homepage.html")
      } else {
        throw new Error("Errore nel salvataggio del prodotto")
      }
    })
    .catch((err) => {
      console.log(err)
    })
})

const resetForm = document.querySelector("#exampleModal2 .btn-primary")
resetForm.addEventListener("click", function () {
  nameInput.value = ""
  desInput.value = ""
  priceInput.value = ""
  imageInput.value = ""
  brandInput.value = ""
})
