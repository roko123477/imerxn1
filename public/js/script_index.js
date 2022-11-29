function mainfunc(){
    document.getElementById("hamburger").addEventListener('click',function(){
      $("nav.menu").toggleClass("menu_show");
    });
    document.getElementById("cross").addEventListener('click',function(){
      $("nav.menu").toggleClass("menu_show");
    });
}