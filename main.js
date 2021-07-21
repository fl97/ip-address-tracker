let mymap = L.map('mapid').setView([48.3250947, 11.7432155], 13)

L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1IjoiZmxvcmlhbi1sdXR6IiwiYSI6ImNrcmRiZzlneDFnOHIyb3F1dHNoNGJscmIifQ.h36I1otMNo0ILKulU7pMOQ'
}).addTo(mymap);

const getOwnIP = async () => {
    const response = await fetch('https://api.ipify.org?format=json')
    const myJSON = await response.json()
    console.log(myJSON.ip)

    //Get Geolocation of IP with IP Geolocation API
}

getOwnIP()