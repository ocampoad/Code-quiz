const containerEl = $(".container");
const btnContainer = $("#answerButtons")

// hide the other containers at the start of the quiz
$("#showQuiz").hide();
$('#showTimer').hide();
$('#hideHighScores').hide();
$('#hideHighScoresList').hide();

let timeStart = 30; // amount of time user has to finish quiz
let questionNum = 0; // start of index for questions
let scoreCounter = 0; // number of questions correct

const lastScore = JSON.parse(localStorage.getItem("HighScores"));

// list/ array of questions, possible answers, and actual answers
const questionBank = [
    'Which HTML element is used to specify a header for a document or section?',
    'Which HTML attribute specifies an alternate text for an image, if the image cannot be displayed?',
    "How do you select elements with class name 'test'?",
    'How does a FOR loop start?',
    'With jQuery, look at the following selector: $("div.intro"). What does it select?'
];

const answerBank = {
    0: ['Hypertext Machine language', "Hypertext and links markup language", "Hypertext Markup Language", "Hightext machine language"], // Hypertext Machine language
    1: ["src", "alt", "title", "longdesc"], // alt
    2: ["test", "#test", "*test", ".test"], // .test
    3: ["for (i=0; i<=5; i++)", "for i=5 1 to 5", "for (i=0, i<=5, i++)", "for i=0, i++ to 5"], //for (i=0; i<=5; i++)
    4: ["The firs div element with id=intro", " All div elements with class=intro", "The first div element with class=intro", " All div elements with id=intro"] //The first div element with class=intro
}

const correctAnswer = [
    "Hypertext Machine language",
    "alt",
    ".test",
    "for (i=0; i<=5; i++)",
    "The first div element with class=intro",
]

// render questions as buttons
const renderQuestions = () => {
    if (questionNum === 0) {
        $("#questions").append(questionBank[questionNum])
        for (let i = 0; i < 4; i++) {
            const answerBtn = $("<button type='button' id='button" + i + " 'class='btn btn-outline-secondary mw-100'>" + answerBank[0][i] + "</button>")
            btnContainer.append(answerBtn);
        }
    } else if (questionNum === 1) {
        $("#questions").append(questionBank[questionNum])
        for (let i = 0; i < 4; i++) {
            const answerBtn = $("<button type='button' id='button" + i + " 'class='btn btn-outline-secondary mw-100'>" + answerBank[1][i] + "</button>")
            btnContainer.append(answerBtn);
        }
    } else if (questionNum === 2) {
        $("#questions").append(questionBank[questionNum])
        for (let i = 0; i < 4; i++) {
            const answerBtn = $("<button type='button' id='button" + i + " 'class='btn btn-outline-secondary mw-100'>" + answerBank[2][i] + "</button>")
            btnContainer.append(answerBtn);
        }
    } else if (questionNum === 3) {
        $("#questions").append(questionBank[questionNum])
        for (let i = 0; i < 4; i++) {
            const answerBtn = $("<button type='button' id='button" + i + " 'class='btn btn-outline-secondary mw-100'>" + answerBank[3][i] + "</button>")
            btnContainer.append(answerBtn);
        }
    } else if (questionNum === 4) {
        $("#questions").append(questionBank[questionNum])
        for (let i = 0; i < 4; i++) {
            const answerBtn = $("<button type='button' id='button" + i + " 'class='btn btn-outline-secondary mw-100'>" + answerBank[4][i] + "</button>")
            btnContainer.append(answerBtn);
        }
    }
}

// render username input and score (questions correct + time remaining)
const renderSubmit = () => {
    btnContainer.text("");
    $('#showTimer').hide();
    $('#hideHighScores').show();
    if (timeStart <= 0 && questionNum < 4) { 
        $('#hideHighScores').children("h1").text("Time is up") // if timer reaches 0 and there are still question remaining --> Banner renders "time is up"
    } else {
        $('#hideHighScores').children("h1").text("Quiz completed") // if user finishes quiz before timer ends--> Banner renders "quiz completed"
    };
    const finalScore = scoreCounter + timeStart;
    $("#questions").append("<div> Your final score is: " + finalScore + "</div>");
    $("#questions").append("<div class='input-group mb-3' id='userNameSubmit'><input type='text' class='form-control' id ='userName' placeholder='Your name' aria-label='Recipient's username' aria-describedby='button-addon2'></div>");
    $("#questions").append("<div class='input-group mb-3' id='nameSubmit'><button class='btn btn-primary btn-sm' type='submit' id='button-addon2 btnSubmit' >Submit</button></div>")
    $("#nameSubmit").children().click(function () {
        const userName = $("#userName").val().trim();
        if (userName === "") {
            alert("Please input your name"); // make sures user inputs a name
            return
        };
        if (lastScore !== null) { // checks if there is a local storage already saved
            for (i = 0; i < lastScore["name"].length; i++) { // finds index where to splice depending on score in descending order
                if (finalScore > lastScore["score"][i]) {
                    var spliceHere = i;
                } else {
                    var spliceHere = lastScore["name"].length;
                }
            }
            lastScore["name"].splice(spliceHere, 0, userName);
            lastScore["score"].splice(spliceHere, 0, finalScore);
            var HighScores = {
                "name": lastScore["name"],
                "score": lastScore["score"],
            }
        } else { // if no local storage, use this to initialize score
            var HighScores = {
                "name": [userName],
                "score": [finalScore],
            };
        }
        localStorage.setItem("HighScores", JSON.stringify(HighScores))
        $("#questions").text('');
        highScoreDisplay();
    })
}

const highScoreDisplay = () => {
    $("#showQuiz").hide();
    $("#hideHighScoresList").show();
    $('#hideHighScores').children("h1").text("High Scores")
    const currentscore = JSON.parse(localStorage.getItem("HighScores")); // get current local storage including recent score
    for (i = 0; i < currentscore["name"].length; i++) { // renders score based on how the scores are score (name and scores should already be in order)
        $('#highScoreUser1').append("<li class='list-group-item d-flex flex-row mb-3'><div class='mx-4'><div class='fw-bold'>" + currentscore["name"][i] + "</div></div><span class='badge bg-primary' id='highScore1'>" + currentscore["score"][i] + "</span></li>");
    }
}
// event clicker to start quiz--> show the questions/timer
// this will also hide the initial banner
$("#startQuiz").click(function () {
    $("#showQuiz").show();
    $('#showTimer').show();
    $('#hideBanner').hide();
    const countDown = function () {
        // console.log(timeStart);
        timeStart--
        $("#timerDisplay").text("Time remaining: " + timeStart);
        $("#currentScore").text("Current score: " + scoreCounter);
        if (timeStart <= 0) {
            clearInterval(timer);
            btnContainer.text("");
            $("#questions").text("");
            $("#Correct").hide()
            renderSubmit()
        } else if (questionNum === 5) {
            clearInterval(timer);
            btnContainer.text("");
            $("#questions").text("");
            $("#Correct").hide();
            renderSubmit();
        }
    };

    const timer = setInterval(countDown, 1000);
});
// event clicker for choosing choices 
$("#answerButtons").click(function () {
    if ($(event.target).text() === correctAnswer[questionNum]) {
        scoreCounter++
        $("#Correct").removeClass("text-bg-danger");
        $("#Correct").addClass("text-bg-success");
        $("#Correct").text("correct!");
        $("#minusPoints").text("")
            ;
    } else {
        timeStart = timeStart - 3;
        $("#Correct").removeClass("text-bg-success");
        $("#Correct").addClass("text-bg-danger");
        $("#Correct").text("wrong!");
        $("#minusPoints").text("-3")
    }
    questionNum = questionNum + 1;
    btnContainer.text("");
    $("#questions").text("");
    renderQuestions()
});
// reloads page from the start start to play again
$("#playAgianQuiz").click(function () {
    location.reload()
});

renderQuestions();
