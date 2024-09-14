// script.js

// Function to generate random data points
function generateRandomData(numPoints) {
    const data = [];
    for (let i = 0; i < numPoints; i++) {
        // Create random points with two features
        const x = Math.random() * 800;
        const y = Math.random() * 600;
        data.push({ x, y });
    }
    return data;
}

// Function to draw the Random Forest visualization
function drawForest(numTrees, maxDepth) {
    const canvas = document.getElementById('forestCanvas');
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const data = generateRandomData(100); // Generate 100 random data points

    // Draw data points
    ctx.fillStyle = 'blue';
    data.forEach(point => {
        ctx.beginPath();
        ctx.arc(point.x, point.y, 3, 0, Math.PI * 2);
        ctx.fill();
    });

    // Draw trees
    for (let i = 0; i < numTrees; i++) {
        drawDecisionTree(ctx, 100 + i * 60, 50, maxDepth);
    }
}

// Function to draw a simple decision tree
function drawDecisionTree(ctx, x, y, depth) {
    if (depth === 0) return;

    // Draw the tree node
    ctx.fillStyle = 'green';
    ctx.fillRect(x, y, 20, 20);

    // Draw branches
    ctx.beginPath();
    ctx.moveTo(x + 10, y + 20);
    ctx.lineTo(x - 30, y + 60); // Left branch
    ctx.lineTo(x + 10, y + 20);
    ctx.lineTo(x + 70, y + 60); // Right branch
    ctx.stroke();

    // Recursive calls for child nodes
    drawDecisionTree(ctx, x - 30, y + 60, depth - 1);
    drawDecisionTree(ctx, x + 70, y + 60, depth - 1);
}

// Event listener for the visualize button
document.getElementById('visualizeBtn').addEventListener('click', () => {
    const numTrees = parseInt(document.getElementById('numTrees').value);
    const treeDepth = parseInt(document.getElementById('treeDepth').value);
    drawForest(numTrees, treeDepth);
});

// Initial visualization
drawForest(5, 3);