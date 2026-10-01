/* Lotus Labz shared header behaviour: mobile menu toggle. No dependencies. */
(function(){
  var root=document.documentElement;
  root.className+=(root.className?" ":"")+"nav-js";
  function init(){
    var btn=document.querySelector(".nav-toggle"),menu=document.getElementById("site-menu");
    if(!btn||!menu)return;
    function set(open){
      menu.classList.toggle("is-open",open);
      btn.setAttribute("aria-expanded",open?"true":"false");
      btn.setAttribute("aria-label",open?"Close menu":"Open menu");
    }
    btn.addEventListener("click",function(){set(!menu.classList.contains("is-open"));});
    document.addEventListener("keydown",function(e){
      if((e.key==="Escape"||e.key==="Esc")&&menu.classList.contains("is-open")){set(false);btn.focus();}
    });
    document.addEventListener("click",function(e){
      if(menu.classList.contains("is-open")&&!menu.contains(e.target)&&!btn.contains(e.target))set(false);
    });
    window.addEventListener("resize",function(){if(window.innerWidth>1000)set(false);});
  }
  if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",init);else init();
})();
