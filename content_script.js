var s = document.createElement('script');
s.src = chrome.extension.getURL('scriptToAppendToDom.js');
s.onload = function() {
    this.remove();
};
(document.head || document.documentElement).appendChild(s);

var xhr = new XMLHttpRequest();
xhr.open('GET', chrome.extension.getURL('linksAndWords.txt'), true);
xhr.onreadystatechange = function()
{
    if(xhr.readyState == XMLHttpRequest.DONE && xhr.status == 200)
    {
        var txt = xhr.responseText;
        var activePageUrl = window.location.href;
        var lines = txt.split('\n');
        var skipTillNextUrl = false;
        var wordsToHighlight = [];
        for(var i = 0;i < lines.length;i++){
            var textline = lines[i];
            var isWord = startsWithSpace(textline);
            var isUrl = !isWord;
            if(isUrl){
                var url = textline.trim();
                skipTillNextUrl = !activePageUrl.includes(url);
            }
            else{
                if(!skipTillNextUrl){
                    var word = textline.trim();
                    if(word.length) //do not highlight blank space
                        wordsToHighlight.push(word);
                }
            }
        }
        console.log('words detected to highlight:');
        console.log(wordsToHighlight);
        g = document.createElement('div');
        g.setAttribute("id", "wordsToHighlight");
        g.setAttribute('words', JSON.stringify(wordsToHighlight));
        g.onload = function() {
            this.remove();
        };
        (document.head || document.documentElement).appendChild(g);
    }
};
xhr.send();

var startsWithSpace = function(string) {
    return string.indexOf(string.trim()) != 0;
};