<template>
    <div>
        <p id="theInfo" class="is-size-1 has-text-centered m-t-xs">
            {{currentKana.character}} <span v-if="showKanaInfo">- {{currentKana.romaji | capitalize}}</span>
        </p>

        
        <div class="container">
            <div class="columns is-mobile">
                <div class="column">
                    <a class="button is-outlined is-rounded is-pulled-right" @click="showAnswer()">Show</a>
                </div>
                <div class="column">
                    <a class="button is-outlined is-rounded" @click="nextKana()">Next</a>
                </div>
            </div>

            <div class="columns is-centered is-mobile">
                <div class="column is-5 is-narrow">
                    <input id="checker" class="input is-rounded" v-bind:class="answer" type="text" placeholder="Romaji"/>
                </div>
                <div class="column is-narrow">
                    <a class="button is-outlined is-rounded" @click="checkAnswer()">Check</a>
                </div>
            </div>

        </div>
        <!-- End Main functionality -->

        <Score
            v-bind:score="score"
        >
        </Score>

        <!-- Start Settings -->
        <div class="container">
            <div class="columns">
                <div class="column is-10 is-offset-1">
                    <div class="card">
                        <header class="card-header">
                            <p class="card-header-title">
                                Settings
                            </p>
                            <a href="#" @click="toggleSettings" class="card-header-icon" aria-label="more options">
                                <span class="icon">
                                    <i class="fas fa-angle-down" aria-hidden="true"></i>
                                </span>
                            </a>
                        </header>
                        <div class="card-content" v-if="showSettings">
                            <div class="content container">
                                <div class="columns is-centered is-mobile">
                                    <div class="control">
                                        <label class="radio">
                                          <input @click="toggleSyllabary('HIRAGANA')" type="radio" name="syllabary" checked> Hiragana
                                        </label>
                                        <label class="radio">
                                          <input @click="toggleSyllabary('KATAKANA')" type="radio" name="syllabary"> Katakana
                                        </label>
                                    </div>
                                </div>
                                
                                <template>
                                    <div v-for="(syllableRow, index) in currentSyllabary" :key="`${index}-${currentSyllabary}`" class="columns">
                                        <div class="column is-3">
                                                <a class="button is-small" @click="updateKanaRowCheckBox(index, true)">
                                                    +
                                                </a>
                                                <a class="button is-small" @click="updateKanaRowCheckBox(index, false)">
                                                    -
                                                </a>
                                        </div>

                                        <div v-for="(syllable, subindex) in syllableRow" :key="syllable.character" class="column">
                                            <input type="checkbox"
                                                v-model="currentSyllabary[index][subindex].checked"
                                            >
                                             {{syllable.character}}
                                        </div>
                                    </div>
                                </template>

                                <div class="columns has-text-centered is-mobile">
                                    <div class="column">
                                        <button id="updateButton" @click="updateCheckedKanas" class="button is-outlined is-rounded">Update</button>
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

import syll from '../../static/syllabaries.json';
import Score from './components/Score.vue'

export default {
    data: function() {
        return {
            
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
            unusedKanas: [],

            isCorrectAnswer: false,
            isAnswered: false,

            showSettings: false,
            showKanaInfo: false,

            score: {
              next: -1,
              show: 0,
              correctChecks: 0,
              wrongChecks: 0,
            }   
        }
    },

    components: {
        'Score': Score
    },

    created: function() {
      this.getSyllabaries();
    },

    methods: {
      nextKana: function(){

        if(this.$data.selectedKanas.length == 0){
          this.updateCheckedKanas();
        }

        if(this.$data.unusedKanas.length == 0){
          this.$data.unusedKanas = this.$data.selectedKanas.slice();
        }

        this.$data.isAnswered = false;
        this.$data.showKanaInfo = false;

        var randomKana = Math.floor((Math.random() * this.$data.unusedKanas.length));

        this.$data.currentKana = this.$data.unusedKanas[randomKana];
        this.$data.unusedKanas.splice(randomKana, 1);
        
        document.querySelector('#checker').value = '';

        this.$data.score.next++;
      },

      showAnswer: function(){
        this.$data.showKanaInfo = true;

        this.$data.score.show++;
      },

      checkAnswer: function(){
        this.$data.isCorrectAnswer = 
            document.querySelector('#checker').value.toUpperCase() == this.$data.currentKana.romaji;
        
        if(!this.$data.isAnswered)
          (this.$data.isCorrectAnswer) ? this.$data.score.correctChecks++ : this.$data.score.wrongChecks++;

        this.$data.isAnswered = true;
      },

      getSyllabaries: function () {
        this.$data.syllabaries = syll;
      },

      
      toggleSettings: function(){
        this.$data.showSettings = !this.$data.showSettings;
      },
      toggleSyllabary: function(syllabary){
        this.$data.selectedSyllabary = syllabary;
      },

      updateCheckedKanas: function(){
        var $this = this;

        this.$data.selectedKanas = [];
        var syllabary = (this.$data.selectedSyllabary == 'HIRAGANA') ? this.$data.syllabaries.hiragana : this.$data.syllabaries.katakana;

        for(var row = 0; row < syllabary.length; row++){
          for(var item = 0; item < syllabary[row].length; item++){
            if(syllabary[row][item].checked)
              $this.$data.selectedKanas.push(
                syllabary[row][item]
              );
          }
        }

        this.$data.unusedKanas = this.$data.selectedKanas.slice();

        this.$data.score.next = -1;
        this.$data.score.show = 0;
        this.$data.score.correctChecks = 0;
        this.$data.score.wrongChecks = 0;
        
      },

      updateKanaRowCheckBox: function(row, mustCheck){
        var syllabary = (this.$data.selectedSyllabary == 'HIRAGANA') ? this.$data.syllabaries.hiragana : this.$data.syllabaries.katakana;

        for(var i = 0; i < syllabary[row].length; i++){
          syllabary[row][i].checked = mustCheck;
        }
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

      currentSyllabary: function(){
        if(this.$data.selectedSyllabary == 'HIRAGANA'){
          return this.$data.syllabaries.hiragana;
        } else {
          return this.$data.syllabaries.katakana;
        }
      }
    },

    filters: {
      capitalize: function (str) {
        return str.toLowerCase()
          .replace( /\b./g, val => val.toUpperCase() );
        }
    }
}
</script>

<style lang="scss">
    @import "~bulma/css/bulma.css";
    @import "~@fortawesome/fontawesome-free/css/all.css";
    @import "./styles/margin.scss";
</style>