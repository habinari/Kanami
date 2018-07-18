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

    var $row = $('template#row');
    var $kanaCheckers;
    var lastRow = -1;
    for(var i = 0; i < kanas.length; i++)
    {
        if(lastRow != kanas[i].row)
        {
            lastRow = kanas[i].row;
            if(kanas[i].syllabary == "H")
            {
                $kanaCheckers = $('div[name="hiraganas"]');
            } else {
                $kanaCheckers = $('div[name="katakanas"]');
            }
            $kanaCheckers.append($row.html());
            $kanaCheckers.find('.row').last().find('label').text(kanas[i].romaji.substring(0,1));

        }
    }

});
