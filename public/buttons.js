document.addEventListener('DOMContentLoaded', function() {

    var release = null;

    document.body.addEventListener('mousedown', function(e) {
        const button = e.target.closest('buttonset button');
        if (button) {
            release = button.matches('.pressed') ? button : null;
            button.classList.add('pressed','deep');
        }
    })

    document.body.addEventListener('mouseup', function(e) {
        const button = e.target.closest('buttonset button');
        const buttonset = e.target.closest('buttonset');
        if (button) {
            const pressed = release !== button || buttonset.matches('.switch');
            press(button, pressed)
            if (buttonset.matches('.switch') && pressed) {
                buttonset.querySelectorAll('button').forEach(other => {
                    if (other !== button) {
                        press(other, false);
                    }
                })
            }
        }
    })

    function press(button, pressed) {
        button.classList.remove('deep');
        if (pressed == false) {
            button.classList.remove('pressed')
        }
        document.dispatchEvent(new CustomEvent('buttonpressed', {
            detail: {
                button: button,
                buttonset: button.closest('buttonset'),
                pressed: pressed
            }
        }));
    }

});