// Reset Posts

let allPosts = [];
let activeCategory = "all";
let searchQuery = "";

// Default tags

function normalizeTags(post) {
  if (!post.tags || post.tags.length === 0) return [];

  return post.tags.flatMap((tagString) =>
    tagString
      .split(",")
      .map((tag) => tag.trim().toLowerCase())
      .filter(Boolean),
  );
}

// Display all pots

function displayAllPosts(posts) {
  const postsListElement = document.getElementById("posts-list");
  postsListElement.innerHTML = "";

  posts.forEach((post) => {
    const postElement = document.createElement("li");

    postElement.innerHTML = `
      <h4>${post.pubDate} - <a href="/${post.filename}">${post.title}</a></h4>
    `;

    postsListElement.appendChild(postElement);
  });
}

// Categories

function getCategories(posts) {
  const allCategories = posts.flatMap((post) => post.category);
  return [...new Set(allCategories)];
}

function handleCategoryFilter(event) {
  activeCategory = event.target.value;
  applyFilters();
}

function createTagFilter(posts) {
  const tagFilterElement = document.getElementById("tag-filter");

  const categories = getCategories(posts);

  const defaultOption = document.createElement("option");
  defaultOption.value = "all";
  defaultOption.textContent = "[Sort by category]";
  tagFilterElement.appendChild(defaultOption);

  categories.forEach((category) => {
    const option = document.createElement("option");
    option.value = category;
    option.textContent = category;
    tagFilterElement.appendChild(option);
  });

  tagFilterElement.addEventListener("change", handleCategoryFilter);
}

// Search

function setupSearch() {
  const searchInput = document.getElementById("search");

  searchInput.addEventListener("input", (event) => {
    searchQuery = event.target.value;
    applyFilters();
  });
}

// Apply ALL filters

function applyFilters() {
  let filteredPosts = allPosts;

  // Category filter
  if (activeCategory !== "all") {
    filteredPosts = filteredPosts.filter((post) =>
      post.category.includes(activeCategory),
    );
  }

  // Tag search filter
  if (searchQuery.trim() !== "") {
    const query = searchQuery.toLowerCase();

    filteredPosts = filteredPosts.filter((post) => {
      const tags = normalizeTags(post);
      return tags.some((tag) => tag.includes(query));
    });
  }

  displayAllPosts(filteredPosts);
}

// Init

window.onload = () => {
  fetch("/posts.json")
    .then((response) => response.json())
    .then((posts) => {
      allPosts = posts;
      displayAllPosts(allPosts);
      createTagFilter(allPosts);
      setupSearch();
    })
    .catch((error) => console.error("Error loading the posts:", error));
};
