const categoriesElement = document.querySelector(".navbar-nav");

const consultCategories = async () => {
  const allCategories = await fetch("https://tienda-online-node.herokuapp.com/category");
  const res = await allCategories.json();
  categoriesItem(res);
};

function categoriesItem(res) {
  res.forEach((p) => {
    const categoryHTML = `
    <li class="nav-item">
			<a class="nav-link active" onClick="consultCategoryById(${p.id})" id='aLink' aria-current="page" href="#">${p.name}</a>
		</li>
  `;
    categoriesElement.innerHTML = categoriesElement.innerHTML + categoryHTML;
  });
}

consultCategories();
