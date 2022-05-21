const containerEl = $(".container");
const btnContainer = $("#answerButtons")
// containerEl.prepend('hello')

$("#showQuiz").hide();
$('#showTimer').hide();

let timeStart = 30; 

$("#startQuiz").click(function(){
    $("#showQuiz").show();
    $('#showTimer').show();
    $('#hideBanner').hide();
    const countDown = function() {
        // console.log(timeStart);
        timeStart--
        $("#timerDisplay").text("Time remaining: " + timeStart);
        if (timeStart === 0) {
            console.log('stop'); //add another function to end quiz
            clearInterval(timer);
        }
    };
    
    const timer = setInterval(countDown, 1000);
});

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


let questionNum = 0;

$("#answerButtons").click(function(){
    alert($(event.target).text());
    if ($(event.target).text() === correctAnswer[questionNum]) {
        alert("correct")
    } else {
        alert("wrong")
    }
    questionNum = questionNum+1;
    btnContainer.text("");
    renderQuestions()
});

const renderQuestions = () => {
if (questionNum === 0) {
    containerEl.prepend(questionBank[questionNum])
    for (let i=0; i< 4; i++) {
        const answerBtn = $("<button type='button' id='button"+i +" 'class='btn btn-outline-secondary mw-100'>" +answerBank[0][i] + "</button>")
        btnContainer.append(answerBtn);
    }
} else if ( questionNum === 1) {
    containerEl.prepend(questionBank[questionNum])
    for (let i=0; i< 4; i++) {
        const answerBtn = $("<button type='button' id='button"+i +" 'class='btn btn-outline-secondary mw-100'>" +answerBank[1][i] + "</button>")
        btnContainer.append(answerBtn);
    }
} else if ( questionNum === 2) {
    containerEl.prepend(questionBank[questionNum])
    for (let i=0; i< 4; i++) {
        const answerBtn = $("<button type='button' id='button"+i +" 'class='btn btn-outline-secondary mw-100'>" +answerBank[2][i] + "</button>")
        btnContainer.append(answerBtn);
    }
}else if ( questionNum === 3) {
    containerEl.prepend(questionBank[questionNum])
    for (let i=0; i< 4; i++) {
        const answerBtn = $("<button type='button' id='button"+i +" 'class='btn btn-outline-secondary mw-100'>" +answerBank[3][i] + "</button>")
        btnContainer.append(answerBtn);
    }
}
}

renderQuestions()


// for (let i = 0; i < questionBank.length; i++) {
//     containerEl.text(questionBank[i]);
// }