import React from "react";
import { View, Text, Image } from "react-native";

const TenantDashboard = () => {

  return (
    <View>
      <Image 
          source={require('@/assets/images/partial-react-logo.png')}
          style={{ width: 50, height: 50, borderRadius: 25 }} />
      <Text>Good Morning, Thabo!</Text>
      <Text>Room: 074 346 2343 - Slovo rooms</Text>
      <Text>Lease: Active (Ends: 22 june 2025)</Text>
    </View>
  );
};

export default TenantDashboard;
