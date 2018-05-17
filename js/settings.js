$('#settingsModal input[type="checkbox"]').click(function(){
    var isChecked = $(this).is(':checked');
    if($(this).attr('id').indexOf("all") >= 0){
        $(this).closest('div[class="row"]').find('input[type="checkbox"]').prop('checked', isChecked);
    } else {
        var mustCheck = isChecked;
        if(isChecked) {
            $(this).closest('div[class="row"]').find('input[type="checkbox"]').each(function(){
                if($(this).attr('id').indexOf("all") && !$(this).is(':checked'))
                    mustCheck = false;
            });
        }
        $(this).closest('div[class="row"]').find('input[type="checkbox"]').first().prop('checked', mustCheck);
    }
});

$('#settingsModal input[type="radio"]').click(function(){
    $('div[name="hiraganas"]').toggle( $('#settingsModal input[type="radio"]').first().is(':checked') );
});

$('#settingsModal button[name="apply"]').click(function(){
    $modal = $('#settingsModal');
    var $radios = $modal.find('input[type="radio"]');
    currentSyllabary = $radios.eq(0).prop('checked') ? 'HIRAGANA' : 'KATAKANA';

    $modal.modal('hide');

    var $kanaChecks;
    if(currentSyllabary == 'HIRAGANA'){
        $kanaChecks = $modal.find('div[name = "hiraganas"]');
    } else {
        //TODO: completar con el silabario katakana, tambien requiere incluirlos en el html
    }

    filterKanas($kanaChecks);
});

function filterKanas($kanaChecks){
    myKanas = [];
    $kanaChecks.find('input').each(function(){
        if(!$(this).attr('id').includes('all') && $(this).is(':checked')){
            addKana($(this).val().substring(2), $(this).val().substring(0, 1));
        }
    });
}

function addKana(romaji, syllabary){
    for(var i = 0; i < kanas.length; i++){
        if(kanas[i].romaji == romaji && kanas[i].syllabary == syllabary){
            myKanas.push(kanas[i]);
        }
    }
}
