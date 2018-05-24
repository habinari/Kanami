$('#checkButton').click(function(){
    var value = $('#checkInputText').val();
    if(currentKana.romaji == value.toUpperCase()){
        alert('Correct answer!');
    } else {
        alert('Incorrect answer!');
    }
});

$('#nextButton').click(function(){
    if(auxKanas.length == 0)
        auxKanas = myKanas.slice();

    var lastKana = currentKana;
    while(lastKana == currentKana && myKanas.length > 1){
        var rnd = Math.floor(Math.random() * auxKanas.length);
        currentKana = auxKanas[rnd];
        auxKanas.splice(rnd, 1);
        $('#kana').text(currentKana.character);
    }

    $showButton.attr('data-original-title', currentKana.romaji);
    $showButton.attr('data-content', 'Kana: ' + currentKana.character +
        ', Romaji: ' + currentKana.romaji +
        ', Syllabary: ' + (currentKana.syllabary == 'H' ? 'HIRAGANA' : 'KATAKANA'));
});
