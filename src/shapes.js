
class Polygon{

    constructor(center, color, border){
        this.center = center;
        this.color = color;
        this.border = border;

        this.points;

        this.generatePoints();
    }

    move(){

        let direction = createVector(0, 0);
        
        if(keyIsDown(LEFT_ARROW)){

            direction = createVector(-1, 0);

        }
        else if(keyIsDown(RIGHT_ARROW)){
        
            direction = createVector(1, 0);

        }
        else if(keyIsDown(UP_ARROW)){

            direction = createVector(0, -1);

        }
        else if(keyIsDown(DOWN_ARROW)){

            direction = createVector(0, 1);

        }

        this.center.add(direction);
        this.generatePoints();

    }

    generatePoints(){};

}

class Circle extends Polygon{

    constructor(center, color, border){
    
       super(center,color, border); 
        
    }

    draw(){

        fill(this.color);
        stroke(this.border);
        strokeWeight(shapeBorderWeight);

        circle(this.center.x, this.center.y, 2 * shapeRadius);

        noStroke();
        noFill();

    }

}

class Triangle extends Polygon{

    constructor(center, color, border){

        super(center, color, border);

    }

    generatePoints(){

        this.points = [
            createVector(this.center.x, this.center.y - shapeRadius),
            createVector(this.center.x + shapeRadius, this.center.y + shapeRadius),
            createVector(this.center.x - shapeRadius, this.center.y + shapeRadius)
        ];

    }

    draw(){

        fill(this.color);
        stroke(this.border);
        strokeWeight(shapeBorderWeight);

        triangle(this.points[0].x, this.points[0].y, this.points[1].x, this.points[1].y, this.points[2].x, this.points[2].y);

        noStroke();
        noFill();

    }

}

class Square extends Polygon{

    constructor(center, color, border){

        super(center, color, border);

    }

    generatePoints(){

        this.points = [
            createVector(this.center.x - shapeRadius, this.center.y - shapeRadius),
            createVector(this.center.x + shapeRadius, this.center.y - shapeRadius),
            createVector(this.center.x + shapeRadius, this.center.y + shapeRadius),
            createVector(this.center.x - shapeRadius, this.center.y + shapeRadius)
        ];

    }

    draw(){

        fill(this.color);
        stroke(this.border);
        strokeWeight(shapeBorderWeight);

        quad(this.points[0].x, this.points[0].y, this.points[1].x, this.points[1].y, this.points[2].x, this.points[2].y, this.points[3].x, this.points[3].y);

        noStroke();
        noFill();

    }


}

class Pentagon extends Polygon{

    constructor(center, color, border){

        super(center, color, border);

    }

    generatePoints(){

        // Coordinates of points of a pentagon relative to its center adapted from:
        // https://mathworld.wolfram.com/RegularPentagon.html
        this.points = [
            createVector(this.center.x + Math.floor(-1 * Math.sin((2 / 5) * Math.PI) * shapeRadius), this.center.y + Math.floor(-1 * Math.cos((2 / 5) * Math.PI) * shapeRadius)),
            createVector(this.center.x, this.center.y - shapeRadius),
            createVector(this.center.x + Math.floor(Math.sin((2 / 5) * Math.PI) * shapeRadius), this.center.y + Math.floor(-1 * Math.cos((2 / 5) * Math.PI) * shapeRadius)),
            createVector(this.center.x + Math.floor(Math.sin((4 / 5) * Math.PI) * shapeRadius), this.center.y +  Math.floor(Math.cos((1 / 5) * Math.PI) * shapeRadius)),
            createVector(this.center.x + Math.floor(-1 * Math.sin((4 / 5) * Math.PI) * shapeRadius), this.center.y + Math.floor(Math.cos((1 / 5) * Math.PI) * shapeRadius)),
        ];

    }

    draw(){

        fill(this.color);

        triangle(this.points[0].x, this.points[0].y, this.points[1].x, this.points[1].y, this.points[2].x, this.points[2].y);

        quad(this.points[0].x, this.points[0].y, this.points[2].x, this.points[2].y, this.points[3].x, this.points[3].y, this.points[4].x, this.points[4].y);

        noFill();

        stroke(this.border);
        strokeWeight(shapeBorderWeight);

        for(let i = 0; i < this.points.length; i++){

            if(i === this.points.length - 1){

                line(this.points[i].x, this.points[i].y, this.points[0].x, this.points[0].y);

            }
            else{

                line(this.points[i].x, this.points[i].y, this.points[i + 1].x, this.points[i + 1].y);

            }

        }

        noStroke();

    }


}

class Hexagon extends Polygon{

    constructor(center, color, border){

        super(center, color, border);

    }

    generatePoints(){

        this.points = [
            createVector(this.center.x - shapeRadius, this.center.y),
            createVector(this.center.x - (shapeRadius / 2), this.center.y - shapeRadius),
            createVector(this.center.x + (shapeRadius / 2), this.center.y - shapeRadius),
            createVector(this.center.x + shapeRadius, this.center.y),
            createVector(this.center.x + (shapeRadius / 2), this.center.y + shapeRadius),
            createVector(this.center.x - (shapeRadius / 2), this.center.y + shapeRadius)
        ];

    }

    draw(){

        fill(this.color);

        quad(this.points[0].x, this.points[0].y, this.points[1].x, this.points[1].y, this.points[2].x, this.points[2].y, this.points[3].x, this.points[3].y);

        quad(this.points[0].x, this.points[0].y, this.points[3].x, this.points[3].y, this.points[4].x, this.points[4].y, this.points[5].x, this.points[5].y);

        noFill();

        stroke(this.border);
        strokeWeight(shapeBorderWeight);

        for(let i = 0; i < this.points.length; i++){

            if(i === this.points.length - 1){

                line(this.points[i].x, this.points[i].y, this.points[0].x, this.points[0].y);

            }
            else{

                line(this.points[i].x, this.points[i].y, this.points[i + 1].x, this.points[i + 1].y);

            }

        }

        noStroke();

    }


}

class Octagon extends Polygon{

    constructor(center, color, border){

        super(center, color, border);

    }

    generatePoints(){

        this.points = [
            createVector(this.center.x - shapeRadius, this.center.y + (shapeRadius / 2)),
            createVector(this.center.x - shapeRadius, this.center.y - (shapeRadius / 2)),
            createVector(this.center.x - (shapeRadius / 2), this.center.y - shapeRadius),
            createVector(this.center.x + (shapeRadius / 2), this.center.y - shapeRadius),
            createVector(this.center.x + shapeRadius, this.center.y - (shapeRadius / 2)),
            createVector(this.center.x + shapeRadius, this.center.y + (shapeRadius / 2)),
            createVector(this.center.x + (shapeRadius / 2), this.center.y + shapeRadius),
            createVector(this.center.x - (shapeRadius / 2), this.center.y + shapeRadius)
        ];

    }

    draw(){

        fill(this.color);

        quad(this.points[1].x, this.points[1].y, this.points[2].x, this.points[2].y, this.points[3].x, this.points[3].y, this.points[4].x, this.points[4].y);

        quad(this.points[1].x, this.points[1].y, this.points[4].x, this.points[4].y, this.points[5].x, this.points[5].y, this.points[0].x, this.points[0].y);

        quad(this.points[5].x, this.points[5].y, this.points[6].x, this.points[6].y, this.points[7].x, this.points[7].y, this.points[0].x, this.points[0].y);

        noFill();

        stroke(this.border);
        strokeWeight(shapeBorderWeight);

        for(let i = 0; i < this.points.length; i++){

            if(i === this.points.length - 1){

                line(this.points[i].x, this.points[i].y, this.points[0].x, this.points[0].y);

            }
            else{

                line(this.points[i].x, this.points[i].y, this.points[i + 1].x, this.points[i + 1].y);

            }

        }

        noStroke();

    }


}
