(function() {

    window.scrolling = {};
    window.scrolling.restart = restart;

    var timeline, events, eventsIds, images, imagesIds, currentIndex;
    
    document.addEventListener('DOMContentLoaded', () => {
        restart();
        window.addEventListener('scroll', render);
    });

    function restart() {
        timeline = document.querySelector('main .timeline');
        events = timeline.querySelectorAll('li').toArray();
        eventsIds = events.map(element => element.getAttribute('data-id'));
        images = document.querySelectorAll('.gallery .event').toArray();
        imagesIds = images.map(element => element.getAttribute('data-id'));
        currentIndex = null;
        render();
    }

    function render() {
        const progress = document.body.scrollTop / (document.body.scrollHeight - window.innerHeight);
        const index = Math.min(Math.floor((events.length) * progress), events.length-1);
        if (index != currentIndex) {
            markSingle(events, index, 'active');
            throttle(50, () => markSingle(images, imagesIds.indexOf(eventsIds[index]), 'active'));
            currentIndex = index;
        }
    }

    function markSingle(collection, index, cls) {
        for (let i = 0; i < collection.length; i++) {
            collection[i].classList[i == index ? 'add' : 'remove'](cls);
        }
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