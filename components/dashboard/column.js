import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';

// Dynamically import ApexCharts to avoid SSR issues
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

const Column = ({ startDate, endDate }) => {
    const [options, setOptions] = useState({});
    const [series, setSeries] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/dash/getOrderDetails?startDate=${startDate}&endDate=${endDate}`);
                const result = await response.json();
    
                // Map through the results and prepare data for chart
                const chartData = result.map(item => ({
                    sm_name: item.sm_name,
                    smt_name: item.smt_name,
                    totalqty: item.totalqty,  // Use totalqty for each item
                    totalprice: item.totalprice  // Include totalprice
                }));
    
                // x-axis (sm_name followed by smt_name)
                const orderCategories = chartData.map(sm => [`${sm.sm_name}`, `${sm.smt_name}`]);
    
                // จำนวนรวม
                const chartSeries = [{
                    name: 'จำนวนสินค้า',
                    data: chartData.map(sm => sm.totalqty)
                }];
    
                const chartOptions = {
                    chart: {
                        height: 350,
                        type: 'bar',
                        events: {
                            click: function (chart, w, e) {
                                // Handle click events
                            }
                        }
                    },
                    colors: ['#4B3A2B', '#7A6A52', '#D1B687', '#8F7352', '#E8872F', '#3B3028'],
                    plotOptions: {
                        bar: {
                            columnWidth: '45%',
                            distributed: true,
                        }
                    },
                    dataLabels: {
                        enabled: true,  // Enable data labels
                        formatter: function (val, { dataPointIndex }) {
                            const price = chartData[dataPointIndex].totalprice;
                            return `${price.toFixed(2)}`;  // Show totalprice on top of the bar
                        },
                        offsetY: 10,  // Position the label just above the bar
                        style: {
                            fontSize: '12px',
                            // colors: ['#000'],  // Set the label color
                            colors: ['#FFFFFF'], // เปลี่ยนสีฟอนต์เป็นสีขาว
                        },
                    },
                    legend: {
                        show: false
                    },
                    xaxis: {
                        categories: orderCategories, // sm_name followed by smt_name
                        labels: {
                            style: {
                                colors: '#73664B', // ใช้สีเดียวกันสำหรับทุก label
                                fontSize: '12px'
                            }
                        }
                    },
                    tooltip: {
                        y: {
                            formatter: function(val, { dataPointIndex }) {
                                // Fetch totalprice from the chartData array using the index
                                const price = chartData[dataPointIndex].totalprice;
                                return `จำนวน: ${val} ชิ้น, ราคา: ${price} บาท`; // Show totalqty and totalprice in tooltip
                            }
                        }
                    }
                };
    
                // Update state for rendering chart in React
                setOptions(chartOptions);
                setSeries(chartSeries);
            } catch (error) {
                console.error('Error fetching order details:', error);
            }
        };
    
        fetchData();
    }, [startDate, endDate]);
    

    return <div id="chart"><Chart options={options} series={series} type="bar" height={350} /></div>;
};


export default Column;