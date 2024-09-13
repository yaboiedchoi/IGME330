import {randomWord} from "./utils.js";

let words1 = [];
	
let words2 = [];
	
let words3 = [];

console.log(words1[0]);

// load json file
let loadBabble = () => {
    const url = "../data/babble-data.json";
    const xhr = new XMLHttpRequest();
    xhr.onload = (e) => {
        console.log(`In onload - HTTP Status Code = ${e.target.status}`);
        const string = e.target.responseText;

        babbleLoaded(string);
    }

    xhr.onerror = e => console.log(`in onerror - HTTP Status Code: ${e.target.status}`);
    xhr.open("GET",url);
    xhr.send();
}

let babbleLoaded = (string) => {
    // parse
    let json;
    try {
        json = JSON.parse(string);
    }
    catch {
        document.querySelector("#output").innerText = `JSON not loaded correctly! ${e.target.status}`;
    }
    
    // initialize
    words1 = json.words1;
    words2 = json.words2;
    words3 = json.words3;

    // button click events
    document.querySelector('#btn-1').addEventListener('click', () => {
        randomBabble(1);
    });

    // 5x
    document.querySelector('.fullhd').addEventListener('click', () => {
        randomBabble(5);
    })

    // run once on start
    randomBabble(1);
}
    
// create sentance then attach sentance
// multiplier is how many technobabbles are being generated
let randomBabble = (multiplier) => {
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
// window.onload = init;
loadBabble();