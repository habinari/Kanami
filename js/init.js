var kanas = [];
var myKanas = [];

var currentKana;
var currentSyllabary = 'HIRAGANA';

var $kana;
var $showButton;

$.getJSON('data/kana.json', function(data){
    kanas = data.kanas;
});

$(document).ready(function(){
    $kana = $('#kana');
    $checkInput = $('#checkInputText');
    $showButton = $('#showButton');

    $(function () {
        $('[data-toggle="popover"]').popover();
    });

    $('#settingsModal').find('button[name="apply"]').click();

});
