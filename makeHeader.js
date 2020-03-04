//This script runs when each page is loaded. It creates the horizontal menu used for site navigation at the top of each page.

var menu = document.createElement("h4");

var hyperlinks = ["index.html", "question_practice_page.html", "starMethod.html", "coverLetterHelp.html"];
var pages = ["Home", "Practice Interview Questions", "STAR Method", "Cover Letter Tips"];

for (var i = 0; i < pages.length; i++){
        var link = document.createElement("a");
        link.setAttribute("href", hyperlinks[i]);
        link.text = pages[i];
        link.style.paddingRight = "40px";
        menu.appendChild(link);
}

var menuDiv = document.getElementById("menu");

menuDiv.appendChild(menu);