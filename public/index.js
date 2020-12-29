document.addEventListener('DOMContentLoaded', function() {

    const timeline = document.querySelector('nav');
    const events = timeline.querySelectorAll('li');
    const images = document.querySelectorAll('.gallery .event');

    window.addEventListener('scroll', render);
    render();

    function render() {
        const progress = document.body.scrollTop / (document.body.scrollHeight - window.innerHeight);
        const index = Math.min(Math.floor((events.length) * progress), events.length-1);
        if (index != this.index) {
            markSingle(events, index, 'active');
            throttle(50, () => markSingle(images, index, 'active'));
            this.index = index;
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

})