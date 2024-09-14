document.addEventListener('DOMContentLoaded', () => {
    const visualizeButtons = document.querySelectorAll('.visualize-btn');
    const selectButtons = document.querySelectorAll('.select-btn');
    let selectedAlgorithms = [];

    // Add event listeners to visualize buttons
    visualizeButtons.forEach(button => {
        button.addEventListener('click', event => {
            const algorithm = event.target.closest('.card').querySelector('h3').innerText;
            visualizeAlgorithm(algorithm);
        });
    });

    // Function to visualize the selected algorithm
    function visualizeAlgorithm(algorithm) {
        let htmlFile;
        switch (algorithm) {
            case 'Bubble Sort':
                htmlFile = 'bubbleSort.html';
                break;
            case 'Merge Sort':
                htmlFile = 'mergeSort.html';
                break;
            case 'Insertion Sort':
                htmlFile = 'insertionSort.html';
                break;
            case 'Quick Sort':
                htmlFile = 'quickSort.html';
                break;
            case 'Selection Sort':
                htmlFile = 'selectionSort.html';
                break;
            default:
                console.log('Algorithm not supported');
                return;
        }

        window.location.href = htmlFile;
    }

    // Function to update the compare button state
    function updateCompareButton() {
        if (selectedAlgorithms.length > 1) {
            compareButton.disabled = false;
        } else {
            compareButton.disabled = true;
        }
    }

    // Function to compare selected algorithms
    function compareAlgorithms(algorithms) {
        console.log('Comparing algorithms:', algorithms);
        // Implement comparison logic here
    }
});
