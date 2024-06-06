import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { Card, Button, Divider } from 'react-native-paper';
import OrderService from '../services/OrderService';
import { useNavigation } from '@react-navigation/native';

const ShipperOrderUpdate = () => {
    const [orders, setOrders] = useState([]);
    const navigation = useNavigation();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await OrderService.getAll();
                const filteredOrders = response.data.filter(order => order.status === 2);
                const sortedOrders = filteredOrders.sort((a, b) => a.id - b.id);
                setOrders(sortedOrders);
            } catch (error) {
                console.error('Lỗi khi lấy dữ liệu:', error);
            }
        };
    
        fetchData();
    }, []);
    

    const getStatusText = (status) => {
        switch (status) {
            case 1:
                return "Chờ xác nhận";
            case 2:
                return "Đã xác nhận";
            case 3:
                return "Đang giao hàng";
            case 4:
                return "Giao thành công";
            default:
                return "Không xác định";
        }
    };

    return (
        <View style={styles.container}>
            <Button 
                mode="contained"
                onPress={() => navigation.navigate('DeliveredOrders')}
                style={styles.navigationButton}
            >
                Xem đơn hàng đã giao
            </Button>
            <Button 
                mode="contained"
                onPress={() => navigation.navigate('FalseOrders')}
                style={styles.navigationButton}
            >
                Xem đơn hàng bị hoàn
            </Button>
            <Text style={styles.header}>Danh sách đơn hàng</Text>
            <FlatList
                data={orders}
                keyExtractor={order => order.id.toString()}
                renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => navigation.navigate('OrderDetails', { order: item })}>
                        <Card style={styles.card}>
                            <Card.Content>
                                <View style={styles.orderHeader}>
                                    <Text style={styles.orderId}>Mã đơn hàng: {item.id}</Text>
                                </View>
                                <View style={styles.infoContainer}>
                                    <Text style={styles.infoLabel}>Tên người nhận:</Text>
                                    <Text style={styles.infoValue}>{item.name}</Text>
                                </View>
                                <View style={styles.infoContainer}>
                                    <Text style={styles.infoLabel}>Điểm đến:</Text>
                                    <Text style={styles.infoValue}>{item.address}</Text>
                                </View>
                                <View style={styles.infoContainer}>
                                    <Text style={styles.infoLabel}>Số điện thoại:</Text>
                                    <Text style={styles.infoValue}>{item.phone}</Text>
                                </View>
                            </Card.Content>
                            <Divider />
                        </Card>
                    </TouchableOpacity>
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 10,
    },
    header: {
        fontSize: 20,
        fontWeight: 'bold',
        marginVertical: 10,
        color: '#d9534f',
    },
    card: {
        marginVertical: 10,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#ddd',
        overflow: 'hidden',
    },
    orderHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    orderId: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#d9534f',
    },
    infoContainer: {
        flexDirection: 'row',
        marginBottom: 5,
    },
    infoLabel: {
        fontWeight: 'bold',
        color: '#333',
        width: 120,
    },
    infoValue: {
        color: '#555',
        flex: 1,
    },
    navigationButton: {
        marginVertical: 10,
        backgroundColor: '#5cb85c',
    },
});

export default ShipperOrderUpdate;
