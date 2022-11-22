const productsElement = document.querySelector(".cards");

//Realizo la petición a la base de datos.

const consultProducts = async () => {
  const allProducts = await fetch("http://localhost:3000/product");
  const res = await allProducts.json();
  console.log('res :>> ', res);
  productCard(res);
};

//Muestra todos los productos en cartas.

function productCard(res) {
  productsElement.innerHTML = "";
  res.forEach((p) => {
    if(p.discount !== 0) {
       productsHTML = `
      <div class="col" style="width: 22rem;">
      <div class="card">
      <p class="card-text valor discount"> ${p.discount}%</p>
      <img src="${p.url_image}" ${p.discount} class="card-img-top" alt="Imagen del producto.">
      <div class="card-body">
      <hr>
        <h6 class="card-title">${p.name}</h6>
        <p class="card-text">$ ${p.price}</p>
        <p class="card-text">$ ${p.discountTotal}</p>
      </div>
      </div>
    </div>
    `;
    } else {
    productsHTML = `
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
    }
    productsElement.innerHTML = productsElement.innerHTML + productsHTML;
  });
}

//Buscar prodcuto por nombre.

const searchProduct = async (name) => {
  const searchProduct = await fetch(
    `http://localhost:3000/product?name=${name}`
  );
  const response = await searchProduct.json();
  searchProducts(response);
};

//En caso de que el producto no sea encontrado.

function searchProducts(res) {
  let searchHTML = "";
  if (res.length == 0) {
    searchHTML = `
    <div>
    <div class="error-icon">
    <i class="bi bi-x-circle-fill  heading"></i>
    </div>
    <div class="error">
      <p class="error-text">Producto no encontrado.</p>
    </div>
    <div>
    <button class="error-button" onClick="consultProducts()" type="button" class="btn btn-outline-success">Volver</button>
    </div>
    </div>
    `;
    productsElement.innerHTML = searchHTML;
  } else {
    productsElement.innerHTML = "";
    res.forEach((p) => {
      if(p.discount !== 0) {
        searchHTML = `
        <div class="col" style="width: 22rem;">
        <div class="card">
        <p class="card-text valor discount"> ${p.discount}%</p>
        <img src="${p.url_image}" ${p.discount} class="card-img-top" alt="Imagen del producto.">
        <div class="card-body">
        <hr>
          <h6 class="card-title">${p.name}</h6>
          <p class="card-text">$ ${p.price}</p>
          <p class="card-text">$ ${p.discountTotal}</p>
        </div>
        </div>
      </div>
      `;
      } else {
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
      }
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
    `http://localhost:3000/product/category/${id}`
  );
  const res = await categoriesId.json();
  console.log('resfilterID :>> ', res);
  productsByCategory(res);
};

function productsByCategory(res) {
  productsElement.innerHTML = "";
  res.forEach((p) => {
    if(p.discount !== 0) {
      searchHTML = `
      <div class="col" style="width: 22rem;">
      <div class="card">
      <p class="card-text valor discount"> ${p.discount}%</p>
      <img src="${p.url_image}" ${p.discount} class="card-img-top" alt="Imagen del producto.">
      <div class="card-body">
      <hr>
        <h6 class="card-title">${p.name}</h6>
        <p class="card-text">$ ${p.price}</p>
        <p class="card-text">$ ${p.discountTotal}</p>
      </div>
      </div>
    </div>
    `;
    } else {
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
    }
    productsElement.innerHTML = productsElement.innerHTML + searchHTML;
  });
}

const categorySearch = document.querySelectorAll(".nav-item navbar-nav");

categorySearch.forEach(function (btn) {
  btn.addEventListener("click", function () {
    const selector = `.${this.id}`;
    const allInputs = document.querySelectorAll(selector);

    allInputs.forEach(async function (input) {
      const test = `${input.value}`;
      await consultCategoryById(test);
    });
  });
});

consultProducts();
