(function (win) {
    var tid;
    function refreshRem() {
        var html = document.documentElement;
        var htmlWidth = html.getBoundingClientRect().width;
        html.style.fontSize = htmlWidth/15+'px';
    }
    refreshRem();
    function ycRefresh() {
        clearTimeout(tid);
        tid = setTimeout(refreshRem,100)
    }

    win.addEventListener('resize',function () {
        ycRefresh();
    },false);
})(window);
