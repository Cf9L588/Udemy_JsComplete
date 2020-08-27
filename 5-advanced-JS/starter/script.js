// var Person = function (name, yearOfBirth, job) {
//     this.name = name;
//     this.yearOfBirth = yearOfBirth;
//     this.job = job;
// };

// Person.prototype.calculateAge = function () {
//     return new Date().getFullYear() - this.yearOfBirth;
// };

// var john = new Person("John", 1990, "teacher");
// var jane = new Person("Jane", 1969, "designer");

// john.calculateAge();
// jane.calculateAge();

// // Object.create
// var personProto = {
//     calculateAge: function () {
//         console.log(new Date().getFullYear() - this.yearOfBirth);
//     },
// };

// var john = Object.create(personProto);
// john.name = "John";
// john.yearOfBirth = 1990;
// john.job = "teacher";

// var jane = Object.create(personProto, {
//     name: { value: "Jane" },
//     yearOfBirth: { value: 1969 },
//     job: { value: "designer" },
// });

// Immediately Invoked Function Expression (IIFE)

// function game() {
//     var score = Math.random() * 10;
//     console.log(score >= 5);
// }
// game();

// (function (goodLuck) {
//     var score = Math.random() * 10;
//     console.log(score >= 5 - goodLuck);
// })(5);
var Question = function (question, answers, correctAnswerIndex) {
    this.question = question;
    this.answers = answers;
    this.correctAnswerIndex = correctAnswerIndex;
};
(function (questions) {
    Question.prototype.displayQuestion = function () {
        var output = this.question;
        for (var i = 0; i < this.answers.length; i++) {
            output += `\n${i}. ${this.answers[i]}`;
        }
        console.log(output);
        1;
        return output;
    };
    Question.prototype.checkAnswer = function (answer, scoreFunctionCallback) {
        var sc = 0;
        if (answer === this.correctAnswerIndex) {
            console.log("Correct");
            sc = scoreFunctionCallback(true);
        } else {
            console.log("Wrong answer, try again");
            sc = scoreFunctionCallback(true);
        }
        this.displayScore(sc);
    };
    Question.prototype.displayScore = function (score) {
        console.log(`current score is ${score} points`);
    };
    var keepScore = score();
    nextQuestion();

    function score() {
        var sc = 0;
        return function (correct) {
            if (correct) sc++;
            return sc;
        };
    }
    function nextQuestion() {
        var n = Math.floor(Math.random() * questions.length);
        var currentQuestion = questions[n];
        var userInput = prompt(currentQuestion.displayQuestion());
        if (userInput && userInput !== "exit") {
            currentQuestion.checkAnswer(parseInt(userInput), keepScore);
            nextQuestion();
        }
    }
})([
    new Question(
        "What is my name?",
        ["Greg", "Bob", "Chandler", "The Great and Wonderful Oz"],
        2
    ),
    new Question(
        "Should I go to bed?",
        ["yes", "don't tell me what to do", "no"],
        1
    ),
    new Question(
        "What is tomorrow?",
        [
            (function () {
                const days = [
                    "Sunday",
                    "Monday",
                    "Tuesday",
                    "Wednesday",
                    "Thursday",
                    "Friday",
                    "Saturday",
                ];
                var tomorrow = new Date();
                tomorrow.setDate(tomorrow.getDate() + 1);
                return days[tomorrow.getDay()];
            })() /* all this to get the day name of tomorrow 🙄 */,
            "post-yesterday",
        ],
        0
    ),
]);
