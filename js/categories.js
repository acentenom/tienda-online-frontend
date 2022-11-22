const categoriesElement = document.querySelector(".navbar-nav");

const consultCategories = async () => {
  const allCategories = await fetch("http://localhost:3000/category");
  const res = await allCategories.json();
  categoriesItem(res);
};

function categoriesItem(res) {
  res.forEach((p) => {
    const categoryHTML = `
    <li class="nav-item">
    <a class="nav-link" onClick="consultCategoryById(${p.id})" href="#">${p.name}</a>
    </li>
  `;
    categoriesElement.innerHTML = categoriesElement.innerHTML + categoryHTML;
  });
}

consultCategories();




{/* <li class="nav-item">
<a class="nav-link active" onClick="consultCategoryById(${p.id})" id='aLink' aria-current="page" href="#">${p.name}</a>
</li> */}

{/* <li class="nav-item">
    <a class="nav-link" onClick="consultCategoryById(${p.id})" href="#">${p.name}</a>
    </li> */}