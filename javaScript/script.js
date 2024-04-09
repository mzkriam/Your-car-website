let landingPage = document.querySelector(".landing-page");
let settingBox = document.querySelector(".setting-box");
let buttonOpen = document.querySelector(
  ".setting-box .toggle-setting .fa-gear"
);
let colorsLi = document.querySelectorAll(".colors-list li");

let allLinks = document.querySelectorAll(".landing-page .header-area .links");
let allBullets = document.querySelectorAll(".nav-bullet .bullet");
let bulletOption = document.querySelectorAll(".bullets-option span");

function activeState(ev) {
  ev.target.parentElement.querySelectorAll(".active").forEach((element) => {
    element.classList.remove("active");
  });
  ev.target.classList.add("active");
}

allBullets.forEach((bullet) => {
  bullet.addEventListener("click", (e) => {
    activeState(e);
  });
});

buttonOpen.onclick = function () {
  settingBox.classList.toggle("open");
  buttonOpen.classList.toggle("fa-spin");
};

colorsLi.forEach((colorEle) => {
  colorEle.addEventListener("click", (e) => {
    document.documentElement.style.setProperty(
      "--main-color",
      e.target.dataset.color
    );
    window.localStorage.setItem("color-option", e.target.dataset.color);
    activeState(e);
  });
});

if (window.localStorage.getItem("color-option") != null) {
  document.documentElement.style.setProperty(
    "--main-color",
    window.localStorage.getItem("color-option")
  );
  document.querySelectorAll(".colors-list li").forEach((Ele) => {
    Ele.classList.remove("active");
    if (Ele.dataset.color === window.localStorage.getItem("color-option")) {
      Ele.classList.add("active");
    }
  });
}

let backEl = document.querySelectorAll(".background-option span");
let randomOption = true;
let backgroundInterval;
let backgroOpt;

if (window.localStorage.getItem("background-option") != null) {
  backEl.forEach((span) => {
    span.classList.remove("active");
  });
  if (window.localStorage.getItem("background-option") === "true") {
    document.querySelector(".option-box span.yes").classList.add("active");
    randomOption = true;
    randomBackground();
  } else {
    document.querySelector(".option-box span.no").classList.add("active");
    clearInterval(backgroundInterval);
    randomOption = false;
  }
}
backEl.forEach((span) => {
  span.addEventListener("click", (e) => {
    activeState(e);
    if (e.target.dataset.option === "yes") {
      randomOption = true;
      randomBackground();
      window.localStorage.setItem("background-option", true);
    } else {
      clearInterval(backgroundInterval);
      randomOption = false;
      window.localStorage.setItem("background-option", false);
    }
  });
});

function randomBackground() {
  let imgArray = [
    "1.jpg",
    "2.jpg",
    "3.jpg",
    "4.jpg",
    "5.jpg",
    "6.jpg",
    "7.jpg",
  ];
  let basePath = "imgs/";
  let landingPage = document.querySelector(".landing-page");

  if (landingPage) {
    setInterval(() => {
      let randomIndex = Math.floor(Math.random() * imgArray.length);
      let path = basePath + imgArray[randomIndex];
      let imageUrl = new URL(path, document.baseURI).href;

      fetch(imageUrl)
        .then((response) => {
          if (response.ok) {
            landingPage.style.backgroundImage = 'url("' + imageUrl + '")';
          } else {
            console.error("Failed to load " + imageUrl);
          }
        })
        .catch((error) => {
          console.error("Error fetching image:", error);
        });
    }, 10000);
  }
}

randomBackground();

bulletOption.forEach((span) => {
  span.addEventListener("click", (e) => {
    activeState(e);
    if (e.target.dataset.display == "yes") {
      document.querySelector(".nav-bullet").style.display = "block";
      window.localStorage.setItem("bullet-option", "block");
    } else {
      document.querySelector(".nav-bullet").style.display = "none";
      window.localStorage.setItem("bullet-option", "none");
    }
  });
});

if (window.localStorage.getItem("bullet-option") !== null) {
  document.querySelectorAll(".bullets-option span").forEach((span) => {
    span.classList.remove("active");
  });
  if (window.localStorage.getItem("bullet-option") === "block") {
    document.querySelector(".nav-bullet").style.display = "block";
    document.querySelector(".bullets-option .yes").classList.add("active");
  } else {
    document.querySelector(".nav-bullet").style.display = "none";
    document.querySelector(".bullets-option .no").classList.add("active");
  }
}

let skillsSection = document.querySelector(".skills");
window.onscroll = function () {
  allBullets.forEach((bullet) => {
    bullet.classList.remove("active");
  });
  let skillsOffsetTop = skillsSection.offsetTop;
  let skillsOuterHeight = skillsSection.offsetHeight;
  let windowHeight = this.innerHeight;
  let windowScrollTop = this.pageYOffset;
  if (windowScrollTop > skillsOffsetTop + skillsOuterHeight - windowHeight) {
    document
      .querySelectorAll(".skills .skill-box .skill-progress span")
      .forEach((spanProg) => {
        spanProg.style.width = spanProg.dataset.progress;
      });
  }
};

let ourGallery = document.querySelectorAll(".gallery .img-box img");
ourGallery.forEach((img) => {
  img.addEventListener("click", function () {
    let popupOverlay = document.createElement("div");
    popupOverlay.className = "popup-overlay";

    let popupBox = document.createElement("div");
    popupBox.className = "popup-box";

    if (img.alt != null) {
      let popupHeading = document.createElement("h2");
      let HeadingText = document.createTextNode(img.alt);
      popupHeading.appendChild(HeadingText);
      popupBox.appendChild(popupHeading);
    }

    let imgPopup = document.createElement("img");
    imgPopup.src = img.src;

    let closeButton = document.createElement("span");
    closeButton.className = "close-button";
    let closeText = document.createTextNode("X");
    closeButton.appendChild(closeText);

    popupBox.appendChild(closeButton);
    popupBox.appendChild(imgPopup);
    popupOverlay.appendChild(popupBox);
    document.body.appendChild(popupOverlay);
  });
});

document.addEventListener("click", function (e) {
  if (e.target.className == "close-button") {
    e.target.parentNode.remove();
    document.querySelector(".popup-overlay").remove();
  }
});

function scrollTo(elements) {
  elements.forEach((element) => {
    element.addEventListener("click", (e) => {
      e.preventDefault();
      document.querySelector(e.target.dataset.sec).scrollIntoView({
        behavior: "smooth",
      });
    });
  });
}
scrollTo(allBullets);
scrollTo(allLinks);

document.querySelector(".rest-option").onclick = function () {
  localStorage.removeItem("color-option");
  localStorage.removeItem("background-option");
  localStorage.removeItem("bullet-option");
  window.location.reload();
};

let buttonMenu = document.querySelector(".toggle-menu");
let menuLinks = document.querySelector(".links");

menuLinks.onclick = function (e) {
  e.stopPropagation();
};

buttonMenu.onclick = function (e) {
  e.stopPropagation();
  this.classList.toggle("menu-active");
  menuLinks.classList.toggle("open");
};

document.addEventListener("click", function (e) {
  if (e.target != settingBox && e.target != buttonOpen) {
    if (settingBox.classList.contains("open")) {
      settingBox.classList.toggle("open");
      buttonOpen.classList.toggle("fa-spin");
    }
  }
  if (e.target != buttonMenu && e.target != menuLinks) {
    if (buttonMenu.classList.contains("menu-active")) {
      buttonMenu.classList.toggle("menu-active");
      menuLinks.classList.toggle("open");
    }
  }
});
