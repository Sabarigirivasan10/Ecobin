import React ,{useState,useEffect}from 'react';
import { StyleSheet, View ,TouchableOpacity,Text} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Dimensions } from 'react-native';
import Details from './Details';
import { LineChart } from 'react-native-chart-kit';
import { useNavigation } from '@react-navigation/native';
import MapView from 'react-native-maps';
import { Marker } from 'react-native-maps';
import chartData from './Details'
import { getTokenFromStorage } from './auth';

const Homepage = () => {
 
  const [dustbinLocations, setDustbinLocations] = useState([]);
  const [dustbinData, setDustbinData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const accessToken = await getTokenFromStorage(); 
        
        const response = await fetch('https://b209-103-130-90-210.ngrok-free.app/model/WasteBins/', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${accessToken}`,
          },
        });
  
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
     //  console.log(data);
        setDustbinLocations(data);
      } catch (error) {
        console.error('Error fetching dustbin locations:', error.message);
        
      }
    };
    //console.log("Locations:")
    //console.log(dustbinLocations)
    // console.log(parseFloat(dustbinLocations[0].latitude));
    // console.log(parseFloat(dustbinLocations[0].longitude));
    fetchData();
  }, []);


  // const getBinColor = async (dustbinId) => {
  //   try {
  //     const response = await fetch(`https://13b5-106-220-247-60.ngrok-free.app/model/binlevel/`);
  //     if (!response.ok) {
  //       throw new Error('Failed to fetch bin data');
  //     }
  //     const binData = await response.json();
  //     const bin = binData[0]; 
  //     if (bin.recyclable > 80 || bin.wet > 80 || bin.metal > 80) {
  //       return 'green'; 
  //     } else {
  //       return 'red'; 
  //     }
  
  //   } catch (error) {
  //     console.error('Error fetching bin data:', error);
  //     return 'red'; 
  //   }
  // };
  


  const navigation=useNavigation();
  const handleDustbinPress = (dustbin) => {
    navigation.navigate('Details',{dustbinId:dustbin.id,area:dustbin.area});
  };
return (
  <View style={styles.container}>
    <MapView
      style={styles.map}
      initialRegion={{
        latitude: 10.909119780582465,
        longitude: 76.97672426163373,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }}
    >  
{
dustbinLocations.map((dustbin) => (
  
  <Marker
    key={dustbin.id}
    coordinate={{
      latitude: parseFloat(dustbin.latitude),
      longitude: parseFloat(dustbin.longitude),
    }}
    title={`Dustbin ${dustbin.id}`}
    onPress={() => handleDustbinPress(dustbin)}>
    <Icon name="trash" size={30} color='red'  />
  </Marker>
))}
    </MapView>
           
  </View>
);
};

const styles = StyleSheet.create({
container: {
  flex: 1,
},
map: {
  flex: 1,
},
chartContainer: {
  position: 'relative', 
  bottom: 10,
  left: 0,
  right: 0,
  backgroundColor: 'white',
  padding: 10,
  borderTopLeftRadius: 10,
  borderTopRightRadius: 10,
},
chart: {
  marginVertical: 8,
  borderRadius: 16,
},
closeButton: {
  position: 'absolute',
  top: 5,
  right: 5,
},
});

export default Homepage; 