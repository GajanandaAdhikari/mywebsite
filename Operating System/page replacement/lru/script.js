document.getElementById('startButton').addEventListener('click', () => {
    const pageSizes = parseInt(document.getElementById('pageSizes').value);
    const frameSizes = parseInt(document.getElementById('frameSizes').value);
    const pagesInput = document.getElementById('pagesInput').value.split(',').map(Number);

    if (pagesInput.length !== pageSizes) {
        alert('The number of pages does not match the total number of pages specified.');
        return;
    }

    const frames = Array(frameSizes).fill(-1); // Initialize frames
    const lastUsed = Array(frameSizes).fill(-1); // To track when frames were last used
    let hits = 0;
    let faults = 0;

    const outputTable = document.querySelector('#output tbody');
    const framesContainer = document.getElementById('frames');
    const statusDiv = document.getElementById('status');
    const nextButton = document.getElementById('nextButton');
    const frameHeaders = document.getElementById('frameHeaders');

    // Clear previous outputs
    outputTable.innerHTML = '';
    framesContainer.innerHTML = '';
    frameHeaders.innerHTML = '';

    // Create frame headers dynamically
    for (let i = 0; i < frameSizes; i++) {
        const frameHeader = document.createElement('th');
        frameHeader.textContent = `Frame ${i + 1}`;
        frameHeaders.parentNode.insertBefore(frameHeader, frameHeaders);
    }

    // Create frame display area dynamically
    for (let i = 0; i < frameSizes; i++) {
        const frameDiv = document.createElement('div');
        frameDiv.className = 'frame';
        frameDiv.textContent = `Frame ${i + 1}`;
        framesContainer.appendChild(frameDiv);
    }

    const updateFramesDisplay = () => {
        const frameDivs = framesContainer.querySelectorAll('.frame');
        frameDivs.forEach((frameDiv, index) => {
            frameDiv.textContent = frames[index] === -1 ? '' : frames[index];
        });
    };

    const updateTable = (currentPage, isHit) => {
        const row = document.createElement('tr');
        const pageCell = document.createElement('td');
        pageCell.textContent = currentPage;
        row.appendChild(pageCell);

        frames.forEach(frame => {
            const frameCell = document.createElement('td');
            frameCell.textContent = frame === -1 ? '_' : frame;
            row.appendChild(frameCell);
        });

        const statusCell = document.createElement('td');
        statusCell.textContent = isHit ? 'Hit' : 'Fault';
        statusCell.className = isHit ? 'hit' : 'fault';
        row.className = !isHit ? 'fault-row' : 'hit-row';
        row.appendChild(statusCell);

        outputTable.appendChild(row);
    };

    const findLRUIndex = () => {
        let minLastUsed = Math.min(...lastUsed);
        return lastUsed.indexOf(minLastUsed);  // Return index of least recently used frame
    };

    const animateSteps = (index) => {
        if (index >= pagesInput.length) {
            statusDiv.textContent = `Hits: ${hits}, Faults: ${faults}`;
            nextButton.style.display = 'block';
            return;
        }

        const page = pagesInput[index];
        let isHit = false;

        // Check if the page is already in any frame (hit case)
        for (let i = 0; i < frameSizes; i++) {
            if (frames[i] === page) {
                isHit = true;
                hits++;
                lastUsed[i] = index; // Update the time the page was last used
                break;
            }
        }

        if (!isHit) {
            // Page fault: Replace the least recently used page
            const replaceIndex = findLRUIndex();
            frames[replaceIndex] = page;
            lastUsed[replaceIndex] = index;  // Update last used time
            faults++;
        }

        updateFramesDisplay();  // Update frames immediately after changes
        updateTable(page, isHit);  // Then update the table

        // Animate the current row update
        const rows = outputTable.querySelectorAll('tr');
        const lastRow = rows[rows.length - 1];
        if (lastRow) {
            lastRow.classList.add('highlight-row');
        }

        setTimeout(() => {
            // Remove the highlight effect
            if (lastRow) {
                lastRow.classList.remove('highlight-row');
            }

            setTimeout(() => animateSteps(index + 1), 2000);  // Delay before the next step
        }, 1000);  // Initial delay for the current step
    };

    // Hide input fields and start the animation
    document.querySelector('.input-section').style.display = 'none';
    document.querySelector('.input-pages').style.display = 'none';
    document.getElementById('startButton').style.display = 'none';
    nextButton.style.display = 'none';

    animateSteps(0);
});

document.getElementById('nextButton').addEventListener('click', () => {
    // Reset for new data
    location.reload(true);
    document.querySelector('.input-section').style.display = 'block';
    document.querySelector('.input-pages').style.display = 'block';
    document.getElementById('startButton').style.display = 'block';
    document.getElementById('nextButton').style.display = 'none';
    document.getElementById('output').querySelector('tbody').innerHTML = '';
    document.getElementById('frames').innerHTML = '';
    document.getElementById('status').textContent = '';
});
