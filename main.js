document.addEventListener("DOMContentLoaded", function() {
    var myFullpage = new fullpage('.fullpage', {
        autoScrolling:false
    });
});



const statusElements = document.querySelectorAll('.status');

statusElements.forEach(statusElement => {
    const text = statusElement.textContent;
    let index = 0;

    function type() {
        if (index < text.length) {
            statusElement.innerHTML = text.slice(0, index + 1) + '<span class="blinking-cursor">|</span>'; // Wrap cursor in span
            index++;
            setTimeout(type, 250); // schedule the next character
        } else {
            statusElement.innerHTML = text + '<span class="blinking-cursor">|</span>'; // Wrap cursor in span
            setTimeout(() => {
                index = 0;
                statusElement.textContent = '';
                type(); // start typing again
            }, 3000); // pause before restarting
        }
    }

    type(); // initial call to start typing
});


