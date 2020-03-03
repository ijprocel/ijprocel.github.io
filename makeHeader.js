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

/*menuDiv.style.position = "relative";
menuDiv.style.top = 0;
menuDiv.style.left = 0;
menuDiv.style.height = "10%";
menuDiv.style.width = "100%";*/

menuDiv.appendChild(menu);