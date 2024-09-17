import { fetchEvents } from "../api/fetch-events.ts"
import spinnerStyles from "../../css/components/spinner.module.css"
import pastEventsGridStyles from "../../css/components/past-events-grid.module.css"

export const renderPastEvents = async () => {
  const eventsContainer = document.getElementById("past-events-container")

  if (!eventsContainer) {
    console.error("Events container not found.")
    return
  }

  // Function to create and add the spinner to the DOM
  const addSpinner = () => {
    const spinnerContainer = document.createElement("div")
    spinnerContainer.classList.add(spinnerStyles["spinner-container"]) // Add container class

    const spinner = document.createElement("span")
    spinner.classList.add(spinnerStyles.spinner) // Add spinner class
    spinnerContainer.appendChild(spinner)

    eventsContainer.appendChild(spinnerContainer)
  }
  // Function to remove the spinner from the DOM
  const removeSpinner = () => {
    const spinner = document.querySelector(`.${spinnerStyles.spinner}`)
    if (spinner) {
      spinner.remove()
    }
  }
  // Clear any existing content and add the spinner
  eventsContainer.innerHTML = ""
  addSpinner()

  // Add a 5-second timeout for testing purposes
  await new Promise((resolve) => setTimeout(resolve, 10000))

  // Fetch the events
  const events = await fetchEvents()
  console.log("got events: ", events)

  // Filter past events by comparing their date with the current date
  const now = new Date()
  const pastEvents = events.filter((event: any) => {
    const eventDate = new Date(event.properties.event_date?.date?.start)
    return eventDate < now
  })

  // Remove the spinner after data is loaded
  removeSpinner()

  if (pastEvents.length === 0) {
    const noEventsMessage = document.createElement("p")
    noEventsMessage.textContent = "No past events available."
    eventsContainer.appendChild(noEventsMessage)
    return
  }

  // Loop through the past events and render them as HTML
  pastEvents.forEach((event: any) => {
    const eventDiv = document.createElement("div")
    eventDiv.classList.add(pastEventsGridStyles["event"]) // Use module class for event

    // Create and append the event name
    const eventName = event.properties.event_name?.title[0]?.plain_text || "Unnamed Event"
    const eventNameEl = document.createElement("h3")
    eventNameEl.classList.add(pastEventsGridStyles["past-event-name"]) // Use module class for event name
    eventNameEl.textContent = eventName
    eventDiv.appendChild(eventNameEl)

    // Create and append the event date
    const eventDate = event.properties.event_date?.date?.start || "Date not set"
    const eventDateEl = document.createElement("p")
    eventDateEl.classList.add(pastEventsGridStyles["past-event-date"]) // Use module class for event date
    eventDateEl.textContent = `Date: ${new Date(eventDate).toLocaleDateString()}`
    eventDiv.appendChild(eventDateEl)

    // Create and append the event description
    const eventDescription = event.properties.event_description?.rich_text[0]?.plain_text || "No description available"
    const eventDescriptionEl = document.createElement("p")
    eventDescriptionEl.classList.add(pastEventsGridStyles["past-event-description"]) // Use module class for event description
    eventDescriptionEl.textContent = eventDescription
    eventDiv.appendChild(eventDescriptionEl)

    // Create and append the event location name and link
    const eventLocationName = event.properties.event_location_name?.rich_text[0]?.plain_text || "Location not set"
    const eventLocationLink = event.properties.event_location_link?.url || "#"
    const eventLocationEl = document.createElement("a")
    eventLocationEl.href = eventLocationLink
    eventLocationEl.classList.add(pastEventsGridStyles["past-event-location"]) // Use module class for event location
    eventLocationEl.textContent = eventLocationName
    eventDiv.appendChild(eventLocationEl)

    // Add the event to the container
    eventsContainer.appendChild(eventDiv)
  })
}
// Automatically call renderPastEvents when the script is loaded
renderPastEvents()
