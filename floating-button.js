document.addEventListener('DOMContentLoaded', () => {
  const scrollToTopBtn = document.getElementById('scrollToTopBtn')
  const rootElement = document.documentElement

  function handleScroll() {
    const scrollTotal = rootElement.scrollHeight - rootElement.clientHeight
    if (rootElement.scrollTop / scrollTotal > 0.1) {
      scrollToTopBtn.classList.add('show')
    } else {
      scrollToTopBtn.classList.remove('show')
    }
  }

  function scrollToTop() {
    rootElement.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
    showCelebration()
  }

  function showCelebration() {
    const celebration = document.createElement('div')
    celebration.classList.add('celebration')
    document.body.appendChild(celebration)

    setTimeout(() => {
      celebration.remove()
    }, 1500)
  }

  scrollToTopBtn.addEventListener('click', scrollToTop)
  document.addEventListener('scroll', handleScroll)
})
