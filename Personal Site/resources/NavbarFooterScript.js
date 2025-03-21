const navbarHTML = `
    <nav>
    
    <a href="../index.html" style="color:black; text-decoration:none;"><h1 id="sitetitle">[a human endeavour]</h1></a>
      <p id="intro">Hi, I'm Dan. I write about the balance between day-to-day life, and being creative.<br><br><img href="Personal Site/images/Update1.gif"></img> NOW-<br>Currently preparing for a play, as well as a major audition.</p>
        <ul>
            <li><a href="../index.html">home</a></li>
            <li><a href="../about.html">about</a></li>
            <li><a href="../all-posts.html">posts</a></li>
            <li><a href="../thissite.html">this site</a></li>
            
        </ul>
    </nav>
`;

const footerHTML = `
  <footer>
    <p>Created on 17/03/2025. Updated on 21/03/2025. <img src="images/Henry small.gif" style="display:inline-block; float:right; height:50px;"><br><h6><small>&copy; 2025 ahumanendeavour. All Rights Reserved. </small> </h6></p>
  </footer>
`;

//Darkmode button
//<li><button id="darkmodebutton" onclick="myFunction()" style-"border:none;"><img src="/Personal Site/images/dark-mode-icon-size_32.png" style="max-width:50px; border:none;"></li>

// script.js (inserting navbar and footer)

document.addEventListener("DOMContentLoaded", function() {
    // Insert navbar
    const navbarElement = document.getElementById("navbar");
    if (navbarElement) {
      navbarElement.innerHTML = navbarHTML;
    }
  
    // Insert footer
    const footerElement = document.getElementById("footer");
    if (footerElement) {
      footerElement.innerHTML = footerHTML;
    }
  });



// Function to toggle between light mode and dark mode stylesheets
function myFunction() {
  var stylesheet = document.getElementById('stylesheet');
  
  // Check which stylesheet is currently applied and toggle
  if (stylesheet.getAttribute('href') === '/Personal Site/light-mode.css') {
      // Switch to dark mode stylesheet
      stylesheet.setAttribute('href', '/Personal Site/dark-mode.css');
      localStorage.setItem('mode', 'dark');  // Save mode preference
  } else {
      // Switch to light mode stylesheet
      stylesheet.setAttribute('href', '/Personal Site/light-mode.css');
      localStorage.setItem('mode', 'light');  // Save mode preference
  }
}

// On page load, check for stored mode and apply the correct stylesheet
window.addEventListener('load', function() {
  var mode = localStorage.getItem('mode');
  var stylesheet = document.getElementById('stylesheet');
  
  // Apply the saved mode preference on page load
  if (mode === 'dark') {
      stylesheet.setAttribute('href', '/Personal Site/dark-mode.css');
  } else {
      stylesheet.setAttribute('href', '/Personal Site/light-mode.css');
  }
});
  
