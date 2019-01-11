<template>
    <div>
        <div class="container">
        <div class="columns is-centered">
            <div class="column is-10">
                <div class="card">
                    <header class="card-header">
                        <p class="card-header-title">
                            Score
                        </p>
                        <a href="#" @click="toggleScore" class="card-header-icon" aria-label="more options">
                            <span class="icon">
                                <font-awesome-icon icon="angle-down" />
                            </span>
                        </a>
                    </header>
                    <div class="card-content" v-if="isVisible">
                        <div class="content">
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
    </div>
</template>


<script>

import { library } from '@fortawesome/fontawesome-svg-core';
import { faCoffee, faAngleDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

library.add(faCoffee);
library.add(faAngleDown);

export default {

    props: ['score'],

    data: function(){
      return {

        score: this.score,

        isVisible: true
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
        this.$data.isVisible = !this.$data.isVisible;
      },
    },

    filters: {

      negativeIsZero: function(num){
        if(num < 0)
          num = 0;
        
        return num;
      }
    },

    components: {
        'font-awesome-icon': FontAwesomeIcon
    }
}


</script>