const cards = document.querySelectorAll('.card');

cards.forEach(card => {
    card.addEventListener('click', () => {
        const link = card.dataset.link;

        //  Add a slight "fall" effect before navigation:
        card.style.transform = 'translateY(5px)';
        card.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.2)';

        setTimeout(() => {
            window.location.href = link;
        }, 200); // Adjust timeout for desired animation speed
    });
});