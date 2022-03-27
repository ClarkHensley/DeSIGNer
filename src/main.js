
var LEVEL = 1;

var numAttributes = LEVEL + 7;

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

    for(let s in memberShapes){
        memberShapes[s].draw();
    }

}

function generateMap(){

    generateHomes();

    let numTreeLevels = Math.ceil(Math.log2(numAttributes)) + 1;

    let firstLevelGoal = (numAttributes % 2 == 0) ? numAttributes : numAttributes - 1;

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
            if(numAttributes % 2 === 1){

                let newX = homes[numAttributes - 1].center.x + xSpaceBetweenNodes;

                let newY = homes[numAttributes - 1].center.y + (homes[1].center.y - homes[0].center.y);

                let newCenter = createVector(newX, newY);

                intersections[i].push(new Intersection(newCenter, homes[numAttributes - 1]));

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

    let chosenLevelShapes = [];

    let chosenLevelColors = [];

    let chosenLevelBorders = [];

    generateShapes(chosenLevelShapes, chosenLevelColors, chosenLevelBorders);

    console.log(chosenLevelShapes);
    console.log(chosenLevelColors);
    console.log(chosenLevelBorders);

    let spaceBetweenHomes = 75;

    let homeData = [];

    for(let i = 0; i < chosenLevelShapes.length; i++){

        homeData.push({"token": chosenLevelShapes[i], "value": null});

    }

    for(let i = 0; i < chosenLevelColors.length; i++){
        
        homeData.push({"token": "color", "value": chosenLevelColors[i]});

    }

    for(let i = 0; i < chosenLevelBorders.length; i++){

        homeData.push({"token": "border", "value": chosenLevelBorders[i]});

    }

    console.log(homeData);

    for(let i = 0; i < numAttributes; i++){

        let tempData;
        homeData, tempData = randomPop(homeData);

        let tempHomeLocation = createVector(100, 100 + Math.floor(i * spaceBetweenHomes));

        let token = tempData["token"];
        let value = tempData["value"];

        console.log(token, value);

        homes[i] = new Home(tempHomeLocation, token, value);

    }

}

function generateShapes(chosenLevelShapes, chosenLevelColors, chosenLevelBorders){

    let levelShapes = shapes;

    let levelColors = colors;

    let levelBorders = colors;

    let choiceShape;
    levelShapes, choiceShape = randomPop(levelShapes);
    chosenLevelShapes.push(choiceShape);

    let choiceColor;
    levelColors, choiceColor = randomPop(levelColors);
    chosenLevelColors.push(choiceColor);

    let choiceBorder;
    levelBorders, choiceBorder = randomPop(levelBorders);
    chosenLevelBorders.push(choiceBorder);


    for(let i = 3; i < numAttributes; i++){

        let rand = Math.random();

        let choice;

        if(rand > 2 / 3){

            levelShapes, choice = randomPop(levelShapes);

            chosenLevelShapes.push(choice);

        }
        else if(rand > 1 / 3){

            levelColors, choice = randomPop(levelColors);

            chosenLevelColors.push(choice);

        }
        else{

            levelBorders, choice = randomPop(levelBorders);

            chosenLevelBorders.push(choice);

        }

    }

    for(let i = 0; i < numAttributes * 2; i++){

        let shapesData = {
            "shape": randomSelection(chosenLevelShapes),
            "color": randomSelection(chosenLevelColors),
            "border": randomSelection(chosenLevelBorders)
        };

        let newCenter = createVector(windowWidth - 100, 50 * (i + 1));
        
        switch(shapesData["shape"]){

            case "triangle":
                memberShapes[i] = new Triangle(newCenter,shapesData["color"], shapesData["border"]);
                break;

            case "square":
                memberShapes[i] = new Square(newCenter, shapesData["color"], shapesData["border"]);
                break;

            case "pentagon":
                memberShapes[i] = new Pentagon(newCenter, shapesData["color"], shapesData["border"]);
                break;

            case "hexagon":
                memberShapes[i] = new Hexagon(newCenter, shapesData["color"], shapesData["border"]);
                break;

            case "octagon":
                memberShapes[i] = new Octagon(newCenter, shapesData["color"], shapesData["border"]);
                break;

            default:
                break;

        }

    }

}

function randomPop(array){

    let randIndex = Math.floor(Math.random() * array.length);

    let temp = array[randIndex];

    array = array.slice(0, randIndex).concat(array.slice(randIndex + 1));

    console.log(array);     

    return (array, temp);

}

function randomSelection(array){

    return array[Math.floor(Math.random() * array.length)];

}

