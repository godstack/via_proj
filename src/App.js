import React, { useEffect, useState } from "react";
import axios from "axios";
import GlobalStyles from "./GlobalStyles.styled";
import { Map } from "./components/Map/Map";

function App() {
  const [polygons, setPolygons] = useState([]);

  const fetchData = async () => {
    const { data } = await axios.get(
      "https://services5.arcgis.com/GfwWNkhOj9bNBqoJ/arcgis/rest/services/NYC_Election_Districts_Water_Included/FeatureServer/0/query?where=1=1&outFields=*&outSR=4326&f=pgeojson"
    );

    setPolygons(data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <GlobalStyles />
      lol
      <Map />
    </>
  );
}

export default App;
