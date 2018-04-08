var kanas = [];
var currentKana;

var $kana;
var $checkInput;
var $showButton;

$.getJSON('data/kana.json', function(data){
    kanas = data.kanas;
});

$(document).ready(function(){
    $kana = $('#kana');
    $checkInput = $('#checkInputText');
    $showButton = $('#showButton');

    $('#nextButton').click(function(){
        var rnd = Math.floor(Math.random() * kanas.length);
        currentKana = kanas[rnd];
        $kana.text(currentKana.character);
        var msg =
        $($showButton).attr('data-original-title', currentKana.romaji);
        $($showButton).attr('data-content', 'Kana: ' + currentKana.character +
            ', Romaji: ' + currentKana.romaji +
            ', Syllabary: ' + (currentKana.syllabary == 'H' ? 'HIRAGANA' : 'KATAKANA'));
    });

    $('#showButton').click(function(){

    });

    $(function () {
        $('[data-toggle="popover"]').popover();
    });

});
