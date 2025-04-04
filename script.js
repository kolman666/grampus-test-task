document.addEventListener("DOMContentLoaded", () => {
  var heroSwiper = new Swiper(".hero-swiper", {
    loop: true,
    effect: "fade",
    fadeEffect: {
      crossFade: true,
    },
    speed: 1000,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
    navigation: {
      nextEl: ".hero__nav--next",
      prevEl: ".hero__nav--prev",
    },
  })

  var specsSwiper

  function initSpecsSwiper() {
    if (window.innerWidth > 768) {
      if (specsSwiper === undefined) {
        specsSwiper = new Swiper(".specs-swiper", {
          slidesPerView: 4,
          spaceBetween: 30,
          grabCursor: true,
          breakpoints: {
            320: {
              slidesPerView: 1,
              spaceBetween: 20,
            },
            480: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 3,
              spaceBetween: 30,
            },
            1024: {
              slidesPerView: 4,
              spaceBetween: 30,
            },
          },
        })
      }
    } else if (specsSwiper !== undefined) {
      specsSwiper.destroy()
      specsSwiper = undefined
    }
  }

  initSpecsSwiper()
  window.addEventListener("resize", initSpecsSwiper)

  const specsItems = document.querySelectorAll(".specs__item")

  specsItems.forEach((item) => {
    item.addEventListener("mouseenter", function () {
      this.classList.add("hovered")
    })

    item.addEventListener("mouseleave", function () {
      this.classList.remove("hovered")
    })
  })

  const mobileMenuBtn = document.querySelector(".mobile-menu-btn")
  const mainNav = document.querySelector(".main-nav")

  if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener("click", () => {
      mainNav.classList.toggle("active")
    })
  }

  const navLinks = document.querySelectorAll(".main-nav__link")

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      if (mainNav.classList.contains("active")) {
        mainNav.classList.remove("active")
      }
    })
  })

  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault()

      const targetId = this.getAttribute("href")

      if (targetId === "#") return

      const targetElement = document.querySelector(targetId)

      if (targetElement) {
        const headerHeight = document.querySelector(".header").offsetHeight
        const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        })
      }
    })
  })

  const sections = document.querySelectorAll("section[id]")

  function highlightActiveMenuItem() {
    const scrollPosition = window.scrollY
    const headerHeight = document.querySelector(".header").offsetHeight

    sections.forEach((section) => {
      const sectionTop = section.offsetTop - headerHeight - 100
      const sectionHeight = section.offsetHeight
      const sectionId = section.getAttribute("id")

      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        document.querySelectorAll(".main-nav__link").forEach((link) => {
          link.classList.remove("active")
          if (link.getAttribute("href") === `#${sectionId}`) {
            link.classList.add("active")
          }
        })
      }
    })
  }

  window.addEventListener("scroll", highlightActiveMenuItem)

  function setActiveMenuItemOnLoad() {
    const currentHash = window.location.hash

    if (currentHash) {
      document.querySelectorAll(".main-nav__link").forEach((link) => {
        link.classList.remove("active")
        if (link.getAttribute("href") === currentHash) {
          link.classList.add("active")
        }
      })
    }
  }

  setActiveMenuItemOnLoad()
})

window.addEventListener("resize", () => {
  if (window.innerWidth > 768) {
    const mainNav = document.querySelector(".main-nav")
    if (mainNav.classList.contains("active")) {
      mainNav.classList.remove("active")
    }
  }
})