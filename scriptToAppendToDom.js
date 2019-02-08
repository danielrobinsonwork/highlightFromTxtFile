$(document).ready(function() {
    var words = JSON.parse($('#wordsToHighlight').attr('words'));
    for (var i in words) {
        highLightInDom(words[i]);
    }
});

function highLightInDom(word){
    var $wordInDom = $(':contains("' + word + '"):not(:has(div, p))');
    if ($wordInDom.length) {
        $wordInDom.each(function(){
            var orgText = $(this).html();
            orgText = replaceAll(orgText, word);
            $(this).html(orgText);
        });
    }
}

function replaceAll(orgText, search) {
    return orgText.replace(new RegExp(search, 'g'), "<span style='background-color: yellow;'>" + search + "</span>");
}