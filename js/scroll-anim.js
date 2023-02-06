const canvas = document.getElementById("hero-lightpass");
const context = canvas.getContext("2d");

canvas.width=1920;
canvas.height=1920;

const currentFrame = index => (
  `images/${index.toString().padStart(4, '0')}.png`);
  //`https://www.apple.com/105/media/us/airpods-pro/2019/1299e2f5_9206_4470_b28e_08307a42f19b/anim/sequence/large/01-hero-lightpass/${index.toString().padStart(4, '0')}.jpg`);
const frameCount = 120;

const images = [];

const preloadImages = () => {
  for (let i = 1; i < frameCount; i++) {
    images[i] = new Image();
    images[i].src = currentFrame(i);
  }
};

preloadImages();

//draw first image
const img = new Image();
img.src = currentFrame(1);
img.onload=function(){
  context.drawImage(img, 0, 0);
}

//Scroll Interactions
const html = document.getElementsByTagName('body');
const output = document.querySelector("#output");

window.addEventListener('scroll',() => {
  const scrollTop = html[0].scrollTop;
  //console.log('scrollTop: ', scrollTop);
  //console.log('html.scrollHeight: ', html[0].scrollHeight);
  //console.log('window.innerHeight: ', window.innerHeight);
  const maxScrollTop = html[0].scrollHeight - window.innerHeight;
  const scrollFraction = scrollTop / maxScrollTop;
  const frameIndex = Math.min(frameCount - 1,Math.floor(scrollFraction*frameCount));
  //console.log('FrameIndex',frameIndex);
  requestAnimationFrame(()=>context.drawImage(images[frameIndex+1],0,0));

 output.textContent = `scrollTop: ${scrollTop}`;

});