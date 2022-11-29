function mainfunc(){
    document.getElementById("hamburger").addEventListener('click',function(){
      $("nav.menu").toggleClass("menu_show");
    });
    document.getElementById("cross").addEventListener('click',function(){
      $("nav.menu").toggleClass("menu_show");
    });
  
   
    let right3=document.getElementById("right3");
    let left3=document.getElementById("left3");
    var myDiv3 = document.getElementById("s8scroll");
    var mov2 = $("#s8scroll").width();
    $( window ).resize(function() {
      mov2 = $("#s8scroll").width();
    });
    right3.addEventListener('click',function(){
      myDiv3.scrollLeft-=mov2;
    });
    left3.addEventListener('click',function(){
      myDiv3.scrollLeft+=mov2;
    })
    
  }
  
  
  