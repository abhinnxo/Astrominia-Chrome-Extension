const API_KEY = "YOUR_API_KEY_HERE"
// get your API key from https://api.nasa.gov/

// New tab opens
window.addEventListener("load", function () {
  //checking is the user is connected to the internet and show content respectively
  if (navigator.onLine) {
    // NASA API
    fetch(
      `https://api.nasa.gov/planetary/apod?api_key=YOUR_API_KEY_HERE`
    )
      .then((response) => response.json())
      .then((data) => {
        //TODO: make available for video when avaliable
        document.body.style.backgroundImage = `url("${data.url}")`;
        if (data.copyright != undefined)
          document.querySelector(
            ".author"
          ).innerHTML = `&copy ${data.copyright}`;
        if (data.title != undefined)
          document.querySelector(".title").innerHTML = `${data.title}`;
      })
      .catch((err) => console.log("Something's wrong with NASA API"));

    // Quote API
      fetch("https://api.quotable.io/random")
      .then((response) => response.json())
      .then((data) => {
        if (data.content != undefined && data.content.length <= 215) {
          document.querySelector(".quote").innerHTML = `${data.content}`;
          document.querySelector(".qauthor").innerHTML = `- ${data.author}`;
          localStorage['myQuote'] = data.content;
          localStorage['myAuthor'] = data.author;
        } else {
          document.querySelector(".quote").innerHTML = localStorage['myQuote'];
          document.querySelector(".qauthor").innerHTML = "- " + localStorage['myAuthor'];
        }
      })
      .catch((err) => console.log("Something's wrong with Quote API"));
      
    // Time
    var myVar = setInterval(myTimer, 1000);

    function myTimer() {
      var d = new Date();
      var hour = String(d.getHours());
      var minute = String(d.getMinutes());

      if (minute.length == 1)
        document.querySelector(".time").innerHTML = `${hour}:0${minute}`;
      else document.querySelector(".time").innerHTML = `${hour}:${minute}`;
    }
  } else {
    //Time
    var myVar = setInterval(myTimer, 1000);
    function myTimer() {
      var localTime = new Date().toLocaleTimeString();
      document.querySelector(".time").innerHTML = `${localTime}`;
      document.querySelector(".time").style.color = `black`;
    }
    // Background Image
    document.body.style.backgroundImage = `url("./images/offlineBGC.jpg")`;
  }
});
