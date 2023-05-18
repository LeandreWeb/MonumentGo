<script setup lang="ts">
import mapboxgl from "mapbox-gl";
import { onMounted, watch, ref } from "vue";
import { useMonuments } from "@/shared/stores";
import { router } from "@/router";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";

const monumentsStore = useMonuments();

let popupMarkers: mapboxgl.Marker[] = [];
let mapref = ref<mapboxgl.Map>();
let centerMarker = new mapboxgl.Marker({ color: "#157347" });

watch(
  () => [
    monumentsStore.filters.kmRange,
  ],
  async (newValue, oldValue) => {
    await monumentsStore.setMonumentsWithinRadius();
    if (mapref.value) {
      updateMarkers(mapref.value);
      updateRadiusCircle(mapref.value)
    }
  }
);

watch(
  () => [
    monumentsStore.centerLatitude,
    monumentsStore.centerLongitude,
  ],
  async (newValue, oldValue) => {
    await monumentsStore.setMonumentsWithinRadius();
    if (mapref.value) {
      updateMarkers(mapref.value);
    }
  }
);

watch(
  () => [
    monumentsStore.filters.favorite,
    monumentsStore.filters.toSee,
    monumentsStore.filters.visited,
    monumentsStore.filters.notVisited,
  ],
  (newValue, oldValue) => {
    if (mapref.value) {
      updateMarkers(mapref.value);
    }
  }
);

// ---------------------- ONMOUNTED MAPBOX --------------------------------------------

onMounted(async () => {

  // Les options du GetCurrentPosition
  const options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0,
  };

  // Tente d'obtenir la geolocalisation du user
  navigator.geolocation.getCurrentPosition(success, error, options);

  // Fonction qui prend les donnees du navigateur pour sa position actuelle
  function success(pos: any) {
    const crd = pos.coords;
    monumentsStore.centerLatitude = crd.latitude;
    monumentsStore.centerLongitude = crd.longitude;
  }

  // Vérifie les erreurs de GetCurrentPosition
  function error(err: any) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
  }

  // Token de connexion à Mapbox
  mapboxgl.accessToken = "pk.eyJ1IjoibGVhbmRyZWJiIiwiYSI6ImNsZThveXlkbjBocHQzeHIxZmpoOTBqMGIifQ.xRK99WKbAjKkTH2M9jZCpg";

  // Donnees initiale de la map
  let map = new mapboxgl.Map({
    container: "map", // tag HTML
    style: "mapbox://styles/mapbox/streets-v11", // Changeable sur MapBox studio
    zoom: 12, // +haut = +plus proche
  });

  mapref.value = map;

  // Rajoute Icone en bas a droite pour centrer position vers utilisateur
  const geolocalisation = new mapboxgl.GeolocateControl({
    positionOptions: {
      enableHighAccuracy: true,
    },
    trackUserLocation: true, //pour continuer de suivre le user
    showUserHeading: true, //pour montrer la direction du user
  });
  map.addControl(geolocalisation, "bottom-right");

  //Module zomm ajouter a la map coin du bas-droite
  const zoomModule = new mapboxgl.NavigationControl();
  map.addControl(zoomModule, "bottom-right");

  // Module Geocoder de recherche
  const geocoder = new MapboxGeocoder({
    accessToken: mapboxgl.accessToken,
    mapboxgl: mapboxgl,
    marker: false,
  })
  map.addControl(geocoder, "top-right")

  geocoder.on('result', (result) => {
    const longitude = result.result.center[0];
    const latitude = result.result.center[1];

    monumentsStore.centerLongitude = longitude;
    monumentsStore.centerLatitude = latitude;

    updateRadiusCircle(map)
    centerMarker.setLngLat([longitude, latitude]);

    map.flyTo({
      center: result.result.center,
      zoom: 12,
    });
  });

  // Part lorsque la map est Loader et se met a la position du user si localiser
  map.on("load", () => {
    map.setCenter([monumentsStore.centerLongitude, monumentsStore.centerLatitude]);
    geolocalisation.trigger(); // mettre le pointer du user
  });

  await monumentsStore.setMonumentsWithinRadius();
  updateMarkers(map);
  updateRadiusCircle(map)
  centerMarker.setLngLat([monumentsStore.centerLongitude, monumentsStore.centerLatitude]).addTo(map);

  // Change la position de recherche lorsque la map est cliquée
  map.on("click", (e) => {
    mapref.value = map;
    const clickLngLat = e.lngLat.toArray();

    const markers = popupMarkers.map((m) => m.getLngLat());
    const markerDistances = markers.map((m) => e.lngLat.distanceTo(m));
    const closestMarkerIndex = markerDistances.indexOf(Math.min(...markerDistances));
    const closestMarker = popupMarkers[closestMarkerIndex];

    // Récupère le niveau de zoom actuel de la carte et calcule la distance relative
    const zoom = map.getZoom();
    const distance = 5200 / zoom;
    // console.log("distance", distance)

    // Vérifiez si le clic se trouve à proximité du marqueur le plus proche
    if (closestMarker?.getLngLat() && e.lngLat.distanceTo(closestMarker.getLngLat()) < distance) {
    } else {
      monumentsStore.centerLongitude = clickLngLat[0];
      monumentsStore.centerLatitude = clickLngLat[1];
      updateRadiusCircle(map)
      centerMarker.setLngLat([clickLngLat[0], clickLngLat[1]]);
    }

  });
});

// ---------------------- RADIUS CIRCLE ---------------------------------------------

function updateRadiusCircle(map: mapboxgl.Map) {

  if (map.getSource("radius")) {
    map.removeLayer("radius")
    map.removeSource("radius")
  }

  const points: Array<number[]> = [];

  for (let i = 0; i < 30; i++) {
    const point: number[] = []
    const angle = (i / 30) * Math.PI * 2; // calculate the angle for this point
    const x = monumentsStore.centerLongitude + Math.cos(angle) * monumentsStore.filters.kmRange * 0.01356; // calculate the x-coordinate for this point
    const y = monumentsStore.centerLatitude + Math.sin(angle) * monumentsStore.filters.kmRange * 0.0095; // calculate the y-coordinate for this point
    point.push(x); // add the point to the array
    point.push(y); // add the point to the array
    points.push(point)
  }

  points.push(points[0])

  map.addSource("radius", {
    type: "geojson",
    data: {
      type: "Feature",
      properties: {},
      geometry: {
        type: "Polygon",
        coordinates: [points],
      },
    },
  });
  map.addLayer({
    id: "radius",
    type: "fill",
    source: "radius", // reference the data source
    layout: {},
    paint: {
      "fill-color": "#157347",
      "fill-opacity": 0.2,
    },
  });
}

// ---------------------- UPDATE MARKERS-POPUP --------------------------------------------

function updateMarkers(map: mapboxgl.Map) {
  popupMarkers.forEach((marker) => {
    marker.remove();
  });
  popupMarkers = [];

  monumentsStore.getMonumentsFiltered.forEach((monument) => {
    const marker = new mapboxgl.Marker().setLngLat([monument.geopoint.longitude, monument.geopoint.latitude]).setPopup(
      new mapboxgl.Popup().setHTML(
        `<main id="monument-popup" class="${monument.id}">
          <section class="d-flex border-bottom pop-limit-height mb-0 position-relative">
            <div href="/monuments/${monument.id}" class="pop-monument-link">
              <img src="${monument.mainPhoto}" class="pop-monument-img" />
              <p class="position-absolute top-0 end-0 pop-monument-name m-2 me-auto px-2 text-end">${monument.name}</p>
            </div>
            <div class="pop-likes-counter likes position-absolute bottom-0 start-0 m-1">${monument.likes} J'aime</div>
            <div class="pop-monument-infos d-flex flex-column">
              <div class="m-2 monument-address mt-auto pb-1 text-end">
                <p class="mb-0">${monument.civicNumber} ${monument.street}</p>
                <p class="mb-0">${monument.city}</p>
              </div>
              <div class="d-flex justify-content-between mx-2 mb-2">
                <strong class="monument-year">Année: ${monument.year}</strong>
              </div>
            </div>

            <!--<button id="pop-like-btn" class="btn pop-like-btn likes position-absolute bottom-0 start-0 m-1 heart-pop">
              <i class="fa-solid fa-heart"></i> ${monument.likes} 
            </button>-->
          </section>
        </main>`
      )
    );

    popupMarkers.push(marker);
  });

  popupMarkers.forEach((m) => {
    m.addTo(map);
    m.getPopup().on("open", (e: any) => {
      const mapPop = document.querySelector("#monument-popup");
      const id = mapPop?.classList[0];
      const link = document.querySelector(".pop-monument-link");

      link?.addEventListener("click", () => {
        router.push("monuments/" + id);
      });
    });
  });
}


</script>


<template>
  <div id="map"></div>
</template>


<style lang="scss">
#map {
  height: 100%;
  width: 100%;
}

.mapboxgl-ctrl-geolocate {
  height: 38px !important;
  width: 38px !important;
}

.mapboxgl-ctrl-geocoder {
  width: 100%;
  background-color: rgba(255, 255, 255, 0.87);

  .mapboxgl-ctrl-geocoder--input {
    &:focus-within {
      background-color: var(--white-color);
      border-radius: 5px;
    }
  }
}

@media (max-width: 650px) {
  .mapboxgl-ctrl-geocoder {
    width: 90%;
    height: 38px;
    margin-top: 60px !important;
    margin-right: 15px !important;
    font-size: 1rem;

    .mapboxgl-ctrl-geocoder--input {
      height: 38px;
    }

    .mapboxgl-ctrl-geocoder--icon {
      top: 8px;
    }
  }

  .mapboxgl-ctrl-top-right {
    width: 348px;
    left: 0 !important;
  }
}

.mapboxgl-popup-content {
  background-color: #424242;
  width: 270px;
  height: 150px;
  padding: 5px;
}

.mapboxgl-popup-tip {
  border-top-color: #424242 !important;
}

.mapboxgl-popup-close-button {
  font-size: 2em;
  color: var(--text-light-color);
  background-color: var(--text-dark-color-2);
  border-radius: 50%;
  padding: 0.29rem 0.45rem 0.22rem;
  right: -13px;
  top: -13px;

  &:hover {
    background-color: var(--text-light-color);
    color: var(--text-dark-color-2);
  }
}

.pop-limit-height {
  height: 140px;
}

.pop-monument-img {
  height: 140px;
  width: 100%;
  // min-width: 120px;
  min-width: 140px;
  max-width: 140px;
  object-fit: cover;
}

.pop-monument-name {
  background-color: var(--transparent-light-background);
  font-family: "Raleway", sans-serif;
  font-size: 0.9rem;
  font-weight: 600;
  height: fit-content;
  width: fit-content;
}

.pop-monument-link {
  cursor: pointer;
  outline: none;

  &:hover {
    color: var(--primary-color);
  }
}

.pop-monument-infos {
  background-color: var(--text-light-color);
  width: 100%;
}

.pop-like-btn {
  border: none;
  padding: 0.3rem 0.55rem 0.05rem 0.5rem;
  font-size: 0.8rem;
  color: var(--light-gray-background);
  background-color: var(--transparent-medium-background);
  border-radius: 50px;

  &:hover {
    background-color: var(--transparent-light-hover);
  }
}

.pop-small-tosee-btn {
  width: fit-content;
  font-size: 1rem;
  background-color: transparent !important;
  border: none;
  padding: 0;

  &:hover span {
    color: var(--primary-color) !important;
  }
}

.pop-liked {
  color: var(--liked-color) !important;
}

.pop-likes-counter {
  border: none;
  padding: 0.05rem 0.3rem 0rem 0.3rem;
  font-size: 0.8rem;
  color: var(--light-gray-background);
  background-color: var(--transparent-dark-background);
  border-radius: 50px;
}

.pop-heart {
  font-size: 1.3rem;
  color: var(--white-color) !important;
}

.mapboxgl-ctrl-top-right {
  margin-right: 350px;
  margin-top: 25px;
}

@media screen and (max-width: 1090px) {
  .mapboxgl-ctrl-top-right {
    margin-right: auto;
    margin-top: auto;
  }
}
</style>
