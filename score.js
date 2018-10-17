var score = Vue.component('score', {
    template:
    `
    <div class="container m-t-lg">
        <div class="columns">
            <div class="column is-10 is-offset-1">
                <div class="card">
                    <header class="card-header">
                        <p class="card-header-title">
                            Score
                        </p>
                        <a href="#" @click="toggleScore" class="card-header-icon" aria-label="more options">
                            <span class="icon">
                                <i class="fas fa-angle-down" aria-hidden="true"></i>
                            </span>
                        </a>
                    </header>
                    <div class="card-content" v-if="showScore">
                        <div class="content container">
                            <div class="columns is-centered is-mobile">
                                <div class="column is-2">
                                    <p>Next: </p>
                                    <p>Show: </p>
                                    <p>Balance: </p>
                                </div>
                                <div class="column is-1">
                                    <p>{{score.next | negativeIsZero}}</p>
                                    <p>{{score.show}}</p>
                                    <p>{{(score.next - score.show) | negativeIsZero}}</p>
                                </div>
                                <div class="column is-2">
                                    <p>Correct: </p>
                                    <p>Wrong: </p>
                                    <p>Balance: </p>
                                </div>
                                <div class="column is-1">
                                    <p>{{score.correctChecks}}</p>
                                    <p>{{score.wrongChecks}}</p>
                                    <p>{{score.correctChecks - score.wrongChecks}}</p>
                                </div>
                                <div class="column is-2">
                                    <p>Checks: </p>
                                    <p>Media: </p>
                                    <p>Score: </p>
                                </div>
                                <div class="column is-1">
                                    <p>{{score.correctChecks + score.wrongChecks}}</p>
                                    <p>{{ scoreMedia }}</p>
                                    <p>{{ totalScore | negativeIsZero}}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    
    `,
    data: function(){
      return {
        score: {
          next: -1,
          show: 0,
          correctChecks: 0,
          wrongChecks: 0,
        },

        showScore: true
      }
    },
    computed: {
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

    methods: {
      toggleScore: function(){
        this.$data.showScore = !this.$data.showScore;
        this.$data.showSettings = false;
      },
    },

    filters: {
      negativeIsZero: function(num){
        if(num < 0)
          num = 0;
        
        return num;
      }
    }
  });

module.exports = score;