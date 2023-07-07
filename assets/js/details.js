const URL = "https://striveschool-api.herokuapp.com/api/product/"

const addressBarContent = new URLSearchParams(location.search)

const productId = addressBarContent.get("id")
console.log("productID", productId)
console.log(URL + productId)

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
    const spinnerContainer = document.getElementById("spinner-container")
    spinnerContainer.classList.add("d-none")
    let newCol = document.createElement("div")
    newCol.classList.add("col", "col-12", "col-sm-8", "text-center")
    newCol.innerHTML = `
          <div class="card">
              <img
                src="${detail.imageUrl}"
                class="card-img-top"
                alt="concert placeholder image"
              />
              <div class="card-body fs-4">
                <h2 class="card-title">Nome: ${detail.name}</h2>
                <p class="card-text">Descrizione: ${detail.description}
                </p>
                <p class="card-text fst-italic">Brand: ${detail.brand}
                </p>
                <p class="card-text fw-bold">Price: ${detail.price}€
                </p>               
              </div>
            </div>
        `
    const productRow = document.getElementById("products-row")
    productRow.appendChild(newCol)
  })
  .catch((err) => {
    console.log(err)
  })
