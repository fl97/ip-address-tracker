const inputField = document.querySelector("#text-input")
const submitBtn = document.querySelector(".button")
const ipData = document.querySelector("#ip-address")
const locationData = document.querySelector("#location")
const timezoneData = document.querySelector("#timezone")
const ispData = document.querySelector("#isp")
const mapContainer = document.querySelector("#map")
const map = L.map(mapContainer).setView([0, 0], 15)
const tileURL = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
const attribution = '&copy <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
const tiles = L.tileLayer(tileURL, { attribution }).addTo(map)
const locationMarker = L.icon({
    iconUrl: "/images/icon-location.svg",
    iconSize: [46, 56],
})

displayClientIP()

submitBtn.addEventListener("click", e => {
    e.preventDefault()

    if (inputField.value) {
        checkData(inputField.value)
    } else {
        displayError()
    }
})

//displays the Client IP on load
async function displayClientIP() {
    const response = await fetch("https://geo.ipify.org/api/v1?apiKey=at_1UOKYLUYX6wX01ZGYWP76R8ncaxAh")
    const data = await response.json()
    const clientIP = await data.ip

    inputField.value = clientIP
    checkData(clientIP)
}

function checkData(inputValue) {
    const input = inputValue
    const domainFormat = /^(?!\-)([a-zA-Z0-9 \-?]{2,63})\.([a-zA-Z]{2,4})(.[a-z]{2,4})?$/
    const ipFormat = /^([0-9]{1,3})\.([0-9]{1,3})\.([0-9]{1,3})\.([0-9]{1,3})$/

    if (input.match(domainFormat)) {
        fetchData(input, "domain")
    } else if (input.match(ipFormat)) {
        fetchData(input, "ipAddress")
    } else {
        alert("invalid input")
    }
}

async function fetchData(inputValue, inputType) {
    const url = "https://geo.ipify.org/api/v1?"
    const API_Key = "at_1UOKYLUYX6wX01ZGYWP76R8ncaxAh"
    const urlTemplate = `${url}apiKey=${API_Key}&${inputType}=${inputValue}`

    const response = await fetch(`${urlTemplate}`)
    const data = await response.json()

    generateInfo(data)
    generateMap(data)

    inputField.value = ""
}

function generateInfo(info) {
    const ip = info.ip
    const isp = info.isp
    const location = `${info.location.city}, ${info.location.country} ${info.location.postalCode}`
    const timezone = info.location.timezone

    ipData.textContent = ip
    locationData.textContent = location
    timezoneData.textContent = "UTC " + timezone
    ispData.textContent = isp
}

function generateMap(info) {
    const lat = info.location.lat
    const long = info.location.lng
    const location = `${info.location.city}, ${info.location.country} ${info.location.postalCode}`

    const marker = L.marker([lat, long], { icon: locationMarker }).addTo(map)

    map.panTo([lat, long])
    marker.bindPopup(location)
}

const displayError = () => alert("Please enter IP Address or domain")