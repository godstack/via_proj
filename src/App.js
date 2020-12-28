import React, { useEffect, useState } from 'react';
import axios from 'axios';
import GlobalStyles from './GlobalStyles.styled';
import uuid from 'react-uuid';
import Map from './components/Map/Map';
import { colors, names } from './utils/constants';
import {
  AppWrapper,
  StyledTableWrapper,
  TableContent,
  TableHead,
  StyledLoading
} from './App.styled';
import TableItem from './components/TableItem/TableItem';

function App() {
  const [polygons, setPolygons] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);

  const fetchData = async () => {
    const { data } = await axios.get(
      'https://services5.arcgis.com/GfwWNkhOj9bNBqoJ/arcgis/rest/services/NYC_Election_Districts_Water_Included/FeatureServer/0/query?where=1=1&outFields=*&outSR=4326&f=pgeojson'
    );

    console.log(data);

    const preparedData = data.features.map(polygon => ({
      time: new Date(),
      color: colors[Math.floor(Math.random() * colors.length)],
      name: names[Math.floor(Math.random() * names.length)],
      comment: '',
      id: uuid(),
      coordinates: polygon.geometry.coordinates[0].map(item => ({
        lng: parseFloat(item[0]),
        lat: parseFloat(item[1])
      }))
    }));

    setPolygons(preparedData);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <AppWrapper>
      <GlobalStyles />

      <Map
        polygons={polygons}
        selectedItem={selectedItem}
        setSelectedItem={setSelectedItem}
      />

      <StyledTableWrapper>
        <TableHead>
          <div>Name</div>
          <div>Color</div>
          <div>Date</div>
          <div>Comment</div>
        </TableHead>

        {polygons.length ? (
          <TableContent>
            {polygons.map(item => (
              <TableItem
                item={item}
                key={item.id}
                setSelectedItem={setSelectedItem}
                selectedItem={selectedItem}
              />
            ))}
          </TableContent>
        ) : (
          <StyledLoading>Loading...</StyledLoading>
        )}
      </StyledTableWrapper>
    </AppWrapper>
  );
}

export default App;
