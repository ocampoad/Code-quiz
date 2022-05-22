const containerEl = $(".container");
const btnContainer = $("#answerButtons")
// containerEl.prepend('hello')

$("#showQuiz").hide();
$('#showTimer').hide();
$('#hideHighScores').hide();
$('#hideHighScoresList').hide();

let timeStart = 20; 
let questionNum = 0;

$("#startQuiz").click(function(){
    $("#showQuiz").show();
    $('#showTimer').show();
    $('#hideBanner').hide();
    const countDown = function() {
        // console.log(timeStart);
        timeStart--
        $("#timerDisplay").text("Time remaining: " + timeStart);
        $("#currentScore").text("Current score: "+ scoreCounter);
        if (timeStart <= 0) {
            console.log('stop'); //add another function to end quiz
            clearInterval(timer);
            btnContainer.text("");
            $("#questions").text("");
            renderSubmit()
        } else if ( questionNum === 4) {
                clearInterval(timer);
                btnContainer.text("");
                $("#questions").text("");
                renderSubmit();
            } 
    };
    
    const timer = setInterval(countDown, 1000);
});

let scoreCounter = 0;

const questionBank = [
    'What',
    'Who',
    'Where',
    'Why',
];

const answerBank = {
    0:["1","2","3","4"],
    1:["yes","no","maybe","true"],
    2:["cool","hot","warm", "freezing"],
    3:["blue","red","purple","pink"],
}

const correctAnswer = [
    "1",
    "yes",
    "hot",
    "pink",
]

$("#answerButtons").click(function(){
    // alert($(event.target).text());
    if ($(event.target).text() === correctAnswer[questionNum]) {
        scoreCounter++
    } else {
        timeStart = timeStart-5;
    }
    questionNum = questionNum+1;
    btnContainer.text("");
    $("#questions").text("");
    // if ( questionNum === 4) {
    //     renderSubmit();
    // } 
    renderQuestions()
});

const renderQuestions = () => {
if (questionNum === 0) {
    $("#questions").append(questionBank[questionNum])
    for (let i=0; i< 4; i++) {
        const answerBtn = $("<button type='button' id='button"+i +" 'class='btn btn-outline-secondary mw-100'>" +answerBank[0][i] + "</button>")
        btnContainer.append(answerBtn);
    }
} else if ( questionNum === 1) {
    $("#questions").append(questionBank[questionNum])
    for (let i=0; i< 4; i++) {
        const answerBtn = $("<button type='button' id='button"+i +" 'class='btn btn-outline-secondary mw-100'>" +answerBank[1][i] + "</button>")
        btnContainer.append(answerBtn);
    }
} else if ( questionNum === 2) {
    $("#questions").append(questionBank[questionNum])
    for (let i=0; i< 4; i++) {
        const answerBtn = $("<button type='button' id='button"+i +" 'class='btn btn-outline-secondary mw-100'>" +answerBank[2][i] + "</button>")
        btnContainer.append(answerBtn);
    }
}else if ( questionNum === 3) {
    $("#questions").append(questionBank[questionNum])
    for (let i=0; i< 4; i++) {
        const answerBtn = $("<button type='button' id='button"+i +" 'class='btn btn-outline-secondary mw-100'>" +answerBank[3][i] + "</button>")
        btnContainer.append(answerBtn);
    }
}
}
const lastScore = JSON.parse(localStorage.getItem("HighScores"));

const renderSubmit = () => {
    btnContainer.text("");
    $('#showTimer').hide();
    $('#hideHighScores').show();
    if (timeStart <= 0 && questionNum < 4) {
        $('#hideHighScores').children("h1").text("Time is up")
    } else {
    $('#hideHighScores').children("h1").text("Quiz completed")
    };
    const finalScore = scoreCounter + timeStart;
    $("#questions").append("<div> Your final score is: " + finalScore + "</div>");
    $("#questions").append("<div class='input-group mb-3' id='userNameSubmit'><input type='text' class='form-control' id ='userName' placeholder='Your name' aria-label='Recipient's username' aria-describedby='button-addon2'></div>");
    $("#questions").append("<div class='input-group mb-3' id='nameSubmit'><button class='btn btn-primary btn-sm' type='submit' id='button-addon2 btnSubmit' >Submit</button></div>")
    $("#nameSubmit").children().click(function(){
        const userName = $("#userName").val().trim();
        if (userName === "") {
            alert("Please input your name");
            return
        }
        const HighScores =  [{ 
            name : userName,
            score : finalScore,
        }];
        if (lastScore !== null){
            HighScores.push(lastScore);
        }
        localStorage.setItem("HighScores", JSON.stringify(HighScores));
        $("#questions").text('');
        highScoreDisplay();
        });
}


const highScoreDisplay  = () => {
    $("#showQuiz").hide();
    $("#hideHighScoresList").show();
    $('#hideHighScores').children("h1").text("High Scores")
    const currentscore = JSON.parse(localStorage.getItem("HighScores"));
    console.log(currentscore)
}

$("#playAgianQuiz").click( function() {
    location.reload()
});

renderQuestions();

