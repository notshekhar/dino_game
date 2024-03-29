class Dino{
  constructor(x, size, canvas, i){
    this.i = i
    this.x = x;
    this.y = (canvas.height / 2)-size;
    this.y_limit = (canvas.height / 2)-size;
    this.width = size;
    this.height = size;
    this.v = 0;
    this.g = 1.4;
    this.score = 0;
    this.died = false;
    this.pos = [849, 938, 982];
    this.posvalue = 0;
  }
  static constrain(value, min, max){
    if (value < min) {
      value = min;
    } else if (value > max) {
      value = max;
    } else {
      value = value;
    }
    return value;

  }
  show(ctx){
    // ctx.fillStyle = 'black';
    // ctx.fillRect(this.x, this.y, this.width, this.height);
    ctx.drawImage(this.i, this.pos[this.posvalue], 4, 44, 44, this.x, this.y, this.width, this.height)
  }
  jump(){
    if(this.y==this.y_limit){
      this.v = -22;
    }
    this.posvalue = 0
  }
  move(){
    this.y += this.v;
    this.v += this.g;
    this.y = Dino.constrain(this.y, 0, this.y_limit);
    this.score++;
    if(this.y == this.y_limit){
      this.posvalue++
      if(this.posvalue==this.pos.length){
        this.posvalue = 0
      }
    }
  }
}