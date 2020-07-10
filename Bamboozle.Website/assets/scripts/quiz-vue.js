var app = new Vue({
    el: '#app',
    data: {
        questions: [],
        quizIntro: true,
        quizStart: false,
        quizFailed: false,
        quizSuccess: false,
        maxCorrectAnswers: 12,
        currentQuestion: null,
        currentDate: '',
        currentTime: '',
        currentQuestionIndex: 0,
        countCorrectAnswers: 0,
        ranOutOfQuestions: false,
        totalQuestions: 0,
        currentPageNumber: 0,
        pageNumber: 0,
        showQuiz: true
    },
    mounted: function () {
        var initalPageNumber = 390;

        this.currentPageNumber = initalPageNumber;
        this.pageNumber = initalPageNumber;

        this.loadData();
        this.getCurrentDatetime();

        setInterval(this.getCurrentDatetime, 5000);
    },
    methods: {
        getData: function (event) {
            this.loadData();
        },
        getCurrentDatetime: function(event) {
            var date = new Date();

            var months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];

            this.currentDate = months[date.getMonth()] + String(date.getDay()).padStart(2, '0');
            this.updateDatetime();
        },
        updateDatetime: function(event) {
            var date = new Date();

            this.currentTime = String(date.getHours()).padStart(2, '0') + ":" + String(date.getMinutes()).padStart(2, '0')  + ":" + String(date.getSeconds()).padStart(2, '0') ;
        },
        startQuiz: function (event) {
            this.quizIntro = false;
            this.quizStart = true;
        },
        updatePageNumber: function (event) {
            this.currentPageNumber = this.pageNumber;
            console.log("Hiya, " + this.pageNumber);
        },
        resetQuiz: function (event) {
            this.quizStart = false;
            this.ranOutOfQuestions = false;
            this.quizFailed = false;
            this.quizSuccess = false;
            this.quizIntro = true;
            this.countCorrectAnswers = 0;
        },
        failedQuiz: function (event) {
            this.quizStart = false;
            this.quizFailed = true;
        },
        noMoreQuestions: function (event) {
            this.ranOutOfQuestions = true;
            this.quizStart = false;
        },
        loadData: function () {
            axios.get('assets/questions/general.json')
                .then(response => {
                    var quizJson = response.data;

                    this.questions = quizJson.Questions;
                    
                    this.totalQuestions = this.questions.length;

                    this.currentQuestion = this.questions[this.currentQuestionIndex];
                })
                .catch(function (error) {
                    // handle error
                    console.log(error);
                })
                .then(function () {

                });
        },
        validateAnswer: function(selectedAnswer) {
            console.log(selectedAnswer + " + " + this.currentQuestion.CorrectAnswer + " = " + (this.currentQuestion.CorrectAnswer === selectedAnswer));

            if (this.currentQuestion.CorrectAnswer === selectedAnswer) {
                this.countCorrectAnswers = this.countCorrectAnswers + 1;
                this.nextQuestion();
            } else {
                this.failedQuiz();
            }
        },
        nextQuestion: function() {
            this.currentQuestionIndex = this.currentQuestionIndex + 1;

            var question = this.questions[this.currentQuestionIndex];

            if (question === undefined) {
                this.noMoreQuestions();
            } else {
                this.currentQuestion = this.questions[this.currentQuestionIndex];
            }

        }
    }
})