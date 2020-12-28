document.addEventListener('DOMContentLoaded', function() {

    const timeline = document.querySelector('nav');
    const events = timeline.querySelectorAll('li');
    const images = document.querySelectorAll('.gallery .event');

    document.body.style.height = (100 + events.length * 15) + 'vh';
    window.addEventListener('scroll', render);
    render();

    function render() {
        const progress = document.body.scrollTop / (document.body.scrollHeight - window.innerHeight);
        const index = Math.min(Math.floor((events.length) * progress), events.length-1);
        const internalProgress = ((events.length-1) * progress - index);
        singleOut(events, index, 'active');
        singleOut(images, index, 'active');
        timeline.style.top = -(timeline.offsetHeight - window.innerHeight) * progress + 'px';
    }

    function singleOut(collection, index, cls) {
        if (collection[index].classList.contains(cls) === false) {
            collection.forEach(element => element.classList.remove('active'));
            collection[index].classList.add('active')
        }
    }

})