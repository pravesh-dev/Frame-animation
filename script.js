const canvas = document.querySelector('#myCanvas');
const context = canvas.getContext('2d');
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
                animation();
            }
        }
        images.push(img);
    }
};

function loadImage(index){
    if(index >= 0 && index <= frames.maxIndex){
        const img = images[index];
        
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const scaleX = canvas.width / img.width;
        const scaleY = canvas.height / img.height;

        const scale = Math.max(scaleX, scaleY);

        const newWidth = img.width * scale;
        const newHeight = img.height * scale;

        const offsetX = (canvas.width - newWidth) / 2;
        const offsetY = (canvas.height - newHeight) / 2;

        context.clearRect(0, 0, canvas.width, canvas.height );
        context.imageSmoothingEnabled = true;
        context.imageSmoothingQuality = 'high';
        context.drawImage(img, offsetX, offsetY, newWidth, newHeight);
        frames.currentIndex = index
    }
};

function animation(){
    let tl = gsap.timeline({
        scrollTrigger: {
            trigger: '.parent',
            start: 'top top',
            end: 'bottom bottom',
            markers: true,
            scrub: 4,
        }
    });
    tl.to(frames, {
        currentIndex: frames.maxIndex,
        onUpdate: function(){
            loadImage(Math.floor(frames.currentIndex))
        }
    })
}

preloader();