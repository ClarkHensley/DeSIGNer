
var LEVEL = 1;

var numAttributes = LEVEL + 3;

var numTreeLevels;

function setup() {

    createCanvas(windowWidth, windowHeight);

    generateMap();

}

function draw() {

    background(color(127, 127, 127));

    for(let intArr in intersections){

        for(let i = 0; i < intersections[intArr].length; i++)
            intersections[intArr][i].draw();

    }

    for(let h in homes)
        homes[h].draw();

    for(let p in pieces){
        pieces[p].display.draw();
        pieces[p].behave(intersections[numTreeLevels - 1][0]);
    }

}

function keyPressed(){

    if(keyCode === 32){
        for(let p in pieces)
            pieces[p].updateState("settingUp");
    }

}

function generateMap(){

    generatePieces();

    numTreeLevels = Math.ceil(Math.log2(numAttributes)) + 1;

    let firstLevelGoal = (numAttributes % 2 == 0) ? numAttributes : numAttributes - 1;

    let xSpaceBetweenNodes = Math.floor((windowWidth - padding - (windowWidth -STARTING_MARGIN)) / numTreeLevels);

    // Start at 1, as the 0th row is not intersections, but homes
    for(let i = 1; i < numTreeLevels; i++){

        intersections[i] = [];

        // Populate the first level of the intersection array

        if(i == 1){

            for(let j = 0; j < firstLevelGoal; j+=2){

                let newY = Math.floor((homes[j].center.y + homes[j + 1].center.y) / 2);

                let newX = Math.floor((homes[j].center.x + xSpaceBetweenNodes));

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

function generatePieces(){

    generateHomes();

    let spaceBetweenPieces = Math.floor((windowHeight - 2 * padding) / ((2 * numAttributes) - 1));

    let levelChosenTokensCopy = levelChosenTokens;

    for(let i = 0; i < levelChosenTokens.length; i++){

        console.log(i);

        let tempShapes = shapes;
        let tempColors = colors;
        let tempBorders = colors;

        let choiceTokenData = randomPop(levelChosenTokensCopy);

        levelChosenTokensCopy = choiceTokenData[0];

        let choiceType = choiceTokenData[1]["type"];
        let choiceToken = choiceTokenData[1]["value"];

        let shapesData;

        if(choiceType === "shape"){

            let shapeColorChoice = randomPop(tempColors);
            let shapeBorderChoice = randomPop(tempColors);

            shapesData = {"shape": choiceToken, "color": shapeColorChoice[1], "border": shapeBorderChoice[1]};

        }
        else if(choiceType === "color"){

            let colorBorderChoice = randomPop(tempBorders);
            tempBorders = colorBorderChoice[0];
            if(colorBorderChoice[1] === choiceToken){

                let colorSecondChoice = randomPop(tempBorders);

                shapesData = {"shape": randomSelection(tempShapes), "color": choiceToken, "border": colorSecondChoice[1]};

            }
            else{

                shapesData = {"shape": randomSelection(tempShapes), "color": choiceToken, "border": colorBorderChoice[1]};

            }

        }
        else if(choiceType == "border"){

            let borderColorChoice = randomPop(tempColors);
            tempColors = borderColorChoice[0];
            if(borderColorChoice[1] === choiceToken){

                let borderSecondChoice = randomPop(tempColors);

                shapesData = {"shape": randomSelection(tempShapes), "color": borderSecondChoice[1], "border": choiceToken};

            }
            else{

                shapesData = {"shape": randomSelection(tempShapes), "color": borderColorChoice[1], "border": choiceToken};

            }

        }

        let newCenter = createVector(windowWidth - padding, padding + (spaceBetweenPieces * i));
        
        pieces[i] = new Piece(shapesData["shape"], newCenter, shapesData["color"], shapesData["border"], "waiting");

    }

}

function generateHomes(){

    let chosenLevelShapes = [];

    let chosenLevelColors = [];

    let chosenLevelBorders = [];

    let levelShapes = shapes;

    let levelColors = colors;

    let levelBorders = colors;

    let choiceShape = randomPop(levelShapes);
    chosenLevelShapes.push(choiceShape[1]);
    levelShapes = choiceShape[0];

    let choiceColor = randomPop(levelColors);
    chosenLevelColors.push(choiceColor[1]);
    levelColors = choiceColor[0];

    // For the first go, the border and color values must be different. Only an issue on very small maps
    let choiceBorder = randomPop(levelBorders);

    if(choiceBorder[1] !== chosenLevelColors[0]){

        chosenLevelBorders.push(choiceBorder[1]);
        levelBorders = choiceBorder[0];

    }
    else{

        let newChoice = randomPop(choiceBorder[0]);

        chosenLevelBorders.push(newChoice[1]);

        levelBorders = newChoice[0];
        levelBorders.push(choiceBorder[1]);

    }

    for(let i = 3; i < numAttributes; i++){

        let rand = Math.random();

        let choice;

        if(rand > 2 / 3){

            choice = randomPop(levelShapes);
            chosenLevelShapes.push(choice[1]);
            levelShapes = choice[0];

        }
        else if(rand > 1 / 3){

            choice = randomPop(levelColors);
            chosenLevelColors.push(choice[1]);
            levelColors = choice[0];

        }
        else{

            choice = randomPop(levelBorders);
            chosenLevelBorders.push(choice[1]);
            levelBorders = choice[0];

        }

    }

    let spaceBetweenHomes = Math.floor((windowHeight - 2 * padding) / (numAttributes - 1));

    let homeData = [];

    for(let i = 0; i < chosenLevelShapes.length; i++){

        for(let j = 0; j < homeCapacity; j++)
            levelChosenTokens.push({"type": "shape", "value": chosenLevelShapes[i]});

        homeData.push({"token": chosenLevelShapes[i], "value": null});

    }

    for(let i = 0; i < chosenLevelColors.length; i++){
        
        for(let j = 0; j < homeCapacity; j++)
            levelChosenTokens.push({"type": "color", "value": chosenLevelColors[i]});

        homeData.push({"token": "color", "value": chosenLevelColors[i]});

    }

    for(let i = 0; i < chosenLevelBorders.length; i++){

        for(let j = 0; j < homeCapacity; j++)
            levelChosenTokens.push({"type":"border", "value": chosenLevelBorders[i]});

        homeData.push({"token": "border", "value": chosenLevelBorders[i]});

    }

    for(let i = 0; i < numAttributes; i++){

        let tempData = randomPop(homeData);
        homeData = tempData[0];

        let tempHomeLocation = createVector(padding, padding + Math.floor(i * spaceBetweenHomes));

        let token = tempData[1]["token"];
        let value = tempData[1]["value"];

        homes[i] = new Home(tempHomeLocation, token, value);

    }

}

function randomPop(array){

    let randIndex = Math.floor(Math.random() * array.length);

    let temp = array[randIndex];

    array = array.slice(0, randIndex).concat(array.slice(randIndex + 1));

    return [array, temp];

}

function randomSelection(array){

    return array[Math.floor(Math.random() * array.length)];

}

