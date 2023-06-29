// Variables
let venomous;
let catsized;
let predator;

// Get the radio buttons
const venomousYes = document.getElementById('venomousYes');
const venomousNo = document.getElementById('venomousNo');

const catsizedYes = document.getElementById('catsizedYes');
const catsizedNo = document.getElementById('catsizedNo');

const predatorYes = document.getElementById('predatorYes');
const predatorNo = document.getElementById('predatorNo');

// Add event listener to the radio buttons
venomousYes.addEventListener('change', handleVenomousSelection);
venomousNo.addEventListener('change', handleVenomousSelection);

catsizedYes.addEventListener('change', handleCatsizedSelection);
catsizedNo.addEventListener('change', handleCatsizedSelection);

predatorYes.addEventListener('change', handlePredatorSelection);
predatorNo.addEventListener('change', handlePredatorSelection);

// Handle venomous selection
function handleVenomousSelection(event) {
    const selectedValue = event.target.value;
    if (selectedValue === 'yes') {
        venomous = 1;
    } else if (selectedValue === 'no') {
        venomous = 0;
    }
}

// Handle catsized selection
function handleCatsizedSelection(event) {
    const selectedValue = event.target.value;
    if (selectedValue === 'yes') {
        catsized = 1;
    } else if (selectedValue === 'no') {
        catsized = 0;
    }
}

// Handle predator selection
function handlePredatorSelection(event) {
    const selectedValue = event.target.value;
    if (selectedValue === 'yes') {
        predator = 1;
    } else if (selectedValue === 'no') {
        predator = 0;
    }
}

// Get the predict button and add click event
let predictButton = document.getElementById('predictButton');
predictButton.addEventListener('click', handlePrediction);


function handlePrediction() {
    // Check if the radiobuttons are checked
    if (venomous !== undefined && catsized !== undefined && predator !== undefined) {
        const prediction = predict(venomous, catsized, predator);
        let div = document.getElementById("predict");
        const h3 = document.createElement('h3');

        // Translate the prediction to words
        if (prediction === 0) {
            h3.innerHTML = "Not Domestic";
        } else if (prediction === 1) {
            h3.innerHTML = "Domestic";
        }

        // Remove any previous predictions and append
        div.innerHTML = "";
        div.appendChild(h3);
        console.log('Prediction:', prediction);
    } else {
        let div = document.getElementById("predict");
        const h3 = document.createElement('h3');
        h3.innerHTML = "Fill in the form first!";
        // Remove any previous predictions and append
        div.innerHTML = "";
        div.appendChild(h3);
    }
}


// Perform the prediction using the provided model
function predict(venomous, catsized, predator) {
    if (venomous >= 1) {
        if (catsized >= 1) {
            if (predator >= 1) {
                return 0;
            } else {
                return 'undefined';
            }
        } else {
            return 1;
        }
    } else {
        if (catsized >= 1) {
            if (predator >= 1) {
                return 0;
            } else {
                return 'undefined';
            }
        } else {
            return 1;
        }
    }
}

