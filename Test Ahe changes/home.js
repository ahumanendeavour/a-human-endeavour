document.addEventListener("DOMContentLoaded", () => {
  pickColor();
  loadWhatsNew();
  loadPosts();
});

function loadWhatsNew() {
  fetch("/now/catchup.html")
    .then((res) => res.text())
    .then((html) => {
      document.getElementById("whatsNew").insertAdjacentHTML("beforeend", html);
    })
    .catch(console.error);
}

function loadPosts() {
  fetch("posts.json")
    .then((res) => res.json())
    .then((posts) => {
      if (!posts?.length) return;

      // Preload.
      preloadPostHTML(posts[0].filename);

      // Then use.
      displayMostRecentPost(posts[0]);
      displayAllPosts(posts.slice(1, 4));

      // If it already exists.
      if (typeof createTagFilter === "function") {
        createTagFilter(posts.slice(1, 4));
      }
    })
    .catch(console.error);
}

function preloadPostHTML(url) {
  const link = document.createElement("link");
  link.rel = "preload";
  link.as = "fetch";
  link.href = url;
  link.crossOrigin = "anonymous";
  document.head.appendChild(link);
}

function displayAllPosts(posts) {
  const list = document.getElementById("posts-list");
  list.innerHTML = "";

  posts.forEach((post) => {
    const li = document.createElement("li");
    li.innerHTML = `
        <h4><a href="/${post.filename}">${post.title}</a></h4>
        <h5 class="post-description">${post.description}</h5>
      `;
    list.appendChild(li);
  });
}

function displayMostRecentPost(post) {
  const container = document.getElementById("latest-post");

  fetch(post.filename)
    .then((res) => res.text())
    .then((html) => {
      const temp = document.getElementById("latest-post");
      temp.innerHTML = html;

      const meta = temp.querySelector("#published-by");
      const summary = temp.querySelector(".p-summary");
      const banner = temp.querySelector("#banner");
      const firstPara = temp.querySelector(".e-content p");

      container.innerHTML = `
          <a href="${post.filename}" id="recentPostTitle">
            <h2>${post.title}</h2>
          </a>
          <div class="post-preview">
            ${meta?.outerHTML ?? ""}
            ${summary?.outerHTML ?? ""}
            ${banner?.outerHTML ?? ""}
            ${firstPara?.outerHTML ?? ""}
            <a href="${post.filename}" class="read-more">Read more →</a>
          </div>
        `;
    })
    .catch(() => {
      container.innerHTML = "<p>Error loading article.</p>";
    });
}

function pickColor() {
  const colors = ["#9daff6", "#842020", "#8266d6", "#57a444", "#c17e27"];
  const color = colors[Math.floor(Math.random() * colors.length)];

  ["mostRecent", "contactInfo"].forEach((id) => {
    const el = document.getElementById(id);
    if (el) {
      el.style.borderTopColor = color;
      el.style.borderBottomColor = color;
    }
  });
}
