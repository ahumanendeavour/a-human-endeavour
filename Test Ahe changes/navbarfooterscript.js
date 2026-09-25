//Navbar HTML
const navbarHTML = `
    
      <a href="../index.html" style="color:black; text-decoration:none;">
        <h1 id="sitetitle">
          <span id="typewriter-text"></span><span class="cursor">_</span>
        </h1>
      </a>
      <ul>
        <li><a href="../">[home]</a></li>
        <li><a href="/about">[about]</a></li>
        <li><a href="/all-posts">[posts]</a></li>
        <li><a href="/scrapbook">[scrapbook]</a></li>
      </ul>
  `;

//Footer HTML
const footerContent = `
    <h6>
      <small>
        Created on 17/03/2025. Updated on 01/07/2026. &copy; 2026 ahumanendeavour.<a href="/guestbook"><img src="/resources/henry small.png" style="display:inline-block; float:right; height:30px; width:30px;"></a><br><a href="https://xn--sr8hvo.ws/previous">←</a>
An <a href="https://xn--sr8hvo.ws">IndieWeb Webring</a> 🕸💍
<a href="https://xn--sr8hvo.ws/next">→</a>
        
    </small>
    </h6>
    
  `;

document.addEventListener("DOMContentLoaded", function () {
  const navbarElement = document.getElementsByTagName("nav")[0];
  if (navbarElement) {
    navbarElement.innerHTML = navbarHTML;
    typeWriter(); // Start after navbar is added
  }

  const footerElement = document.getElementsByTagName("footer")[0];
  if (footerElement) {
    footerElement.innerHTML = footerContent;
  }
});

// Typewriter effect with cursor
let i = 0;
const txt = "[a human endeavour]";
const speed = 90;

function typeWriter() {
  const textEl = document.getElementById("typewriter-text");
  if (i < txt.length) {
    textEl.innerHTML += txt.charAt(i);
    i++;
    setTimeout(typeWriter, speed);
  }
}
