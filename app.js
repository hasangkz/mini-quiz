function Question(text, choices, answer) {
    this.text = text;
    this.choices = choices;
    this.answer = answer;
}

Question.prototype.checkAnswer = function (answer) {
    return this.answer === answer; //doğruysa true yanlışsa false
}

function Quiz(questions) {
    this.questions = questions;
    this.score = 0;
    this.questionIndex = 0;
}
Quiz.prototype.getQuestion = function () {
    return this.questions[this.questionIndex];
}

Quiz.prototype.isFinish = function () {
    return this.questions.length === this.questionIndex;
}

Quiz.prototype.guess = function (answer) {
    var question = this.getQuestion();

    if (question.checkAnswer(answer)) {
        this.score++;
    }
    this.questionIndex++;
    if (this.score === 3) {
        var html = `<h3 style="font-style: italic;">Congratulations, you answered all the questions correctly.</h3>`;
        document.querySelector('.card-footer').innerHTML = html;
        
    }


}

var q1 = new Question("What is your purpose in this life?", ["food", "money", "success"], "success");

var q2 = new Question("What is the success?", ["achieve my purpose", "just money", "a good family"], "achieve my purpose");

var q3 = new Question("What is the best programming language?", ["C++", "Javascript", "Go"], "Javascript");

var questions = [q1, q2, q3];

var quiz = new Quiz(questions);

loadQuestion();

function loadQuestion() {
    if (quiz.isFinish()) {
        showScore();
    } else {
        var question = quiz.getQuestion();
        var choices = question.choices;
        document.querySelector('#question').textContent = question.text; //.text olmadan içindeki değer alamayıruz, .value gibi düşün. 

        for (var i = 0; i < choices.length; i++) {
            var element = document.querySelector('#choice' + i);
            element.innerHTML = choices[i];
            guess('btn' + i, choices[i])
        }

        showProgress();
    }
}

function guess(id, guess) {
    var btn = document.getElementById(id);
    btn.onclick = function () {
        quiz.guess(guess);
        loadQuestion();
    }
}

function showScore() {
    var html = `<h2>Score</h2><h4>${quiz.score}</h4>`;
    document.querySelector('.card-body').innerHTML = html;

}

function showProgress() {
    var questionNumber = quiz.questionIndex + 1;
    var totalQuestion = quiz.questions.length;
    document.querySelector('.card-footer').innerHTML = `${questionNumber} / ${totalQuestion}`;
}