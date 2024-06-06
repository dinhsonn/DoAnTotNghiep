import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ShipperOrderUpdate from './src/screens/ShipperOrderUpdate';
import DeliveredOrders from './src/screens/DeliveredOrders';
import OrderDetails from './src/screens/OrderDetails';
import FalseOrders from './src/screens/FalseOrders';


const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="ShipperOrderUpdate">
        <Stack.Screen name="ShipperOrderUpdate" component={ShipperOrderUpdate} options={{ title: 'Đơn Hàng' }} />
        <Stack.Screen name="DeliveredOrders" component={DeliveredOrders} options={{ title: 'Đơn Hàng Đã Giao' }} />
        <Stack.Screen name="OrderDetails" component={OrderDetails} options={{ title: 'Chi Tiết Đơn Hàng' }} />
        <Stack.Screen name="FalseOrders" component={FalseOrders} options={{ title: 'Đơn hàng bị hoàn' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
