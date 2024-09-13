"use strict";
	
const words1 = ["Acute", "Aft", "Anti-matter", "Bipolar", "Cargo", "Command", "Communication", "Computer", "Deuterium", "Dorsal", "Emergency", "Engineering", "Environmental", "Flight", "Fore", "Guidance", "Heat", "Impulse", "Increased", "Inertial", "Infinite", "Ionizing", "Isolinear", "Lateral", "Linear", "Matter", "Medical", "Navigational", "Optical", "Optimal", "Optional", "Personal", "Personnel", "Phased", "Reduced", "Science", "Ship's", "Shuttlecraft", "Structural", "Subspace", "Transporter", "Ventral"];
	
const words2 = ["Propulsion", "Dissipation", "Sensor", "Improbability", "Buffer", "Graviton", "Replicator", "Matter", "Anti-matter", "Organic", "Power", "Silicon", "Holographic", "Transient", "Integrity", "Plasma", "Fusion", "Control", "Access", "Auto", "Destruct", "Isolinear", "Transwarp", "Energy", "Medical", "Environmental", "Coil", "Impulse", "Warp", "Phaser", "Operating", "Photon", "Deflector", "Integrity", "Control", "Bridge", "Dampening", "Display", "Beam", "Quantum", "Baseline", "Input"];
	
const words3 = ["Chamber", "Interface", "Coil", "Polymer", "Biosphere", "Platform", "Thruster", "Deflector", "Replicator", "Tricorder", "Operation", "Array", "Matrix", "Grid", "Sensor", "Mode", "Panel", "Storage", "Conduit", "Pod", "Hatch", "Regulator", "Display", "Inverter", "Spectrum", "Generator", "Cloud", "Field", "Terminal", "Module", "Procedure", "System", "Diagnostic", "Device", "Beam", "Probe", "Bank", "Tie-In", "Facility", "Bay", "Indicator", "Cell"];

console.log(words1[0]);

function init() {
    // attach function to button
    document.querySelector('#myButton').addEventListener('click', function() {
        randomBabble(1);
    });

    // attach function to second button
    document.querySelector('.fullhd').addEventListener('click', function () {
        randomBabble(5);
    })

    // run once on start
    randomBabble(1);
}

// pick random word from arrays with 1 random operator
function randomWord(array) {
    // math.round can round up or down, which may cause a very 
    // rare out of range exception
    // return array[Math.round(Math.random() * array.length)]
        
    // math.floor will always round down
    return array[Math.floor(Math.random() * array.length)]
}
    
// create sentance then attach sentance
// multiplier is how many technobabbles are being generated
function randomBabble(multiplier) {
    // create the sentance
    let babble = "";
    for (let i = 0; i < multiplier; i++) {
        // add the technobabble
        babble += `${randomWord(words1)} ${randomWord(words2)} ${randomWord(words3)}`;
        // new line if not the last one
        if (multiplier - i > 1) {
            babble += '\n';
        }
    }

    // old code
    // const babble = randomWord(words1) + ' ' + 
    //                randomWord(words2) + ' ' + 
    //                randomWord(words3);
        
    // attach new sentance to output
    document.querySelector('#output').innerText = babble;
}

// initialize on load
window.onload = init;