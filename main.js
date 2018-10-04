var app = new Vue({
    el: '#app',

    data: {
      currentKana: {
        "character": "#",
        "romaji": "#",
      },
      syllabaries: {},
      selectedKanas: [],
      isCorrectAnswer: 'miau',
      isAnswered: false
    },

    created: function() {
      this.getSyllabaries();
    },

    methods: {
      nextKana: function(){
        this.$data.isAnswered = false;
      },

      openSettings: function(){
        
      },

      checkAnswer: function(){
        this.$data.isAnswered = true;
        this.$data.isCorrectAnswer = 
            document.querySelector('input#checker').value == this.$data.currentKana.romaji ;
      },

      getSyllabaries: function () {
        let $this = this;
        var xobj = new XMLHttpRequest();
        xobj.overrideMimeType("application/json");
        xobj.open('GET', './data/syllabaries.json', true);
        xobj.onreadystatechange = function () {
          if (xobj.readyState == 4 && xobj.status == "200") {
            $this.$data.syllabaries = xobj.responseText;
          }
        };
        xobj.send();
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
    }
  })