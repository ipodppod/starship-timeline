(function() {

    const preferences = {
        time_direction: 'forward',
        exclude_types: [],
        exclude_vehicles: []
    }

    document.addEventListener('DOMContentLoaded', function(e) {
        document.querySelector('main menu li[name="preferences"]').addEventListener('click', function() {
            document.body.classList.add('show-preferences');
        })
        document.querySelector('main menu li[name="close"]').addEventListener('click', function() {
            document.body.classList.remove('show-preferences');
        })
        document.querySelector('.preferences [name="types"]').addEventListener('change', function(e) {
            addOrRemoveFromPreferences('exclude_types', e.target.name, ! e.target.checked)
            render();
        })
        document.querySelector('.preferences [name="vehicles"]').addEventListener('change', function(e) {
            addOrRemoveFromPreferences('exclude_vehicles', e.target.name, ! e.target.checked)
            render();
        })
    })

    document.addEventListener('buttonpressed', function(e) {
        if (e.detail.buttonset.getAttribute('name') == 'time-direction' && e.detail.pressed) {
            preferences.time_direction = e.detail.button.name;
            render();
        }
    })

    function addOrRemoveFromPreferences(property, name, add) {
        if (add) {
            preferences[property].push(name)
        } else {
            preferences[property] = preferences[property].delete(name)
        }
    }

    function render() {
        const template = document.querySelector('template[name="nav-loop"]').innerHTML;
        const engine = new window.liquidjs.Liquid();
        engine.parseAndRender(template, createContext())
            .then(html => {
                document.querySelector('main nav').innerHTML = html;
                window.scrolling.restart();
            });
    }

    function createContext() {
        const context = { ...timeline }
        if (preferences.time_direction == 'backwards') {
            context.events = Array.from(context.events).reverse();
        }
        context.events = context.events.filter(event => {
            return preferences.exclude_types.includes(event.type) == false;
        })
        context.events = context.events.filter(event => {
            return preferences.exclude_vehicles.includes(event.vehicle) == false;
        })
        return context;
    }
    
})();