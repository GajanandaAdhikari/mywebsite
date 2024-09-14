const totalFrames = 3;
const pagesInMemory = new Array(totalFrames).fill(null); // Array to store pages in memory
const pageTable = [null, null, null, null]; // Each index represents a page and its frame number
let frameCounter = 0;
const fifoQueue = [];

function requestPage(pageNumber) {
    document.getElementById('cpuRequest').innerText = `Requesting Page: ${pageNumber}`;
    handlePageRequest(pageNumber);
}

function handlePageRequest(pageNumber) {
    const frameIndex = pageTable[pageNumber];

    if (frameIndex !== null) {
        // Page is already in memory
        highlightFrame(frameIndex, 'mainMemoryFrames');
        displayMessage(`Page ${pageNumber} is already in Frame ${frameIndex}`);
    } else {
        // Page fault occurs
        if (frameCounter < totalFrames) {
            // There is an available frame
            loadPageIntoMemory(pageNumber, frameCounter);
            frameCounter++;
        } else {
            // No available frame, replace using FIFO
            const pageToReplace = fifoQueue.shift(); // Oldest page
            const frameToReplace = pageTable[pageToReplace];
            replacePage(pageToReplace, pageNumber, frameToReplace);
        }
    }
}

function loadPageIntoMemory(pageNumber, frameIndex) {
    animateLoading(pageNumber, frameIndex);

    setTimeout(() => {
        pagesInMemory[frameIndex] = pageNumber;
        pageTable[pageNumber] = frameIndex;
        fifoQueue.push(pageNumber);

        updatePageTable();
        updateMainMemory();
        displayMessage(`Loaded Page ${pageNumber} into Frame ${frameIndex}`);
    }, 2000);
}

function replacePage(oldPage, newPage, frameIndex) {
    pageTable[oldPage] = null;
    animateLoading(newPage, frameIndex);

    setTimeout(() => {
        pagesInMemory[frameIndex] = newPage;
        pageTable[newPage] = frameIndex;
        fifoQueue.push(newPage);

        updatePageTable();
        updateMainMemory();
        displayMessage(`Replaced Page ${oldPage} with Page ${newPage} in Frame ${frameIndex}`);
    }, 2000);
}

function animateLoading(pageNumber, frameIndex) {
    const storageFrame = document.getElementById(`storageP${pageNumber}`);
    const mainMemoryFrame = document.getElementById(`frame${frameIndex}`);

    storageFrame.classList.add('animate');
    setTimeout(() => {
        mainMemoryFrame.classList.add('highlight');
        storageFrame.classList.remove('animate');
    }, 2000);
}

function updatePageTable() {
    const pageTableDiv = document.getElementById('pageTable');
    pageTableDiv.innerHTML = pageTable.map((frame, pageIndex) => `
        <div class="frame">Page ${pageIndex}: ${frame !== null ? 'Frame ' + frame : 'Not in Memory'}</div>
    `).join('');
}

function updateMainMemory() {
    const mainMemoryDiv = document.getElementById('mainMemoryFrames');
    mainMemoryDiv.innerHTML = pagesInMemory.map((page, frameIndex) => `
        <div class="frame" id="frame${frameIndex}">Frame ${frameIndex}: ${page !== null ? 'Page ' + page : 'Empty'}</div>
    `).join('');
}

function highlightFrame(frameIndex, memoryId) {
    const memoryDiv = document.getElementById(memoryId);
    memoryDiv.children[frameIndex].classList.add('highlight');
    setTimeout(() => {
        memoryDiv.children[frameIndex].classList.remove('highlight');
    }, 1000);
}

function displayMessage(message) {
    document.getElementById('messages').innerText = message;
}

// Initialize Memory and Page Table display
function init() {
    const mainMemoryDiv = document.getElementById('mainMemoryFrames');
    for (let i = 0; i < totalFrames; i++) {
        mainMemoryDiv.innerHTML += `<div class="frame" id="frame${i}">Frame ${i}: Empty</div>`;
    }
    updatePageTable();
}

init();
