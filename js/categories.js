const categoriesElement = document.querySelector(".navbar-nav");

const consultCategories = async () => {
  const allCategories = await fetch("http://localhost:3001/category");
  const res = await allCategories.json();
  categoriesItem(res);
};

function categoriesItem(res) {
  res.forEach((p) => {
    const categoryHTML = `
    <li class="nav-item">
    <button class="nav-link active" onClick="consultCategoryById(${p.id})" href="" id='aLink'>${p.name}</button>
    </li>
  `;
    categoriesElement.innerHTML = categoriesElement.innerHTML + categoryHTML;
  });
}

consultCategories();
