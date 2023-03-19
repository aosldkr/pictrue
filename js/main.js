
    let swiper = new Swiper(".mySwiper", {
        freeMode: true,
        pagination: {
            el: ".swiper-pagination",
            type: "progressbar",
        },
        
        scrollbar:{
            el: ".scrollbar",
        },

        breakpoints: {
            375: {
              slidesPerView: 'auto',
              spaceBetween: 30,
            },
            1024: {
                slidesPerView: 4,
                spaceBetween: 30,
              },
        },

    });

const louvreListBtn = document.querySelectorAll(".louvre-list-btn");
const popupCloseBtn = document.querySelectorAll(".Popup-logo-close");
const elcontent3_1 = document.querySelector(".content3-Popup1");
const elcontent3_2 = document.querySelector(".content3-Popup2");

popupCloseBtn.forEach((obj,key)=>{
    obj.onclick=function(){
        elcontent3_1.classList.remove('active')
        elcontent3_2.classList.remove('active')
    }
})

louvreListBtn.forEach( (obj,key)=>{
    
    louvreListBtn[0].onclick=function(){
        elcontent3_1.classList.add('active')
        elcontent3_1.style ="color:#7C6D56";
    }
    louvreListBtn[1].onclick=function(){
        elcontent3_2.classList.add('active')
        elcontent3_2.style ="color:#7C6D56";
    }
    
    const elActive = document.querySelector('.louvre-list-btn')
    elActive.style ='color:red';

});







