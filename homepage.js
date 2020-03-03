var pics = document.getElementsByTagName("img");
var citationDiv = document.getElementById("citation");
const lastIndex = pics.length - 1;

var picSizes = {heights:[], widths:[]};
for (var i = 0; i <= lastIndex; i++){
    picSizes.heights.push(pics[i].height);
    picSizes.widths.push(pics[i].width);
    pics[i].style.height = 0 + "%";
    pics[i].style.width = 0 + "%";
}

var citations = ["Feng Yu, https://www.shutterstock.com/g/devonyu",
                 "Keith Bell, https://www.shutterstock.com/g/mybaitshop",
                 "Jaromir Urbanek, https://www.shutterstock.com/g/JaromirUrbanek",
                 "GaudiLab, https://www.shutterstock.com/g/GaudiLab",
                 "TaLaNoVa, https://www.shutterstock.com/g/TaLaNoVa",
                 "iQoncept, https://www.shutterstock.com/g/iqoncept"];

console.log(picSizes);

pics[0].style.width = 100 + "%";
pics[0].style.height = 100 + "%";
citationDiv.innerText = citations[0];
var currentPic = 1;
var prevPic = 0;

function nextPic(){
    pics[prevPic].style.height = 0 + "%";
    pics[prevPic].style.width = 0 + "%";
    
    pics[currentPic].style.top = 0;
    pics[currentPic].style.left = 0;
    pics[currentPic].style.width = 100 + "%";
    pics[currentPic].style.height = 100 + "%";
    citationDiv.innerText = citations[currentPic];

    prevPic = currentPic;
    if (++currentPic > lastIndex){currentPic = 0};
}

function goBack(){
    currentPic = prevPic;
    if (--prevPic < 0){prevPic = lastIndex};

    pics[currentPic].style.height = 0 + "%";
    pics[currentPic].style.width = 0 + "%";
    
    pics[prevPic].style.top = 0;
    pics[prevPic].style.left = 0;
    pics[prevPic].style.width = 100 + "%";
    pics[prevPic].style.height = 100 + "%";
}

var goToNextPic = document.getElementById("nextImg");
goToNextPic.addEventListener("click", nextPic);

var goToPrevPic = document.getElementById("prevImg");
goToPrevPic.addEventListener("click", goBack);

onInterval = setInterval(nextPic, 10000);


document.getElementById("postSubmit").addEventListener("click", function(){makePostRequest(); event.preventDefault();});
function makePostRequest(){
    var url = "http://httpbin.org/post";
    var req = new XMLHttpRequest();
    req.open("POST", url, true);
    req.setRequestHeader('accept', 'application/json');
    req.addEventListener('load', function(){
        if (req.status >= 200 && req.status < 400){
            var resp = JSON.parse(req.responseText);
            var data = resp.data;

            window.alert(data);
        }
    });

    req.send(document.getElementById("postBody").value);
}