document.getElementById("run-forest").addEventListener("click", function() {
    // Read user inputs
    const feature1 = parseFloat(document.getElementById("feature1").value);
    const feature2 = parseFloat(document.getElementById("feature2").value);

    // Simulated Random Forest with 3 decision trees
    const trees = [
        {
            "tree": "Tree 1",
            "feature": "feature1",
            "threshold": 5.0,
            "left": "Class A",
            "right": "Class B"
        },
        {
            "tree": "Tree 2",
            "feature": "feature2",
            "threshold": 3.0,
            "left": "Class A",
            "right": "Class B"
        },
        {
            "tree": "Tree 3",
            "feature": "feature1",
            "threshold": 4.8,
            "left": "Class B",
            "right": "Class A"
        }
    ];

    let votes = {"Class A": 0, "Class B": 0};

    // Simulate each tree decision
    trees.forEach(tree => {
        let value;
        if (tree.feature === "feature1") {
            value = feature1;
        } else {
            value = feature2;
        }

        // Decision based on threshold
        if (value <= tree.threshold) {
            votes[tree.left]++;
        } else {
            votes[tree.right]++;
        }
    });

    // Determine the winning class
    let prediction = votes["Class A"] > votes["Class B"] ? "Class A" : "Class B";

    // Update the visualization
    visualizeForest(trees, feature1, feature2, prediction);
});

function visualizeForest(trees, feature1, feature2, prediction) {
    const container = d3.select("#forest-visualization");
    container.html('');  // Clear previous visualization

    trees.forEach((tree, index) => {
        const value = tree.feature === "feature1" ? feature1 : feature2;
        const decision = value <= tree.threshold ? tree.left : tree.right;

        const treeElement = container.append("div")
            .style("margin", "20px")
            .style("padding", "10px")
            .style("border", "1px solid gray")
            .style("border-radius", "5px");

        treeElement.append("h3").text(tree.tree);

        treeElement.append("p").text(`Feature: ${tree.feature}`);
        treeElement.append("p").text(`Threshold: ${tree.threshold}`);
        treeElement.append("p").text(`Decision: ${decision}`);
    });

    container.append("h2").style("color", prediction === "Class A" ? "green" : "red")
        .text(`Final Prediction: ${prediction}`);
}
