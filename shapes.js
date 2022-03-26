class Polygon{

    constructor(center, radius, color, border){
        this.center = center;
        this.radius = radius;
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

class Triangle extends Polygon{

    constructor(center, radius, color, border){

        super(center, radius, color, border);

    }

    generatePoints(){

        this.points = [createVector(this.center.x, this.center.y - this.radius), createVector(this.center.x + this.radius, this.center.y + this.radius), createVector(this.center.x - this.radius, this.center.y + this.radius)];

    }

    draw(){

        fill(this.color);
        stroke(this.border);
        strokeWeight(5);

        triangle(this.points[0].x, this.points[0].y, this.points[1].x, this.points[1].y, this.points[2].x, this.points[2].y);

        noStroke();
        noFill();

    }

}

class Square extends Polygon{

    constructor(center, radius, color, border){

        super(center, radius, color, border);

    }

    generatePoints(){

        this.points = [createVector(this.center.x - this.radius, this.center.y - this.radius), createVector(this.center.x + this.radius, this.center.y - this.radius), createVector(this.center.x + this.radius, this.center.y + this.radius), createVector(this.center.x - this.radius, this.center.y + this.radius)];

    }

    draw(){

        fill(this.color);
        stroke(this.border);
        strokeWeight(5);

        quad(this.points[0].x, this.points[0].y, this.points[1].x, this.points[1].y, this.points[2].x, this.points[2].y, this.points[3].x, this.points[3].y);

        noStroke();
        noFill();

    }


}

class Pentagon extends Polygon{

    constructor(center, radius, color, border){

        super(center, radius, color, border);

    }

    generatePoints(){

        this.points = [createVector(this.center.x - this.radius, this.center.y - this.radius), createVector(this.center.x + this.radius, this.center.y - this.radius), createVector(this.center.x + this.radius, this.center.y + this.radius), createVector(this.center.x - this.radius, this.center.y + this.radius)];

    }

    draw(){

        fill(this.color);

        stroke(this.border);
        strokeWeight(5);

        quad(this.points[0].x, this.points[0].y, this.points[1].x, this.points[1].y, this.points[2].x, this.points[2].y, this.points[3].x, this.points[3].y);

        noStroke();
        noFill();

    }


}
