// CSS 변수 사용시 필요
const root = document.documentElement;

// 페이지 로드시 초기화 작업
function init() {
  makeEvents();
}


// 이벤트 넣어주기
function makeEvents() {
  slideUpDown(".utilIcon.menu", ".header .subMenu");
  switchBlacknWhite();
}


// 슬라이드 업 다운 기능
function slideUpDown(trigger, target) {
  let tri = document.querySelector(trigger);
  let tar = document.querySelector(target);
  
  tri.addEventListener("click", function() {
    if(tar.classList.contains("select")) tar.classList.remove("select");
    else tar.classList.add("select");
  })
}


// 다크모드 화이트모드 전환
function switchBlacknWhite() {
  let sun = "sun";
  let moon = "moon";
  let star = document.querySelector(".utilIcon.star");
  let body = document.querySelector("body");
  let subMenu = document.querySelector(".subMenu");
  let menu = document.querySelector(".utilIcon.menu");
  let sections = document.querySelectorAll("section.content");
  let icons = document.querySelectorAll("img.icon");
  let txt = document.querySelectorAll(".txt");
  let whiteColor = getComputedStyle(root).getPropertyValue("--whiteBackgroundColor").trim();
  let blackColor = getComputedStyle(root).getPropertyValue("--blackBackgroundColor").trim();;
  star.addEventListener("click", function() {
    // dark mode
    if(this.classList.contains(sun)) {
      this.classList.remove(sun);
      this.classList.add(moon);
      body.style.backgroundColor = blackColor;
      subMenu.style.backgroundColor = blackColor;
      txt.forEach((t) => t.style.color = whiteColor);
      for(let i =0; i < sections.length; i++) {
        if(i == 0) continue;
        sections[i].style.background = blackColor;
      }
      icons.forEach(function(i) {
        let oldSrc = i.src;
        let newSrc = oldSrc.replace(".png", "-white.png")
        i.src = newSrc;
      })
      menu.style.background = 'url(../images/icons/menu-white.png) no-repeat center/cover'
    // light mode
    }else if(this.classList.contains(moon)) {
      this.classList.remove(moon);
      this.classList.add(sun);
      body.style.backgroundColor = whiteColor;
      subMenu.style.backgroundColor = whiteColor;
      txt.forEach((t) => t.style.color = blackColor);
      for(let i =0; i < sections.length; i++) {
        if(i == 0) continue;
        sections[i].style.background = `linear-gradient(to bottom, var(--lightMintColor) 16%, var(--whiteBackgroundColor) 48%, var(--lightMintColor) 80%)`;
      }
      icons.forEach(function(i) {
        let oldSrc = i.src;
        let newSrc = oldSrc.replace("-white.png", ".png")
        i.src = newSrc;
      })
      menu.style.background = 'url(../images/icons/menu.png) no-repeat center/cover'
    }

  })
}