import React, { memo, useCallback, useRef, useState, useMemo } from 'react';
import {
  GoogleMap,
  useLoadScript,
  InfoWindow,
  Polygon
} from '@react-google-maps/api';
import { StyledMapContainer } from './Map.styled';
import { libraries, center, mapContainerStyle } from './mapConfig';
import { formatRelative } from 'date-fns';

const Map = ({ polygons, selectedItem, setSelectedItem }) => {
  const [selected, setSelected] = useState(null);

  const memoizedPolygons = useMemo(
    () =>
      polygons.map(item => (
        <Polygon
          paths={item.coordinates}
          options={{
            strokeColor: '##000000',
            strokeOpacity: 0.8,
            strokeWeight: 2,
            fillColor: '##000000',
            fillOpacity: 0.35
          }}
          onClick={e => {
            setSelected({
              lat: e.latLng.lat(),
              lng: e.latLng.lng(),
              time: item.time,
              color: item.color,
              name: item.name,
              comment: item.comment
            });
          }}
          key={item.id}
          // onMouseOver={e => {
          //   setSelectedItem(item);
          // }}
          // onMouseOut={e => {
          //   setSelectedItem(null);
          // }}
        />
      )),
    [polygons]
  );

  console.log(memoizedPolygons);

  const onMapClick = useCallback(e => {
    // setMarkers(currentState => [
    //   ...currentState,
    //   { lat: e.latLng.lat(), lng: e.latLng.lng(), time: new Date() }
    // ]);
  }, []);

  const mapRef = useRef();
  const onMapLoad = useCallback(map => {
    mapRef.current = map;
  }, []);

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries
  });

  if (loadError) return 'Error loading maps';

  if (!isLoaded) return 'Loading maps';

  return (
    <StyledMapContainer>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={11}
        center={center}
        onClick={onMapClick}
        onLoad={onMapLoad}
      >
        {memoizedPolygons}

        {selectedItem && (
          <Polygon
            paths={selectedItem.coordinates}
            options={{
              strokeColor: selectedItem.color,
              strokeOpacity: 0.8,
              strokeWeight: 2,
              fillColor: selectedItem.color,
              fillOpacity: 0.35
            }}
            key={selectedItem.id + 'unique'}
          />
        )}

        {selected && (
          <InfoWindow
            position={{ lat: selected.lat, lng: selected.lng }}
            onCloseClick={() => setSelected(null)}
          >
            <div>
              <h2>Polygon {selected.name}</h2>
              <p>Color {selected.color}</p>
              <p>
                Comment: {selected.comment ? selected.comment : 'No comment'}
              </p>
              <p>Spotted {formatRelative(selected.time, new Date())}</p>
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
    </StyledMapContainer>
  );
};

const MemoizedMap = memo(Map);

export default MemoizedMap;
