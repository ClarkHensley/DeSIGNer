class Home{

    constructor(center, token, colorVal = null){

        this.center = center;

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

        stroke(color(0, 0, 0));
        strokeWeight(3 * shapeBorderWeight);

        point(this.center.x, this.center.y);

        noStroke();

    }

}

