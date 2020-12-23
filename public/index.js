document.addEventListener('DOMContentLoaded', function() {

    const timeline = document.querySelector('nav');
    const events = timeline.querySelectorAll('li');
    const gallery = document.querySelector('.gallery')

    document.body.style.height = (100 + events.length * 15) + 'vh';
    window.addEventListener('scroll', render);
    render();

    function render() {
        const progress = document.body.scrollTop / (document.body.scrollHeight - window.innerHeight);
        const index = Math.min(Math.floor((events.length) * progress), events.length-1);
        const internalProgress = ((events.length-1) * progress - index);
        const event = events[index];
        if (event.classList.contains('active') === false) {
            const active = document.querySelector('nav li.active');
            active && active.classList.remove('active');
            event.classList.add('active')
        }
        gallery.style.top = - index * 100 + 'vh';
        timeline.style.top = -(timeline.offsetHeight - window.innerHeight) * progress + 'px';
    }

})