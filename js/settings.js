$('#settingsModal input[type="radio"]').click(function(){
    var isHiragana = $('#settingsModal input[type="radio"]').first().is(':checked');
    $('#hiraganas').toggle( isHiragana );
    $('#katakanas').toggle( ! isHiragana );
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
