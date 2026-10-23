/* ==========================================================
   Brasa & Fumo Hamburgueria — Scripts principais
   ========================================================== */

(function(){
  'use strict';

  var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* Header shrink on scroll */
  var header = document.getElementById('siteHeader');
  function onScroll(){
    if(window.scrollY > 40){ header.classList.add('scrolled'); }
    else { header.classList.remove('scrolled'); }
  }
  window.addEventListener('scroll', onScroll, {passive:true});
  onScroll();

  /* Mobile nav */
  var toggle = document.getElementById('navToggle');
  var mobileNav = document.getElementById('mobileNav');
  var mobileClose = document.getElementById('mobileClose');
  function openNav(){ mobileNav.classList.add('open'); document.body.style.overflow='hidden'; }
  function closeNav(){ mobileNav.classList.remove('open'); document.body.style.overflow=''; }
  toggle.addEventListener('click', openNav);
  mobileClose.addEventListener('click', closeNav);
  mobileNav.querySelectorAll('a').forEach(function(a){ a.addEventListener('click', closeNav); });

  /* Menu tabs (visual only — filtra por categoria simples) */
  var tabs = document.querySelectorAll('.menu-tab');
  tabs.forEach(function(tab){
    tab.addEventListener('click', function(){
      tabs.forEach(function(t){ t.classList.remove('active'); });
      tab.classList.add('active');
    });
  });

  /* Scroll reveal */
  var revealEls = document.querySelectorAll('.reveal');
  if('IntersectionObserver' in window && !reducedMotion){
    var io = new IntersectionObserver(function(entries){
      entries.forEach(function(entry){
        if(entry.isIntersecting){
          entry.target.classList.add('in');
          io.unobserve(entry.target);
        }
      });
    }, {threshold:.15});
    revealEls.forEach(function(el){ io.observe(el); });
  } else {
    revealEls.forEach(function(el){ el.classList.add('in'); });
  }

  /* Burger stack build animation (hero signature) */
  var stack = document.getElementById('burgerStack');
  if(reducedMotion){
    stack.classList.add('build');
  } else {
    setTimeout(function(){ stack.classList.add('build'); }, 350);
  }

  /* Embers (ambient particles) */
  if(!reducedMotion){
    var emberField = document.getElementById('embers');
    var count = window.innerWidth < 640 ? 10 : 20;
    for(var i=0;i<count;i++){
      var e = document.createElement('span');
      e.className = 'ember';
      var size = 2 + Math.random()*3;
      e.style.width = size+'px';
      e.style.height = size+'px';
      e.style.left = (Math.random()*100)+'%';
      e.style.setProperty('--drift', (Math.random()*60-30)+'px');
      e.style.animationDuration = (5 + Math.random()*6)+'s';
      e.style.animationDelay = (Math.random()*8)+'s';
      emberField.appendChild(e);
    }
  }

  /* Countdown — persiste no localStorage, reinicia a cada 3 dias */
  (function countdown(){
    var KEY = 'brasaFumoPromoDeadline';
    var THREE_DAYS = 3*24*60*60*1000;
    var deadline = localStorage.getItem(KEY);
    var now = Date.now();
    if(!deadline || parseInt(deadline,10) < now){
      deadline = now + THREE_DAYS;
      localStorage.setItem(KEY, deadline);
    } else {
      deadline = parseInt(deadline,10);
    }
    var elH = document.getElementById('cd-h');
    var elM = document.getElementById('cd-m');
    var elS = document.getElementById('cd-s');
    function pad(n){ return String(n).padStart(2,'0'); }
    function tick(){
      var diff = deadline - Date.now();
      if(diff <= 0){
        localStorage.setItem(KEY, Date.now()+THREE_DAYS);
        return;
      }
      var h = Math.floor(diff/3600000);
      var m = Math.floor((diff%3600000)/60000);
      var s = Math.floor((diff%60000)/1000);
      elH.textContent = pad(h);
      elM.textContent = pad(m);
      elS.textContent = pad(s);
    }
    tick();
    setInterval(tick, 1000);
  })();

  /* Smooth anchor scroll offset compensation not needed due to CSS scroll-behavior */
})();
