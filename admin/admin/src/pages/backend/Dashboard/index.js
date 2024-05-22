import React, { useEffect, useState } from 'react';
import { Line, Doughnut } from 'react-chartjs-2';

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ArcElement
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ArcElement
);

function Dashboard() {
    const [keywords, setKeywords] = useState([]);
    const [monthlyEarnings, setMonthlyEarnings] = useState(0);
    const [dates, setDates] = useState([]);
    const [earningsData, setEarningsData] = useState([]);
    const [refresh, setRefresh] = useState(false);

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
                    const earnings = data.reduce((acc, item) => acc + item.price * item.qty, 0);
                    setMonthlyEarnings(earnings);

                    const earningsByDate = data.reduce((acc, item) => {
                        const date = item.createdAt.split('T')[0];
                        if (!acc[date]) {
                            acc[date] = 0;
                        }
                        acc[date] += item.price * item.qty;
                        return acc;
                    }, {});

                    const sortedDates = Object.keys(earningsByDate).sort();
                    setDates(sortedDates);
                    setEarningsData(sortedDates.map(date => earningsByDate[date]));
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
                                <span className="info-box-number">{monthlyEarnings.toLocaleString()} VNĐ</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-8">
                        <div className="chart">
                            <h3>Tổng quan về thu nhập</h3>
                            <Line data={lineData} />
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="chart">
                            <h3>Revenue Sources</h3>
                            <Doughnut data={doughnutData} />
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
