// Set up the SVG
const treeSvg = d3.select('#tree-svg');
const treeWidth = 800;
const treeHeight = 600;
const treeMargin = { top: 20, right: 20, bottom: 20, left: 20 };

// Set up the Random Forest parameters
let numTrees = 10;
let maxDepth = 5;

// Generate a random dataset
const dataset = [];
for (let i = 0; i < 100; i++) {
    dataset.push({
        x: Math.random() * 10,
        y: Math.random() * 10,
        label: Math.random() < 0.5 ? 0 : 1
    });
}

// Define the Random Forest algorithm
class RandomForest {
    constructor(numTrees, maxDepth) {
        this.numTrees = numTrees;
        this.maxDepth = maxDepth;
        this.trees = [];
    }

    train(dataset) {
        for (let i = 0; i < this.numTrees; i++) {
            const tree = new DecisionTree(this.maxDepth);
            tree.train(dataset);
            this.trees.push(tree);
        }
    }

    classify(data) {
        let classifications = [];
        for (let i = 0; i < this.trees.length; i++) {
            classifications.push(this.trees[i].classify(data));
        }
        return classifications.reduce((a, b) => a + b, 0) / this.trees.length;
    }
}

class DecisionTree {
    constructor(maxDepth) {
        this.maxDepth = maxDepth;
        this.root = null;
    }

    train(dataset) {
        this.root = this.buildTree(dataset, 0);
    }

    classify(data) {
        return this.classifyNode(this.root, data);
    }

    buildTree(dataset, depth) {
        if (depth >= this.maxDepth || dataset.length === 0) {
            return null;
        }

        const bestFeature = this.findBestFeature(dataset);
        const node = {
            feature: bestFeature,
            value: dataset[0][bestFeature],
            left: null,
            right: null
        };

        const leftDataset = dataset.filter(d => d[bestFeature] < node.value);
        const rightDataset = dataset.filter(d => d[bestFeature] >= node.value);

        node.left = this.buildTree(leftDataset, depth + 1);
        node.right = this.buildTree(rightDataset, depth + 1 );

        return node;
    }

    findBestFeature(dataset) {
        let bestFeature = null;
        let bestGain = 0;

        for (let feature in dataset[0]) {
            if (feature !== 'label') {
                const gain = this.calculateGain(dataset, feature);
                if (gain > bestGain) {
                    bestGain = gain;
                    bestFeature = feature;
                }
            }
        }

        return bestFeature;
    }

    calculateGain(dataset, feature) {
        const parentEntropy = this.calculateEntropy(dataset);
        const leftDataset = dataset.filter(d => d[feature] < dataset[0][feature]);
        const rightDataset = dataset.filter(d => d[feature] >= dataset[0][feature]);
        const leftEntropy = this.calculateEntropy(leftDataset);
        const rightEntropy = this.calculateEntropy(rightDataset);

        return parentEntropy - (leftDataset.length / dataset.length) * leftEntropy - (rightDataset.length / dataset.length) * rightEntropy;
    }

    calculateEntropy(dataset) {
        const labelCounts = {};
        for (let i = 0; i < dataset.length; i++) {
            const label = dataset[i].label;
            if (!labelCounts[label]) {
                labelCounts[label] = 0;
            }
            labelCounts[label]++;
        }

        let entropy = 0;
        for (let label in labelCounts) {
            const probability = labelCounts[label] / dataset.length;
            entropy -= probability * Math.log2(probability);
        }

        return entropy;
    }

    classifyNode(node, data) {
        if (node === null) {
            return 0;
        }

        if (data[node.feature] < node.value) {
            return this.classifyNode(node.left, data);
        } else {
            return this.classifyNode(node.right, data);
        }
    }
}

// Generate the tree visualization
function generateTreeVisualization() {
    const tree = new RandomForest(numTrees, maxDepth);
    tree.train(dataset);

    const treeData = tree.trees.map(t => t.root);
    const treeLayout = d3.tree().size([treeWidth, treeHeight]);

    treeSvg.selectAll('g').remove();
    const treeGroups = treeSvg.selectAll('g')
        .data(treeData)
        .enter()
        .append('g')
        .attr('transform', (d, i) => `translate(${i * 200}, 0)`);

    treeGroups.selectAll('circle')
        .data(d => d.descendants())
        .enter()
        .append('circle')
        .attr('cx', d => d.x)
        .attr('cy', d => d.y)
        .attr('r', 4);

    treeGroups.selectAll('text')
        .data(d => d.descendants())
        .enter()
        .append('text')
        .attr('x', d => d.x)
        .attr('y', d => d.y)
        .text(d => d.data.feature);
}

// Classify new data
function classifyNewData() {
    const tree = new RandomForest(numTrees, maxDepth);
    tree.train(dataset);

    const newData = {
        x: Math.random() * 10,
        y: Math.random() * 10
    };

    const classification = tree.classify(newData);
    document.getElementById('classification-result').innerHTML = `Classification result: ${classification}`;
}

// Event listeners
document.getElementById('generate-tree-btn').addEventListener('click', generateTreeVisualization);
document.getElementById('classify-btn').addEventListener('click', classifyNewData);

// Initialize the visualization
generateTreeVisualization();