import { Controller } from "@hotwired/stimulus"

import { Rectangle, Circle, Triangle } from "classes/shape"

export default class extends Controller {
  static targets = [ 
    "canvas" 
    ]

  connect() {
    this.canvasTarget.width = window.innerWidth;
    this.canvasTarget.height = Math.floor(window.innerHeight * .6);
    this.aniHandle;

    this.c = canvas.getContext("2d");
    this.rect = canvas.getBoundingClientRect();

    this.mouse = {
      x: undefined,
      y: undefined
    }
    
    this.objectArray = [];

    var self = this;

    canvas.addEventListener('mousedown', () => {
      for(let object of this.objectArray) {
        if(object.inside(this.mouse.x,this.mouse.y)) {
          object.hold();
          object.select();
          object.xoffset = this.mouse.x - object.x;
          object.yoffset = this.mouse.y - object.y;
          console.log(object.index);
        } else object.deselect();
      }
    })
    canvas.addEventListener('mousemove', () => {
      this.clear();
      for(let object of this.objectArray) {
        object.update(this.mouse.x,this.mouse.y,this.c);
      }
    })
    canvas.addEventListener('mouseup', () => {
      for(let object of this.objectArray) {
        object.drop();
      }
    })
    canvas.addEventListener('mouseout', () => {
      for(let object of this.objectArray) {
        object.drop();
      }
    })
    canvas.addEventListener('mouseenter', () => {
      for(let object of this.objectArray) {
        object.drop();
      }
    })

    window.addEventListener('mousemove',
      function(event) {
        self.mouse.x = event.clientX - self.rect.left;
        self.mouse.y = event.clientY - self.rect.top;
        if(self.mouse.x > self.rect.width)
          self.mouse.x = -1;
        if(self.mouse.y > self.rect.height)
          self.mouse.y = -1;
      })

    for(let item of this.objectArray) {
      item.update(this.mouse.x,this.mouse.y,this.c);
    }

  }

  spawnCircle() {
    this.objectArray.push(new Circle(this.objectArray.length,100,100,50));
    for(let item of this.objectArray) {
      item.update(this.mouse.x,this.mouse.y,this.c);
    }
  }

  spawnSquare() {
    this.objectArray.push(new Rectangle(this.objectArray.length,100,100,80,80));
    for(let item of this.objectArray) {
      item.update(this.mouse.x,this.mouse.y,this.c);
    }
  }

  spawnTriangle() {
    this.objectArray.push(new Triangle(this.objectArray.length,100,100,100,84));
    for(let item of this.objectArray) {
      item.update(this.mouse.x,this.mouse.y,this.c);
    }
  }

  clear() {
    this.c.beginPath();
    this.c.clearRect(0,0,this.canvasTarget.width,this.canvasTarget.height);
  }

  erase() {
    this.objectArray = [];
    this.c.beginPath();
    this.c.clearRect(0,0,this.canvasTarget.width,this.canvasTarget.height);
  }

}