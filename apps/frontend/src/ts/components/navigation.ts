export function initNavigation() {
  document.addEventListener("DOMContentLoaded", () => {
    console.log("DOMContentLoaded event fired")
    const hamburgerMenuButtons = document.querySelectorAll(".hamburger-menu-button")
    const sidebar = document.querySelector(".sidebar") as HTMLElement | null
    const mobileSidebar = document.querySelector(".mobile-sidebar") as HTMLElement | null

    const overlay = document.querySelector(".overlay")
    const sidebarContent = sidebar?.querySelector("ul") as HTMLElement | null
    const mobileSidebarContent = mobileSidebar?.querySelector("ul") as HTMLElement | null

    const closeSidebar = () => {
      console.log("closeSidebar function called")

      if (sidebar) {
        sidebarContent?.classList.remove("visible")
        setTimeout(() => {
          sidebar.classList.remove("open")
          setTimeout(() => {
            sidebar.style.display = "none"
          }, 300) // Wait for the slide-out animation to complete
        }, 100) // Make the text disappear faster
      }
      if (mobileSidebar) {
        mobileSidebarContent?.classList.remove("visible")
        setTimeout(() => {
          mobileSidebar.classList.remove("open")
          setTimeout(() => {
            mobileSidebar.style.display = "none"
          }, 300) // Wait for the slide-out animation to complete
        }, 100) // Make the text disappear faster
      }

      overlay?.classList.remove("open")
      hamburgerMenuButtons?.forEach((button) => button.classList.remove("open"))
    }

    if (hamburgerMenuButtons.length > 0) {
      hamburgerMenuButtons.forEach((button, index) => {
        console.log(`Hamburger menu button ${index + 1} found: `, button)

        button.addEventListener("click", () => {
          console.log(`Hamburger menu button ${index + 1} clicked`)
          if (sidebar) {
            console.log("Sidebar exists on click: ", sidebar)
            if (sidebar.classList.contains("open")) {
              sidebarContent?.classList.remove("visible")
              setTimeout(() => {
                sidebar.classList.remove("open")
                setTimeout(() => {
                  sidebar.style.display = "none"
                }, 300) // Wait for the slide-out animation to complete
              }, 100) // Make the text disappear faster
            } else {
              sidebar.style.display = "flex"
              setTimeout(() => {
                sidebar.classList.add("open")
                setTimeout(() => {
                  sidebarContent?.classList.add("visible")
                }, 500) // Delay text appearance until the drawer is past the logo
              }, 10) // Small delay to ensure the transition occurs
            }
          } else {
            console.error("Sidebar not found on click")
          }
          if (mobileSidebar) {
            console.log("mobileSidebar exists on click: ", mobileSidebar)
            if (mobileSidebar.classList.contains("open")) {
              mobileSidebarContent?.classList.remove("visible")
              setTimeout(() => {
                mobileSidebar.classList.remove("open")
                setTimeout(() => {
                  mobileSidebar.style.display = "none"
                }, 300) // Wait for the slide-out animation to complete
              }, 100) // Make the text disappear faster
            } else {
              mobileSidebar.style.display = "flex"
              setTimeout(() => {
                mobileSidebar.classList.add("open")
                setTimeout(() => {
                  mobileSidebarContent?.classList.add("visible")
                }, 500) // Delay text appearance until the drawer is past the logo
              }, 10) // Small delay to ensure the transition occurs
            }
          } else {
            console.error("Sidebar not found on click")
          }
          overlay?.classList.toggle("open")
          button.classList.toggle("open")
        })
      })
    } else {
      console.error("Hamburger menu button not found")
    }

    overlay?.addEventListener("click", () => {
      if (sidebar) {
        sidebarContent?.classList.remove("visible")
        setTimeout(() => {
          sidebar.classList.remove("open")
          setTimeout(() => {
            sidebar.style.display = "none"
          }, 300) // Wait for the slide-out animation to complete
        }, 100) // Make the text disappear faster
      }
      if (mobileSidebar) {
        mobileSidebarContent?.classList.remove("visible")
        setTimeout(() => {
          mobileSidebar.classList.remove("open")
          setTimeout(() => {
            mobileSidebar.style.display = "none"
          }, 300) // Wait for the slide-out animation to complete
        }, 100) // Make the text disappear faster
      }

      overlay?.classList.remove("open")
      hamburgerMenuButtons?.forEach((button) => button.classList.remove("open"))
    })

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && sidebar?.classList.contains("open")) {
        closeSidebar()
      }
    })

    // Smooth scrolling and close sidebar on menu item click
    const menuItems = document.querySelectorAll(".menu-item")
    menuItems.forEach((menuItem) => {
      menuItem.addEventListener("click", (e) => {
        e.preventDefault()
        const targetId = (e.target as HTMLAnchorElement).getAttribute("href") as string
        const targetElement = document.querySelector(targetId) as HTMLElement | null

        if (targetElement) {
          window.scrollTo({
            top: targetElement.offsetTop,
            behavior: "smooth",
          })
          closeSidebar()
        } else {
          console.log(`Element not found: ${targetId}`)
        }
      })
    })

    //
  })
}

initNavigation()
