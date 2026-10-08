/* Lotus Labz: in-place CYMATIK demo launcher. Shared by the homepage and /cymatik/. */
(function(){
  var stage=document.getElementById("cymatikStage");
  if(!stage)return;
  var video=document.getElementById("cymatikVideo"),
      closeBtn=document.getElementById("cymatikClose"),
      triggers=document.querySelectorAll("[data-cymatik-open]"),
      lastTrigger=null;
  function setFocus(el){
    var go=function(){try{el.focus({preventScroll:true});}catch(e){el.focus();}};
    if(window.requestAnimationFrame){window.requestAnimationFrame(go);}else{go();}
  }
  function rewind(){try{video.currentTime=0;}catch(e){}}
  function inView(el){var r=el.getBoundingClientRect();return r.top>=0&&r.bottom<=(window.innerHeight||document.documentElement.clientHeight);}
  function openPreview(ev){
    lastTrigger=ev.currentTarget;
    if(!inView(stage)){stage.scrollIntoView({behavior:"smooth",block:"center"});}
    stage.classList.add("is-playing");
    rewind();
    var p=video.play();
    if(p&&typeof p.catch==="function"){p.catch(function(){video.controls=true;});}
    setFocus(closeBtn);
  }
  function resetPreview(){
    if(!stage.classList.contains("is-playing"))return;
    var focusWasInside=stage.contains(document.activeElement);
    video.pause();
    rewind();
    stage.classList.remove("is-playing");
    if(lastTrigger&&focusWasInside)setFocus(lastTrigger);
    lastTrigger=null;
  }
  for(var i=0;i<triggers.length;i++){triggers[i].addEventListener("click",openPreview);}
  closeBtn.addEventListener("click",resetPreview);
  video.addEventListener("ended",resetPreview);
  document.addEventListener("keydown",function(ev){
    if(ev.key!=="Escape"&&ev.key!=="Esc")return;
    if(document.fullscreenElement||document.webkitFullscreenElement)return;
    resetPreview();
  });
})();
