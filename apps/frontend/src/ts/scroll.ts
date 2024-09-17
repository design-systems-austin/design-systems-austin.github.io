document.addEventListener("DOMContentLoaded", () => {
  const indicators = document.querySelectorAll(".indicator")
  const sections: HTMLElement[] = []

  indicators.forEach((indicator) => {
    const sectionSelector = indicator.getAttribute("data-section")
    if (sectionSelector) {
      const section = document.querySelector(sectionSelector) as HTMLElement | null
      if (section) {
        sections.push(section)
      }
    }
  })

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const index = sections.indexOf(entry.target as HTMLElement)
        if (index !== -1) {
          if (entry.isIntersecting) {
            indicators[index].classList.add("active")
          } else {
            indicators[index].classList.remove("active")
          }
        }
      })
    },
    {
      threshold: Array.from({ length: 101 }, (_, i) => i * 0.01),
    }
  )

  sections.forEach((section) => {
    observer.observe(section)
  })

  // smooth scrolling
  const menuItems = document.querySelectorAll(".menu-item")
  menuItems.forEach((menuItem) => {
    menuItem.addEventListener("click", (e) => {
      e.preventDefault()
      const targetId = (e.target as HTMLAnchorElement).getAttribute("href")
      if (targetId) {
        document.querySelector(targetId)?.scrollIntoView({
          behavior: "smooth",
        })
      }
    })
  })
})
