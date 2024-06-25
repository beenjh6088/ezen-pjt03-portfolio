// CSS 변수 사용시 필요
const root = document.documentElement;

// 페이지 로드시 초기화 작업
function init() {
  makeEvents();
}


// 이벤트 넣어주기
function makeEvents() {
  slideUpDown(".utilIcon.menu", ".header .subMenu");
  reverseBlacknWhite();
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
function reverseBlacknWhite() {
  let sun = "sun";
  let moon = "moon";
  let star = document.querySelector(".utilIcon.star");
  let body = document.querySelector("body");
  let gnb = document.querySelectorAll(".gnb .menuItem a");
  let menu = document.querySelector(".utilIcon.menu");
  let mainText = document.querySelector(".mainText");
  let whiteColor = getComputedStyle(root).getPropertyValue("--whiteBackgroundColor").trim();
  let blackColor = getComputedStyle(root).getPropertyValue("--blackBackgroundColor").trim();;
  star.addEventListener("click", function() {
    // dark mode
    if(this.classList.contains(sun)) {
      this.classList.remove(sun);
      this.classList.add(moon);
      body.style.backgroundColor = blackColor;
      gnb.forEach((a) => a.style.color = whiteColor);
      mainText.style.color = whiteColor;
      menu.style.background = 'url(../images/icons/menuWhite.png) no-repeat center/cover'
    // light mode
    }else if(this.classList.contains(moon)) {
      this.classList.remove(moon);
      this.classList.add(sun);
      body.style.backgroundColor = whiteColor;
      gnb.forEach((a) => a.style.color = blackColor)
      mainText.style.color = blackColor;
      menu.style.background = 'url(../images/icons/menu.png) no-repeat center/cover'
    }

  })
}