import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  StatusBar,
  ScrollView,
  TouchableOpacity,
  PermissionsAndroid,
  Image,
  ImageBackground,
} from 'react-native';
import {
  BallIndicator,
  BarIndicator,
  DotIndicator,
  MaterialIndicator,
  PacmanIndicator,
  PulseIndicator,
  SkypeIndicator,
  UIActivityIndicator,
  WaveIndicator,
} from 'react-native-indicators';
import Geolocation from 'react-native-geolocation-service';
import axios from 'axios';
import {useNavigation} from '@react-navigation/native';

// Function to get permission for location
const requestLocationPermission = async () => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: 'Geolocation Permission',
        message: 'Can we access your location?',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      },
    );
    console.log('granted', granted);
    if (granted === 'granted') {
      console.log('You can use Geolocation');
      return true;
    } else {
      console.log('You cannot use Geolocation');
      return false;
    }
  } catch (err) {
    return false;
  }
};
const Home = () => {
  // state to hold location
  const [location, setLocation] = useState(false);
  const [lat, setLat] = useState(0);
  const [lon, setLon] = useState(0);
  const [city, setCity] = useState('NIL');
  const [condition, setCondition] = useState('NIL');
  const [currentTemp, setCurrentTemp] = useState(0);
  const [bgImage, setBgImage] = useState('../assets/images/5.jpg');
  const [icon, setIcon] = useState(
    'https://cdn.weatherapi.com/weather/64x64/night/143.png',
  );
  const [icon2, setIcon2] = useState(
    'https://cdn.weatherapi.com/weather/64x64/night/143.png',
  );
  const [icon3, setIcon3] = useState(
    'https://cdn.weatherapi.com/weather/64x64/night/143.png',
  );
  const [forcastDay1Max, setForcastDay1Max] = useState(0);
  const [forcastDay1Min, setForcastDay1Min] = useState(0);
  const [forcastDay2Max, setForcastDay2Max] = useState(0);
  const [forcastDay2Min, setForcastDay2Min] = useState(0);
  const [forcastDay3Max, setForcastDay3Max] = useState(0);
  const [forcastDay3Min, setForcastDay3Min] = useState(0);

  const [forcastDayDate1Comment, setForcastDayDate1Comment] = useState('');
  const [forcastDayDate2Comment, setForcastDayDate2Comment] = useState('');
  const [forcastDayDate3Comment, setForcastDayDate3Comment] = useState('');
  const [forcaseDayDate3, setForecastDayDate3] = useState('');

  const [airQuality, setAirQuality] = useState('');

  const [activityIndicator, setActivityIndicator]= useState(true);
  // function to check permissions and get Location
  const requestWeather = async () => {
    try {
      const reqURL = `https://api.weatherapi.com/v1/forecast.json?key=b397cc750f334b59b05131456230410&q=${lat},${lon}&&days=3&aqi=yes&alerts=yes`;
      console.log(reqURL);
      const response = await axios.get(reqURL); // Replace with your API URL
      console.log('Response Data:', response.data);
      console.log('Current Temp:', response.data.current.temp_c);
      setCurrentTemp(response.data.current.temp_c);
      setCity(response.data.location.name);
      setCondition(response.data.current.condition.text);
      setIcon('https://' + response.data.current.condition.icon);
      setForcastDay1Max(response.data.forecast.forecastday[0].day.maxtemp_c);
      setForcastDay1Min(response.data.forecast.forecastday[0].day.mintemp_c);
      setForcastDayDate1Comment(
        response.data.forecast.forecastday[0].day.condition.text,
      );
      setForcastDay2Max(response.data.forecast.forecastday[1].day.maxtemp_c);
      setForcastDay2Min(response.data.forecast.forecastday[1].day.mintemp_c);
      setForcastDayDate2Comment(
        response.data.forecast.forecastday[1].day.condition.text,
      );
      setIcon2(
        'https://' + response.data.forecast.forecastday[1].day.condition.icon,
      );
      setForcastDay3Max(response.data.forecast.forecastday[2].day.maxtemp_c);
      setForcastDay3Min(response.data.forecast.forecastday[2].day.mintemp_c);
      setForcastDayDate3Comment(
        response.data.forecast.forecastday[2].day.condition.text,
      );
      setIcon3(
        'https://' + response.data.forecast.forecastday[2].day.condition.icon,
      );
      setForecastDayDate3(response.data.forecast.forecastday[2].date);
      setAirQuality(response.data.current);
      const dateTimeString = response.data.location.localtime;
      const dateTime = new Date(dateTimeString);
      const hours = dateTime.getHours();
      if (hours >= 10 && hours < 17) {
        setBgImage(require('../assets/images/3.png'));
      } else {
        setBgImage(require('../assets/images/2.png'));
      }
      setActivityIndicator(false);
    } catch (error) {
      console.error('Error:', error);
    }
  };
  const getLocation = async () => {
    const result = requestLocationPermission();
    result.then(res => {
      setActivityIndicator(true);
      console.log('res is:', res);
      if (res) {
        Geolocation.getCurrentPosition(
          position => {
            console.log(position);
            console.log('Latitude: ', position.coords.latitude);
            setLat(position.coords.latitude);
            setLon(position.coords.longitude);
            console.log('Longitude: ', position.coords.longitude);
            setLocation(position);
          },
          error => {
            // See error code charts below.
            console.log(error.code, error.message);
            setLocation(false);
          },
          {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
        );
      }
    });
  };
  useEffect(() => {
    getLocation();
  }, []);
  useEffect(() => {
    requestWeather();
  }, [location]);

  function formatDate(inputDate) {
    const parts = inputDate.split('-');
    const year = parts[0];
    const month = parts[1];
    const day = parts[2];
    const formattedDate = `${day}/${month}`;
    return formattedDate;
  }
  StatusBar.setBarStyle('light-content');
  if (Platform.OS === 'android') {
    StatusBar.setBackgroundColor('rgba(0,0,0,0)');
    StatusBar.setTranslucent(true);
  }
  const navigation = useNavigation();
  const buttonPressAirQuality = () => {
    navigation.navigate('AQI', {airQuality, city, bgImage});
  };

  return (
    <View>
      {activityIndicator ? (
        <View style={{height:'100%',backgroundColor:'#000000'}}>
          <Image
            source={require('../assets/images/iconLogo.png')}
            style={{width: 200, height: 200,marginLeft:'auto',marginRight:'auto',marginTop:200}}
          />
          <View>
            <Text style={{fontSize:20,color:'#FFFFFF',fontWeight:'300',textAlign:'center',marginTop:200,marginBottom:50}}>Getting your Location. . .</Text>
            <PulseIndicator color="green" />
          </View>
        </View>
      ) : (
        <ImageBackground
          source={bgImage}
          style={{height: '100%', width: '100%'}}>
          <StatusBar />
          <ScrollView>
            <Text style={styles.area}>{city}</Text>
            <TouchableOpacity style={styles.currWeather}>
              <View
                style={{
                  flexDirection: 'row',
                  marginLeft: 'auto',
                  marginRight: 'auto',
                }}>
                <Text style={styles.currWeatherText}>
                  {parseInt(currentTemp)}
                </Text>
                <Text
                  style={{
                    fontWeight: '500',
                    fontSize: 60,
                    position: 'relative',
                    top: 20,
                    right: 8,
                    color: '#FFFFFF',
                  }}>
                  °C
                </Text>
              </View>
              <Text style={styles.currWeatherComment}>{condition}</Text>
            </TouchableOpacity>

            <View style={styles.container}>
              {/* First Row */}
              <View style={styles.row}>
                <View style={styles.cell1}>
                  <Image source={{uri: icon}} style={styles.image} />
                </View>
                <View style={styles.cell}>
                  <Text style={styles.text}>
                    Today • {forcastDayDate1Comment}
                  </Text>
                </View>
                <View style={styles.cell2}>
                  <Text style={styles.text}>
                    {parseInt(forcastDay1Max)}°/{parseInt(forcastDay1Min)}°
                  </Text>
                </View>
              </View>

              {/* Second Row */}
              <View style={styles.row}>
                <View style={styles.cell1}>
                  <Image source={{uri: icon2}} style={styles.image} />
                </View>
                <View style={styles.cell}>
                  <Text style={styles.text}>
                    Tomorrow • {forcastDayDate2Comment}
                  </Text>
                </View>
                <View style={styles.cell2}>
                  <Text style={styles.text}>
                    {parseInt(forcastDay2Max)}°/{parseInt(forcastDay2Min)}°
                  </Text>
                </View>
              </View>

              {/* Third Row */}
              <View style={styles.row}>
                <View style={styles.cell1}>
                  <Image source={{uri: icon3}} style={styles.image} />
                </View>
                <View style={styles.cell}>
                  <Text style={styles.text}>
                    {formatDate(forcaseDayDate3)} • {forcastDayDate3Comment}
                  </Text>
                </View>
                <View style={styles.cell2}>
                  <Text style={styles.text}>
                    {parseInt(forcastDay3Max)}°/{parseInt(forcastDay3Min)}°
                  </Text>
                </View>
              </View>
            </View>
          </ScrollView>
          <TouchableOpacity
            style={styles.button}
            onPress={buttonPressAirQuality}>
            <Text style={styles.buttonText}>Air Quality</Text>
          </TouchableOpacity>
        </ImageBackground>
      )}
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  background: {
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: '#6499E9',
    height: '100%',
  },
  currWeather: {
    marginTop: 40,
  },
  currWeatherText: {
    color: '#FFF',
    fontSize: 130,
    fontWeight: '400',
    textAlign: 'center',
    marginLeft: 60,
  },
  currWeatherComment: {
    textAlign: 'center',
    color: '#FFFFFF',
    fontSize: 30,
    fontWeight: '400',
  },
  area: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '600',
    textAlign: 'center',
    marginTop: 34,
  },
  container: {
    marginTop: 300,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
  },
  cell: {
    width: 290, // Adjust the width and height as needed
    height: 50,
    // borderWidth: 1,
    // borderColor: 'black',
  },
  cell1: {
    width: 50, // Adjust the width and height as needed
    height: 50,
    // borderWidth: 1,
    // borderColor: 'black',
  },
  cell2: {
    width: 70, // Adjust the width and height as needed
    height: 50,
    // borderWidth: 1,
    // borderColor: 'black',
  },
  image: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
  },
  text: {
    fontSize: 20,
    fontWeight: '300',
    color: '#FFFFFF',
    textAlign: 'left',
    marginTop: 'auto',
    marginBottom: 'auto',
  },
  button: {
    backgroundColor: '#FFFFFF',
    height: 50,
    marginBottom: 50,
    width: 150,
    borderRadius: 30,
    padding: 10,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  buttonText: {
    color: '#000000',
    fontSize: 21,
    textAlign: 'center',
    fontWeight: '600',
  },
});
