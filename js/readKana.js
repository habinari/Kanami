$('#checkButton').click(function() {
    var value = $('#checkInputText').val();
    if(currentKana.romaji == value.toUpperCase()) {
        $('#checkInputText').addClass('is-valid');
        $('#checkInputText').removeClass('is-invalid');
    } else {
        $('#checkInputText').addClass('is-invalid');
        $('#checkInputText').removeClass('is-valid');
    }
});

$('#nextButton').click(function() {
    if(auxKanas.length == 0)
        auxKanas = myKanas.slice();

    $('#checkInputText').removeClass('is-invalid');
    $('#checkInputText').removeClass('is-valid');
    $('#checkInputText').val('');

    var lastKana = currentKana;
    while(lastKana == currentKana && myKanas.length > 1) {
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
