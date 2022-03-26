
var LEVEL = 7;

var numHomes = LEVEL + 3;

var STARTING_MARGIN = Math.floor(windowWidth / 5);

function setup() {

    createCanvas(windowWidth, windowHeight);

    generateMap();

}

function draw() {

    background(color(127, 127, 127));

    for(let intArr in intersections){


        for(let i = 0; i < intersections[intArr].length; i++){

            if(intersections[intArr][i] !== null)
                intersections[intArr][i].draw();

        }

    }

    for(let h in homes){
        homes[h].draw();
    }

}

function generateMap(){

    generateHomes();

    let numTreeLevels = Math.ceil(Math.log2(numHomes)) + 1;

    let firstLevelGoal = (numHomes % 2 == 0) ? numHomes : numHomes - 1;

    let xSpaceBetweenNodes = Math.floor((windowWidth - 100 - STARTING_MARGIN) / numTreeLevels);

    // Start at 1, as the 0th row is not intersections, but homes
    for(let i = 1; i < numTreeLevels; i++){

        intersections[i] = [];

        // Populate the first level of the intersection array

        if(i == 1){

            for(let j = 0; j < firstLevelGoal; j+=2){

                let newY = (homes[j].center.y + homes[j + 1].center.y) / 2;

                let newX = (homes[j].center.x + xSpaceBetweenNodes);

                let newCenter = createVector(newX, newY);

                intersections[i].push(new Intersection(newCenter, homes[j], homes[j + 1]));

            }

            // If we have an odd number of homes, we need to add one extra intersection
            if(numHomes % 2 === 1){

                let newX = homes[numHomes - 1].center.x + xSpaceBetweenNodes;

                let newY = homes[numHomes - 1].center.y + (homes[1].center.y - homes[0].center.y);

                let newCenter = createVector(newX, newY);

                intersections[i].push(new Intersection(newCenter, homes[numHomes - 1]));

            }

        }
        else{

            let levelGoal = (intersections[i - 1].length % 2 == 0) ? intersections[i - 1].length : intersections[i - 1].length - 1;

            // Now, for each other level
            for(let j = 0; j < levelGoal; j+= 2){

                let newY = (intersections[i - 1][j].center.y + intersections[i - 1][j + 1].center.y) / 2;

                let newX = (intersections[i - 1][j].center.x + xSpaceBetweenNodes);

                let newCenter = createVector(newX, newY);

                intersections[i].push(new Intersection(newCenter, intersections[i - 1][j], intersections[i - 1][j + 1]));

            }

            if(intersections[i - 1].length % 2 === 1){

                let newX = intersections[i - 1][intersections[i - 1].length - 1].center.x + xSpaceBetweenNodes;

                let newY = intersections[i - 1][intersections[i - 1].length - 1].center.y + (intersections[i - 1][1].center.y - intersections[i - 1][0].center.y);

                let newCenter = createVector(newX, newY);

                intersections[i].push(new Intersection(newCenter, intersections[i - 1][intersections[i - 1].length - 1]));

            }

        }
            

    }

    // Filter out null values
    for(let intArr in intersections){

        for(let i = 0; i < intersections[intArr].length; i++){

            if(intersections[intArr][i].center == null){

                intersections[intArr] = intersections[intArr].slice(0, i).concat(intersections[intArr].slice(i + 1));

                i--;

            }

        }

    }

}

function generateHomes(){

    //let spaceBetweenHomes = (windowHeight - 200) / (numHomes - 1);
    let spaceBetweenHomes = 75;

    let levelHomeTokens = homeTokens;

    levelHomeTokens.sort(() => Math.random() - 0.5);

    for(let i = 0; i < numHomes; i++){

        let tempHome;

        let tempHomeLocation = createVector(100, 100 + Math.floor(i * spaceBetweenHomes));

        let tokenData = levelHomeTokens.pop();

        let token = tokenData["token"];
        let value = tokenData["value"];

        homes[i] = new Home(tempHomeLocation, token, value);

    }

}

function generateShapes(){

    let levelShapeTokens = shapeTokens;

    levelShapeTokens.sort(() => Math.random() - 0.5);

    for(let i = 0; i < numHomes * 3; i++){

        shapesData = levelShapeTokens.pop();

        // If shapesData["shape"] === "triangle" ...

    }

}

