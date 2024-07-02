import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert, Linking } from 'react-native';
import { Card, Button, Divider } from 'react-native-paper';
import OrderService from '../services/OrderService';

const OrderDetails = ({ route }) => {
    const { order } = route.params;
    const [orderStatus, setOrderStatus] = useState(order.status);

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
            case 5:
                return "Khách không nhận hàng";
            default:
                return "Không xác định";
        }
    };

    const updateOrderStatus = (id, status) => {
        OrderService.updateOrderStatus(id, status)
            .then(response => {
                setOrderStatus(status);
                Alert.alert("Thành công", "Cập nhật trạng thái đơn hàng thành công");
            })
            .catch(error => {
                console.error('Lỗi khi cập nhật trạng thái đơn hàng:', error);
                Alert.alert("Lỗi", "Không thể cập nhật trạng thái đơn hàng");
            });
    };

    const makeCall = (phoneNumber) => {
        const url = `tel:${phoneNumber}`;
        Linking.canOpenURL(url)
            .then((supported) => {
                if (supported) {
                    Linking.openURL(url);
                } else {
                    Alert.alert("Lỗi", "Thiết bị của bạn không hỗ trợ thực hiện cuộc gọi");
                }
            })
            .catch((err) => console.error('An error occurred', err));
    };

    const openAddressInGoogleMaps = (address) => {
        const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
        Linking.canOpenURL(url)
            .then((supported) => {
                if (supported) {
                    Linking.openURL(url);
                } else {
                    Alert.alert("Lỗi", "Không thể mở địa chỉ trong Google Maps");
                }
            })
            .catch((err) => console.error('An error occurred', err));
    };

    const confirmUpdateStatus = (id, status) => {
        let statusText = getStatusText(status);
        Alert.alert(
            "Xác nhận",
            `Xác nhận ${statusText} ?`,
            [
                {
                    text: "Hủy",
                    onPress: () => console.log("Hủy cập nhật"),
                    style: "cancel"
                },
                {
                    text: "Đồng ý",
                    onPress: () => updateOrderStatus(id, status)
                }
            ]
        );
    };

    const statusSteps = [
        { status: 1, text: "Chờ xác nhận" },
        { status: 2, text: "Đã xác nhận" },
        { status: 4, text: "Thành công" },
        { status: 5, text: "Không nhận hàng" },
    ];

    return (
        <View style={styles.container}>
            <Card style={styles.card}>
                <Card.Content>
                    <View style={styles.orderHeader}>
                        <Text style={styles.orderId}>Mã đơn hàng: {order.id}</Text>
                    </View>
                    <View style={styles.infoContainer}>
                        <Text style={styles.infoLabel}>Tên người nhận:</Text>
                        <Text style={styles.infoValue}>{order.name}</Text>
                    </View>
                    <View style={styles.infoContainer}>
                        <Text style={styles.infoLabel}>Điểm đến:</Text>
                        <Text style={styles.infoValue}>{order.address}</Text>
                    </View>
                    <View style={styles.infoContainer}>
                        <Text style={styles.infoLabel}>Số điện thoại:</Text>
                        <Text style={styles.infoValue}>{order.phone}</Text>
                    </View>
                    <View style={styles.infoContainer}>
                        <Text style={styles.infoLabel}>Thanh toán:</Text>
                        <Text style={styles.infoValue}>
                            {order.paymentMethod === "Thanh toán trực tiếp"
                                ? `${order.price.toLocaleString()} đ`
                                : order.paymentMethod === "Thanh toán VNPay"
                                    ? "0vnđ"
                                    : order.paymentMethod}
                        </Text>
                    </View>
                    <View style={styles.statusContainer}>
                        {statusSteps.map((step, index) => (
                            <View key={index} style={styles.statusStep}>
                                <View
                                    style={[
                                        styles.statusCircle,
                                        {
                                            backgroundColor:
                                                orderStatus === step.status
                                                    ? step.status === 5
                                                        ? "#d9534f"
                                                        : "#5cb85c"
                                                    : orderStatus > step.status
                                                        ? "#5cb85c"
                                                        : "#ddd",
                                        },
                                    ]}
                                />
                                {index < statusSteps.length - 1 && (
                                    <View
                                        style={[
                                            styles.statusLine,
                                            {
                                                backgroundColor:
                                                    orderStatus > step.status
                                                        ? "#5cb85c"
                                                        : "#ddd",
                                            },
                                        ]}
                                    />
                                )}
                                <Text
                                    style={[
                                        styles.statusText,
                                        {
                                            color:
                                                orderStatus === step.status
                                                    ? step.status === 5
                                                        ? "#d9534f"
                                                        : "#5cb85c"
                                                    : orderStatus > step.status
                                                        ? "#5cb85c"
                                                        : "#ddd",
                                        },
                                    ]}
                                >
                                    {step.text}
                                </Text>
                            </View>
                        ))}
                    </View>
                </Card.Content>

                <Divider />
                <Card.Actions>
                    <Button
                        style={[styles.button, styles.callButton]}
                        mode="contained"
                        onPress={() => makeCall(order.phone)}
                    >
                        Gọi điện cho khách
                    </Button>
                </Card.Actions>
                <Card.Actions>
                    <Button
                        style={[styles.button, styles.mapButton]}
                        mode="contained"
                        onPress={() => openAddressInGoogleMaps(order.address)}
                    >
                        Đến điểm giao
                    </Button>
                </Card.Actions>
                <Card.Actions>
                    <Button
                        style={styles.button}
                        mode="contained"
                        onPress={() => confirmUpdateStatus(order.id, 4)}
                    >
                        Đánh dấu là đã giao
                    </Button>
                </Card.Actions>
                <Card.Actions>
                    <Button
                        style={[styles.button, styles.cancelButton]}
                        mode="contained"
                        onPress={() => confirmUpdateStatus(order.id, 5)}
                    >
                        Khách không nhận hàng
                    </Button>
                </Card.Actions>
            </Card>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 10,
    },
    card: {
        flexShrink: 1,
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
    infoContainer: {
        flexDirection: 'row',
        marginBottom: 5,
        flexWrap: 'wrap',
    },
    infoLabel: {
        fontWeight: 'bold',
        color: '#333',
        width: 120,
    },
    infoValue: {
        color: '#555',
        flexShrink: 1,
    },
    statusContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 20,
        flexWrap: 'wrap',
    },
    statusStep: {
        flex: 1,
        alignItems: 'center',
    },
    statusCircle: {
        width: 24,
        height: 24,
        borderRadius: 12,
        marginBottom: 5,
    },
    statusLine: {
        position: 'absolute',
        top: 12,
        left: '50%',
        height: 2,
        width: '100%',
        zIndex: -1,
    },
    statusText: {
        fontSize: 12,
        textAlign: 'center',
    },
    button: {
        backgroundColor: '#5cb85c',
        marginRight: 5,
        flexShrink: 1,
    },
    cancelButton: {
        backgroundColor: '#d9534f',
        flexShrink: 1,
    },
    callButton: {
        backgroundColor: '#428bca',
        flexShrink: 1,
    },
    mapButton: {
        backgroundColor: '#00aaff',
        flexShrink: 1,
    },
});

export default OrderDetails;