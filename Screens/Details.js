import React ,{useState,useEffect}from 'react';
import MapView, { Marker } from 'react-native-maps';
import { StyleSheet, View ,TouchableOpacity,Text} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Dimensions } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { LineChart } from 'react-native-chart-kit';
import { PieChart } from 'react-native-chart-kit';
import {ProgressChart} from 'react-native-chart-kit';
import Homepage from './Homepage';
// kk
const Details=()=>{
  const route = useRoute();
  const { dustbinId,area } = route.params;

  const [dustbinData, setDustbinData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
       // const accessToken = await getTokenFromStorage(); 
        const response = await fetch(`https://b209-103-130-90-210.ngrok-free.app/model/binlevel/`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
           // 'Authorization': `Token ${accessToken}`,
          },
        });
  
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setDustbinData(data);
      } catch (error) {
        console.error('Error fetching dustbin Data:', error.message);
        
      }
    };
    fetchData();
  }, [dustbinId]);


  const firstData = dustbinData.length > 0 ? dustbinData[0] : null;
  console.log(firstData)
  const recyclable = firstData ? firstData.recyclable : 0;
  const metal = firstData ? firstData.metal : 0;
  const wet = firstData ? firstData.wet : 0;
  const recyclablePercentage = (recyclable-2)*10;
  const metalPercentage = (metal-2)*10;
  const wetPercentage = (wet-2)*10;
  
  const secondata = dustbinData.length > 1 ? dustbinData[1] : null
  const thirdData = dustbinData.length > 2 ? dustbinData[2] : null;
  const fourthData = dustbinData.length > 3 ? dustbinData[3] : null;
  const fifthData = dustbinData.length > 4? dustbinData[4] : null;
  const sixthData = dustbinData.length > 5 ? dustbinData[5] : null;
  const seventhData = dustbinData.length > 6 ? dustbinData[6] : null;

    const combinedChartData = {
        labels: ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6', 'Day 7'],
        datasets: [
          {
            data: [recyclable, secondata ? secondata.recyclable : 0,thirdData ? thirdData.recyclable : 0, fourthData ? fourthData.recyclable : 0, fifthData ? fifthData.recyclable : 0, sixthData ? sixthData.recyclable : 0, seventhData ? seventhData.recyclable : 0], 
            color: (opacity = 1) => `rgba(0, 255, 0, ${opacity})`, 
            
          },
          
          {
            data: [wet, secondata ? secondata.wet : 0,thirdData ? thirdData.wet : 0, fourthData ? fourthData.wet : 0, fifthData ? fifthData.wet : 0, sixthData ? sixthData.wet : 0, seventhData ? seventhData.wet : 0], 
            color: (opacity = 1) => `rgba(255, 0, 0, ${opacity})`, 
          },
          {
            data: [metal, secondata ? secondata.metal : 0,thirdData ? thirdData.metal : 0, fourthData ? fourthData.metal : 0, fifthData ? fifthData.metal : 0, sixthData ? sixthData.metal : 0, seventhData ? seventhData.metal : 0], 
            color: (opacity = 1) => `rgba(255, 255, 0, ${opacity})`, 
          },
         
        ],
      };
      const wasteData = [
        { type: 'Wet Organic', level: wetPercentage, color: 'lightgreen' },
        { type: 'Recyclable', level: recyclablePercentage, color: 'blue' },
        { type: 'Metal', level: metalPercentage, color: 'yellow' },
      ];
      const combinedData = [
        recyclablePercentage / 100,
        metalPercentage / 100,
        wetPercentage / 100,
      ];
      const colors = ['red', '#f1c40f', '#27ae60'];

      const data = {
        labels: ['Recyclable', 'Metal', 'Wet'],
        data: combinedData,
      };
      console.log(recyclablePercentage)
      console.log(metalPercentage)
      console.log(wetPercentage)
      
      const chartConfig = {
        backgroundGradientFrom: 'white',
        backgroundGradientTo: 'white',
        color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
        strokeWidth: 2, 
        barPercentage: 0.5,
        useShadowColorFromDataset: false, 
        fillShadowGradientOpacity: 0.5,
        // barStyle: {
        //   borderRadius: 16,
        //   paddingLeft: 10,
        //   paddingRight: 10,
        //   backgroundColor: 'blue', 
        // },
        propsForBackgroundLines: {
          stroke: 'transparent',
        },
        propsForLabels: {
          fill: 'blue', // Change text color to blue
        },
        propsForDots: {
          r: '5', // Adjust dot size
        },
      };
      
   
    return(

        <View style={styles.container}>
          
          <View style={styles.chartContainer1}>
          <Text style={{fontWeight:'bold',fontSize:19}}>Dustbin {dustbinId} Location:{area}</Text>
          <View style={{alignItems:'center'}}>
            <Text style={{fontWeight:'bold',fontSize:17,color:'blue'}}>Current Level of Bin</Text>
          </View>
          <ProgressChart
          data={data}
          width={400}
          height={220}
          strokeWidth={16}
          radius={30}
         chartConfig={chartConfig}
          hideLegend={false}
          style={styles.chart1}
        />
        

          </View>
          <View style={styles.chartContainer}>
          <View style={{alignItems:'center'}}>
            <Text style={{fontWeight:'bold',fontSize:17,color:'blue'}}>Past 7 days Status</Text>
          </View>
              <LineChart
                data={combinedChartData}
                width={350}
                height={220}
                yAxisSuffix="kg"
                bezier
                fromZero
                chartConfig={{
                  backgroundColor: 'white',
                  backgroundGradientFrom: 'mistyrose',
                  backgroundGradientTo: 'skyblue',
                  decimalPlaces: 2,
                  color: (opacity = 1) => `rgba(0, 0, 255, ${opacity})`,
                  propsForDots: {
                    r: '3',
                    strokeWidth: '1',
                    stroke: 'black',
                  },
                }}
                style={styles.chart}
              />
              <View style={{alignItems:'center'}}>
              <Text style={{fontWeight:'bold'}}>Bin Id:{dustbinId}</Text>
              </View>
              <View style={{paddingTop:50}}>
                <Text style={{fontWeight:'bold',fontSize:16}}>Last Sanitzation:</Text>
                <Text style={{fontWeight:'bold',fontSize:16}}>Expected Date to be Sanitized:</Text>
              </View>
              <View style={{paddingTop:10,alignItems:'center'}}>
                <TouchableOpacity onPress={()=>{}}>
                  <Text style={{fontWeight:'bold',color:'blue'}}>Previous Reports</Text>  
                    </TouchableOpacity>
                    </View>
              
            </View>

        </View>
    )
}



const styles = StyleSheet.create({
    container: {

      backgroundColor:'white',
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
    chart1: {
      marginVertical: 8,
      borderRadius: 16,
      right:40,
    },
    chartContainer1: {
      position: 'relative',
      bottom: 10,
      left: 0,
      right: 0,
      backgroundColor: 'white',
      padding: 10,
      borderTopLeftRadius: 10,
      borderTopRightRadius: 10,
    },
    // closeButton: {
    //   position: 'absolute',
    //   top: 5,
    //   right: 5,
    // },
    });
export default Details