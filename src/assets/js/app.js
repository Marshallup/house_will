import "core-js/stable/dom-collections/for-each";
import "core-js/features/number/is-nan";
import Swiper, {
  Navigation, Pagination, Autoplay, EffectFade,
} from "swiper";
import svg4everybody from "svg4everybody";
import objectFitImages from "object-fit-images";
import "./components/selectbox.min.js";
import noUiSlider from "nouislider";
import * as $ from "jquery";

// ДЕЙСТВИЯ ПОСЛЕ ЗАГРУЗКИ СТРАНИЦЫ
Pace.on("done", () => {
  $("body, html").removeClass("lock");
  window.scrollTo(0, 0);
  setTimeout(() => {
    $(".loader-section").css("height", 0);
    setTimeout(() => {
      $("body").addClass("loaded");
    }, 1700);
  }, 1000);
});

// МОДУЛИ ДЛЯ СЛАЙДЕРА
Swiper.use([Navigation, Pagination, Autoplay, EffectFade]);
document.addEventListener("DOMContentLoaded", () => {
  objectFitImages();
  svg4everybody();
});
// ИНИЦИАЛИЗАЦИЯ ВСЕХ СЛАЙДЕРОВ
const swiperMain = new Swiper(".main-swiper", {
  spaceBetween: 0,
  autoplay: {
    delay: 6000,
    disableOnInteraction: false,
  },
  pagination: {
    el: ".main-swiper-pagination",
    clickable: true,
    type: "bullets",
  },
  speed: 4000,
  effect: "fade",
  fadeEffect: {
    crossFade: false,
  },
});
const swiperPresent = new Swiper(".presentation-swiper", {
  pagination: {
    el: ".slider-control-presentation__pagination",
    clickable: true,
    type: "fraction",
    renderFraction(currentClass, totalClass) {
      return (
        `<span class="${
          currentClass
        }"></span>`
        + "<span class='swiper-pagination-separator'>из</span>"
        + `<span class="${
          totalClass
        }"></span>`
      );
    },
  },
  navigation: {
    nextEl: ".slider-control-presentation__next",
    prevEl: ".slider-control-presentation__prev",
  },
  effect: "fade",
  fadeEffect: {
    crossFade: true,
  },
});
const swiperOpinions = new Swiper(".opinions-swiper", {
  spaceBetween: 0,
  pagination: {
    el: ".slider-control-opinions__pagination",
    clickable: true,
    type: "fraction",
    renderFraction(currentClass, totalClass) {
      return (
        `<span class="${
          currentClass
        }"></span>`
        + "<span class='swiper-pagination-separator'>из</span>"
        + `<span class="${
          totalClass
        }"></span>`
      );
    },
  },
  navigation: {
    nextEl: ".slider-control-opinions__next",
    prevEl: ".slider-control-opinions__prev",
  },
  effect: "fade",
  fadeEffect: {
    crossFade: true,
  },
});
// БУРГЕР
$(document).ready(() => {
  $(".burger").click(function () {
    $(this).toggleClass("burger--active");
    $(".menu").toggleClass("menu--active");
    $("body, html").toggleClass("lock-on-mobile");
  });
  $(".menu__cross").click(() => {
    $(".menu").toggleClass("menu--active");
    $(".burger").toggleClass("burger--active");
    $("body, html").toggleClass("lock-on-mobile");
  });
  document.addEventListener("scroll", () => {
    if (window.innerWidth > 550) {
      $(".menu").removeClass("menu--active");
      $(".burger").removeClass("burger--active");
    }
  });
  if (document.querySelector(".btn__fill")) {
    document.querySelectorAll(".btn__fill").forEach((item) => {
      item.onclick = () => {
        item.classList.add("btn__fill--active");
      };
    });
  }

  // ПЛАВНЫЙ СКРОЛЛ ПО ЯКРОНЫМ ССЫЛКАМ
  $(".menu").on("click", "[href*=\"#\"]", function (e) {
    $(".burger").toggleClass("burger--active");
    $(".menu").toggleClass("menu--active");
    $("body, html").toggleClass("lock-on-mobile");
    e.preventDefault();
    const fixed_offset = 0;
    if (document.querySelector(this.hash)) {
      $("html")
        .stop()
        .animate({ scrollTop: $(this.hash).offset().top - fixed_offset }, 1000);
    }
  });
  $(".leaf-down").on("click", (e) => {
    e.preventDefault();
    if (document.querySelector(".leaf-down")) {
      $("html")
        .stop()
        .animate(
          { scrollTop: $($("#leafDown").attr("href")).offset().top },
          1000,
        );
    }
  });
});

document.addEventListener("DOMContentLoaded", () => {
  // КАЛЬКУЛЯТОР НА ГЛАВНОЙ
  const range = document.querySelector(".range-wrap");
  const inputRange = document.querySelector(".range__input");
  const typePlace = document.querySelector(".calculator-form__select");
  const placementArea = document.getElementById("placementArea");
  const calculatorPlaceArea = document.querySelector(
    ".calculator-form__placement-area__value",
  );
  let selectsInCalculator;

  if (document.querySelector(".main-page")) {
    selectsInCalculator = document
      .querySelector(".justwrap")
      .querySelectorAll(".selectbox__option");
    selectsInCalculator.forEach((item) => {
      item.addEventListener("click", () => {
        setTimeout(() => {
          const selectPrice = typePlace.value;
          resultCost.innerHTML = `${selectPrice * Math.round(range.noUiSlider.get())} `;
          costForMeter.innerHTML = `${selectPrice} `;
        }, 10);
      });
    });

    noUiSlider.create(range, {
      start: [50],
      step: 1,
      connect: true,
      range: {
        min: 50,
        max: 350,
      },
      connect: [true, false],
    });
    range.noUiSlider.on("update", (values, handle) => {
      const selectPrice = typePlace.value;
      inputRange.value = Math.round(values[handle]);
      placementArea.value = Math.round(values[handle]);
      calculatorPlaceArea.innerHTML = Math.round(values[handle]);
      resultCost.innerHTML = `${selectPrice * Math.round(values[handle])} `;
      costForMeter.innerHTML = `${selectPrice} `;
    });
    // ТАБЫ НА ГЛАВНОЙ
    document.querySelectorAll(".tabs-triggers__item").forEach((item) => {
      item.onclick = function (e) {
        e.preventDefault();
        const id = e.target.getAttribute("href").replace("#", "");

        document
          .querySelectorAll(".tabs-triggers__item")
          .forEach((child) => {
            child.classList.remove("tabs-triggers__item--active");
          });
        document
          .querySelectorAll(".tabs-content__item")
          .forEach((child) => {
            child.classList.remove("tabs-content__item--active");
          });

        item.classList.add("tabs-triggers__item--active");
        document.getElementById(id).classList.add("tabs-content__item--active");
      };
    });
  }
});
