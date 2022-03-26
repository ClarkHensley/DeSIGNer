
class Home{

    constructor(center, token, colorVal = null){

        this.center = center;

        if(token === "color"){

            this.color = colorVal;
            this.border = color(0, 0, 0);

            this.shape = {
                type: "circle"
            };

        } 
        else if (token === "border"){

            this.color = color(255, 255, 255);
            this.border = colorVal;

            this.shape = {
                type: "circle"
            };

        }

        else{

            this.color = color(255, 255, 255);
            this.border = color(0, 0, 0);
            
            let newDisplay;
            if(token === "triangle")
                newDisplay = new Triangle(this.center, this.color, this.border)
            else if(token === "square")
                newDisplay = new Square(this.center, this.color, this.border)

            this.shape = {
                type: token,
                display: newDisplay
            }

        }

    }

    draw(){

        if(this.shape.type == "circle"){

            fill(this.color);
            stroke(this.border);
            strokeWeight(5);

            circle(this.center.x, this.center.y, 2 * shapeRadius);

            noStroke();
            noFill();

        }
        else{

            this.shape.display.draw();

        }


    }

}

