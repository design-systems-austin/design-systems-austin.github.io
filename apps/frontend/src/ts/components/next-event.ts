import { fetchEvents } from "../api/fetch-events.ts"
import spinnerStyles from "../../css/components/spinner.module.css"
import nextEventStyles from "../../css/components/next-event.module.css"

export const renderNextEvent = async () => {
  const eventContainer = document.querySelector(".next-event-container") // Use class selector

  if (!eventContainer) {
    console.error("Next event container not found.")
    return
  }

  // Function to create and add the spinner to the DOM
  const addSpinner = () => {
    const spinnerContainer = document.createElement("div")
    spinnerContainer.classList.add(spinnerStyles["spinner-container"])

    const spinner = document.createElement("span")
    spinner.classList.add(spinnerStyles.spinner)
    spinnerContainer.appendChild(spinner)

    eventContainer.appendChild(spinnerContainer)
  }

  // Function to remove the spinner from the DOM
  const removeSpinner = () => {
    const spinnerContainer = document.querySelector(`.${spinnerStyles["spinner-container"]}`)
    if (spinnerContainer) {
      spinnerContainer.remove()
    }
  }

  // Clear any existing content and add the spinner
  eventContainer.innerHTML = ""
  addSpinner()

  // Add a 1-second timeout for testing purposes (@TODO replace with real fetch logic later)
  await new Promise((resolve) => setTimeout(resolve, 1000))

  // Fetch the events
  const events = await fetchEvents()

  // Remove the spinner after data is loaded
  removeSpinner()

  if (events.length === 0) {
    const noEventsMessage = document.createElement("p")
    noEventsMessage.textContent = "No upcoming events."
    eventContainer.appendChild(noEventsMessage)
    return
  }

  // Get today's date for comparison
  const now = new Date()

  // Filter events to only those with a date later than today
  const futureEvents = events.filter((event: any) => {
    const eventDate = new Date(event.properties.event_date?.date?.start)
    return eventDate > now
  })

  if (futureEvents.length === 0) {
    const noEventsMessage = document.createElement("p")
    noEventsMessage.textContent = "No upcoming events."
    eventContainer.appendChild(noEventsMessage)
    return
  }

  // Sort the future events by their date (earliest first)
  futureEvents.sort((a: any, b: any) => {
    const dateA = new Date(a.properties.event_date?.date?.start)
    const dateB = new Date(b.properties.event_date?.date?.start)
    return dateA.getTime() - dateB.getTime()
  })

  // The first event in the sorted array is the closest upcoming event
  const nextEvent = futureEvents[0]
  const eventDate = nextEvent.properties.event_date?.date?.start || "Date not set"
  const eventLocation = nextEvent.properties.event_location_name?.rich_text[0]?.plain_text || "Location not set"
  const eventDescription =
    nextEvent.properties.event_description?.rich_text[0]?.plain_text || "No description available"

  // Render the next event
  const eventTitle = document.createElement("h1")
  eventTitle.classList.add(nextEventStyles["next-event-title"], "title-md")
  eventTitle.textContent = nextEvent.properties.event_name?.title[0]?.plain_text || "Unnamed Event"

  const eventDetails = document.createElement("p")
  eventDetails.classList.add(nextEventStyles["next-event-details"])
  eventDetails.textContent = `Date: ${new Date(eventDate).toLocaleDateString()} | Location: ${eventLocation}`

  const eventDescriptionEl = document.createElement("p")
  eventDescriptionEl.classList.add(nextEventStyles["next-event-description"])
  eventDescriptionEl.textContent = eventDescription

  const ctaButton = document.createElement("a")
  ctaButton.href = "#"
  ctaButton.classList.add(nextEventStyles["cta-button"])
  ctaButton.textContent = "RSVP"

  eventContainer.appendChild(eventTitle)
  eventContainer.appendChild(eventDetails)
  eventContainer.appendChild(eventDescriptionEl)
  eventContainer.appendChild(ctaButton)
}

// Automatically call renderNextEvent when the script is loaded
renderNextEvent()
