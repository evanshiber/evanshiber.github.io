document.addEventListener('DOMContentLoaded', function() {
    // Typing animation
    const texts = ["Network Security", "Penetration Testing", "Software Development"];
    let count = 0;
    let index = 0;
    let currentText = '';
    let letter = '';
    let isDeleting = false;

    function type() {
        if (count === texts.length) count = 0;
        currentText = texts[count];

        if (isDeleting) {
            letter = currentText.slice(0, --index);
        } else {
            letter = currentText.slice(0, ++index);
        }

        document.querySelector('.hero--section--title span').textContent = letter;

        let typeSpeed = 60;
        if (isDeleting) typeSpeed /= 3;

        if (!isDeleting && letter.length === currentText.length) {
            setTimeout(() => {
                isDeleting = true;
                type();
            }, 1000);
        } else if (isDeleting && letter.length === 0) {
            isDeleting = false;
            count++;
            setTimeout(type, 500);
        } else {
            setTimeout(type, typeSpeed);
        }
    }

    type();

    // Slideshow functionality
    const prevSlide = document.querySelector('.prev-slide');
    const nextSlide = document.querySelector('.next-slide');
    const canvas = document.getElementById('pdf-canvas');
    const pageNumDisplay = document.getElementById('page-num');
    const pageCountDisplay = document.getElementById('page-count');
    const ctx = canvas.getContext('2d');

    let pdfDoc = null;
    let pageNum = 1;
    let pageRendering = false;
    let pageNumPending = null;

    pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.16.105/pdf.worker.min.js';

    pdfjsLib.getDocument('Faculty Presentation (1).pdf').promise.then(function(pdfDoc_) {
        pdfDoc = pdfDoc_;
        pageCountDisplay.textContent = pdfDoc.numPages;
        renderPage(pageNum);
    }).catch(function(error) {
        console.error('Error loading PDF:', error);
        alert('Failed to load the slideshow. Please ensure the PDF file is correctly placed.');
    });

    function renderPage(num) {
        pageRendering = true;
        pdfDoc.getPage(num).then(function(page) {
            const viewport = page.getViewport({ scale: 0.75 });
            canvas.height = viewport.height;
            canvas.width = viewport.width;

            const renderContext = {
                canvasContext: ctx,
                viewport: viewport
            };
            page.render(renderContext).promise.then(function() {
                pageRendering = false;
                pageNumDisplay.textContent = num;
                if (pageNumPending !== null) {
                    renderPage(pageNumPending);
                    pageNumPending = null;
                }
            });
        });
    }

    function queueRenderPage(num) {
        if (pageRendering) {
            pageNumPending = num;
        } else {
            renderPage(num);
        }
    }

    prevSlide.addEventListener('click', function() {
        if (pageNum <= 1) return;
        pageNum--;
        queueRenderPage(pageNum);
    });

    nextSlide.addEventListener('click', function() {
        if (pageNum >= pdfDoc.numPages) return;
        pageNum++;
        queueRenderPage(pageNum);
    });
});
