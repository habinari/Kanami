var kanas = [];
var myKanas = [];

var currentKana;
var currentSyllabary = 'HIRAGANA';

var $kana;
var $showButton;

$.getJSON('data/kana.json', function(data){
    kanas = data.kanas;
});

$('#settingsModal').find('input[type="checkbox"]').click(function(){
    isChecked = $(this).prop('checked');
    if($(this).attr('id').indexOf("all") >= 0){
        $(this).closest('div[class="row"]').find('input[type="checkbox"]').prop('checked', isChecked);
    } else {
        var mustCheck;
        if(!isChecked){
            mustCheck = false;
        } else {
            mustCheck = true;
            $(this).closest('div[class="row"]').find('input[type="checkbox"]').each(function(){
                if($(this).attr('id').indexOf("all") && !$(this).prop('checked'))
                    mustCheck = false;
            });
        }
        $(this).closest('div[class="row"]').find('input[type="checkbox"]').eq(0).prop('checked', mustCheck);
    }
});

$('#settingsModal').find('button[name="apply"]').click(function(){
    myKana = [];
    var $radios = $('#settingsModal').find('input[type="radio"]');
    currentSyllabary = $radios.eq(0).prop('checked') ? 'HIRAGANA' : 'KATAKANA';

    $('#settingsModal').modal('hide');
});

$(document).ready(function(){
    $kana = $('#kana');
    $checkInput = $('#checkInputText');
    $showButton = $('#showButton');

    $('#nextButton').click(function(){
        var rnd = Math.floor(Math.random() * kanas.length);
        currentKana = kanas[rnd];
        $kana.text(currentKana.character);
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
