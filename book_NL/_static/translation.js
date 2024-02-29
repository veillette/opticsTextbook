
// Assuming you have a reference to the button element
var button = document.createElement("button");
button.classList.add("btn", "btn-sm", "navbar-btn");


button.onclick = () => {
  var currentUrl         = window.location.href;
  var urlSegments        = currentUrl.split('/');
  var checkLang          = urlSegments.indexOf('nl');
  if ( checkLang !== -1 ){
    // if 'nl' is contained in the url, set 'en' as new language
    currentLanguage = "en";
    changeLanguage("en");
  } else {
    // if 'nl' is not contained in the url, 'en' is assumed as current language and switched to 'nl'
    currentLanguage = "nl";
    changeLanguage("nl");  
  }
  console.log("current language: "+currentLanguage);
}

document.addEventListener("DOMContentLoaded", () => {
  navbar = document.getElementsByClassName("article-header-buttons");
  navbar[0].prepend(button);

  var currentUrl         = window.location.href;
  var urlSegments        = currentUrl.split('/');
  var checkLang          = urlSegments.indexOf('nl');
  if ( checkLang !== -1 ){
    updateButtonContent("nl")
  } else {
    updateButtonContent("en")
  }
});

// Append button to the document body or any other container
document.body.appendChild(button);

function updateButtonContent(lang) {
  button.innerHTML = ""; // Clear existing content

  var currentUrl         = window.location.href;

  var urlParts           = currentUrl.split("tn2421")[1].split("/");
  //var urlParts           = currentUrl.split("html")[1].split("/");    // use this to build the book locally

  var slashNumber        = urlParts.length - 1

  // Create flag element
  var flag = document.createElement("img");
  var path = ""
  var dot_dot_slash = "../"

  if ( lang==="en" ){
    //flag.src = "https://upload.wikimedia.org/wikipedia/commons/thumb/2/20/Flag_of_the_Netherlands.svg/255px-Flag_of_the_Netherlands.svg.png";
    for ( i=0; i<slashNumber-1; i++ ){
      path = path + dot_dot_slash
    }
    path = path + "_static/img/nl.png"
    flag.src = path
    console.log("changed the flag to NL");
  } else {
    //flag.src = "https://upload.wikimedia.org/wikipedia/en/thumb/a/ae/Flag_of_the_United_Kingdom.svg/1200px-Flag_of_the_United_Kingdom.svg.png";
    for ( i=0; i<slashNumber-1; i++ ){
      path = path + dot_dot_slash
    }
    path = path + "_static/img/en.png"
    flag.src = path
    console.log("changed the flag to EN");
  }

  // button style
  flag.classList.add("flag");
  flag.style.width    = "20px";
  flag.style.height   = "15px";
  flag.style.borderRadius = "3px";
  flag.style.display  = "block";
  flag.style.margin   = "auto";

  // Append flag to the button
  button.appendChild(flag);
}

// Function to change the language
function changeLanguage(language) {
  var currentUrl         = window.location.href;
  var urlSegments        = currentUrl.split('/');

  // this is for local book
  //var htmlFolderIndex    = urlSegments.indexOf('html');   // here it is assumed that the book is contained inside a folder named 'html'
                                                             // as default for jupyter-books.

  // this is for online book
  var htmlFolderIndex    = urlSegments.indexOf('tn2421');   // here it is assumed that the book is contained inside a folder named 'html'
                                                            // as default for jupyter-books.

  var lastSlashIndex     = currentUrl.lastIndexOf('/');
  
  if (lastSlashIndex !== -1) {
    if (htmlFolderIndex !== -1) {
      var isNlAlreadyPresent = urlSegments[htmlFolderIndex + 1] === 'nl';

      if (language === 'nl' && !isNlAlreadyPresent) {
        // Add "/nl/" after "html"
        urlSegments.splice(htmlFolderIndex + 1, 0, 'nl');
      } else if (language !== 'nl' && isNlAlreadyPresent) {
        // Remove "/nl/"
        urlSegments.splice(htmlFolderIndex + 1, 1);
      }

      var modifiedUrl = urlSegments.join('/');
      window.location.href = modifiedUrl;
      console.log("Modified the URL to " + modifiedUrl);
    } else {
      console.log(htmlFolderIndex + " not found in the URL");
    }
  } else {
    console.log("'/' not found in the URL");
  }
}