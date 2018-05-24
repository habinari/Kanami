$('#settingsModal input[type="checkbox"]').click(function(){
    var isChecked = $(this).is(':checked');
    if($(this).attr('id').indexOf("all") >= 0){
        $(this).closest('div[class="row"]').find('input[type="checkbox"]').prop('checked', isChecked);
    } else {
        var mustCheck = isChecked;
        if(isChecked) {
            $(this).closest('div[class="row"]').find('input[type="checkbox"]').each(function(){
                if($(this).attr('id').includes('all') && !$(this).is(':checked'))
                    mustCheck = false;
            });
        }
        $(this).closest('div[class="row"]').find('input[type="checkbox"]').first().prop('checked', mustCheck);
    }
});

$('#settingsModal input[type="radio"]').click(function(){
    var isHiragana = $('#settingsModal input[type="radio"]').first().is(':checked');
    $('div[name="hiraganas"]').toggle( isHiragana );
    $('div[name="hiraganas"]').toggle( ! isHiragana );
});

$('#settingsModal button[name="apply"]').click(function(){
    $modal = $('#settingsModal');
    var $radios = $modal.find('input[type="radio"]');
    currentSyllabary = $radios.first().is(':checked') ? 'HIRAGANA' : 'KATAKANA';

    $modal.modal('hide');

    var $kanaChecks;
    $kanaChecks = $modal.find('div[name = "' + ((currentSyllabary == 'HIRAGANA') ? "hiraganas" : 'katakanas') +'"]');

    myKanas = [];
    $kanaChecks.find('input').each(function(){
        if(!$(this).attr('id').includes('all') && $(this).is(':checked')){
            addKana($(this).val().substring(2), $(this).val().substring(0, 1));
        }
    });

    auxKanas = myKanas.splice();

    function addKana(romaji, syllabary){
        for(var i = 0; i < kanas.length; i++){
            if(kanas[i].romaji == romaji && kanas[i].syllabary == syllabary){
                myKanas.push(kanas[i]);
            }
        }
    }
});
