const products = [
  { name: "Smartphone", price: 9999, category: "electronics", rating: 4.5 },
  { name: "Laptop", price: 45000, category: "electronics", rating: 4.8 },
  { name: "T-shirt", price: 499, category: "clothing", rating: 4.1 },
  { name: "Jeans", price: 1200, category: "clothing", rating: 4.3 },
  { name: "JavaScript Book", price: 599, category: "books", rating: 4.6 },
  { name: "Headphones", price: 1599, category: "electronics", rating: 4.4 },
  { name: "DSA Book", price: 349, category: "books", rating: 4.9 },
  { name: "Jacket", price: 2500, category: "clothing", rating: 4.0 },
];

const productList = document.getElementById("productList");
const categoryFilter = document.getElementById("categoryFilter");
const priceFilter = document.getElementById("priceFilter");
const sortOption = document.getElementById("sortOption");
const searchInput = document.getElementById("searchInput");

function renderProducts(data) {
  productList.innerHTML = "";
  data.forEach(p => {
    const card = document.createElement("div");
    card.classList.add("product-card");

    card.innerHTML = `
      <span class="category-badge">${capitalize(p.category)}</span>
      <h3>${p.name}</h3>
      <p class="price">₹${p.price}</p>
      <p class="rating">⭐ ${p.rating}</p>
    `;
    productList.appendChild(card);
  });
}

function filterAndSort() {
  const category = categoryFilter.value;
  const price = priceFilter.value;
  const sort = sortOption.value;
  const search = searchInput.value.toLowerCase();

  let filtered = products.filter(p => {
    const matchCategory = category === "all" || p.category === category;
    const matchSearch = p.name.toLowerCase().includes(search);
    const matchPrice =
      price === "all" ||
      (price === "low" && p.price < 1000) ||
      (price === "medium" && p.price >= 1000 && p.price <= 5000) ||
      (price === "high" && p.price > 5000);
    return matchCategory && matchSearch && matchPrice;
  });

  if (sort === "priceAsc") {
    filtered.sort((a, b) => a.price - b.price);
  } else if (sort === "priceDesc") {
    filtered.sort((a, b) => b.price - a.price);
  } else if (sort === "ratingDesc") {
    filtered.sort((a, b) => b.rating - a.rating);
  }

  renderProducts(filtered);
}

function capitalize(word) {
  return word.charAt(0).toUpperCase() + word.slice(1);
}

// Event Listeners
categoryFilter.addEventListener("change", filterAndSort);
priceFilter.addEventListener("change", filterAndSort);
sortOption.addEventListener("change", filterAndSort);
searchInput.addEventListener("input", filterAndSort);

// Initial render
renderProducts(products);
