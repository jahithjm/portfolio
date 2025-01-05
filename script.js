const aboutSection = document.querySelector('.about-section')
const aboutMeBtn = document.querySelector('.about-me-btn')
const xIcon = document.querySelector('.x-icon')
const navbar = document.querySelector('.navbar')
const socialIcons = document.querySelector('.social-links')
const overlay = document.querySelector('.overlay')
const bodyContainer = document.querySelector('#body-container')
const latestWorks = document.querySelector('.latest-works-link')
const downArrow = document.querySelector('.down-arrow')
const latestWorksArrow = document.querySelector('.latest-works-arrow')
const blackLogo = document.querySelector('.black-logo')
const contactForm = document.querySelector('.contact')
const sendButton = document.querySelector('.submit-btn')
const mainSection = document.querySelector('.main-section')

// Theme management
const icon = document.getElementById("icon")
const contact_section = document.querySelector(".contact-section")
const labels = Array.from(contact_section.querySelectorAll(".label"))

// Get system preference
const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches

// Get saved theme from localStorage or use system preference
let currentTheme = localStorage.getItem('theme') || 'system'

const themeButtons = document.querySelectorAll('.theme-btn')

// Update icon based on theme
function updateIcon(theme) {
  const isDark = theme === 'dark' || (theme === 'system' && systemPrefersDark);
  icon.style.filter = isDark 
    ? "var(--moon-filter)"  // Darker moon in dark mode
    : "invert(0%)";         // Black moon in light mode
}

// Update active button state
function updateActiveButton(theme) {
  themeButtons.forEach(button => {
    button.classList.remove('active')
    if (button.classList.contains(theme)) {
      button.classList.add('active')
    }
  })
}

// Apply theme to document
function applyTheme(theme) {
  // Set data-theme attribute
  document.documentElement.setAttribute('data-theme', theme)
  
  // Update labels
  const isDark = theme === 'dark' || (theme === 'system' && systemPrefersDark)
  labels.forEach(label => {
    label.style.color = isDark ? "white" : "var(--dark)"
  })
  
  // Update icon and active button
  updateIcon(theme)
  updateActiveButton(theme)
  
  // Save to localStorage
  localStorage.setItem('theme', theme)
}

// Theme button click handler
themeButtons.forEach(button => {
  button.addEventListener('click', () => {
    const theme = button.classList.contains('light') ? 'light' :
                 button.classList.contains('dark') ? 'dark' : 'system'
    currentTheme = theme
    applyTheme(theme)
  })
})

// Theme toggle handler
icon.onclick = function () {
  // Cycle through themes: light -> dark -> system
  currentTheme = 
    currentTheme === 'light' ? 'dark' :
    currentTheme === 'dark' ? 'system' : 'light'
  
  applyTheme(currentTheme)
}

// Initialize theme on page load
applyTheme(localStorage.getItem('theme') || 'system')

// Watch for system preference changes
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
  if (currentTheme === 'system') {
    applyTheme('system')
  }
})

aboutMeBtn.addEventListener('click', () => {
  aboutSection.classList.add('active')
  overlay.classList.add('active')
  navbar.classList.add('hidden')
  socialIcons.classList.add('hidden')
  disableScroll()
})

xIcon.addEventListener('click', () => {
  aboutSection.classList.remove('active')
  overlay.classList.remove('active')
  navbar.classList.remove('hidden')
  socialIcons.classList.remove('hidden')
  enableScroll()
})

overlay.addEventListener('click', () => {
  aboutSection.classList.remove('active')
  overlay.classList.remove('active')
  navbar.classList.remove('hidden')
  socialIcons.classList.remove('hidden')
  enableScroll()
})

// canvas.addEventListener('wheel', (e) => {
//   window.scrollTo(0, (mainSection.clientHeight * e.deltaY) / Math.abs(e.deltaY))
// })

latestWorks.addEventListener('click', (e) => {
  scrollTo(0, mainSection.clientHeight)
})

downArrow.addEventListener('click', (e) => {
  scrollTo(0, mainSection.clientHeight)
})

latestWorksArrow.addEventListener('click', (e) => {
  scrollTo(0, mainSection.clientHeight)
})

blackLogo.addEventListener('click', (e) => {
  scrollTo(0, 0)
})

// contactForm.addEventListener('submit', (e) => {
//   e.preventDefault()
//   let myForm = contactForm
//   let formData = new FormData(myForm)
//   const buttonText = sendButton.innerHTML
//   fetch('/', {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
//     body: new URLSearchParams(formData).toString(),
//   })
//     .then(() => {
//       sendButton.classList.add('sent')
//       sendButton.innerHTML = 'Message Sent'
//       console.log('Message Sent Successfully')
//     })
//     .catch((error) => {
//       sendButton.classList.add('notSent')
//       sendButton.innerHTML = `Something went wrong!`
//       console.log(error)
//     })
//     .finally(() => {
//       setTimeout(() => {
//         sendButton.classList.remove('sent')
//         sendButton.classList.remove('notSent')
//         sendButton.innerHTML = buttonText
//       }, 3000)
//     })

//   Array.from(contactForm.children).forEach((child, i) => {
//     if (!(i % 2)) {
//       child.value = ''
//     }
//   })
// })

var swiper = new Swiper('.mySwiper', {
  loop: true,
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },

  effect: 'coverflow',
  grabCursor: true,
  centeredSlides: true,
  slidesPerView: 'auto',
  coverflowEffect: {
    rotate: 50,
    stretch: 0,
    depth: 100,
    modifier: 1,
    slideShadows: false,
  },
})

// left: 37, up: 38, right: 39, down: 40,
// spacebar: 32, pageup: 33, pagedown: 34, end: 35, home: 36
var keys = { 37: 1, 38: 1, 39: 1, 40: 1 }

function preventDefault(e) {
  e.preventDefault()
}

function preventDefaultForScrollKeys(e) {
  if (keys[e.keyCode]) {
    preventDefault(e)
    return false
  }
}

// modern Chrome requires { passive: false } when adding event
var supportsPassive = false
try {
  window.addEventListener(
    'test',
    null,
    Object.defineProperty({}, 'passive', {
      get: function () {
        supportsPassive = true
      },
    })
  )
} catch (e) {}

var wheelOpt = supportsPassive ? { passive: false } : false
var wheelEvent =
  'onwheel' in document.createElement('div') ? 'wheel' : 'mousewheel'

// call this to Disable
function disableScroll() {
  window.addEventListener('DOMMouseScroll', preventDefault, false) // older FF
  window.addEventListener(wheelEvent, preventDefault, wheelOpt) // modern desktop
  window.addEventListener('touchmove', preventDefault, wheelOpt) // mobile
  window.addEventListener('keydown', preventDefaultForScrollKeys, false)
  console.log('Scroll Disabled')
}

// call this to Enable
function enableScroll() {
  window.removeEventListener('DOMMouseScroll', preventDefault, false)
  window.removeEventListener(wheelEvent, preventDefault, wheelOpt)
  window.removeEventListener('touchmove', preventDefault, wheelOpt)
  window.removeEventListener('keydown', preventDefaultForScrollKeys, false)
  console.log('Scroll Enabled')
}

document.addEventListener('DOMContentLoaded', () => {
  const observer = new MutationObserver((mutations) => {
    
  })

  observer.observe(document.body, {
    childList: true,
  })
})

//year setup
 // Get the current year
 const currentYear = new Date().getFullYear();
  
 // Set the year in the footer
 document.getElementById('year').textContent = currentYear;