const productsElement = document.querySelector(".cards");

const consultProducts = async () => {
  const allProducts = await fetch("http://localhost:3001/product");
  const res = await allProducts.json();
  productCard(res);
};

function productCard(res) {
  productsElement.innerHTML = "";
  res.forEach((p) => {
    const productsHTML = `
    <div class="card" style="width: 18rem;">
    <img src=${p.url_image} class="card-img-top" alt="..." width="380px" height="260px">
    <hr>
    <div class="card-body">
      <p class="card-text">${p.name}</p>
      <p class="card-text">$ ${p.price}</p>
    </div>
  </div>
  `;
    productsElement.innerHTML = productsElement.innerHTML + productsHTML;
  });
}

const searchProduct = async (name) => {
  const searchProduct = await fetch(
    `http://localhost:3001/product?name=${name}`
  );
  const response = await searchProduct.json();
  searchProducts(response);
};

function searchProducts(res) {
  let searchHTML = "";
  if (res.length == 0) {
    searchHTML = `
    <div class="error">
      <p>Producto no encontrado.</p>
      <button onClick="consultProducts()" type="button" class="btn btn-outline-success">Volver</button>
    </div>
    `;
    productsElement.innerHTML = searchHTML;
  } else {
    productsElement.innerHTML = "";
    res.forEach((p) => {
      searchHTML = `
      <div class="card" style="width: 18rem;">
      <img src=${p.url_image} class="card-img-top" alt="..." width="380px" height="260px">
      <hr>
      <div class="card-body">
        <p class="card-text">${p.name}</p>
        <p class="card-text">$ ${p.price}</p>
      </div>
    </div>
    `;
      productsElement.innerHTML = productsElement.innerHTML + searchHTML;
    });
  }
}

const buttonSearch = document.querySelectorAll(".seacrh button");

buttonSearch.forEach(function (btn) {
  btn.addEventListener("click", function (e) {
    const selector = `.${this.name} input`;
    const inputs = document.querySelectorAll(selector);

    inputs.forEach(async function (input) {
      const test = `${input.value}`;
      await searchProduct(test);
    });
  });
});

const consultCategoryById = async (id) => {
  const categoriesId = await fetch(
    `http://localhost:3001/product/category/${id}`
  );
  const res = await categoriesId.json();
  productsByCategory(res);
};

function productsByCategory(res) {
  productsElement.innerHTML = "";
  res.forEach((p) => {
    const searchHTML = `
    <div class="card" style="width: 18rem;">
    <img src=${p.url_image} class="card-img-top" alt="..." width="380px" height="260px">
    <hr>
    <div class="card-body">
      <p class="card-text">${p.name}</p>
      <p class="card-text">$ ${p.price}</p>
    </div>
  </div>
  `;
    productsElement.innerHTML = productsElement.innerHTML + searchHTML;
  });
}

const categorySearch = document.querySelectorAll(".nav-item li");

categorySearch.forEach(function (btn) {
  btn.addEventListener("click", function () {
    const selector = `.${this.id} input`;
    const allInputs = document.querySelectorAll(selector);

    allInputs.forEach(async function (input) {
      const test = `${input.value}`;
      await consultCategoryById(test);
    });
  });
});

consultProducts();
