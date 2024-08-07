const frames = {
    currentIndex : 0,
    maxIndex: 382,
}
let imgLoaded = 0
let images = [];
function preloader (){
    for(var i = 1; i <= frames.maxIndex; i++){
        const imgUrl = `./Frames/frame_${i.toString().padStart(4, '0')}.jpeg`;
        const img  = new Image();
        img.src = imgUrl;
        img.onload = () =>{
            imgLoaded++;
            if(imgLoaded === frames.maxIndex){
                loadImage(frames.currentIndex);
            }
        }
        images.push(img);
    }
};

function loadImage(index){
    if(index >= 0 && index <= frames.maxIndex){
        const img = images[index];
        
    }
};

preloader();