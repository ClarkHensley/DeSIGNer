
let myTri;

function setup() {

    createCanvas(1000, 1000);

    myTri = new Triangle(createVector(100, 100), 20, color(0, 220, 0), color(20, 20, 20));

}

function draw() {

    background(220,0,0);

    myTri.move();

    myTri.draw();

}

