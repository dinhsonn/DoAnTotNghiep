import React, { useEffect, useState, useRef } from 'react';
import { Line, Doughnut, Bar } from 'react-chartjs-2';

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
    BarElement // Import BarElement
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
    BarElement // Register BarElement
);

function Dashboard() {
    const [keywords, setKeywords] = useState([]);
    const [dailyEarnings, setDailyEarnings] = useState({});
    const [monthlyEarnings, setMonthlyEarnings] = useState([]);
    const [dates, setDates] = useState([]);
    const [earningsData, setEarningsData] = useState([]);
    const [refresh, setRefresh] = useState(false);
    
    // Reference to chart components
    const lineChartRef = useRef(null);
    const barChartRef = useRef(null);

    const calculateDailyAndMonthlyEarnings = (data) => {
        const dailyEarnings = {};
        const monthlyEarnings = {};

        data.forEach(item => {
            const date = item.createdAt.split('T')[0];
            const month = date.split('-').slice(0, 2).join('-');

            if (!dailyEarnings[date]) {
                dailyEarnings[date] = 0;
            }
            dailyEarnings[date] += item.price * item.qty;

            if (!monthlyEarnings[month]) {
                monthlyEarnings[month] = 0;
            }
            monthlyEarnings[month] += item.price * item.qty;
        });

        return { dailyEarnings, monthlyEarnings };
    };

    const fetchSearchLog = () => {
        fetch('http://localhost:8082/api/search-log')
            .then(response => response.json())
            .then(data => {
                if (data && typeof data === 'object') {
                    const keywordArray = Object.entries(data).map(([keyword, count]) => ({ keyword, count }));
                    keywordArray.sort((a, b) => b.count - a.count);
                    setKeywords(keywordArray);
                } else {
                    console.error('API response is not an object:', data);
                    setKeywords([]);
                }
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                setKeywords([]);
            });
    };

    const fetchOrderItems = () => {
        fetch('http://localhost:8082/api/orders/items')
            .then(response => response.json())
            .then(data => {
                if (Array.isArray(data)) {
                    const { dailyEarnings, monthlyEarnings } = calculateDailyAndMonthlyEarnings(data);

                    const sortedDates = Object.keys(dailyEarnings).sort();
                    setDates(sortedDates);
                    setEarningsData(sortedDates.map(date => dailyEarnings[date]));

                    const monthlyEarningsArray = Object.entries(monthlyEarnings).map(([month, earnings]) => ({ month, earnings }));
                    setMonthlyEarnings(monthlyEarningsArray);
                } else {
                    console.error('API response is not an array:', data);
                }
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    };

    useEffect(() => {
        fetchSearchLog();
        fetchOrderItems();
    }, [refresh]);

    useEffect(() => {
        // Destroy existing charts before re-rendering
        if (lineChartRef.current && lineChartRef.current.chartInstance) {
            lineChartRef.current.chartInstance.destroy();
        }
        if (barChartRef.current && barChartRef.current.chartInstance) {
            barChartRef.current.chartInstance.destroy();
        }
    }, [refresh]);
    

    const lineData = {
        labels: dates,
        datasets: [
            {
                label: 'Thu nhập',
                data: earningsData,
                fill: false,
                backgroundColor: 'rgb(75, 192, 192)',
                borderColor: 'rgba(75, 192, 192, 0.2)',
            },
        ],
    };

    const doughnutData = {
        labels: ['Direct', 'Social', 'Referral'],
        datasets: [
            {
                data: [60, 30, 10],
                backgroundColor: ['#36A2EB', '#FF6384', '#FFCE56'],
                hoverBackgroundColor: ['#36A2EB', '#FF6384', '#FFCE56'],
            },
        ],
    };

    const monthlyEarningsData = {
        labels: monthlyEarnings.map(item => item.month),
        datasets: [
            {
                label: 'Thu nhập hàng tháng',
                data: monthlyEarnings.map(item => item.earnings),
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1,
            },
        ],
    };

    const handleRefresh = () => {
        setRefresh(prev => !prev);
    };

    return (
        <div className="content">
            <section className="content-header my-2">
                <h1 className="d-inline">Dashboard</h1>
            </section>
            <section className="content-body my-2">
                <div className="row">
                    <div className="col-md-3">
                        <button onClick={handleRefresh} className="btn btn-primary ml-2">Refresh</button>
                        <div className="info-box">
                            <div className="info-box-content">
                                <span className="info-box-text">Thu nhập (Tháng): </span>
                                <span className="info-box-number">{monthlyEarnings.reduce((acc, item) => acc + item.earnings, 0).toLocaleString()} VNĐ</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-8">
                        <div className="chart">
                            <h3>Tổng quan về thu nhập hàng ngày</h3>
                            <Line ref={lineChartRef} data={lineData} />
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="chart">
                            <h3>Thu nhập hàng tháng</h3>
                            <Bar ref={barChartRef} data={monthlyEarningsData} />
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <div className="info-box">
                            <div className="info-box-content">
                                <h3>Từ khóa được tìm kiếm nhiều nhất</h3>
                                <ul>
                                    {keywords.length > 0 ? (
                                                                                keywords.map((item, index) => (
                                                                                    <li key={index}>{item.keyword}</li>
                                                                                ))
                                                                            ) : (
                                                                                <li>No keywords found</li>
                                                                            )}
                                                                        </ul>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </section>
                                                </div>
                                            );
                                        }
                                        
                                        export default Dashboard;
                                        
