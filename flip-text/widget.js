window.addEvent('domready', function () {
    
    var widgetC = $('widgetCode');
    
    widgetC.addEvent('focus', function(e) {
            this.select();
    });
    widgetC.addEvent('mouseup', function(e) {
            e.preventDefault();//prevents bug in webkit, effecting Safari and Chrome, which deselects selected textarea on mouseup
    });

});