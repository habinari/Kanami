$('#settingsModal').find('input[type="checkbox"]').click(function(){
    var isChecked = $(this).prop('checked');
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

$('#settingsModal').find('input[type="radio"]').click(function(){
    if($('#settingsModal').find('input[type="radio"]').eq(0).prop('checked')){
        $('div[name="hiraganas"]').show();
    } else {
        $('div[name="hiraganas"]').hide();
    }
});

$('#settingsModal').find('button[name="apply"]').click(function(){
    $modal = $('#settingsModal');
    var $radios = $('#settingsModal').find('input[type="radio"]');
    currentSyllabary = $radios.eq(0).prop('checked') ? 'HIRAGANA' : 'KATAKANA';

    $('#settingsModal').modal('hide');

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
        if(!$(this).attr('id').includes('all') && $(this).prop('checked')){
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
