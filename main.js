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

      selectedSyllabary: 'HIRAGANA',
      selectedKanas: [],

      isCorrectAnswer: false,
      isAnswered: false,

      showScore: true,
      showSettings: false,
      showKanaInfo: false,

      score: {
        next: -1,
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

        if(this.$data.selectedKanas.length == 0){
          this.updateCheckedKanas();
        }

        this.$data.isAnswered = false;
        this.$data.showKanaInfo = false;

        var randomKana = Math.floor((Math.random() * this.$data.selectedKanas.length));

        this.$data.currentKana = this.$data.selectedKanas[randomKana];
        
        document.querySelector('#checker').value = '';

        this.$data.score.next++;
      },

      showAnswer: function(){
        this.$data.showKanaInfo = true;

        this.$data.score.show++;
      },

      openSettings: function(){
        
      },

      checkAnswer: function(){
        this.$data.isCorrectAnswer = 
            document.querySelector('#checker').value.toUpperCase() == this.$data.currentKana.romaji;
        
        if(!this.$data.isAnswered)
          (this.$data.isCorrectAnswer) ? this.$data.score.correctChecks++ : this.$data.score.wrongChecks++;

        this.$data.isAnswered = true;
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
        this.$data.showSettings = false;
      },
      toggleSettings: function(){
        this.$data.showSettings = !this.$data.showSettings;
        this.$data.showScore = false;
      },
      toggleSyllabary: function(syllabary){
        this.$data.selectedSyllabary = syllabary;
      },

      updateCheckedKanas: function(){
        var $this = this;

        selectedKanas = [];
        var syllabary = (this.$data.selectedSyllabary == 'HIRAGANA') ? this.$data.syllabaries.hiragana : this.$data.syllabaries.katakana;

        for(var row = 0; row < syllabary.length; row++){
          for(var item = 0; item < syllabary[row].length; item++){
            if(syllabary[row][item].checked)
              $this.$data.selectedKanas.push(
                syllabary[row][item]
              );
          }
        }

        // TODO: Clear Score
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
      },

      scoreMedia: function(){
        var res = (this.$data.score.correctChecks / (this.$data.score.correctChecks + this.$data.score.wrongChecks))
          || 0;
        
        return Math.round(res * 100) / 100
      },

      totalScore: function(){
        return (
            this.$data.score.next -
            this.$data.score.show +
            this.$data.score.correctChecks -
            this.$data.score.wrongChecks
        );
      }
    },

    filters: {
      capitalize: function (str) {
        return str.toLowerCase()
          .replace( /\b./g, val => val.toUpperCase() );
      }
    }
  });