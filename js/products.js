const productsElement = document.querySelector(".cards");

//Realizo la petición a la base de datos.

const consultProducts = async () => {
  const allProducts = await fetch("https://tienda-online-node.herokuapp.com/product");
  const res = await allProducts.json();
  productCard(res);
};

//Muestra todos los productos en cartas.

function productCard(res) {
  productsElement.innerHTML = "";
  res.forEach((p) => {
    const productsHTML = `
    <div class="col" style="width: 22rem;">
    <div class="card">
    <img src="${p.url_image}" class="card-img-top" alt="Imagen del producto.">
    <div class="card-body">
    <hr>
      <h6 class="card-title">${p.name}</h6>
      <p class="card-text">$ ${p.price}</p>
    </div>
    </div>
  </div>
  `;
    productsElement.innerHTML = productsElement.innerHTML + productsHTML;
  });
}

//Buscar prodcuto por nombre.

const searchProduct = async (name) => {
  const searchProduct = await fetch(
    `https://tienda-online-node.herokuapp.com/product?name=${name}`
  );
  const response = await searchProduct.json();
  searchProducts(response);
};

//En caso de que el producto no sea encontrado.

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
      <div class="col" style="width: 22rem;">
      <div class="card">
      <img src="${p.url_image}" class="card-img-top" alt="Imagen del producto.">
      <div class="card-body">
      <hr>
        <h6 class="card-title">${p.name}</h6>
        <p class="card-text">$ ${p.price}</p>
      </div>
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
  console.log("errorID",id)
  const categoriesId = await fetch(
    `https://tienda-online-node.herokuapp.com/product/category/${id}`
  );
  const res = await categoriesId.json();
  productsByCategory(res);
};

function productsByCategory(res) {
  productsElement.innerHTML = "";
  res.forEach((p) => {
    const searchHTML = `
    <div class="col">
    <div class="card">
    <img src="${p.url_image}" class="card-img-top" alt="Imagen del producto.">
    <div class="card-body">
    <hr>
      <h6 class="card-title">${p.name}</h6>
      <p class="card-text">$ ${p.price}</p>
    </div>
    </div>
  </div>
  `;
    productsElement.innerHTML = productsElement.innerHTML + searchHTML;
  });
}

const categorySearch = document.querySelectorAll(".nav-item navbar-nav");

categorySearch.forEach(function (btn) {
  console.log("objecterror", btn);
  btn.addEventListener("click", function (e) {
    const selector = `.${this.id}`;
    const allInputs = document.querySelectorAll(selector);

    allInputs.forEach(async function (input) {
      const test = `${input.value}`;
      await consultCategoryById(test);
    });
  });
});

consultProducts();
