function locoInitialize() {
    gsap.registerPlugin(ScrollTrigger);

    const locoScroll = new LocomotiveScroll({
        el: document.querySelector("#main"),
        smooth: true,

        // for tablet smooth
        tablet: { smooth: true },

        // for mobile
        smartphone: { smooth: true }
    });
    locoScroll.on("scroll", ScrollTrigger.update);

    ScrollTrigger.scrollerProxy("#main", {
        scrollTop(value) {
            return arguments.length
                ? locoScroll.scrollTo(value, 0, 0)
                : locoScroll.scroll.instance.scroll.y;
        },
        getBoundingClientRect() {
            return {
                top: 0,
                left: 0,
                width: window.innerWidth,
                height: window.innerHeight
            };
        }

        // follwoing line is not required to work pinning on touch screen

        /* pinType: document.querySelector("#main").style.transform
          ? "transform"
          : "fixed"*/
    });

    ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

    ScrollTrigger.refresh();
}

function revealToSpan() {
    document.querySelectorAll(".reveal")
        .forEach(function (elem) {
            // create two span
            var parent = document.createElement("span");
            var child = document.createElement("span");

            //parent and child both sets their respective classes
            parent.classList.add("parent");
            child.classList.add("child");

            //span parent gets child and child gets elem details
            child.innerHTML = elem.innerHTML;
            parent.appendChild(child);

            //elem replaces its value with parent span
            elem.innerHTML = "";
            elem.appendChild(parent);

        });
}

function valueSetters() {
    gsap.set("#nav a", { y: "100%", opacity: 0 });
    gsap.set("#home .parent .child", { y: "100%" });
    gsap.set("#home .row img", { opacity: 0 });

    document.querySelectorAll("#Visual>g")
        .forEach(function (e) {
            var character = e.childNodes[1].childNodes[1];

            character.style.strokeDasharray = character.getTotalLength() + 'px';
            character.style.strokeDashoffset = character.getTotalLength() + 'px';
        })
}

// function onClickScroll(){
//     let sections = document.querySelectorAll(".click");
//     let navLInks = document.querySelectorAll('#nav a');
//     window.onscroll = () => {
//         sections.forEach(sec => {
//             let top = window.scrollY;
//             let offset = sec.offsetTop - 150;
//             let height = sec.offsetHeight;
//             let id = sec.getAttribute('id');

//             if(top >= offset && top < offset + height){
//                 navLInks.forEach(links => {
//                     links.classList.remove('.active');
//                     document.querySelector('#nav a [href*= '+ id + ']').classList.add('.active')
//                 });
//             }
//         })
//     }
// }

function loaderAnimation() {
    var tl = gsap.timeline();


    tl
        .from("#loader .child span", {
            x: 100,
            opacity: 0,
            duration: 1.4,
            stagger: .2,
            ease: Power3.easeInOut
        })
        .to("#loader .parent .child", {
            y: "-100%",
            duration: 1,
            ease: Circ.easeInOut
        })

        .to("#loader", {
            height: 0,
            duration: 1,
            // delay:-1,
            ease: Circ.easeInOut
        })

        .to("#green", {
            height: "100%",
            top: 0,
            duration: 1,
            delay: -1,
            ease: Circ.easeInOut
        })

        .to("#green", {
            height: 0,
            duration: 0.5,
            delay: -0.3,
            ease: "power4.easeInOut",
            onComplete: function () {
                animateHomepage();
            }
        })


}

function animateHomepage() {


    var tl = gsap.timeline();

    tl

        .to("#imagery #imgrig", {
            rotate: "10deg",
            duration: 5,
            scrollTrigger: {
                trigger: "#imgrig",
                scroller: "#main",
                // markers:true,
                start: "top 100%",
                end: "top 0%",
                scrub: 2
            }
        })
        .to("#white-circle", {
            top: "105%",
            duration: 5,
            scale:0.9,
            scrollTrigger: {
                trigger: "#white-circle",
                scroller: "#main",
                // markers: true,
                start: "top 65%",
                end: "top 0%",
                scrub: 2
            }
        })
        .to("#nav a", {
            y: 0,
            opacity: 1,
            stagger: 0.05,
            ease: Expo.easeInOut
        })

        .to("#home .parent .child", {
            y: 0,
            stagger: 0.1,
            duration: 2,
            delay: -1,
            ease: Expo.easeInOut
        })

        .to("#home .row img", {
            opacity: 1,
            delay: -1.5,
            ease: Expo.easeInOut,
            onComplete: function () {
                animateSvg();
            }
        })


}

function animateSvg() {


    gsap.to("#Visual>g>g>path ,#Visual>g>g>polyline", {
        strokeDashoffset: 0,
        duration: 2,
        // delay: -1,
        ease: Expo.easeInOut
    })
}

function cardHoverEffect() {
    document.querySelectorAll(".cnt")
        .forEach(function (cnt) {
            var showingImage;
            cnt.addEventListener("mousemove", function (dets) {
                document.querySelector("#cursor").children[dets.target.dataset.index].style.opacity = 1;
                showingImage = dets.target;
                document.querySelector("#cursor").children[dets.target.dataset.index].style.transform = `translate(${dets.clientX - 0}px, ${dets.clientY + 2300}px )`;
                showingImage.style.filter = "grayscale(1)";

                document.querySelector("#work").style.backgroundColor = dets.target.dataset.color;
            })
            cnt.addEventListener("mouseleave", function (dets) {
                document.querySelector("#cursor").children[showingImage.dataset.index].style.opacity = 0;
                showingImage.style.filter = "grayscale(0)";
                document.querySelector("#work").style.backgroundColor = "#F2F2F2";
            })
        })
}

function connectHover(){
    document.querySelectorAll(".dis-left")
    .forEach(function (social) {
        social.addEventListener("mousemove", function (dets) {
            gsap.to(".DTL1", {
                bottom: 0,
                ease: Power3
            })
        })
        social.addEventListener("mouseleave", function (dets) {
            gsap.to(".DTL1", {
                bottom: "100%",
                ease: Power3
            })
        })
    })
    document.querySelectorAll(".dis-right")
    .forEach(function (social) {
        social.addEventListener("mousemove", function (dets) {
            gsap.to(".DTL2", {
                bottom: 0,
                ease: Power3
            })
        })
        social.addEventListener("mouseleave", function (dets) {
            gsap.to(".DTL2", {
                bottom: "100%",
                ease: Power3
            })
        })
    })

}

function socialHover() {
    document.querySelectorAll(".SL1")
        .forEach(function (social) {
            social.addEventListener("mousemove", function (dets) {
                gsap.to(".BG1", {
                    bottom: 0,
                    duration: 0.5,
                    ease: Power3
                })
            })
            social.addEventListener("mouseleave", function (dets) {
                gsap.to(".BG1", {
                    bottom: "100%",
                    duration: 0.5,
                    ease: Power3
                })
            })
        })

    document.querySelectorAll(".SL2")
        .forEach(function (social) {
            social.addEventListener("mousemove", function (dets) {
                gsap.to(".BG2", {
                    bottom: 0,
                    duration: 0.5,
                    ease: Power3
                })
            })
            social.addEventListener("mouseleave", function (dets) {
                gsap.to(".BG2", {
                    bottom: "100%",
                    duration: 0.5,
                    ease: Power3
                })
            })
        })

    document.querySelectorAll(".SL3")
        .forEach(function (social) {
            social.addEventListener("mousemove", function (dets) {
                gsap.to(".BG3", {
                    bottom: 0,
                    duration: 0.5,
                    ease: Power3
                })
            })
            social.addEventListener("mouseleave", function (dets) {
                gsap.to(".BG3", {
                    bottom: "100%",
                    duration: 0.5,
                    ease: Power3
                })
            })
        })

    document.querySelectorAll(".SL4")
        .forEach(function (social) {
            social.addEventListener("mousemove", function (dets) {
                gsap.to(".BG4", {
                    bottom: 0,
                    duration: 0.5,
                    ease: Power3
                })
            })
            social.addEventListener("mouseleave", function (dets) {
                gsap.to(".BG4", {
                    bottom: "100%",
                    duration: 0.5,
                    ease: Power3
                })
            })
        })
}



revealToSpan();
valueSetters();
loaderAnimation();
locoInitialize();
cardHoverEffect();
connectHover();
socialHover();
// onClickScroll();

// 64.68521881103516






