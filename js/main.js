document.addEventListener('DOMContentLoaded', () => {
    const visualizeButtons = document.querySelectorAll('.visualize-btn');
    const selectButtons = document.querySelectorAll('.select-btn');
    const compareButton = document.querySelector('.compare-btn');
    let selectedAlgorithms = [];

    visualizeButtons.forEach(button => {
        button.addEventListener('click', event => {
            const algorithm = event.target.closest('.card').querySelector('p').innerText;
            visualizeAlgorithm(algorithm);
        });
    });

    selectButtons.forEach(button => {
        button.addEventListener('click', event => {
            const algorithm = event.target.closest('.card').querySelector('p').innerText;
            if (!selectedAlgorithms.includes(algorithm)) {
                selectedAlgorithms.push(algorithm);
            }
            updateCompareButton();
        });
    });

    compareButton.addEventListener('click', () => {
        if (selectedAlgorithms.length > 1) {
            compareAlgorithms(selectedAlgorithms);
        } else {
            alert('Select at least two algorithms to compare.');
        }
    });

    function visualizeAlgorithm(algorithm) {
        // Logic to visualize the algorithm
        // Example: window.location.href = `${algorithm.toLowerCase()}Sort.html`;
        alert(`Visualizing ${algorithm}`);
    }

    function compareAlgorithms(algorithms) {
        // Logic to compare algorithms
        // Example: window.location.href = `compare.html?algorithms=${algorithms.join(',')}`;
        alert(`Comparing ${algorithms.join(', ')}`);
    }

    function updateCompareButton() {
        if (selectedAlgorithms.length > 1) {
            compareButton.style.display = 'block';
        } else {
            compareButton.style.display = 'none';
        }
    }
});
