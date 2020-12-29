(function() {

    const preferences = {
        time_direction: 'forward'
    }

    document.addEventListener('buttonpressed', function(e) {
        if (e.detail.buttonset.getAttribute('name') == 'time-direction' && e.detail.pressed) {
            preferences.time_direction = e.detail.button.name;
            render();
        }
    })

    function render() {
        const context = { ...timeline }
        if (preferences.time_direction == 'backwards') {
            context.events = Array.from(context.events).reverse();
        }
        const template = document.querySelector('template[name="nav-loop"]').innerHTML;
        const engine = new window.liquidjs.Liquid();
        engine.parseAndRender(template, context)
            .then(html => {
                document.querySelector('nav .timeline').innerHTML = html;
                window.scrolling.restart();
            });
    }
    
})();