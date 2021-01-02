(function() {

    window.scrolling = {};
    window.scrolling.restart = restart;

    var events, eventsIds, vehicles, vehicleNames,
        images, imagesIds, statusPerEvent, currentIndex;
    
    document.addEventListener('DOMContentLoaded', () => {
        restart(window.timeline);
        window.addEventListener('scroll', render);
    });

    function restart(timeline) {
        const attr = name => element => element.getAttribute(name);
        const famousVehicles = Object.keys(timeline.hall_of_fame);
        events = document.querySelectorAll('main .timeline li').toArray();
        eventsIds = events.map(attr('data-id'));
        images = document.querySelectorAll('.gallery .event').toArray();
        vehicles = document.querySelectorAll('.gallery .vehicle').toArray();
        vehicleNames = vehicles.map(attr('data-vehicle'));
        imagesIds = images.map(attr('data-id'));
        statusPerEvent = prepareStatusOfAllVehiclesForEachEvent(timeline.events, famousVehicles);
        currentIndex = null;
        render();
    }

    function render() {
        const progress = document.body.scrollTop / (document.body.scrollHeight - window.innerHeight);
        const index = Math.min(Math.floor((events.length) * progress), events.length-1);
        if (index != currentIndex) {
            changeEvent(index);
        }
    }

    function changeEvent(index) {
        markSingle(events, index, 'current');
        throttle(150, () => {
            const status = statusPerEvent[index];
            const vehicleNames = Object.keys(status);
            markImage(index, 'current')
            markVehicles(vehicleNames, 'active');
            markImagePerVehicle(status, 'most-recent');
            document.body.style.setProperty('--number-of-active-vehicles', vehicleNames.length);
        });
        currentIndex = index;
    }

    function prepareStatusOfAllVehiclesForEachEvent(events, famous) {
        const status = {};
        const lastOfVehicle = vehicle => events.where('vehicle', vehicle).last();
        let stop = null;
        return events.map(event => {
            if (stop) {
                delete(status[stop]);
            }
            status[event.vehicle] = event;
            if (famous.includes(event.vehicle) && event == lastOfVehicle(event.vehicle)) {
                stop = event.vehicle;
            }
            return { ...status };
        })
    }

    function markSingle(collection, index, cls) {
        for (let i = 0; i < collection.length; i++) {
            collection[i].classList[i == index ? 'add' : 'remove'](cls);
        }
    }

    function markMultiple(collection, indexs, cls) {
        for (let i = 0; i < collection.length; i++) {
            collection[i].classList[indexs.includes(i) ? 'add' : 'remove'](cls);
        }
    }

    function markImage(eventIndex, cls) {
        markSingle(images, imagesIds.indexOf(eventsIds[eventIndex]), cls);
    }

    function markVehicles(names, cls) {
        const index = name => vehicleNames.indexOf(name)
        markMultiple(vehicles, names.map(index), cls);
    }

    function markImagePerVehicle(status, cls) {
        const index = name => vehicleNames.indexOf(name)
        Object.entries(status).forEach(([vehicle, event]) => {
            markEvent(vehicles[index(vehicle)].children.toArray(), event.id, cls);
        });
    }

    function markEvent(collection, id, cls) {
        collection.forEach(element => {
            const action = element.getAttribute('data-id') == id ? 'add' : 'remove';
            element.classList[action](cls);
        });
    }

    function throttle(delay, fn) {
        this.lastCall = this.lastCall || 0;
        const now = Date.now();
        const timePassed = (now - this.lastCall);
        if (timePassed >= delay) {
            this.lastCall = now;
            fn();
        } else {
            const wait = (delay - timePassed);
            clearTimeout(this.timeout);
            this.timeout = setTimeout(() => {
                this.lastCall = now;
                fn();
            }, wait);
        }
    }

})();