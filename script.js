const containerEl = $(".container");
containerEl.text('hello')

$("#showQuiz").hide();

$(".btn").click(function(){
    $("#showQuiz").show();
    $('#hideBanner').hide();
});

let x = 5;

const countDown = function() {
    console.log(x);
    x--
    if (x === 0) {
        console.log('stop'); //add another function to end quiz
        clearInterval(timer);
    }
};

const timer = setInterval(countDown, 1000);

const questionBank = [
    'What',
    'Who',
    'Where',
    'Why',
];

const answerBank = [
    "1","2","3","4",
]

for (let i = 0; i < questionBank.length; i++) {
    containerEl.text(questionBank[i]);
}