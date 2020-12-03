import React, { useState, useEffect, Component } from 'react';
import {
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  ScrollView,
  View,
  PermissionsAndroid,
  Dimensions
} from 'react-native';

import wifi from 'react-native-android-wifi';
import WifiManager from 'react-native-wifi';

import Ionicons from 'react-native-vector-icons/Ionicons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';

const screenHeight = Dimensions.get('window').height;

//type Props = {};<Props>
export default class HomeScreen extends Component {
  constructor(props){
    super(props);
    this.state = {
      isWifiNetworkEnabled: null,
      ssid: null,
      pass: null,
      ssidExist: null,
      currentSSID: null,
      currentBSSID: null, 
      wifiList: null,
      modalVisible: false,
      status:null,
      level: null,
      ip: null,
    };

  }
  

  componentDidMount (){
    console.log(wifi);
    this.askForUserPermissions();
    //this.getSSIDOnPress();
    this.getWifiNetworksOnPress();
  }

  async askForUserPermissions() {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          'title': 'Wifi networks',
          'message': 'We need your permission in order to find wifi networks'
        }
      )
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log("Thank you for your permission! :)");
      } else {
        console.log("You will not able to retrieve wifi available networks list");
      }
    } catch (err) {
      console.warn(err)
    }
  }
/*
  serviceCheckOnPress(){
    wifi.isEnabled(
      (isEnabled)=>{
        this.setState({isWifiNetworkEnabled: isEnabled});
        console.log(isEnabled);
      });
  }

  serviceSetEnableOnPress(enabled){
    wifi.setEnabled(enabled)
  }
  // * @param isWep Used on iOS. If `true`, the network is WEP Wi-Fi; otherwise it is a 
  WPA or WPA2 personal Wi-Fi network.

*/
  connectOnPress(){
    wifi.findAndConnect(this.state.ssid, this.state.pass, (found) => {
     
      if (found) {
        console.log("wifi is in range");
      } else {
        console.log("wifi is not in range");
      }
     
      
    });
    /*
    console.log('Calling connection!')
    WifiManager.connectToProtectedSSID(this.state.ssid, this.state.pass, false)
.then(() => {
	console.log('Connected successfully!')
}, () => {
	console.log('Connection failed!')
	console.log(this.state.ssid)
	console.log(this.state.pass)
})*/
  }

  // disconnectOnPress(){
  //   wifi.disconnect();
  // }

  // getSSIDOnPress(){
  //   wifi.getSSID((ssid) => {
  //     console.log(ssid);
  //     this.setState({currentSSID:ssid});
  //   });
  // }

  // getBSSIDOnPress(){
  //   wifi.getBSSID((bssid) => {
  //     console.log('currentBSSID:bssid');
  //     this.setState({currentBSSID:bssid});
  //   });
  // }

  

  getWifiNetworksOnPress(){
    wifi.loadWifiList((wifiStringList) => {
        console.log(wifiStringList);
        var wifiArray = JSON.parse(wifiStringList);
        console.log('wifiArray');
        console.log(wifiArray);
        this.setState({
          wifiList:wifiArray,
          modalVisible: true
        });
      },
      (error) => {
        console.log(error);
      }
    );
  }

  getreScanWifiNetworksOnPress(){
    wifi.reScanAndLoadWifiList((wifiStringList) => {
      var wifiArray = JSON.parse(wifiStringList);
      console.log('Detected wifi networks - ',wifiArray);
      this.setState({
        wifiList:wifiArray,
        modalVisible: true
      });
    },
    (error) => {
      console.log(error);
    }
  );
  }

  // connectionStatusOnPress(){
  //   wifi.connectionStatus((isConnected) => {
  //     this.setState({status:isConnected});
  //   });
  // }

  // levelOnPress(){
  //   wifi.getCurrentSignalStrength((level)=>{
  //     this.setState({level:level});
  //   });
  // }

  // ipOnPress(){
  //   wifi.getIP((ip)=>{
  //     this.setState({ip:ip});
  //   });
  // }

   setSSIDOnPress(){
    wifi.getSSID((ssid) => {
      console.log('calling test');
      console.log(ssid);
    });
  }


  renderModal(){
    var wifiListComponents = [];
    for (w in this.state.wifiList){
      wifiListComponents.push(
        <TouchableHighlight key={w} onPress={this.setSSIDOnPress.bind(this)}>   
          <View key={w} style={{flexDirection:'row', justifyContent: 'space-between'}}> 
            
            <Text style={styles.instructionsTitle}>{this.state.wifiList[w].SSID}</Text>
            <Ionicons name="wifi-outline"  size={25}/>    
                          
          </View>
          </TouchableHighlight> 
        
      );
    }
    return wifiListComponents;
  }

  render() {
    return (
      <View>
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.title}>Please select your WI-FI network</Text>
        
        {/* <View style={styles.instructionsContainer}>
          <Text style={styles.instructionsTitle}>Disconnect current wifi network</Text>
          <View style={styles.row}>
            <TouchableHighlight style={styles.button} onPress={this.disconnectOnPress.bind(this)}>
              <Text style={styles.buttonText}>Disconnect</Text>
            </TouchableHighlight>
          </View>
        </View>
        <View style={styles.instructionsContainer}>
          <Text style={styles.instructionsTitle}>Current SSID</Text>
          <View style={styles.row}>
            <TouchableHighlight style={styles.button} onPress={this.getSSIDOnPress.bind(this)}>
              <Text style={styles.buttonText}>Get SSID</Text>
            </TouchableHighlight>
            <Text style={styles.answer}>{this.state.currentSSID + ""}</Text>
          </View>
        </View>
        <View style={styles.instructionsContainer}>
          <Text style={styles.instructionsTitle}>Current BSSID</Text>
          <View style={styles.row}>
            <TouchableHighlight style={styles.button} onPress={this.getBSSIDOnPress.bind(this)}>
              <Text style={styles.buttonText}>Get BSSID</Text>
            </TouchableHighlight>
            <Text style={styles.answer}>{this.state.currentBSSID + ""}</Text>
          </View>
        </View> */}
        {/* <View style={styles.instructionsContainer}>
          <Text style={styles.instructionsTitle}>Get all wifi networks in range</Text>
          <TouchableHighlight style={styles.bigButton} onPress={this.getWifiNetworksOnPress.bind(this)}>
            <Text style={styles.buttonText}>Available WIFI Networks</Text>
          </TouchableHighlight>
          
        </View> */}
        <View style={styles.instructionsContainer}>
          <View style={{paddingTop:20}}>
          {this.renderModal()}
          </View>
        </View>
        <View style={{padding:15}}>
          <Text style={styles.instructionsTitle}>Sign device into a specific network:</Text>
          <Text style={styles.instructions}>SSID</Text>
          <TextInput 
            style={styles.textInput}
            underlineColorAndroid='transparent'
            onChangeText={(event)=>this.state.ssid=event}
            value={this.state.ssid}
            placeholder={'ssid'} />
          <Text style={styles.instructions}>Password</Text>
          <TextInput
            style={styles.textInput}
            secureTextEntry={true} 
            underlineColorAndroid='transparent'
            onChangeText={(event)=>this.state.pass=event}
            value={this.state.pass}
            placeholder={'password'} />
          <View style={styles.row}>
            <TouchableHighlight style={styles.button} onPress={this.connectOnPress.bind(this)}>
              <Text style={styles.buttonText}>Connect</Text>
            </TouchableHighlight>
            <Text style={styles.answer}>{this.state.ssidExist==null?"":this.state.ssidExist?"Network in range :)":"Network out of range :("}</Text>
          </View>
        </View>
     
       
      </View>
      
    </ScrollView>
       <View style={{borderTopWidth: 1,borderTopColor: '#CCCCCC',}}>
       {/* <Text style={styles.instructionsTitle}>Rescan - Get all wifi networks in range</Text>
       <TouchableHighlight style={styles.bigButton} onPress={this.getreScanWifiNetworksOnPress.bind(this)}>
         <Text style={styles.buttonText}>Rescan Available WIFI Networks</Text>
       </TouchableHighlight> */}
     <View style={{alignItems:'center', paddingTop:15}}>
       <SimpleLineIcons name={'refresh'} size={25} onPress={this.getreScanWifiNetworksOnPress.bind(this)} />
     
     <Text style={{paddingTop:5}}>Refresh</Text>
     
     </View>
     </View>
     </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding:15,
    backgroundColor: '#F5FCFF',
    height:screenHeight -250
  },
  row:{
    flexDirection:'row'
  },
  title: {
    fontSize: 20,
  },

  instructionsContainer: {
    padding:15,
    borderBottomWidth: 1,
    borderBottomColor: '#CCCCCC',
  },
  instructionsTitle: {
    marginBottom:10,
    color: '#333333'
  },
  instructions: {
    color: '#333333'
  },
  button:{
    padding:5,
    width:120,
    alignItems: 'center',
    backgroundColor:'gray',
    marginRight: 15,
  },
  bigButton:{
    padding:5,
    width:180,
    alignItems: 'center',
    backgroundColor:'blue',
    marginRight: 15,
  },
  buttonText:{
    color:'white'
  },
  answer:{
    marginTop: 5,
  }
});