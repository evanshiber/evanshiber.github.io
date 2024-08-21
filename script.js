document.addEventListener('DOMContentLoaded', function() {
    const texts = ["Cybersecurity", "Network Security", "Software Enthusiast"];
    let count = 0;
    let index = 0;
    let currentText = '';
    let letter = '';
    let isDeleting = false;

    function type() {
        if (count === texts.length) {
            count = 0;
        }
        currentText = texts[count];
        console.log('Current Text:', currentText); // Debugging

        if (isDeleting) {
            // Deleting characters
            letter = currentText.slice(0, --index);
            console.log('Deleting:', letter); // Debugging
        } else {
            // Typing characters
            letter = currentText.slice(0, ++index);
            console.log('Typing:', letter); // Debugging
        }

        document.querySelector('.hero--section--title span').textContent = letter;

        let typeSpeed = 100;
        if (isDeleting) {
            typeSpeed /= 2; // Speed up when deleting
        }

        if (!isDeleting && letter.length === currentText.length) {
            // Pause before starting to delete
            setTimeout(() => {
                isDeleting = true;
                type();
            }, 2000);
        } else if (isDeleting && letter.length === 0) {
            // Pause before typing the next text
            isDeleting = false;
            count++;
            setTimeout(type, 500);
        } else {
            setTimeout(type, typeSpeed);
        }
    }

    type();
});
