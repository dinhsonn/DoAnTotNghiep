import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { Card, Button, Divider } from 'react-native-paper';
import OrderService from './src/services/OrderService';

const ShipperOrderUpdate = () => {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await OrderService.getAll();
                setOrders(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    const updateOrderStatus = (id, status) => {
        OrderService.updateOrderStatus(id, status)
            .then(response => {
                setOrders(prevOrders => prevOrders.map(order => {
                    if (order.id === id) {
                        return { ...order, status: status };
                    } else {
                        return order;
                    }
                }));
                alert("Cập nhật trạng thái đơn hàng thành công");
            })
            .catch(error => {
                console.error('Error updating order status:', error);
            });
    };

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
            <Text style={styles.header}>Chi tiết đơn</Text>
            <FlatList
                data={orders}
                keyExtractor={order => order.id.toString()}
                renderItem={({ item }) => (
                    <Card style={styles.card}>
                        <Card.Content>
                            <View style={styles.orderHeader}>
                                <Text style={styles.orderId}>#{item.id} - {getStatusText(item.status)}</Text>
                                <Text style={styles.orderFee}>Phí: {item.fee} đ</Text>
                            </View>
                            <Text>Tên người nhận: {item.name}</Text>
                            <Text>Điểm đến: {item.address}</Text>
                            <Text>Số điện thoại: {item.phone}</Text>
                        </Card.Content>
                        <Divider />
                        <Card.Actions>
                            <Button 
                                style={styles.button}
                                mode="contained" 
                                onPress={() => updateOrderStatus(item.id, 4)}
                            >
                                Đánh dấu là đã giao
                            </Button>
                        </Card.Actions>
                    </Card>
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
    orderFee: {
        fontSize: 16,
        color: '#5cb85c',
    },
    button: {
        flex: 1,
        margin: 10,
        backgroundColor: '#d9534f',
    }
});

export default ShipperOrderUpdate;
