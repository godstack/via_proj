import React, { memo, useCallback, useRef, useState } from "react";
import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow,
  Polygon,
} from "@react-google-maps/api";
import { StyledMapContainer } from "./Map.styled";
import { libraries, center, mapContainerStyle } from "./mapConfig";
import { formatRelative } from "date-fns";

const triangleCoords = [
  { lat: 25.774, lng: -80.19 },
  { lat: 18.466, lng: -66.118 },
  { lat: 32.321, lng: -64.757 },
  { lat: 25.774, lng: -80.19 },
];

const Map = ({ polygons }) => {
  const [markers, setMarkers] = useState([]);
  const [selected, setSelected] = useState(null);

  // debugger;

  const onMapClick = useCallback((e) => {
    setMarkers((currentState) => [
      ...currentState,
      { lat: e.latLng.lat(), lng: e.latLng.lng(), time: new Date() },
    ]);
  }, []);

  const mapRef = useRef();
  const onMapLoad = useCallback((map) => {
    mapRef.current = map;
  }, []);

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries,
  });

  if (loadError) return "Error loading maps";

  if (!isLoaded) return "Loading maps";

  return (
    <StyledMapContainer>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={3}
        center={center}
        onClick={onMapClick}
        onLoad={onMapLoad}
      >
        {polygons.map((item) => {
          debugger;

          // const kek = item.geometry.coordinates[0].map((item) => ({
          //   lat: item[0],
          //   lng: item[1],
          // }));

          return (
            <Polygon
              paths={item}
              strokeColor={"#FF0000"}
              strokeOpacity={0.8}
              strokeWeight={2}
              fillColor={"#FF0000"}
              fillOpacity={0.35}
            />
          );
        })}

        <Polygon
          paths={triangleCoords}
          options={{
            strokeColor: "#FF0000",
            strokeOpacity: 0.8,
            strokeWeight: 2,
            fillColor: "#FF0000",
            fillOpacity: 0.35,
          }}
        />

        {/* {markers.map((marker) => (
          <Marker
            key={marker.time.toISOString()}
            position={{ lat: marker.lat, lng: marker.lng }}
            onClick={() => setSelected(marker)}
            // icon={{
            //   url:
            //     "http://icons.iconarchive.com/icons/paomedia/small-n-flat/48/map-marker-icon.png",
            //   scaledSize: new window.google.maps.Size(30, 30),
            //   origin: new window.google.maps.Point(0, 0),
            //   anchor: new window.google.maps.Point(0, 0),
            // }}
          />
        ))}
        {selected && (
          <InfoWindow position={{ lat: selected.lat, lng: selected.lng }} onCloseClick={() => setSelected(null)}>
            <div>
              <h2>Bear spotted!</h2>
              <p>Spotted {formatRelative(selected.time, new Date())}</p>
            </div>
          </InfoWindow>
        )} */}
      </GoogleMap>
    </StyledMapContainer>
  );
};

const MemoizedMap = memo(Map);

export default MemoizedMap;
