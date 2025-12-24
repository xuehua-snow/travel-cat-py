mapboxgl.accessToken = 'pk.eyJ1IjoiaDg2OTY2MTM2OCIsImEiOiJjbWgweXdiYXIyam4zMmpxMm4xdzVxdDZ3In0.ss474gDeBh40T0_8FFKw2A';

const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v12',
    center: [-79.3832, 43.6532], // Toronto
    zoom: 12
});

// nabigate icon
map.addControl(new mapboxgl.NavigationControl());

//Geocoder
const geocoder = new MapboxGeocoder({
    accessToken: mapboxgl.accessToken,
    mapboxgl: mapboxgl,
    marker: false, 
    language: 'en'     // by english
});
map.addControl(geocoder, 'top-left');

//  marker
const marker = new mapboxgl.Marker();
const popup = new mapboxgl.Popup({ offset: 10 });

// ----------------------------------------------------------------------------------------------
// jump to
geocoder.on('result', function (e) {
    const coords = e.result.geometry.coordinates; // [lng, lat]
    const placeName = e.result.place_name || 'Unknown place';

    map.flyTo({
        center: coords,
        zoom: 14
    });

    marker.setLngLat(coords).addTo(map);
    popup
        .setLngLat(coords)
        .setHTML(
            `<div style="font-size:12px;max-width:260px;">
                        <strong>${placeName}</strong>
                     </div>`
        )
        .addTo(map);
});


// ------------------POI--------------------------------------
map.on('mousemove', function (e) {
    const features = map.queryRenderedFeatures(e.point, {
        layers: ['poi-label']   // streets-v12 里的 POI 图层
    });

    const canvas = map.getCanvas();
    if (features.length > 0) {
        canvas.style.cursor = 'pointer';
    } else {
        canvas.style.cursor = 'default';
    }
});

map.on('click', function (e) {
    const features = map.queryRenderedFeatures(e.point, {
        layers: ['poi-label'] 
    });

    if (!features.length) {
        return; 
    }

    const feature = features[0];

    // get position
    let coords;
    if (feature.geometry.type === 'Point') {
        coords = feature.geometry.coordinates;
    } else {
        coords = feature.geometry.coordinates[0];
    }

    const name = feature.properties.name || 'Unnamed place';
    const category =
        feature.properties.class ||
        feature.properties.type ||
        '';

    map.flyTo({
        center: coords,
        zoom: 15
    });

    // -------------------show message--------------------------
    marker.setLngLat(coords).addTo(map);
    popup
        .setLngLat(coords)
        .setHTML(
            `<div style="font-size:12px;max-width:260px;">
                        <strong>${name}</strong><br/>
                        ${category}
                     </div>`
        )
        .addTo(map);
});