var app = new Vue({
    el: '#app',
    data: {
        questions: [],
        quizstart: false,
        quizfailed: false,
        quizsuccess: false,
        maxcorrectanswers: 12,
        currentquestion: null,
        currentdate: '',
        currenttime: '',
        currentquestionindex: 0
    },
    mounted: function () {
        this.loadData();
        this.getCurrentDatetime();
    },
    methods: {
        getData: function (event) {
            this.loadData();
        },
        getCurrentDatetime: function(event) {
            this.currentdate = 'JUL09'
            this.currenttime = '10:15:00'
        },
        updateDatetime: function(event) {
            currenttime = '10:15:00';
        },
        startQuiz: function (event) {
            this.quizstart = true;
        },
        resetQuiz: function (event) {
            this.quizstart = false;
        },
        loadData: function () {

            axios.get('assets/questions/general.json')
                .then(response => {
                    var quizJson = response.data;

                    this.questions = quizJson.Questions;

                    this.currentquestion = this.questions[this.currentquestionindex];
                    console.log(quizJson);
                    console.log(this.currentquestion);
                    console.log(this.currentquestion.Question);
                })
                .catch(function (error) {
                    // handle error
                    console.log(error);
                })
                .then(function () {

                });
        },
        validateAnswer: function() {
            this.nextQuestion();
        },
        nextQuestion: function() {
            this.currentquestionindex = this.currentquestionindex + 1;

            var question = this.questions[this.currentquestionindex];

            if (question === undefined) {
                this.quizfailed = true;
            } else {
                this.currentquestion = this.questions[this.currentquestionindex];
            }

        }
    }
})