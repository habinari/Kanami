$('#checkButton').click(function(){
    var value = $('#checkInputText').val();
    if(currentKana.romaji == value.toUpperCase()){
        alert('Correct answer!');
    } else {
        alert('Incorrect answer!');
    }
});

$('#nextButton').click(function(){
    var rnd = Math.floor(Math.random() * myKanas.length);
    currentKana = myKanas[rnd];
    $kana.text(currentKana.character);

    $showButton.attr('data-original-title', currentKana.romaji);
    $showButton.attr('data-content', 'Kana: ' + currentKana.character +
        ', Romaji: ' + currentKana.romaji +
        ', Syllabary: ' + (currentKana.syllabary == 'H' ? 'HIRAGANA' : 'KATAKANA'));
});
