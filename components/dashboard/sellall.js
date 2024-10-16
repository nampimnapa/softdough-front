import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';

// Dynamically import ApexCharts to avoid SSR issues
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

const OrderChart = ({ startDate, endDate }) => {
    const [options, setOptions] = useState({});
    const [series, setSeries] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/pos/getOrderDetails?startDate=${startDate}&endDate=${endDate}`);
                const result = await response.json();

                // Map through the results and prepare data for chart
                const chartData = result.map(item => ({
                    sm_name: item.sm_name,
                    smt_name: item.smt_name,
                    orderdetail: item.orderdetail.map(order => ({
                        odde_sum: order.odde_sum,
                        ocreated_at: order.ocreated_at
                    }))
                }));

                // Prepare categories for x-axis
                const orderCategories = [...new Set(chartData.flatMap(sm => sm.orderdetail.map(order => `${order.ocreated_at}`)))];

                // Prepare series data for stacked chart
                const chartSeries = chartData.map(sm => ({
                    name: `${sm.smt_name} (${sm.sm_name})`,
                    data: orderCategories.map(category => {
                        const order = sm.orderdetail.find(od => `${od.ocreated_at}` === category);
                        return order ? order.odde_sum : 0;
                    })
                }));

                // Define chart options
                const chartOptions = {
                    chart: {
                        type: 'bar',
                        height: 350,
                        stacked: true,
                    },
                    plotOptions: {
                        bar: {
                            horizontal: false,
                            borderRadius: 10,
                            dataLabels: {
                                total: {
                                    enabled: true,
                                    style: {
                                        fontSize: '12px',
                                        fontWeight: 600,
                                        colors: ['#73664B'],  // สีของผลรวมบนกราฟ
                                    }
                                }
                            }
                        },
                    },
                    dataLabels: {
                        enabled: true,
                        formatter: function (val) {
                            return val.toFixed(2); // แสดงค่าเป็นทศนิยม 2 ตำแหน่งบนแท่งกราฟ
                        },
                        style: {
                            fontSize: '12px',
                            colors: ['#FFFFFF'],  // สีของค่าบนแท่งกราฟเป็นสีขาว
                        },
                    },
                    colors: ['#73664B', '#C5B182', '#E3D8BF', '#F5F1E8', '#F2B461'],
                    xaxis: {
                        categories: orderCategories,
                        labels: {
                            style: {
                                colors: '#73664B',
                                fontSize: '12px',
                            },
                        },
                    },
                    yaxis: {
                        labels: {
                            style: {
                                colors: '#73664B',
                            },
                        },
                    },
                    tooltip: {
                        y: {
                            formatter: (val) => `${val.toFixed(2)} บาท` // แสดงค่าใน tooltip เป็นทศนิยม 2 ตำแหน่ง
                        },
                    },
                    fill: {
                        opacity: 1,
                    },
                    legend: {
                        position: 'top',
                        labels: {
                            colors: '#73664B',
                        },
                    },
                };                
                

                setOptions(chartOptions);
                setSeries(chartSeries);
            } catch (error) {
                console.error('Error fetching order details:', error);
            }
        };

        fetchData();
    }, [startDate, endDate]);

    return <Chart options={options} series={series} type="bar" height={350} />;
};

export default OrderChart;


// import React, { useState, useEffect } from 'react';
// import dynamic from 'next/dynamic';

// // Dynamically import ApexCharts to avoid SSR issues
// const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

// const OrderChart = ({ startDate, endDate }) => {
//     const [options, setOptions] = useState({});
//     const [series, setSeries] = useState([]);

//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/pos/getOrderDetails?startDate=${startDate}&endDate=${endDate}`);
//                 const result = await response.json();

//                 // Map through the results and prepare data for chart
//                 const chartData = result.map(item => ({
//                     sm_name: item.sm_name,
//                     smt_name: item.smt_name,
//                     orderdetail: item.orderdetail.map(order => ({
//                         odde_sum: order.odde_sum,
//                         ocreated_at: order.ocreated_at
//                     }))
//                 }));

//                 // Prepare categories for x-axis
//                 const orderCategories = [...new Set(chartData.flatMap(sm => sm.orderdetail.map(order => `${order.ocreated_at}`)))];

//                 // Prepare series data for stacked chart
//                 const chartSeries = chartData.map(sm => ({
//                     name: `${sm.smt_name} (${sm.sm_name})`,
//                     data: orderCategories.map(category => {
//                         const order = sm.orderdetail.find(od => `${od.ocreated_at}` === category);
//                         return order ? order.odde_sum : 0;
//                     })
//                 }));

//                 // Define chart options
//                 const chartOptions = {
//                     series: chartSeries,
//                     chart: {
//                         type: 'bar',
//                         height: 350,
//                         stacked: true,
//                         toolbar: {
//                             show: true
//                         },
//                         zoom: {
//                             enabled: true
//                         }
//                     },
//                     responsive: [{
//                         breakpoint: 480,
//                         options: {
//                             legend: {
//                                 position: 'bottom',
//                                 offsetX: -10,
//                                 offsetY: 0
//                             }
//                         }
//                     }],
//                     plotOptions: {
//                         bar: {
//                             horizontal: false,
//                             borderRadius: 10,
//                             borderRadiusApplication: 'end', // 'around', 'end'
//                             borderRadiusWhenStacked: 'last', // 'all', 'last'
//                             dataLabels: {
//                                 total: {
//                                     enabled: true,
//                                     style: {
//                                         fontSize: '13px',
//                                         fontWeight: 900
//                                     }
//                                 }
//                             }
//                         },
//                     },
//                     xaxis: {
//                         type: 'datetime',
//                         categories: orderCategories,
//                         labels: {
//                             style: {
//                                 colors: '#73664B',
//                                 fontSize: '12px',
//                             },
//                         },
//                     },
//                     legend: {
//                         position: 'right',
//                         offsetY: 40,
//                         labels: {
//                             colors: '#73664B',
//                         },
//                     },
//                     fill: {
//                         opacity: 1,
//                     },
//                 };

//                 setOptions(chartOptions);
//                 setSeries(chartSeries);
//             } catch (error) {
//                 console.error('Error fetching order details:', error);
//             }
//         };

//         fetchData();
//     }, [startDate, endDate]);

//     return <Chart options={options} series={series} type="bar" height={350} />;
// };

// export default OrderChart;