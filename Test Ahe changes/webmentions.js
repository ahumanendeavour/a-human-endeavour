(function () {
  const mentionsContainer = document.getElementById("webmentions");
  if (!mentionsContainer) return;

  // Set canonical URL as default for webmentions.
  function getCanonicalUrl() {
    const canonicalTag = document.querySelector(
      'link[rel="canonical"]'
    );

    let url = canonicalTag?.href || window.location.href;

    // Remove hash.
    url = url.split("#")[0];

    // Normalize trailing slash (except homepage).
    const origin = window.location.origin;
    if (url.endsWith("/") && url !== origin + "/") {
      url = url.slice(0, -1);
    }

    return url;
  }

  const targetUrl = encodeURIComponent(getCanonicalUrl());
  const apiUrl = `https://webmention.io/api/mentions.jf2?target=${targetUrl}`;

  function escapeHTML(str = "") {
    return str.replace(
      /[&<>"']/g,
      (m) =>
        ({
          "&": "&amp;",
          "<": "&lt;",
          ">": "&gt;",
          '"': "&quot;",
          "'": "&#039;",
        }[m])
    );
  }

  fetch(apiUrl)
    .then((res) => {
      if (!res.ok) throw new Error("Failed to fetch mentions");
      return res.json();
    })
    .then((data) => {
      const mentions = data.children || [];

      if (mentions.length === 0) {
        mentionsContainer.innerHTML =
          "<p>No comments or mentions yet.</p>";
        return;
      }

      mentionsContainer.innerHTML = "";

      mentions.sort((a, b) => {
        const da = new Date(a.published || a["wm-received"]);
        const db = new Date(b.published || b["wm-received"]);
        return db - da;
      });

      mentions.forEach((item) => {
        const type = item["wm-property"];

        const authorName = escapeHTML(item.author?.name || "Unknown");
        const authorUrl = item.author?.url || "";
        const authorPhoto = item.author?.photo || "";

        const content = escapeHTML(
          item.content?.text || item.content?.html || ""
        );

        const link = item.url || "";
        const published = item.published || item["wm-received"];
        const dateObj = published ? new Date(published) : null;

        const el = document.createElement("div");
        el.className = "webmention";

        const author = `<div style="display:inline-flex; margin-bottom:18px;">
          ${
            authorPhoto
              ? `<img src="${authorPhoto}" width="24" height="24" style="border-radius:50%; vertical-align:middle;">`
              : ""
          }
          ${
            authorUrl
              ? `<a href="${authorUrl}" target="_blank">${authorName}</a>`
              : authorName
          }</div>
        `;

        const time = dateObj
          ? `<time style=color:var(--text-colour);font-size:small; datetime="${dateObj.toISOString()}" >${dateObj.toLocaleString()}</time>`
          : "";

        if (type === "like-of") {
          el.innerHTML = `${author} <span style=color:var(--text-colour);>❤️ liked this</span> ${time}`;
        } else if (type === "repost-of") {
          el.innerHTML = `${author} <span style=color:var(--text-colour);>🔁 reposted this</span> ${time}`;
        } else if (type === "in-reply-to") {
          el.innerHTML = `
          
            <div style=color:var(--text-colour);>${author}</div>
            <div style=color:var(--text-colour);>${content || "<em style=color:var(--text-colour);>(no content)</em>"}</div>
            <div>
              <a href="${link}" target="_blank">↗ View</a>
              ${time}<>
            </div>
          `;
        } else {
          el.innerHTML = `
            ${author} <span style=color:var(--text-colour);>mentioned this</span>
            <a href="${link}" target="_blank">↗</a>
            ${time}
          `;
        }

        mentionsContainer.appendChild(el);
      });
    })
    .catch((err) => {
      mentionsContainer.innerHTML =
        "<p>Error loading webmentions.</p>";
      console.error(err);
    });
})();

