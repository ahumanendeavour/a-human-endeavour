// Function to display posts
function displayAllPosts(posts) {
  const postsListElement = document.getElementById("posts-list");
  postsListElement.innerHTML = ''; // Clear the list before rendering

  posts.forEach(post => {
    const postElement = document.createElement("li");
    postElement.innerHTML = `
      <h3><a href="${post.filename}">${post.title}</a></h3>
      <p>Tags: ${post.tags.join(", ")}</p>
    `;
    postsListElement.appendChild(postElement);
  });
}

// Function to get unique tags from the posts array
function getTags(posts) {
  const allTags = posts.flatMap(post => post.tags); // Flatten all tags
  return [...new Set(allTags)]; // Remove duplicates
}

// Function to handle tag selection
function handleTagFilter(event, posts) {
  const selectedTag = event.target.value;

  if (selectedTag === 'all') {
    displayAllPosts(posts); // Display all posts if 'all' is selected
  } else {
    const filteredPosts = posts.filter(post => post.tags.includes(selectedTag));
    displayAllPosts(filteredPosts); // Display filtered posts
  }
}

// Function to create the tag filter dropdown
function createTagFilter(posts) {
  const tagFilterElement = document.getElementById("tag-filter");

  const tags = getTags(posts);
  const defaultOption = document.createElement("option");
  defaultOption.value = 'all';
  defaultOption.textContent = 'Tags';
  tagFilterElement.appendChild(defaultOption);

  tags.forEach(tag => {
    const option = document.createElement("option");
    option.value = tag;
    option.textContent = tag;
    tagFilterElement.appendChild(option);
  });

  // Add event listener to filter posts when a tag is selected
  tagFilterElement.addEventListener('change', (event) => handleTagFilter(event, posts));
}

// Fetch the JSON data and display all posts with filtering
window.onload = () => {
  fetch('posts.json')
    .then(response => response.json())
    .then(posts => {
      displayAllPosts(posts); // Display all posts initially
      createTagFilter(posts); // Create the tag filter dropdown
    })
    .catch(error => console.error('Error loading the posts:', error));
};



//TEMPLATE FOR NEW POSTS IN THE JSON FILE
//  {
//    "title": "testpost 2",
//      "filename": "/Personal Site/posts/2025-03-16post.html",
//    "tags": ["tag2", "tag3"]
//  },