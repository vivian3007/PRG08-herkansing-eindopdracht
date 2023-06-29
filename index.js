import { DecisionTree } from "./libraries/decisiontree.js";
import { VegaTree } from "./libraries/vegatree.js";

// Data
const csvFile = "./data/zoo.csv";
const trainingLabel = "domestic";
const ignored = ["domestic", "eggs", "tail", "fins", "legs", "feathers", "backbone", "breathes", "milk", ""];

// Load the data
function loadData() {
    Papa.parse(csvFile, {
        download: true,
        header: true,
        dynamicTyping: true,
        complete: results => trainModel(results.data)
    });
}

// Save the decision tree model to a JSON file
function saveModel(decisionTree) {
    let json = decisionTree.toJSON();
    let jsonString = JSON.stringify(json);

    // Create a Blob with the JSON string
    const blob = new Blob([jsonString], { type: 'application/json' });

    // Create a temporary link element
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download = 'decision_tree_model.json';

    // Click the link element
    link.click();

    // Clean up the object URL
    window.URL.revokeObjectURL(link.href);

    console.log('Model saved successfully.');
}

// Train the decision tree model
function trainModel(data) {
    data.sort(() => Math.random() - 0.5);

    // Split data into test and traindata
    let trainData = data.slice(0, Math.floor(data.length * 0.8));
    let testData = data.slice(Math.floor(data.length * 0.8) + 1);

    let decisionTree = new DecisionTree({
        ignoredAttributes: ignored,
        trainingSet: data,
        categoryAttr: trainingLabel
    });

    // Draw the decision tree
    let visual = new VegaTree('#view', 800, 400, decisionTree.toJSON());

    // Save the model with click event
    const saveButton = document.getElementById('saveButton');
    saveButton.addEventListener('click', () => {
        saveModel(decisionTree);
    });

    // Prediction
    let animal = testData[0];
    let animalPrediction = decisionTree.predict(animal);
    console.log(`Chance that it is a domestic animal: ${animalPrediction}`);

    // Handle the accuracy
    function accuracy(data, tree, label) {
        let correctPrediction = 0;
        for (let row of data) {
            if (row.domestic == tree.predict(row)) {
                correctPrediction++;
            } else {
                console.log(correctPrediction);
            }
        }

        console.log(`Accuracy ${label} data: ${correctPrediction / data.length}`);

        let accuracy = document.getElementById('accuracy');
        accuracy.innerText = `Accuracy: ${correctPrediction / data.length}`;
    }

    accuracy(trainData, decisionTree, "train");
    accuracy(testData, decisionTree, "test");

    // Translate the prediction to words
    let domestic = document.getElementById('domestic');
    if (animalPrediction == 1) {
        domestic.innerText = `Is it domestic: Yes!`;
    } else {
        domestic.innerText = `Is it domestic: No`;
    }
}

// Call the loadData function
loadData();

