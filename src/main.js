
var homes = [];

var LEVEL = 1;

function setup() {

    createCanvas(windowWidth, windowHeight);

    generateHomes();

}

function draw() {

    background(color(127, 127, 127));

    for(let h of homes)
        h.draw();
        

}

function generateHomes(){

    for(let i = 0; i < LEVEL + 2; i++){

        let tempHome;

        let token = homeTokens[Math.floor(Math.random() * homeTokens.length)];

        if(token == "shape"){
            token = shapes[Math.floor(Math.random() * shapes.length)];

            tempHome = new Home(createVector(100, (100 * (i + 1))), token);

        }
        else{

            let colorVal = colors[Math.floor(Math.random() * colors.length)];

            tempHome = new Home(createVector(100, (100 * (i + 1))), token, colorVal);

        }

        homes.push(tempHome);

    }

}

