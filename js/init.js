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
    var $column = $('template#column');
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
            $kanaCheckers.find('.row').last().find('input').attr('id', "all" +
                kanas[i].syllabary + "-" + kanas[i].romaji.substring(0,1));
                $kanaCheckers.find('.row').last().find('input').val(kanas[i].syllabary + "-" +
                    kanas[i].romaji.substring(0,1));
        }

        var $currentRow = $kanaCheckers.find('.row').last().find('.col-8');
        $currentRow.append($column.html());
        $currentRow.find('div').last().find('label').text(kanas[i].character);
        var kanaId = kanas[i].syllabary + "-" + kanas[i].romaji;
        $currentRow.find('div').last().find('input').attr('id', "check" + kanaId);
        $currentRow.find('div').last().find('input').val(kanaId);
    }

    $('#settingsModal input[type="radio"]').first().is(':checked', true);
    $('#settingsModal input[type="radio"]').last().is(':checked', false);
    $('#katakanas').hide();

    $('#settingsModal input[type="checkbox"]').click(function(){
        var isChecked = $(this).is(':checked');
        if($(this).attr('id').includes("all")){
            $(this).closest('div[class="row"]').find('input[type="checkbox"]').prop('checked', isChecked);
        } else {
            var mustCheck = isChecked;
            if(isChecked) {
                $(this).closest('div.row').find('input[type="checkbox"]').each(function(){
                    if(!$(this).attr('id').includes('all') && !$(this).is(':checked'))
                        mustCheck = false;
                });
            }
            $(this).closest('div.row').find('input[type="checkbox"]').first().prop('checked', mustCheck);
        }
    });
});
