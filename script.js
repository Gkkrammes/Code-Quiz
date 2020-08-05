//Glabal Variables
var startScore = 0; 
var questionIndex = 0;
var highScoreArray = [];

//Body Variables
var header = document.querySelector(".header");
var score = document.getElementById("score");
var submitButton = document.getElementById("submitButton");

// Timer Variable 
var timer = document.getElementById("timer"); 

//Quiz Variables
var quizChallenge = document.getElementById("quizChallenge");
var finalScore = document.getElementById("finalScore");
var highScoreButtons = document.getElementById("highScoreButtons");

//Questions Variables
var quizQuestionHeader = document.getElementById("quizQuestionHeader");
var option1 = document.getElementById("one");
var option2 = document.getElementById("two");
var option3 = document.getElementById("three");
var option4 = document.getElementById("four");
var correct = document.getElementById("correct");
var answerResponse = document.getElementById("answerResponse");

//Final Score Variables
var finalScoreIs = document.getElementById("finalScoreIs");
var quizQuestionPage = document.getElementById("quizQuestionPage");
var questionButton = document.querySelector(".questionButton");

//Initial Form Variables
var initialButton = document.getElementById("initialButton"); 
var initialInput = document.getElementById("initialInput");
var initials = document.getElementById("initials");

//Finish Quiz Variables
var finish = document.getElementById("finish");
var finishButtons = document.getElementById("form-inline");

// Questions Array
var quizQuestions = [ 
    { "quizQuestionHeader" : "Which index number would call the third item in an array?", 
    "one" : "1. 0",
    "two" : "2. 1",
    "three" : "3. 2",
    "four" : "4. 3",
    "correct" : "3. 2",
    },
    { "quizQuestionHeader" : "Which example indicates a line break?",
    "one" : "1. br",
    "two" : "2. break",
    "three" : "3. div class=break",
    "four" : "4. linebreak",
    "correct" : "1. br",
    },
    { "quizQuestionHeader" : "What is the correct HTML for inserting an image?",
    "one" : "1. img alt=_____ src=_____",
    "two" : "2. img src= _____ alt=_____",
    "three" : "3. img href= _____ alt=_____",
    "four" : "4. src= _____ alt=_____",
    "correct" : "2. img src= _____ alt=_____",
    },
    { "quizQuestionHeader" : "Arrays must be enclosed with ________.",
     "one" : "1. commas",
     "two" : "2. square brackets",
     "three" : "3. quotes",
     "four" : "4. parenthesis",
     "correct" : "2. square brackets",
    },
    { "quizQuestionHeader" : "It is a good idea to use a/an ________ to check to see that your site is responsive.",
     "one" : "1. magnifying glass",
     "two" : "2. devops tool",
     "three" : "3. friend's opinion",
     "four" : "4. validation service",
     "correct" : "4. validation service",
    },
  ]
  
//Starting view
function codingQuizChallenge() {
    quizChallenge.style.display = "block"; 
    header.style.display = "block"; 
    quizQuestionPage.style.display = "none";
    finalScore.style.display = "none";   
        //Time at start
    var startScore = 0; 
    timer.textContent = "Time: " + startScore; 
  }

// Quiz begins
function startQuiz() { 
    quizChallenge.style.display = "none"; 
    quizQuestionPage.style.display = "block"; 
        //Timer
    secondsLeft = 100;  
    
      var timerInterval = setInterval(function() { 
        secondsLeft--;
        timer.textContent = "Time: " + secondsLeft;
        if (secondsLeft === 0 || quizQuestions.length === questionIndex) {
          clearInterval(timerInterval);
          viewFinalScore();
        }
      }, 1000);
    }
    
// Questions
function viewQuestions() {
    var q = quizQuestions[questionIndex];

    quizQuestionHeader.innerHTML = q.quizQuestionHeader;
    option1.innerHTML = q.one;
    option1.setAttribute("data-answer", q.one);
    option2.innerHTML = q.two;
    option2.setAttribute("data-answer", q.two);
    option3.innerHTML = q.three;
    option3.setAttribute("data-answer", q.three);
    option4.innerHTML = q.four;
    option4.setAttribute("data-answer", q.four);
}

// Event listeners for questions
viewQuestions();
option1.addEventListener("click", function (event) {
  checkAnswer(event);
})
option2.addEventListener("click", function (event) {
  checkAnswer(event);
})
option3.addEventListener("click", function (event) {
  checkAnswer(event);
})
option4.addEventListener("click", function (event) {
  checkAnswer(event);
})

// Check answers
function checkAnswer(event) {
    event.preventDefault();
  
    var answer = event.currentTarget.dataset.answer;
    var correctAnswer = null;
  
    if (quizQuestions[questionIndex].correct === answer) {
        correctAnswer = answer;
    }
    if (answer === correctAnswer) {
    answerResponse.textContent = "Correct!"; 
    score++;
    } else {
    answerResponse.textContent = "Incorrect!"; 
        secondsLeft -= 5
        if (secondsLeft < 0) {
            secondsLeft = 0;
        }
    }
    if (quizQuestions.length === questionIndex+1) {
      viewFinalScore(); 
      return; 
    }
    questionIndex++;
    viewQuestions();
  }

// Finish page and final score
function viewFinalScore() { 
    quizQuestionPage.style.display = "none"; 
    highScoreButtons.style.display = "none"; 
    finalScore.style.display = "block"; 
    finalScoreIs.style.display = "block" 
    initials.style.display = "block" 
    initialButton.style.display = "block" 
    initialInput.style.display = "block" 
  
      finalScoreIs.textContent = "Your final score is " + score + " and your time remaining is " + secondsLeft + "!";
      initialButton.textContent = "Submit"; 
      initials.textContent = "Enter Your Initials: "; 
  } 

// View high scores
function viewHighScore() {
    header.style.display = "none"; 
    finish.style.display = "none"; 
    finalScoreIs.style.display = "none"; 
    initials.style.display = "none"; 
    initialButton.style.display = "none"; 
    initialInput.style.display = "none"; 
    highScoreButtons.style.display = "block"; 
  
    var getInitials = document.getElementById("initialInput").value;  

    var highScoreArray = JSON.parse(localStorage.getItem("highScore")) || [];
  
    var localStorageArray = { score: score, time: secondsLeft, initials: getInitials };
    highScoreArray.push(localStorageArray);
    localStorage.setItem("highScore", JSON.stringify(highScoreArray)); 

    var highScore = getInitials + " SCORE: " + score + " TIME: " + secondsLeft;
    
    $("#highScoreList").append(highScore);
  
}

function resetVariables() {
    startScore = 0; 
    questionIndex = 0;
  }

//Event Listeners
submitButton.addEventListener("click", function() { 
    startQuiz()
  })
   
initialButton.addEventListener("click", function() { 
    viewHighScore();
  }) 
  
clearHighScore.addEventListener("click", function() {
    localStorage.clear();
  })
  
goBack.addEventListener("click", function() { 
  $("#highScoreList").empty() 
  $("#initialInput").val('')
  resetVariables()
  codingQuizChallenge();
    
  })

// Restart 
codingQuizChallenge(); 



