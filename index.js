let canvas = document.querySelector('canvas')
let ctx = canvas.getContext('2d')
let hscore_div = document.querySelector('.hscore')
let score_div = document.querySelector('.score')
let score = 0
let image_loaded = false
let game_started = false
const background_color =  'white'
let parallex = 2
let min_distance_between_blocks = 1000
let i = new Image()
i.src = 'dino.png'
i.onload = () => {
  image_loaded = true
}
let now
let dino = new Dino(40, 50, canvas, i)
let blocks = []
let widths = [30, 25]
let heights = [100, 75]
let width = widths[Math.floor(Math.random() * widths.length)]
let height = heights[Math.floor(Math.random() * heights.length)]
blocks.push(new Block(800, width, height, canvas, i))

if(localStorage.getItem('score')){
  score = JSON.parse(localStorage.getItem('score'))
}else{
  localStorage.setItem('score', JSON.stringify(score))
  score = JSON.parse(localStorage.getItem('score'))
}
hscore_div.innerText = score
score_div.innerText = dino.score

function draw(){
  if(!dino.died && image_loaded && game_started){
    if(dino.score > score){
      localStorage.setItem('score', JSON.stringify(dino.score))
      score = JSON.parse(localStorage.getItem('score'))
      hscore_div.innerText = score    
    }
    score_div.innerText = dino.score
    if(Math.random()<0.1 && canvas.width-blocks[blocks.length-1].x > min_distance_between_blocks){
      width = widths[Math.floor(Math.random() * widths.length)]
      height = heights[Math.floor(Math.random()*heights.length)]
      blocks.push(new Block(800, width, height, canvas, i))
    }
    if(blocks.length>5){
      blocks.splice(0, 1)
    }
    //clearning canvas
    ctx.fillStyle = background_color
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    ctx.drawImage(i, parallex, 54, 281, 10, 0, (canvas.height/2)-4, canvas.width, 7)
    dino.show(ctx)
    dino.move()
    for(let block of blocks){
      block.show(ctx)
      block.move()
      block.strike(dino)
    }
    parallex += 3.7
    if (parallex+281 > 1195){
      parallex = 2
    }
    if(Date.now()-now > 3000){
      min_distance_between_blocks -= 10
      min_distance_between_blocks = constrain(min_distance_between_blocks, 500, 1000)
      now = Date.now()
    }
  }else if(dino.died){
    ctx.fillStyle = background_color
    ctx.fillRect(0,0,canvas.width, canvas.height)
    ctx.drawImage(i, 654, 14, 192, 12, 100, (canvas.height / 2)-15, canvas.width-200, 30)
  }else if(!game_started){
    dino.show(ctx)
    ctx.drawImage(i, 2, 58, 281, 7, 0, (canvas.height / 2), canvas.width, 7)
  }
}
document.onkeyup = e => {
  if(e.keyCode==32 && !dino.died && game_started){
    dino.jump()
  }
  if(dino.died || !game_started){
    now = Date.now()
    dino.score = 0
    dino.died = false
    game_started = true
    blocks = []
    blocks.push(new Block(800, width, height, canvas, i))
  }
}
function constrain(value, min, max) {
  if (value < min) {
    value = min;
  } else if (value > max) {
    value = max;
  } else {
    value = value;
  }
  return value;
}

let interval = setInterval(()=>draw(), 16)