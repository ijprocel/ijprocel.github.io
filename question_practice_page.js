document.getElementById("continue").addEventListener("click", displayInstructionPage);

function displayInstructionPage(){
        var textBox = document.getElementById("textbox");
        textBox.innerHTML = "";

        var paragraphs = [
                "You will be shown a series of commmon interview questions. For each one, you will have  30 seconds to consider your response "+
                "and then you will have 3 minutes to give your response.",

                "After answering the question, you will be asked to self-evaluate your response as <b>Excellent</b>, <b>Good</b>, or <b>Fair</b>. "+
                "<i>Tip: record your response on a microphone and play it back to yourself afterwards!</i>",

                "If you rate your response as <b>Excellent</b>, the question will not be shown to you again.",

                "If you rate your response as <b>Good</b>, you will be less likely to see the question again.",

                "If you rate your response as <b>Fair</b>, you will be more likely to see the question again.",

                "Click <b>Continue</b> to try the first question!"
        ];

        for (var index=0; index < paragraphs.length; index++){
               var par = document.createElement("P");
               par.innerHTML = paragraphs[index];
               textBox.appendChild(par);
        }
        document.getElementById("continue").removeEventListener("click", displayInstructionPage);
        document.getElementById("continue").addEventListener("click", reviewNextQuestion);
}

var questions = ["Tell me about yourself/give an elevator pitch.", "Tell me about a time that you failed and how you learned from it.", 
"Tell me about your favorite classes and how they'll prepare you for this position.", "Tell me about a great success that you had.", 
"Tell me about some challenges you faced while working on a team and how you overcame them. ", "What would you like your job title to be? What responsibilities would you like to have?",
"Why do you want to work for (insert company)?"];

var fair = [];
var good = [];
var excellent = [];

var numQuestions = questions.length;

fyShuffle(questions);
var currentQ;
var onInterval;

function fyShuffle(arr){
        for (var i = arr.length-1; i > 0; i--){
                var j = Math.floor(Math.random() * (i+1));
                var temp = arr[j];
                arr[j] = arr[i];
                arr[i] = temp;
        }
}

function reviewNextQuestion(){
        var textBox = document.getElementById("textbox");
        getNextQuestion();
        
        var text = "<p>Your question is:</p><p><b>" + currentQ+ "</b></p>";
        textBox.innerHTML = text;

        document.getElementById("timerParent").style.height = "60px";
        document.getElementById("PBbackground").style.height = "40px";
        document.getElementById("timer").innerText = "0:30";

        var pb = document.getElementById("progressBar");
        pb.style.width = "100%";
        pb.setAttribute("widthInPercent", "100%");
        onInterval = setInterval(function(){decProgBar(30, answerNextQuestion);}, 1000);

        var btnDiv = document.getElementById("buttons");
        btnDiv.innerHTML = "";

        var endReview = document.createElement("BUTTON");
        endReview.addEventListener("click", function(){clearInterval(onInterval);answerNextQuestion();});
        endReview.innerText = "Answer Question";
        btnDiv.appendChild(endReview);
}

function getNextQuestion(){
        if (numQuestions > 0){
                currentQ = questions.shift();
                numQuestions--;
                return;
        }
        var randInt = Math.floor(Math.random() * 3);
        if (randInt == 2){
                window.alert("Good");
                if (good.length != 0){
                        currentQ = good.shift();
                        return;
                }
                currentQ = fair.shift();
        }
        else {
                window.alert("Fair");
                if (fair.length != 0){
                        currentQ = fair.shift();
                        return;
                }
                currentQ = good.shift();
        }
}

function answerNextQuestion(){
        var textBox = document.getElementById("textbox");
        textBox.innerHTML = "<p>Answering...</p><p><b>" + currentQ+ "</b></p>" ;

        document.getElementById("timer").innerText = "3:00";

        var pb = document.getElementById("progressBar");
        pb.style.width = "100%";
        pb.setAttribute("widthInPercent", "100%");
        onInterval = setInterval(function(){decProgBar(180, rateResponse);}, 1000);

        var btnDiv = document.getElementById("buttons");
        btnDiv.innerHTML = "";

        var doneAnswering = document.createElement("BUTTON");
        doneAnswering.addEventListener("click", function(){clearInterval(onInterval);rateResponse();});
        doneAnswering.innerText = "Finished Answering";
        btnDiv.appendChild(doneAnswering);        
}

function rateResponse(){
        var textBox = document.getElementById("textbox");        
        var text = "<p>How would you rate your response to this question?<\p>";
        textBox.innerHTML = text;

        document.getElementById("timerParent").style.height = "0px";
        document.getElementById("PBbackground").style.height = "0px";
        document.getElementById("timer").innerText = "";

        
        var btnDiv = document.getElementById("buttons");
        btnDiv.innerHTML = "";

        var functions = [function(){rateQ(fair)}, function(){rateQ(good)}, function(){rateQ(excellent)}];
        var ratings = ["Fair", "Good", "Excellent"];
        for (let index=0; index < 3; index++){
                let btn = document.createElement("BUTTON");
                btn.addEventListener("click", functions[index]);
                btn.innerText = ratings[index];
                btnDiv.appendChild(btn);
        }
}

function rateQ(listOfQs){
        listOfQs.push(currentQ);
        readyForNext();
}

function readyForNext(){
        var textBox = document.getElementById("textbox");        
        var text = makeULLists(fair, "Fair") + makeULLists(good, "Good") + makeULLists(excellent, "Excellent");
        
        textBox.innerHTML = text;
        
        var btnDiv = document.getElementById("buttons");
        btnDiv.innerHTML = "";

        if (questions.length != 0 || fair.length != 0 || good.length != 0){
                var readyBtn = document.createElement("BUTTON");
                readyBtn.addEventListener("click", reviewNextQuestion);
                readyBtn.innerText = "Next Question";
                btnDiv.appendChild(readyBtn);
        }
        else {
                window.alert("Done!");
        }
}

function makeULLists(qs, name){
        var innerHTML = "<p><b>" + name + "</b>: <ul>";
        for (var index=0; index < qs.length; index++){
                innerHTML += "<li>" + qs[index] + "</li>";
        }
        innerHTML += "</ul></p>";
        return innerHTML;
}

function decProgBar(numSeconds, func){
        var pb = document.getElementById("progressBar");
        
        var currentWidth = pb.getAttribute("widthinpercent");
        var increment = 100.0 / numSeconds;
        var newWidth = parseFloat(currentWidth) - increment;
        
        pb.style.width = newWidth + "%";
        pb.setAttribute("widthinpercent", newWidth);
        
        var timer = document.getElementById("timer");
        var timeString = timer.innerHTML.split(":");
        var min = parseInt(timeString[0]);
        var sec = parseInt(timeString[1]);
        sec -=1;

        if (sec == -1){
            min -=1;
            sec = 59;
        }

        sec = sec.toString().padStart(2, '0');
        if (min != -1){
            timer.innerHTML = min + ":" + sec;
        }

        if (newWidth <= 0){
            clearInterval(onInterval);
            pb.style.width = "0%";
            func();
        }
}