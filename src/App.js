import React, { useEffect, useState } from "react";
import axios from "axios";
import GlobalStyles from "./GlobalStyles.styled";
import Map from "./components/Map/Map";

function App() {
  const [polygons, setPolygons] = useState([]);

  const fetchData = async () => {
    const { data } = await axios.get(
      "https://services5.arcgis.com/GfwWNkhOj9bNBqoJ/arcgis/rest/services/NYC_Election_Districts_Water_Included/FeatureServer/0/query?where=1=1&outFields=*&outSR=4326&f=pgeojson"
    );
    // .slice(0, 10)

    const preparedData = data.features.map((polygon) =>
      polygon.geometry.coordinates[0].map((item) => ({
        lat: item[0],
        lng: item[1],
        time: new Date(),
      }))
    );

    setPolygons(preparedData);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <GlobalStyles />
      <Map polygons={polygons} />
    </>
  );
}

export default App;
