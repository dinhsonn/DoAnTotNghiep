import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { Card, Divider } from 'react-native-paper';
import OrderService from '../services/OrderService';

const DeliveredOrders = () => {
    const [deliveredOrders, setDeliveredOrders] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await OrderService.getAll();
                const filteredOrders = response.data.filter(order => order.status === 4);
                const sortedOrders = filteredOrders.sort((a, b) => a.id - b.id);
                setDeliveredOrders(sortedOrders);
            } catch (error) {
                console.error('Lỗi khi lấy dữ liệu:', error);
            }
        };
    
        fetchData();
    }, []);
    

    function getStatusText(status) {
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
                return "Trạng thái không xác định";
        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Đơn hàng đã giao</Text>
            <FlatList
                data={deliveredOrders}
                keyExtractor={order => order.id.toString()}
                renderItem={({ item }) => (
                    <Card style={styles.card}>
                        <Card.Content>
                            <View style={styles.orderHeader}>
                        <Text style={styles.orderId}>Mã đơn hàng: {item.id}</Text>
                    </View>
                    <View style={styles.infoContainer}>
                        <Text style={styles.infoLabel}>Tên người nhận:</Text>
                        <Text style={styles.infoValue}> {item.name}</Text>
                    </View>
                    <View style={styles.infoContainer}>
                        <Text style={styles.infoLabel}>Điểm đến:</Text>
                        <Text style={styles.infoValue}>{item.address}</Text>
                    </View>
                    <View style={styles.infoContainer}>
                        <Text style={styles.infoLabel}>Số điện thoại:</Text>
                        <Text style={styles.infoValue}>{item.phone}</Text>
                    </View>
                    <View style={styles.infoContainer}>
                        <Text style={styles.infoLabel}>Đã thu:</Text>
                        <Text style={styles.infoValue}>
                            {item.paymentMethod === "Thanh toán trực tiếp"
                                ? `${item.price.toLocaleString()} đ`
                                : item.paymentMethod === "Thanh toán VNPay"
                                    ? "0vnđ"
                                    : order.paymentMethod}
                        </Text>
                    </View>
                        </Card.Content>
                        <Divider />
                        
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
});

export default DeliveredOrders;
