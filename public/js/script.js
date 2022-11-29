function mainfunc(){
    document.getElementById("hamburger").addEventListener('click',function(){
      $("nav.menu").toggleClass("menu_show");
    });
    document.getElementById("cross").addEventListener('click',function(){
      $("nav.menu").toggleClass("menu_show");
    });
  
    let right=document.getElementById("right");
    let left=document.getElementById("left");
    var myDiv = document.getElementById("1scroll");
    var mov = $("#1scroll").width();
    $( window ).resize(function() {
      mov = $("#1scroll").width();
    });
    right.addEventListener('click',function(){
      myDiv.scrollLeft-=mov;
    });
    left.addEventListener('click',function(){
      myDiv.scrollLeft+=mov;
    });
    
  
    let right1=document.getElementById("right1");
    let left1=document.getElementById("left1");
    var myDiv1 = document.getElementById("s7scroll");
    right1.addEventListener('click',function(){
      myDiv1.scrollLeft-=mov;
    });
    left1.addEventListener('click',function(){
      myDiv1.scrollLeft+=mov;
    });
  
  
    let right2=document.getElementById("right2");
    let left2=document.getElementById("left2");
    var myDiv2 = document.getElementById("scrollpeermentors");
    right2.addEventListener('click',function(){
      myDiv2.scrollLeft-=mov;
    });
    left2.addEventListener('click',function(){
      myDiv2.scrollLeft+=mov;
    });
    
    document.getElementById('tab1').addEventListener('click',function(){
      var x = document.getElementsByClassName("arrow");
        for (i = 0; i < 3; i++) {
          x[i].style.display = "none";
          document.getElementById("tab1").style.color="#ff6863"; 
          document.getElementById("tab2").style.color="#ff6863";
          document.getElementById("tab3").style.color="#ff6863";
          document.getElementById("tab1").style.borderBottom="0px";
          document.getElementById("tab2").style.borderBottom="0px";
          document.getElementById("tab3").style.borderBottom="0px";
        }
        document.getElementById('arrow1').style.display = "block";
        document.getElementById('tab1').style.color="#222968";
        document.getElementById("tab1").style.borderBottom="2px";
        document.getElementById("tab1").style.borderBottomStyle="solid";
        document.getElementById("tab1").style.borderBottomColor="#222968";
    });
    document.getElementById('tab2').addEventListener('click',function(){
      var x = document.getElementsByClassName("arrow");
        for (i = 0; i < 3; i++) {
          x[i].style.display = "none";
          document.getElementById("tab1").style.color="#ff6863"; 
          document.getElementById("tab2").style.color="#ff6863";
          document.getElementById("tab3").style.color="#ff6863";
          document.getElementById("tab1").style.borderBottom="0px";
          document.getElementById("tab2").style.borderBottom="0px";
          document.getElementById("tab3").style.borderBottom="0px";
        }
        document.getElementById('arrow2').style.display = "block";
        document.getElementById('tab2').style.color="#222968";
        document.getElementById("tab2").style.borderBottom="2px";
        document.getElementById("tab2").style.borderBottomStyle="solid";
        document.getElementById("tab2").style.borderBottomColor="#222968";
    });
    document.getElementById('tab3').addEventListener('click',function(){
      var x = document.getElementsByClassName("arrow");
        for (i = 0; i < 3; i++) {
          x[i].style.display = "none";
          document.getElementById("tab1").style.color="#ff6863"; 
          document.getElementById("tab2").style.color="#ff6863";
          document.getElementById("tab3").style.color="#ff6863";
          document.getElementById("tab1").style.borderBottom="0px";
          document.getElementById("tab2").style.borderBottom="0px";
          document.getElementById("tab3").style.borderBottom="0px";
        }
        document.getElementById('arrow3').style.display = "block";
        document.getElementById('tab3').style.color="#222968";
        document.getElementById("tab3").style.borderBottom="2px";
        document.getElementById("tab3").style.borderBottomStyle="solid";
        document.getElementById("tab3").style.borderBottomColor="#222968";
    });
    
  }
  
  
  