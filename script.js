document.addEventListener('DOMContentLoaded', function() {
    const texts = ["Network Security", "Penetration Testing", "Software Development"];
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

        if (isDeleting) {
            // Deleting characters
            console.log('Deleting characters');
            letter = currentText.slice(0, --index);
        } else {
            // Typing characters
            letter = currentText.slice(0, ++index);
        }

        document.querySelector('.hero--section--title span').textContent = letter;

        let typeSpeed = 300;
        if (isDeleting) {
            typeSpeed /= 4; // Speed up when deleting
        }

        if (!isDeleting && letter.length === currentText.length) {
            // Pause before starting to delete
            console.log('Pausing before starting to delete');
            setTimeout(() => {
                isDeleting = true;
                type();
            }, 2000);
        } else if (isDeleting && letter.length === 0) {
            // Pause before typing the next text
            console.log('Pausing before typing the next text');
            isDeleting = false;
            count++;
            setTimeout(type, 500);
        } else {
            setTimeout(type, typeSpeed);
        }
    }

    type();
});