// Function to display the most recent post (including the full article)
function displayMostRecentPost(post) {
  const recentPostElement = document.getElementById("recent-post");

  // Fetch the full content of the post's HTML file
  fetch(post.filename)
    .then(response => response.text())
    .then(html => {
      // Create a temporary DOM element to parse the HTML
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = html;

      // Extract the article content
      const articleContent = tempDiv.querySelector('article');

      // Inject the title, article content, and tags into the homepage
      recentPostElement.innerHTML = `
        
        ${articleContent ? articleContent.outerHTML : 'No article content found.'}
        <p>Tags: ${post.tags.join(", ")}</p>
      `;
    })
    .catch(error => {
      console.error('Error fetching the post content:', error);
      recentPostElement.innerHTML = '<p>Sorry, there was an error loading the article.</p>';
    });
}

// Fetch the JSON data and display the most recent post
window.onload = () => {
  fetch('posts.json')
    .then(response => response.json())
    .then(posts => {
      const recentPost = posts[0]; // Most recent post is the first in the array
      displayMostRecentPost(recentPost); // Display the entire content of the most recent post
    })
    .catch(error => console.error('Error loading the posts:', error));
};
