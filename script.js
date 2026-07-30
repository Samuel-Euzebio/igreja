/*=========================================================
    8:36 EXPERIENCE
    SCRIPT.JS

    PARTE 1
=========================================================*/

gsap.registerPlugin(ScrollTrigger);

/*=========================================================
    LOADING
=========================================================*/

document.body.classList.add("loading");

window.addEventListener("load", () => {

    document.body.classList.remove("loading");

    document.body.classList.add("loaded");

});

/*=========================================================
    LENIS
=========================================================*/

const lenis = new Lenis({

    duration:1.25,

    smoothWheel:true,

    smoothTouch:false,

    touchMultiplier:1.2,

    wheelMultiplier:1,

    infinite:false

});

function raf(time){

    lenis.raf(time);

    requestAnimationFrame(raf);

}

requestAnimationFrame(raf);

/*=========================================================
    GSAP + LENIS
=========================================================*/

lenis.on("scroll", ScrollTrigger.update);

gsap.ticker.add((time)=>{

    lenis.raf(time*1000);

});

gsap.ticker.lagSmoothing(0);

/*=========================================================
    ELEMENTOS
=========================================================*/

const hero = document.querySelector(".hero");

const panels = document.querySelectorAll(".panel");

const glow = document.querySelector(".backgroundGlow");

const music = document.getElementById("music");

const whoosh = document.getElementById("whoosh");

const piano = document.getElementById("piano");

/*=========================================================
    VOLUME
=========================================================*/

music.volume = 0;

whoosh.volume = .15;

piano.volume = .25;

/*=========================================================
    PRIMEIRA INTERAÇÃO
=========================================================*/

let started = false;

function startExperience(){

    if(started) return;

    started = true;

    music.play().catch(()=>{});

    gsap.to(music,{

        volume:.07,

        duration:5,

        ease:"power2.out"

    });

}

window.addEventListener("touchstart",startExperience,{once:true});

window.addEventListener("wheel",startExperience,{once:true});

window.addEventListener("keydown",startExperience,{once:true});

/*=========================================================
    SPLIT TYPE
=========================================================*/

new SplitType(".title",{

    types:"words,chars"

});

new SplitType(".big",{

    types:"words,chars"

});

new SplitType("blockquote",{

    types:"lines,words,chars"

});

/*=========================================================
    ESTADO INICIAL
=========================================================*/

gsap.set(".char",{

    opacity:0,

    y:80,

    rotateX:-90,

    transformOrigin:"50% 100%"

});

gsap.set(".hint",{

    opacity:0,

    y:20

});

gsap.set(".indicator",{

    opacity:0,

    y:20

});

gsap.set(".reference",{

    opacity:0,

    y:-20

});

/*=========================================================
    HERO INTRO
=========================================================*/

const intro = gsap.timeline();

intro

.to(".reference", {
    opacity: 1,
    y: 0,
    duration: 0.25
})

.to(".char", {
    opacity: 1,
    y: 0,
    rotateX: 0,
    stagger: 0.006,
    ease: "power2.out",
    duration: 0.35
}, "<")

.to(".indicator", {
    opacity: 1,
    y: 0,
    duration: 0.3
}, "<")

.to(".hint", {
    opacity: 1,
    y: 0,
    duration: 0.3
}, "<");

/*=========================================================
    HERO PARALLAX
=========================================================*/

gsap.to(".heroContent",{

    y:-120,

    opacity:.2,

    ease:"none",

    scrollTrigger:{

        trigger:".hero",

        start:"top top",

        end:"bottom top",

        scrub:true

    }

});

/*=========================================================
    BACKGROUND GLOW
=========================================================*/

gsap.to(glow,{

    opacity:1,

    duration:2,

    ease:"power2.out"

});

/*=========================================================
    PARTE 2
    SCROLL EXPERIENCE
=========================================================*/

/*=========================================================
    PAINÉIS
=========================================================*/

panels.forEach((panel, index) => {

    ScrollTrigger.create({

        trigger: panel,

        start: "top center",

        end: "bottom center",

        onEnter: () => activatePanel(panel, index),

        onEnterBack: () => activatePanel(panel, index)

    });

});

function activatePanel(panel, index){

    panels.forEach(p=>p.classList.remove("active"));

    panel.classList.add("active");

}

/*=========================================================
    REVEAL DOS PAINÉIS
=========================================================*/

gsap.utils.toArray(".panel").forEach(panel=>{

    const chars = panel.querySelectorAll(".char");

    gsap.fromTo(chars,

        {
            y:90,
            opacity:0,
            rotateX:-90
        },

        {

            y:0,

            opacity:1,

            rotateX:0,

            stagger:.018,

            duration:.9,

            ease:"power4.out",

            scrollTrigger:{

                trigger:panel,

                start:"top 65%",

                toggleActions:"play none none reverse"

            }

        });

});

/*=========================================================
    WHOOSH
=========================================================*/

let currentPanel = -1;

panels.forEach((panel,index)=>{

    ScrollTrigger.create({

        trigger:panel,

        start:"top center",

        onEnter:()=>{

            if(currentPanel===index) return;

            currentPanel=index;

            whoosh.currentTime=0;

            whoosh.play().catch(()=>{});

        }

    });

});

/*=========================================================
    BACKGROUND
=========================================================*/

const colors=[

"#080808",

"#090909",

"#0b0b0b",

"#101010",

"#131313",

"#171717",

"#1a1a1a",

"#1f1b15",

"#252018",

"#2d261a",

"#090909",

"#090909"

];

panels.forEach((panel,index)=>{

    ScrollTrigger.create({

        trigger:panel,

        start:"top center",

        onEnter:()=>{

            gsap.to(document.body,{

                backgroundColor:colors[index]||"#090909",

                duration:1.5

            });

        },

        onEnterBack:()=>{

            gsap.to(document.body,{

                backgroundColor:colors[index]||"#090909",

                duration:1.5

            });

        }

    });

});

/*=========================================================
    GLOW
=========================================================*/

panels.forEach((panel,index)=>{

    ScrollTrigger.create({

        trigger:panel,

        start:"top center",

        onEnter:()=>{

            gsap.to(glow,{

                opacity:.18+(index*.03),

                duration:1

            });

        }

    });

});

/*=========================================================
    PARALLAX DOS TÍTULOS
=========================================================*/

gsap.utils.toArray(".big").forEach(title=>{

    gsap.to(title,{

        y:-35,

        ease:"none",

        scrollTrigger:{

            trigger:title,

            start:"top bottom",

            end:"bottom top",

            scrub:true

        }

    });

});

/*=========================================================
    SCALE HERO
=========================================================*/

gsap.to(".hero",{

    scale:.95,

    filter:"blur(3px)",

    scrollTrigger:{

        trigger:".hero",

        start:"top top",

        end:"bottom top",

        scrub:true

    }

});

/*=========================================================
    REFERENCE
=========================================================*/

gsap.to(".reference",{

    scale:.7,

    y:-100,

    opacity:.35,

    ease:"none",

    scrollTrigger:{

        trigger:".hero",

        start:"top top",

        end:"bottom top",

        scrub:true

    }

});

/*=========================================================
    INDICADOR
=========================================================*/

gsap.to(".indicator",{

    opacity:0,

    y:20,

    scrollTrigger:{

        trigger:".hero",

        start:"top top",

        end:"40% top",

        scrub:true

    }

});

/*=========================================================
    HINT
=========================================================*/

gsap.to(".hint",{

    opacity:0,

    y:20,

    scrollTrigger:{

        trigger:".hero",

        start:"top top",

        end:"40% top",

        scrub:true

    }

});

/*=========================================================
    PAINEL ESCURO
=========================================================*/

gsap.from(".dark .big",{

    scale:.75,

    opacity:0,

    duration:1.4,

    ease:"expo.out",

    scrollTrigger:{

        trigger:".dark",

        start:"top 65%"

    }

});

/*=========================================================
    PARTE 3
    VERSÍCULO / CLÍMAX
=========================================================*/

/*=========================================================
    ELEMENTOS
=========================================================*/

const verseSection = document.querySelector(".verse");
const verse = document.querySelector("blockquote");
const verseLight = document.querySelector(".light");

/*=========================================================
    SPLIT DO VERSÍCULO
=========================================================*/

const verseSplit = new SplitType(verse, {
    types: "words,chars"
});

gsap.set(verseSplit.words,{
    opacity:0,
    y:35,
    filter:"blur(8px)"
});

/*=========================================================
    REVELAÇÃO PALAVRA POR PALAVRA
=========================================================*/

const verseTimeline = gsap.timeline({

    scrollTrigger:{

        trigger:verseSection,

        start:"top 60%",

        once:true

    }

});

verseTimeline.to(verseSplit.words,{

    opacity:1,

    y:0,

    filter:"blur(0px)",

    stagger:.15,

    duration:.7,

    ease:"power3.out"

});

/*=========================================================
    BRILHO DO VERSÍCULO
=========================================================*/

verseTimeline.to(verseLight,{

    opacity:1,

    scale:1.15,

    duration:2,

    ease:"power2.out"

},"<");

/*=========================================================
    BACKGROUND GLOW
=========================================================*/

verseTimeline.to(glow,{

    opacity:.35,

    duration:2

},"<");

/*=========================================================
    BODY
=========================================================*/

verseTimeline.to(document.body,{

    backgroundColor:"#14110d",

    duration:2

},"<");

/*=========================================================
    PIANO
=========================================================*/

verseTimeline.call(()=>{

    piano.currentTime=0;

    piano.play().catch(()=>{});

});

/*=========================================================
    VIBRAÇÃO
=========================================================*/

verseTimeline.call(()=>{

    if(navigator.vibrate){

        navigator.vibrate([40]);

    }

});

/*=========================================================
    ÚLTIMA PALAVRA
=========================================================*/

const lastWord =
verseSplit.words[verseSplit.words.length-1];

verseTimeline.to(lastWord,{

    color:"#D8B15A",

    scale:1.08,

    textShadow:"0 0 25px rgba(216,177,90,.7)",

    duration:.9,

    yoyo:true,

    repeat:1

});

/*=========================================================
    SMALL
=========================================================*/

gsap.from("small",{

    opacity:0,

    y:25,

    duration:1,

    ease:"power3.out",

    scrollTrigger:{

        trigger:"small",

        start:"top 80%"

    }

});

/*=========================================================
    DESCRIÇÃO
=========================================================*/

gsap.from(".description",{

    opacity:0,

    y:45,

    duration:1,

    ease:"power3.out",

    scrollTrigger:{

        trigger:".description",

        start:"top 75%"

    }

});

/*=========================================================
    CONVITE
=========================================================*/

gsap.from(".event p",{

    opacity:0,

    x:-25,

    stagger:.15,

    duration:.7,

    ease:"power2.out",

    scrollTrigger:{

        trigger:".invite",

        start:"top 70%"

    }

});

/*=========================================================
    BOTÃO
=========================================================*/

gsap.from("button",{

    opacity:0,

    scale:.85,

    duration:1,

    ease:"back.out(1.8)",

    scrollTrigger:{

        trigger:"button",

        start:"top 80%"

    }

});

/*=========================================================
    RESPIRAÇÃO DO VERSÍCULO
=========================================================*/

gsap.to(verse,{

    scale:1.015,

    duration:4,

    repeat:-1,

    yoyo:true,

    ease:"sine.inOut"

});

/*=========================================================
    GLOW PULSANDO
=========================================================*/

gsap.to(verseLight,{

    scale:1.25,

    opacity:.75,

    repeat:-1,

    yoyo:true,

    ease:"sine.inOut",

    duration:5

});

/*=========================================================
    PARALLAX DA LUZ
=========================================================*/

gsap.to(verseLight,{

    y:-120,

    ease:"none",

    scrollTrigger:{

        trigger:verseSection,

        start:"top bottom",

        end:"bottom top",

        scrub:true

    }

});

/*=========================================================
    PARTE 4
    PARTÍCULAS + INTERAÇÕES
=========================================================*/

/*=========================================================
    CANVAS
=========================================================*/

const canvas = document.getElementById("particles");
const ctx = canvas.getContext("2d");

let width;
let height;

function resizeCanvas(){

    width = canvas.width = window.innerWidth * devicePixelRatio;
    height = canvas.height = window.innerHeight * devicePixelRatio;

    canvas.style.width = window.innerWidth + "px";
    canvas.style.height = window.innerHeight + "px";

    ctx.scale(devicePixelRatio,devicePixelRatio);

}

resizeCanvas();

window.addEventListener("resize",resizeCanvas);

/*=========================================================
    PARTÍCULAS
=========================================================*/

const particles=[];

const PARTICLE_COUNT=70;

for(let i=0;i<PARTICLE_COUNT;i++){

    particles.push({

        x:Math.random()*window.innerWidth,

        y:Math.random()*window.innerHeight,

        radius:Math.random()*1.8+0.3,

        speed:Math.random()*0.3+0.05,

        alpha:Math.random()*0.35+0.05,

        angle:Math.random()*Math.PI*2

    });

}

/*=========================================================
    MOUSE
=========================================================*/

const mouse={

    x:window.innerWidth/2,

    y:window.innerHeight/2

};

window.addEventListener("mousemove",e=>{

    mouse.x=e.clientX;

    mouse.y=e.clientY;

});

/*=========================================================
    TOUCH
=========================================================*/

window.addEventListener("touchmove",e=>{

    if(!e.touches.length) return;

    mouse.x=e.touches[0].clientX;

    mouse.y=e.touches[0].clientY;

},{passive:true});

/*=========================================================
    DRAW
=========================================================*/

function drawParticles(){

    ctx.clearRect(0,0,width,height);

    particles.forEach(p=>{

        p.angle+=0.002;

        p.y-=p.speed;

        p.x+=Math.sin(p.angle)*0.15;

        if(p.y<-10){

            p.y=window.innerHeight+10;

            p.x=Math.random()*window.innerWidth;

        }

        const dx=mouse.x-p.x;
        const dy=mouse.y-p.y;

        const distance=Math.sqrt(dx*dx+dy*dy);

        if(distance<120){

            p.x-=dx*0.008;
            p.y-=dy*0.008;

        }

        ctx.beginPath();

        ctx.arc(

            p.x,

            p.y,

            p.radius,

            0,

            Math.PI*2

        );

        ctx.fillStyle=`rgba(216,177,90,${p.alpha})`;

        ctx.fill();

    });

    requestAnimationFrame(drawParticles);

}

drawParticles();

/*=========================================================
    HERO 3D
=========================================================*/

const heroContent=document.querySelector(".heroContent");

window.addEventListener("mousemove",e=>{

    const rotateY=(e.clientX/window.innerWidth-.5)*6;

    const rotateX=(e.clientY/window.innerHeight-.5)*-6;

    gsap.to(heroContent,{

        rotateY,

        rotateX,

        transformPerspective:1000,

        transformOrigin:"center",

        duration:1,

        ease:"power3.out"

    });

});

/*=========================================================
    GLOW
=========================================================*/

window.addEventListener("mousemove",e=>{

    const x=e.clientX/window.innerWidth*100;

    const y=e.clientY/window.innerHeight*100;

    glow.style.background=`

    radial-gradient(

        circle at ${x}% ${y}%,

        rgba(216,177,90,.14),

        transparent 60%

    )

    `;

});

/*=========================================================
    BOTÃO
=========================================================*/

const button=document.querySelector("button");

if(button){

button.addEventListener("mouseenter",()=>{

    gsap.to(button,{

        scale:1.03,

        duration:.35

    });

});

button.addEventListener("mouseleave",()=>{

    gsap.to(button,{

        scale:1,

        duration:.35

    });

});

}

/*=========================================================
    REFERÊNCIA
=========================================================*/

gsap.to(".reference",{

    textShadow:

    "0 0 12px rgba(216,177,90,.6), 0 0 35px rgba(216,177,90,.25)",

    repeat:-1,

    yoyo:true,

    duration:2

});

/*=========================================================
    HERO FLOAT
=========================================================*/

gsap.to(".heroContent",{

    y:-10,

    repeat:-1,

    yoyo:true,

    duration:5,

    ease:"sine.inOut"

});

/*=========================================================
    EVENTOS
=========================================================*/

document.querySelectorAll(".event p").forEach(item=>{

    item.addEventListener("mouseenter",()=>{

        gsap.to(item,{

            x:6,

            duration:.3

        });

    });

    item.addEventListener("mouseleave",()=>{

        gsap.to(item,{

            x:0,

            duration:.3

        });

    });

});

/*=========================================================
    FINAL
=========================================================*/

ScrollTrigger.refresh();

/*=========================================================
    PARTE 5
    ACABAMENTOS
=========================================================*/

/*=========================================================
    PRELOADER
=========================================================*/

window.addEventListener("load",()=>{

    gsap.from("body",{

        opacity:0,

        duration:1,

        ease:"power2.out"

    });

});

/*=========================================================
    BRILHO SUAVE NOS TÍTULOS
=========================================================*/

gsap.utils.toArray(".big").forEach(title=>{

    gsap.to(title,{

        textShadow:"0 0 18px rgba(216,177,90,.15)",

        repeat:-1,

        yoyo:true,

        duration:4,

        ease:"sine.inOut"

    });

});

/*=========================================================
    PARALLAX DO GLOW
=========================================================*/

gsap.to(".backgroundGlow",{

    yPercent:-15,

    ease:"none",

    scrollTrigger:{

        trigger:"body",

        start:"top top",

        end:"bottom bottom",

        scrub:true

    }

});

/*=========================================================
    NOISE
=========================================================*/

gsap.to(".noise",{

    backgroundPosition:"400px 300px",

    duration:25,

    repeat:-1,

    ease:"none"

});

/*=========================================================
    HERO LIGHT
=========================================================*/

gsap.to(".hero::before",{

    opacity:.55,

    repeat:-1,

    yoyo:true,

    duration:5,

    ease:"sine.inOut"

});

/*=========================================================
    BOTÃO
=========================================================*/

button.addEventListener("click",()=>{

    gsap.timeline()

    .to(button,{

        scale:.95,

        duration:.08

    })

    .to(button,{

        scale:1,

        duration:.25,

        ease:"back.out(3)"

    });

});

/*=========================================================
    FADE DA MÚSICA
=========================================================*/

ScrollTrigger.create({

    trigger:".invite",

    start:"top center",

    onEnter:()=>{

        gsap.to(music,{

            volume:.03,

            duration:4

        });

    }

});

/*=========================================================
    SCROLL PROGRESS
=========================================================*/

const progress=document.createElement("div");

progress.style.cssText=`

position:fixed;
left:0;
top:0;
height:3px;
width:0%;
background:#D8B15A;
z-index:99999;
box-shadow:0 0 15px rgba(216,177,90,.5);

`;

document.body.appendChild(progress);

ScrollTrigger.create({

    trigger:"body",

    start:"top top",

    end:"bottom bottom",

    scrub:true,

    onUpdate:self=>{

        progress.style.width=(self.progress*100)+"%";

    }

});

/*=========================================================
    EFEITO 3D NAS SEÇÕES
=========================================================*/

panels.forEach(panel=>{

    panel.addEventListener("mousemove",(e)=>{

        const rect=panel.getBoundingClientRect();

        const x=(e.clientX-rect.left)/rect.width-.5;

        const y=(e.clientY-rect.top)/rect.height-.5;

        gsap.to(panel,{

            rotateY:x*2,

            rotateX:-y*2,

            duration:.7,

            ease:"power2.out"

        });

    });

    panel.addEventListener("mouseleave",()=>{

        gsap.to(panel,{

            rotateX:0,

            rotateY:0,

            duration:1

        });

    });

});

/*=========================================================
    EASTER EGG
=========================================================*/

let clicks=0;

document.querySelector(".reference").addEventListener("click",()=>{

    clicks++;

    if(clicks!==8) return;

    gsap.to(".reference",{

        scale:1.5,

        color:"#ffffff",

        duration:.5,

        yoyo:true,

        repeat:1

    });

});

/*=========================================================
    PERFORMANCE
=========================================================*/

window.addEventListener("blur",()=>{

    gsap.globalTimeline.pause();

});

window.addEventListener("focus",()=>{

    gsap.globalTimeline.resume();

});

/*=========================================================
    REFRESH
=========================================================*/

setTimeout(()=>{

    ScrollTrigger.refresh();

},500);
