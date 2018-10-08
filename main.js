var app = new Vue({
    el: '#app',

    data: {
      currentKana: {
        "character": "#",
        "romaji": "#",
      },
      syllabaries: {
        hiragana: [],
        katakana: []
      },
      selectedKanas: [],
      isCorrectAnswer: false,
      isAnswered: false,

      showScore: true,
      showKanaInfo: false,

      score: {
        next: 0,
        show: 0,
        correctChecks: 0,
        wrongChecks: 0,
      }
    },

    created: function() {
      this.getSyllabaries();
    },

    methods: {
      nextKana: function(){
        this.$data.isAnswered = false;
        this.$data.showKanaInfo = false;

        this.$data.currentKana = this.$data.syllabaries.hiragana[
            Math.floor((Math.random() * this.$data.syllabaries.hiragana.length))
        ];
        document.querySelector('#checker').value = '';
      },

      showAnswer: function(){
        this.$data.showKanaInfo = true;
      },

      openSettings: function(){
        
      },

      checkAnswer: function(){
        this.$data.isAnswered = true;
        this.$data.isCorrectAnswer = 
            document.querySelector('#checker').value.toUpperCase() == this.$data.currentKana.romaji;
      },

      getSyllabaries: function () {
        let $this = this;
        var xobj = new XMLHttpRequest();
        xobj.overrideMimeType("application/json");
        xobj.open('GET', './data/syllabaries.json', true);
        xobj.onreadystatechange = function () {
          if (xobj.readyState == 4 && xobj.status == "200") {
            $this.$data.syllabaries = JSON.parse(xobj.responseText);
          }
        };
        xobj.send();
      },

      toggleScore: function(){
        this.$data.showScore = !this.$data.showScore;
      }
    },

    computed: {
      answer: function(){
        if (this.$data.isAnswered && this.$data.isCorrectAnswer){
          return 'is-success';
        } else if(this.$data.isAnswered){
          return 'is-danger';
        } else {
          return '';
        }
      }
    },

    filters: {
      capitalize: function (str) {
        return str.toLowerCase()
          .replace( /\b./g, val => val.toUpperCase() );
      }
    }
  })