(
    function () {
        var div1 = document.getElementById('wordsToHighlight');
        if(div1 !== null) {
            var words = JSON.parse(div1.getAttribute('words'));
            for (var i in words) {
                doSearch(words[i], 'yellow');
            }
            setTimeout(function(){
                window.scrollTo({ top: 0 });
            },200);
        }

        function doSearch(text, backgroundColor) {
            if (window.find && window.getSelection) {
                document.designMode = "on";
                var sel = window.getSelection();
                sel.collapse(document.body, 0);

                while (window.find(text)) {
                    document.execCommand("HiliteColor", false, backgroundColor);
                    sel.collapseToEnd();
                }
                document.designMode = "off";
            }
        }
})();