import {
  Image,
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React from 'react';

const AirQuality = ({route}) => {
  console.log(route.params.airQuality);
  const data = route.params.airQuality;
  const city = route.params.city;
  const bgImage= route.params.bgImage;
  return (
    <SafeAreaView>
      <ImageBackground
        source={bgImage}
        style={{height: '100%', width: '100%'}}>
        <Text style={styles.area}>{city}</Text>
        <Image
          source={require('../assets/images/air.png')}
          style={styles.icon}
        />
        <View style={styles.card1}>
          <Text style={{fontWeight:'400',fontSize:20,color:'#000000',marginLeft:14,marginBottom:20}}>Detailed Information:</Text>
          <View style={styles.container}>
            {/* Row 1 */}
            <View style={styles.row}>
              <View style={styles.cell}>
                <Text style={styles.text}>Feels Like:</Text>
              </View>
              <View style={styles.cell}>
                <Text style={styles.text1}>{data.feelslike_c}°c</Text>
              </View>
            </View>

            {/* Row 2 */}
            <View style={styles.row}>
              <View style={styles.cell}>
                <Text style={styles.text}>Humidity:</Text>
              </View>
              <View style={styles.cell}>
                <Text style={styles.text1}>{data.humidity}%</Text>
              </View>
            </View>

            {/* Row 3 */}
            <View style={styles.row}>
              <View style={styles.cell}>
                <Text style={styles.text}>Visibility:</Text>
              </View>
              <View style={styles.cell}>
                  <Text style={styles.text1}>
                    {data.vis_km} km
                  </Text>
                </View>
            </View>

            {/* Row 4 */}
            <View style={styles.row}>
              <View style={styles.cell}>
                <Text style={styles.text}>UV Index:</Text>
              </View>
              <View style={styles.cell}>
                <Text style={styles.text1}>{data.uv}</Text>
              </View>
            </View>

            {/* Row 5 */}
            <View style={styles.row}>
              <View style={styles.cell}>
                <Text style={styles.text}>
                  AQI:
                </Text>
              </View>
              <View style={styles.cell}>
                <Text style={styles.text1}>
                  {data.air_quality['us-epa-index']}
                </Text>
              </View>
            </View>
            {/* Row 6 */}
            <View style={styles.row}>
              <View style={styles.cell}>
                <Text style={styles.text}>
                  Wind Speed:
                </Text>
              </View>
              <View style={styles.cell}>
                <Text style={styles.text1}>
                  {data.wind_kph} km/h
                </Text>
              </View>
            </View>
            {/* Row 7 */}
            <View style={styles.row}>
              <View style={styles.cell}>
                <Text style={styles.text}>
                  Wind Direction:
                </Text>
              </View>
              <View style={styles.cell}>
                <Text style={styles.text1}>
                  {data.wind_dir} 
                </Text>
              </View>
            </View>
          </View>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default AirQuality;

const styles = StyleSheet.create({
  card1: {
    backgroundColor: '#D2E0FB',
    height: 340,
    width: 350,
    marginLeft: 'auto',
    marginRight: 'auto',
    borderRadius: 30,
    marginTop: 140,
    paddingTop:20,
  },
  icon: {
    height: 200,
    width: 200,
    marginTop: 70,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  text: {
    color: '#000000',
    fontSize: 20,
    fontWeight: '300',
  },
  text1: {
    color: '#000000',
    fontSize: 20,
    fontWeight: '300',
    textAlign:'right'
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
  },
  cell: {
    width: 160, // Adjust the width and height as needed
    height: 40,
    // borderWidth: 1,
    borderColor: 'black',
  },
  area: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '600',
    textAlign: 'center',
    marginTop: 34,
  },
});
