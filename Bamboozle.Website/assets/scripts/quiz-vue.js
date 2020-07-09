var app = new Vue({
    el: '#app',
    data: {
        questions: [],
        quizstart: false,
        quizfailed: false,
        quizsuccess: false
    },
    mounted: function () {
        this.loadData();
    },
    methods: {
        getData: function (event) {
            this.loadData();
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

                    this.questions = quizJson.questions;

                    console.log(quizJson);
                })
                .catch(function (error) {
                    // handle error
                    console.log(error);
                })
                .then(function () {

                });
        }
    }
})