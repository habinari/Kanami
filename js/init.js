var kanas = [];
var myKanas = [];
var auxKanas = [];

var currentKana;
var currentSyllabary = 'HIRAGANA';

var $showButton;

$.getJSON('data/kana.json', function(data){
    kanas = data.kanas;

    $showButton = $('#showButton');

    $('[data-toggle="popover"]').popover();

    $('#settingsModal button[name="apply"]').click();
});
