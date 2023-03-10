import {Image} from 'react-native';
import React, {useState, useEffect} from 'react';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import {API, graphqlOperation} from 'aws-amplify';
import {listLocksmiths} from '../../graphql/queries';

import locksmiths from '../../assets/data/locksmiths';

const HomeMap = () => {
  const [locksmiths, setLocksmiths] = useState([]);

  useEffect(() => {
    const fetchLocksmiths = async () => {
      try {
        const response = await API.graphql(graphqlOperation(listLocksmiths));

        setLocksmiths(response.data.listLocksmiths.items);
      } catch (e) {
        console.error(e);
      }
    };
    fetchLocksmiths();
  }, []);

  const getImage = type => {
    if (type === 'Home') {
      return require('../../assets/images/map-home.png');
    }
    if (type === 'Vehicle') {
      return require('../../assets/images/map-car.png');
    }
    return require('../../assets/images/map-elec.png');
  };

  return (
    <MapView
      style={{height: '100%', width: '100%'}}
      provider={PROVIDER_GOOGLE}
      showsUserLocation={true}
      initialRegion={{
        latitude: 10.82213,
        longitude: 106.686829,
        latitudeDelta: 0.0222,
        longitudeDelta: 0.0121,
      }}>
      {locksmiths.map(locksmith => (
        <Marker
          key={locksmith.id}
          coordinate={{
            latitude: locksmith.latitude,
            longitude: locksmith.longitude,
          }}>
          <Image
            style={{
              width: 35,
              height: 35,
              resizeMode: 'contain',
              // transform: [
              //   {
              //     rotate: `${locksmith.heading}deg`,
              //   },
              // ],
            }}
            source={getImage(locksmith.type)}
          />
        </Marker>
      ))}
    </MapView>
  );
};

export default HomeMap;
