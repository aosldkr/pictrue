$('body').prepend('<header>');
$('body').append('<footer>');

$('header').load('./inc.html header>div',head);
$('footer').load('./inc.html footer>div');

let idx = localStorage.idx;


function head(){     

    const elMenubtn = document.querySelector(".menubtn");
    const elMoboile_Menupop = document.querySelector(".moboile_menupop");
    const elClose = document.querySelector(".popmeue_close");


    elMenubtn.onclick=function(){
        elMoboile_Menupop.classList.add('active2')  
    }

    elClose.onclick=function(){
        elMoboile_Menupop.classList.remove('active2')  
    }
   
}