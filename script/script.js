let questions = [
    {
        "question": "Wer hat HTML erfunden?",
        "answer_1": "Robbie Williams",
        "answer_2": "Marc Andre",
        "answer_3": "Tim Bernes-Lee",
        "answer_4": "Justin Bieber",
        "right_answer": 3,
        "theme": "html",
    },
    {
        "question": "Was bedeutet das HTML Tag &lt;a&gt?",
        "answer_1": "Text Fett",
        "answer_2": "Container",
        "answer_3": "Ein Link",
        "answer_4": "Kursiv",
        "right_answer": 3,
        "theme": "html",
    },
    {
        "question": "Wie bindet man eine Website in eine Website ein?",
        "answer_1": "&lt;iframe;, &lt;frame&gt;, and &lt;frameset&gt;",
        "answer_2": "&lt;iframe;",
        "answer_3": "&lt;frame&gt;",
        "answer_4": "&lt;frameset&gt;",
        "right_answer": 2,
        "theme": "html",
    },
    {
        "question": "Wie stellt man Text am besten fett dar?",
        "answer_1": "&lt;strong&gt",
        "answer_2": "css nutzen",
        "answer_3": "&lt;bold&gt",
        "answer_4": "&lt;b&gt",
        "right_answer": 2,
        "theme": "css",
    },
    {
        "question": "Welches Attribut kann nicht für eine Textarea verwendet werden?",
        "answer_1": "readonly",
        "answer_2": "max",
        "answer_3": "from",
        "answer_4": "spellcheck",
        "right_answer": 1,
        "theme": "css",
    },
    {
        "question": "Wie wählst du alle Elemente vom Typ &lt;a&gt; mit dem attribut title aus?",
        "answer_1": "a[title]{...}",
        "answer_2": "a > title {...}",
        "answer_3": "a.title {...}",
        "answer_4": "a=title (...)",
        "right_answer": 1,
        "theme": "css",
    },
    {
        "question": "Wie definiert man in JavaScript eine Variable?",
        "answer_1": "let 100 = rate;",
        "answer_2": "100 = let rate;",
        "answer_3": "rate = 100;",
        "answer_4": "let rate = 100;",
        "right_answer": 4,
        "theme": "js",
    }
];

let currentQuestion = 0;
let points = 0;
let rightAnswered = false;
let success = new Audio('sound/success.mov');
let wrong = new Audio('sound/wrong.mov');

function init() {
    loadNumberOfQuestions();
    loadCurrentQuestion();
    loadPoints();
}

function startGame() {
    document.getElementById('start-screen').classList.add('d-none');
    document.getElementById('quiz-screen').classList.remove('d-none');
}

function loadActive(theme) {
    document.getElementById('html').classList.remove('active-theme');
    document.getElementById('css').classList.remove('active-theme');
    document.getElementById('js').classList.remove('active-theme');
    document.getElementById(theme).classList.add('active-theme');
}

function updateProgressBar() {
    let progressPerQuestion = 100 / questions.length;
    let progress = progressPerQuestion * currentQuestion + 1;
    document.getElementById('progress-container').innerHTML = createProgressHTML(progress)
}

function loadCurrentQuestion() {
    let question = questions[currentQuestion];
    let theme = question['theme'];
    createCardTitle(question);
    loadActive(theme);
    emptyOldAnswers();
    loadAnswers(question);
}

function loadAnswers(question) {
    let charsetNumber = 65;
    for (i = 0; i < 4; i++) {
        let charsetLetter = String.fromCharCode(charsetNumber);
        let currentAnswer = i + 1;
        let currentAnswerString = 'answer_' + currentAnswer;
        document.getElementById('answers-container').innerHTML += createAnswerHTML(currentAnswerString, charsetLetter, question)
        charsetNumber++;
    }
}

function loadNumberOfQuestions() {
    let totalQuestions = questions.length
    document.getElementById('all-questions').innerHTML = totalQuestions;
    document.getElementById('current-question').innerHTML = currentQuestion + 1;
}

function loadPoints() {
    document.getElementById('points').innerHTML = points;
    document.getElementById('points-end-screen').innerHTML = points;
    loadTotalPoints();
}

function loadTotalPoints() {
    let totalPoints = questions.length * 80;
    document.getElementById('total-points').innerHTML = totalPoints;
    document.getElementById('total-points-end-screen').innerHTML = totalPoints;
}

function checkAnswer(currentAnswer) {
    let rightAnswer = 'answer_' + questions[currentQuestion]['right_answer'];
    if (answerIsRight(rightAnswer, currentAnswer)) {
        createRightAnswerderTheme(currentAnswer);
        enableNextBtn();
        if (notYetAnsweredRight()) {
            addFullPoints();
        }
        success.play();
        loadPoints();
    } else {
        createFalseAnswerTheme(currentAnswer);
        addPenalty();
        wrong.play();
        loadPoints();
        setTimeout(function () {
            resetFalseAnswerTheme(currentAnswer);
        }, 2000);
    }
}

function nextQuestion() {
    let totalQuestions = questions.length
    if (notAnsweredAllQuestions(totalQuestions)) {
        addOneToCurrentQuestion();
        updateProgressBar();
        disableNextBtn();
        resetRightAnswered();
        init();
    } else {
        updateProgressBar();
        loadEndScreen();
    }
}

function loadEndScreen() {
    document.getElementById('end-screen').classList.toggle('d-none');
    document.getElementById('quiz-screen').classList.toggle('d-none');
    document.getElementById('trophy-icon').classList.toggle('trophy-animation');
}

function replay() {
    document.getElementById('end-screen').classList.toggle('d-none');
    document.getElementById('quiz-screen').classList.toggle('d-none');
    document.getElementById('trophy-icon').classList.toggle('trophy-animation');
    currentQuestion = 0;
    points = 0;
    updateProgressBar();
    init();
}

// Small Functions

function addPenalty() {
    points = points - 20
}

function addFullPoints() {
    points = points + 80;
    rightAnswered = true;
}

function notYetAnsweredRight() {
    return rightAnswered === false
}

function createRightAnswerderTheme(currentAnswer) {
    document.getElementById(currentAnswer).classList.add("right-answer")
}

function answerIsRight(rightAnswer, currentAnswer) {
    return rightAnswer === currentAnswer
}

function emptyOldAnswers() {
    document.getElementById('answers-container').innerHTML = '';
}

function createCardTitle(question) {
    document.getElementById('card-title').innerHTML = question['question'];
}

function createFalseAnswerTheme(currentAnswer) {
    document.getElementById(currentAnswer).classList.add("false-answer")
}

function resetFalseAnswerTheme(currentAnswer) {
    document.getElementById(currentAnswer).classList.remove("false-answer")
}

function resetRightAnswered() {
    rightAnswered = false;
}

function addOneToCurrentQuestion() {
    currentQuestion++;
}

function disableNextBtn() {
    document.getElementById('next-question-Btn').disabled = true;
}

function enableNextBtn() {
    document.getElementById('next-question-Btn').disabled = false;
}

function notAnsweredAllQuestions(totalQuestions) {
    return totalQuestions > currentQuestion + 1
}

// Templates

function createAnswerHTML(currentAnswerString, charsetLetter, question) {
    return /*html*/ `<div class="card answer mb-2" id="${currentAnswerString}" onclick="checkAnswer('${currentAnswerString}')">
    <div class="answer-classificator">${charsetLetter}</div>
    <div class="card-body">
        ${question[currentAnswerString]}
    </div>
</div>`
}

function createProgressHTML(progress) {
    return  /*html*/ `<div class="progress-content" style="width: ${progress}%"></div>`
}