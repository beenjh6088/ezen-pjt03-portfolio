// CSS 변수 사용시 필요
const root = document.documentElement;

// 페이지 로드시 초기화 작업
function init() {
  makeEvents();
  const langTxts = document.querySelectorAll(".txt:not(.KOR)");
  langTxts.forEach(langTxt => {langTxt.style.display = "none";})
}


// 이벤트 넣어주기
function makeEvents() {
  slideUpDown(".utilIcon.menu", ".header .subMenu");
  switchBlacknWhite();
  letsMoveWithMouse();
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


const arrColorForCard = [];
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
  let bg = document.querySelectorAll(".bg");
  let cards = document.querySelectorAll(".card");
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
      for(let i =0; i < bg.length; i++) {
        arrColorForCard.push(bg[i].style.background);
        bg[i].style.background = blackColor;
      }
      icons.forEach(function(i) {
        let oldSrc = i.src;
        let newSrc = oldSrc.replace(".png", "-white.png")
        i.src = newSrc;
      })
      cards.forEach(card => {
        card.style.background = blackColor;
        card.style.border = `1px solid ${whiteColor}`;
      })
      menu.style.background = 'url(./images/icons/menu-white.png) no-repeat center/cover'
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
      for(let i =0; i < bg.length; i++) {
        // bg[i].style.background = `rgb(241, 246, 243)`;
        bg[i].style.background = arrColorForCard[i];
      }
      icons.forEach(function(i) {
        let oldSrc = i.src;
        let newSrc = oldSrc.replace("-white.png", ".png")
        i.src = newSrc;
      })
      cards.forEach(card => {
        card.style.background = whiteColor;
        card.style.border = `1px solid ${blackColor}`;
        
      })
      menu.style.background = 'url(./images/icons/menu.png) no-repeat center/cover'
    }

  })
}


// mousemove or drag 기능
function letsMoveWithMouse() {
  const cards = document.querySelector('.cards');
  const cardDeck = document.querySelectorAll(".cards .card");

  // 마우스 클릭 중인지 확인하는 변수
  let isMouseDown = false;
  let startX, scrollLeft;
  
  if(cards != null) {
    
    cardDeck.forEach(item => {
      const itemRect = item.getBoundingClientRect();
      const deckRect = cards.getBoundingClientRect();
      if(itemRect.left >= deckRect.left && itemRect.left <= deckRect.left + (deckRect.width * 0.6)) {
        item.classList.add("onStage")
        item.classList.remove("offStage")
      } else {
        item.classList.add("offStage")
        item.classList.remove("onStage")
      }
    })
    
    cards.addEventListener('mousedown', (e) => {
      isMouseDown = true;
      cardDeck.forEach(c => c.classList.remove("active"));
      e.target.closest(".card") ? e.target.closest(".card").classList.add("active") : null;
      // 드래그를 시작한 지점의 x 좌표
      startX = e.pageX - cards.offsetLeft;
      // 현재 얼만큼 스크롤되었는지 변수
      scrollLeft = cards.scrollLeft;
    });
    
    cards.addEventListener('mouseleave', (e) => {
      isMouseDown = false;
      cardDeck.forEach(c => c.classList.remove("active"));
    });
    
    cards.addEventListener('mouseup', (e) => {
      isMouseDown = false;
      cardDeck.forEach(c => c.classList.remove("active"));
    });
    
    cards.addEventListener('mousemove', (e) => {
      // 마우스 클릭이 아닐 떄는 실행 중지
      if (!isMouseDown) return;
    
      // 이 함수의 정상적인 실행을 위해 HTML 태그의 내장 이벤트 중지
      e.preventDefault();
  
      // 마우스로 클릭한 시점부터 놓기까지의 거리만큼 스크롤로 이동하기
      const x = e.pageX - cards.offsetLeft;
      const walk = (x - startX) * 1;
      // cards.scrollLeft = scrollLeft - walk;
      cards.scrollLeft = scrollLeft - walk;
    });

    cards.addEventListener("scroll", () => {
      // console.log(1)
      cardDeck.forEach(item => {
        // console.log(`cards : ${cards.offsetLeft+600}`)
        // console.log(item.scrollLeft)
        const itemRect = item.getBoundingClientRect();
        const deckRect = cards.getBoundingClientRect();
        if(itemRect.left >= deckRect.left && itemRect.left <= deckRect.left + (deckRect.width * 0.6)) {
          item.classList.add("onStage")
          item.classList.remove("offStage")
        } else {
          item.classList.add("offStage")
          item.classList.remove("onStage")
        }

      })
    })
  }
}

let listenersAdded = false;
function setLanguage(event) {
  // console.log(1)
  event.preventDefault();
  const languageList = document.querySelector(".languageList");
  const languageItems = document.querySelectorAll(".languageItem");
  if(languageList.classList.contains("selected")) languageList.classList.remove("selected")
  else languageList.classList.add("selected")

  if(!listenersAdded) {
    languageItems.forEach(item => {
      item.addEventListener("click", pickLanguage)
    })
    listenersAdded = true;
  }
}

const arrLang = ["USA", "JPN", "KOR"]
function pickLanguage() {
  const languageList = document.querySelector(".languageList");
  const languageItems = document.querySelectorAll(".languageItem");
  const txts = document.querySelectorAll(".txt");
  languageList.classList.remove("selected")
  languageItems.forEach(i => i.classList.remove("selected"));
  this.classList.add("selected")
  let lang = this.classList[1];

  txts.forEach(t => t.style.display = "none");
  for(let l of arrLang) {
    if(l == lang) {
      console.log(lang)
      const langTxts = document.querySelectorAll(".txt."+lang);
      console.log(langTxts)
      langTxts.forEach(langTxt => {langTxt.style.display = "block";})
      break;
    }
  }
}
