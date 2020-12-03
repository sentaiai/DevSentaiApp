import React, { useState, Component } from 'react';

import wifi from 'react-native-android-wifi';


const [Data,setData]=useState({
    WifiList : ''
})

wifi.loadWifiList((wifiStringList) => {
    console.log(wifiStringList);
    WifiList = JSON.parse(wifiStringList);
    console.log(WifiList);    
    setData(WifiList);
     
  },
  (error) => {
    console.log(error);
  }
);