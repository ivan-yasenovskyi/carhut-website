const counters = document.querySelectorAll(".counter");

counters.forEach((counter) => {
  counter.innerText = "0";

  const updateCounter = () => {
    const target = +counter.getAttribute("data-target");
    const c = +counter.innerText.replace(/,/g, "");
    const increment = target / 200;

    if (c < target) {
      const nextValue = Math.ceil(c + increment);
      counter.innerText = nextValue.toLocaleString("en-US");
      setTimeout(updateCounter, 1);
    } else {
      counter.innerText = target.toLocaleString("en-US");
    }
  };
  updateCounter();
});

const header = document.querySelector(".header");
const topBurger = document.querySelector(".burger-menu");
const floatingBurger = document.querySelector(".floating-burger");
const menu = document.querySelector(".navbar-center");
const navLinks = document.querySelectorAll(".nav-item");

const topBurgerIcon = topBurger ? topBurger.querySelector("i") : null;
const floatingBurgerIcon = floatingBurger
  ? floatingBurger.querySelector("i")
  : null;

function toggleMenu() {
  if (menu) menu.classList.toggle("open");
  document.body.classList.toggle("no-scroll");

  const isOpen = menu ? menu.classList.contains("open") : false;

  if (topBurger && topBurgerIcon) {
    topBurger.classList.toggle("active", isOpen);
    topBurgerIcon.className = isOpen ? "fa-solid fa-xmark" : "fa-solid fa-bars";
  }

  if (floatingBurger && floatingBurgerIcon) {
    floatingBurger.classList.toggle("active", isOpen);
    floatingBurgerIcon.className = isOpen
      ? "fa-solid fa-xmark"
      : "fa-solid fa-bars";
  }
}

if (topBurger) topBurger.addEventListener("click", toggleMenu);
if (floatingBurger) floatingBurger.addEventListener("click", toggleMenu);

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    if (menu && menu.classList.contains("open")) {
      toggleMenu();
    }
  });
});

window.addEventListener("scroll", () => {
  if (header) {
    if (window.scrollY > 50) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  }

  if (floatingBurger) {
    if (window.scrollY > 300) {
      floatingBurger.classList.add("visible");
    } else {
      floatingBurger.classList.remove("visible");
    }
  }
});

const swiper = new Swiper(".mySwiper", {
  slidesPerView: 1,
  spaceBetween: 20,
  grabCursor: true,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  breakpoints: {
    768: {
      slidesPerView: 2,
      spaceBetween: 30,
    },

    1024: {
      slidesPerView: 3,
      spaceBetween: 30,
    },
  },
});

const filterBtns = document.querySelectorAll(".browse-btns-item");
const carCards = document.querySelectorAll(".jeep-card");

filterBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    filterBtns.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");

    const filterValue = btn.getAttribute("data-filter");

    carCards.forEach((card) => {
      const categories = card.getAttribute("data-categories");

      if (filterValue === "all" || categories.includes(filterValue)) {
        card.classList.remove("hidden");
      } else {
        card.classList.add("hidden");
      }
    });
  });
});

const openCalcBtn = document.getElementById("open-calc-btn");
const calcModal = document.getElementById("calc-modal");
const closeCalcBtn = document.querySelector(".close-modal");

openCalcBtn.addEventListener("click", (event) => {
  event.preventDefault();
  calcModal.classList.add("active");
  document.body.classList.add("no-scroll");
});

closeCalcBtn.addEventListener("click", () => {
  calcModal.classList.remove("active");
  document.body.classList.remove("no-scroll");
});

calcModal.addEventListener("click", (event) => {
  if (event.target === calcModal) {
    calcModal.classList.remove("active");
    document.body.classList.remove("no-scroll");
  }
});

const carSelect = document.getElementById("calc-select");
const daysRange = document.getElementById("days-range");
const daysOutput = document.getElementById("days-output");
const totalPrice = document.getElementById("total-price");

function calculateCost() {
  const pricePerDay = +carSelect.value;

  const days = +daysRange.value;

  daysOutput.innerText = days;

  const total = pricePerDay * days;

  totalPrice.innerText = "$" + total;
}

daysRange.addEventListener("input", calculateCost);

carSelect.addEventListener("change", calculateCost);

calculateCost();
