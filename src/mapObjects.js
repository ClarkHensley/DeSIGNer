class Home{

    constructor(center, token, colorVal = null){

        this.center = center;

        this.population = 0;

        if(token === "color"){

            this.color = colorVal;
            this.border = color(0, 0, 0);

        } 
        else if (token === "border"){

            this.color = color(255, 255, 255);
            this.border = colorVal;

        }

        else{

            this.color = color(255, 255, 255);
            this.border = color(0, 0, 0);

        }
            
        let newDisplay;
        if(token === "triangle")
            newDisplay = new Triangle(this.center, this.color, this.border);
        else if(token === "square")
            newDisplay = new Square(this.center, this.color, this.border);
        else if(token === "pentagon")
            newDisplay = new Pentagon(this.center, this.color, this.border);
        else if(token === "hexagon")
            newDisplay = new Hexagon(this.center, this.color, this.border);
        else if(token === "octagon")
            newDisplay = new Octagon(this.center, this.color, this.border);
        else
            newDisplay = new Circle(this.center, this.color, this.border);

        this.shape = newDisplay;

    }

    draw(){

        this.shape.draw();

    }

    isEqualTo(other){

        if(this.token === "circle")
            return (this.color === other.color && this.border === other.border);
        else
            return (this.token === other.token);

    }

    isFull(){

        return this.population == homeCapacity;

    }

}

class Path{
    
    constructor(from, to){

        this.from = from;
        this.to = to;

    }

    draw(){

        stroke(color(0, 0, 0));
        strokeWeight(shapeBorderWeight);

        line(this.from.x, this.from.y, this.to.x, this.to.y);

        noStroke();

    }

}


class Intersection{

    constructor(center, topChild, bottomChild = null){

        this.center = center;
        this.topChild = topChild;
        this.bottomChild = bottomChild;

        this.menuOpen = false;
        this.proposition = null;

        /*this.button = createButton("");
        this.button.position(this.center.x, this.center.y - padding);
        this.button.size(padding, padding);
        this.button.style("background-color", color(0, 0, 0, 0));

        this.button.mousePressed(this.openDesigner);
        this.button.hide();*/

        this.menu = createGraphics(200, 100);
        this.menu.background(color(191, 191, 191));

        /*this.menu.button = createButton("x");
        this.menu.button.position(this.center.x + 195, this.center.y - 45);
        this.menu.button.size(5, 5);
        this.menu.button.mousePressed(this.closeDesigner);
        this.menu.button.hide();*/

        this.notCheck = createCheckbox("NOT?", false);
        this.notCheck.hide();

        this.selection = createSelect();

        this.selection.option("");

        console.log(levelAllTokens.length);
        for(let i = 0; i < levelAllTokens.length; i++){

            console.log(i);

            this.selection.option(levelAllTokens[i]["type"] + ": " + levelAllTokens[i]["value"]);

        }
        this.selection.hide();

        if(this.topChild instanceof Intersection && this.topChild.bottomChild === null){

            let temp = this.topChild.topChild;
            this.topChild.topChild = null;
            this.topChild.center = null;
            this.topChild = null;

            this.topChild = temp;

        }

        if(this.bottomChild instanceof Intersection && this.bottomChild.bottomChild === null){

            let temp = this.bottomChild.topChild;
            this.bottomChild.topChild = null;
            this.bottomChild.center = null;
            this.bottomChild = null;

            this.bottomChild = temp;

        }

        this.topPath = new Path(this.center, this.topChild.center);
        if(this.bottomChild !== null)
            this.bottomPath = new Path(this.center, this.bottomChild.center);
        else
            this.bottomPath = null;

    }

    draw(){

        this.topPath.draw();
        if(this.bottomPath !== null)
            this.bottomPath.draw();

        stroke(color(0, 0, 0))
        strokeWeight(2 * shapeBorderWeight);

        line(this.center.x, this.center.y, this.center.x, this.center.y - padding);

        noStroke();

        if(this.menuOpen){

            //this.button.hide();
            //this.menu.button.show();

            textSize(32);

            this.menu.text("DeSIGNer", 5, 15);
            this.menu.text("Pieces Move to the Top Lane if:", 5, 25);

            this.notCheck.position(this.center.x - 92, this.center.y - 40);
            this.notCheck.show();
            this.selection.position(this.center.x - 23, this.center.y - 40);
            this.selection.show();

            this.menu.text("And Move to the", 5, 80);
            this.menu.text("Bottom Lane otherwise.", 5, 90);
            image(this.menu, this.center.x - 100, this.center.y - 90);


        }
        else{

            //this.button.show();
            this.notCheck.hide();
            this.selection.hide();

        }

        if(this.proposition !== null){

            fill(color(255, 0, 0));
            stroke(color(0, 0, 0));
            strokeWeight(shapeBorderWeight);

            triangle(this.center.x, this.center.y - padding, this.center.x + padding, this.center.y -  9 * (padding / 10), this.center.x, this.center.y - 4 * (padding / 5));

            noStroke();
            noFill();

        }

    }

    update(){

        let proposition = this.selection.value();

        console.log(proposition);

        let not = !this.notCheck.checked();

        if(proposition !== ""){

            let propositionParts = proposition.split(": ");

            this.proposition = {"not": not, "token": propositionParts[0], "value": propositionParts[1]};

        }
        else
            this.proposition = null;

    }

    openDesigner(){

        this.menuOpen = true;
        console.log(this.menuOpen);
    
    }

    closeDesigner(){

        this.menuOpen = false;

    }

}

class Piece{

    constructor(type, center, color, border, state){

        this.type = type;
        this.display = null;
        this.state = state;

        this.originalCenter = center;

        this.startedRun = false;
        this.reachedStartingPoint = false;

        this.currentNode = null;

        switch(this.type){

            case "triangle":
                this.display = new Triangle(center,color, border);
                break;

            case "square":
                this.display = new Square(center, color, border);
                break;

            case "pentagon":
                this.display = new Pentagon(center, color, border);
                break;

            case "hexagon":
                this.display = new Hexagon(center, color, border);
                break;

            case "octagon":
                this.display = new Octagon(center, color, border);
                break;

            default:
                break;

        }

    }

    updateState(newState){

        this.state = newState;

    }

    move(x, y){

        this.display.move(x, y);    

    }

    behave(startingNode){

        switch(this.state){

            case "waiting":
                this.rotate();
                break;

            case "settingUp":
                if(!this.startedRun){

                    this.rotate();

                    if(this.display.center.x === STARTING_MARGIN + padding && this.display.center.y === startingNode.center.y){

                        this.startedRun = true;

                    }

                }
                else{

                    if(!this.reachedStartingPoint){

                        this.move(-1, 0);

                        if(this.display.center.equals(startingNode.center)){
                            this.reachedStartingPoint = true;

                        }

                    }
                    else{

                        this.currentNode = startingNode;
                        this.state = "running";

                    }

            }

            break;

            case "running":
                this.run();
                break;

            case "moving":
                this.moveToNextNode();
                break;

            case "homing":
                this.home();
                break;

            case "failed":
                break;

            case "finished":
                break;

            default:
                break;

        }
    }

    rotate(){

        if(this.display.center.y === padding){

            if(this.display.center.x === STARTING_MARGIN + padding)
                this.move(0, -1);
            else
                this.move(-1, 0);

        }

        else if(this.display.center.y === windowHeight - padding){

            if(this.display.center.x === windowWidth - padding)
                this.move(0, 1);
            else
                this.move(1, 0);

        }

        else if(this.display.center.x === windowWidth - padding){

            if(this.display.center.y === padding)
                this.move(-1, 0);
            else
                this.move(0, 1);

        }

        else if(this.display.center.x === STARTING_MARGIN + padding){

            if(this.display.center.y === windowWidth - padding)
                this.move(1, 0);
            else
                this.move(0, -1);

        }
                
    }

    run(){

        let proposition = this.currentNode.proposition;

        console.log(proposition);

        let pass;

        switch(proposition["token"]){

            case "shape":

                pass = (this.shape == proposition["value"]) == proposition["not"];
                break;

            case "color":

                pass = (this.color == proposition["value"]) == proposition["not"];
                break;

            case "border":

                pass = (this.border == proposition["value"]) == proposition["not"];
                break;

        }

        if(pass)
            this.currentNode = this.currentNode.topChild;        
        else
            this.currentNode = this.currentNode.bottomChild;
        
        this.state = "moving";

    }

    moveToNextNode(){

        if(this.display.center.x === this.currentNode.center.x && this.display.center.y === this.currentNode.center.y){

            if(this.currentNode instanceof Home)
                this.state = "homing";
            else
                this.state = "running";

        }

        else{

            if(this.display.center.y > this.currentNode.center.y)
                this.move(-1, -1);
            else if(this.display.center.y < this.currentNode.center.y)
                this.move(-1, 1);
            else
                this.move(-1, 0);

        }

    }

    home(){

        if(this.currentNode.isFull())
            this.state = "failed";

        else{

            switch(this.currentNode.token){

                case "color":
                    if(this.color === this.currentNode.colorVal){

                        this.state = "finished";
                        this.currentNode.population++;

                    }
                    else
                        this.state = "failed";
                    break;

                case "border":
                    if(this.border === this.currentNode.colorVal){

                        this.state = "finished";
                        this.currentNode.population++;

                    }
                    else
                        this.state = failed;
                    break;

                default:
                    if(this.type === this.currentNode.token){

                        this.state = "finished";
                        this.currentNode.population++;

                    }
                    else
                        this.state = failed;
                    break;

            }  

        }


    }

}
