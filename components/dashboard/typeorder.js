// import React, { useEffect, useState } from 'react';
// import dynamic from 'next/dynamic';

// // Dynamically import ApexCharts
// const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

// const SalesComparisonChart = ({ startDate, endDate }) => {
//     const [chartsData, setChartsData] = useState([]);
//     const [sharedSeries, setSharedSeries] = useState([]);

//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/pos/getOrderDetails?startDate=${startDate}&endDate=${endDate}`);
//                 const result = await response.json();

//                 // Group data by odt_name (sales type)
//                 const groupedData = result.reduce((acc, item) => {
//                     item.orderdetail.forEach(order => {
//                         if (!acc[order.odt_name]) {
//                             acc[order.odt_name] = {};
//                         }
//                         if (!acc[order.odt_name][order.ocreated_at]) {
//                             acc[order.odt_name][order.ocreated_at] = {};
//                         }
//                         if (!acc[order.odt_name][order.ocreated_at][item.sm_name]) {
//                             acc[order.odt_name][order.ocreated_at][item.sm_name] = 0;
//                         }
//                         // Sum the odde_sum for the same sm_name and ocreated_at
//                         acc[order.odt_name][order.ocreated_at][item.sm_name] += order.odde_sum;
//                     });
//                     return acc;
//                 }, {});

//                 // Prepare categories (ocreated_at)
//                 const categories = [...new Set(result.flatMap(item => item.orderdetail.map(order => order.ocreated_at)))];

//                 // Prepare the shared series for the legend (showing only once)
//                 const seriesData = Object.keys(result.reduce((acc, item) => {
//                     acc[item.sm_name] = true;
//                     return acc;
//                 }, {}));

//                 const sharedSeries = seriesData.map((sm_name, index) => ({
//                     name: sm_name, // Each series represents an sm_name (e.g., เรดเวอเวด, ออริจินัล)
//                     color: ['#73664B', '#C5B182', '#E3D8BF'][index % 3], // Assign colors from the color palette
//                     data: [] // Initialize empty data for shared series
//                 }));

//                 setSharedSeries(sharedSeries);

//                 // Prepare chart data for each odt_name
//                 const charts = Object.keys(groupedData).map((salesType) => {
//                     const chartSeries = sharedSeries.map(sm => ({
//                         name: sm.name,
//                         data: categories.map(date => {
//                             const dataForDate = groupedData[salesType][date];
//                             return dataForDate && dataForDate[sm.name] ? dataForDate[sm.name] : 0;
//                         })
//                     }));

//                     return {
//                         options: {
//                             chart: {
//                                 height: 350,
//                                 type: 'line',
//                                 zoom: {
//                                     enabled: false
//                                 },
//                                 toolbar: {
//                                     show: false // Show toolbar for all charts
//                                 }
//                             },
//                             stroke: {
//                                 width: [5, 7, 5],
//                                 curve: 'straight',
//                                 dashArray: [0, 8, 5]
//                             },
//                             title: {
//                                 text: `Sales for ${salesType}`,
//                                 align: 'left',
//                                 style: {
//                                     color: '#73664B'
//                                 }
//                             },
//                             xaxis: {
//                                 categories: categories,
//                                 labels: {
//                                     rotate: -90, // Rotate the x-axis labels to vertical
//                                     rotateAlways: true, // Ensure labels are always rotated
//                                     style: {
//                                         fontSize: '12px',
//                                         colors: '#73664B'
//                                     }
//                                 }
//                             },
//                             colors: sharedSeries.map(sm => sm.color),
//                             tooltip: {
//                                 y: {
//                                     formatter: (val) => `${val.toFixed(2)} บาท`
//                                 }
//                             },
//                             grid: {
//                                 padding: {
//                                     right: 20,
//                                     left: 20
//                                 }
//                             },
//                             legend: {
//                                 show: false // Disable legend for individual charts
//                             }
//                         },
//                         series: chartSeries
//                     };
//                 });

//                 setChartsData(charts);
//             } catch (error) {
//                 console.error('Error fetching sales data:', error);
//             }
//         };

//         fetchData();
//     }, [startDate, endDate]);

//     return (
//         <div>
//             {/* Render shared legend */}
//             <div style={{ marginBottom: '20px', display: 'flex', justifyContent: 'center' ,fontSize: '12px',}}>
//                 {sharedSeries.map((sm, index) => (
//                     <div key={index} style={{ display: 'flex', alignItems: 'center', marginRight: '1em' }}>
//                         <div style={{ width: '10px', height: '10px', backgroundColor: sm.color, marginRight: '5px' }}></div>
//                         <span style={{ color: '#73664B' }}>{sm.name}</span>
//                     </div>
//                 ))}
//             </div>

//             {/* Render individual charts */}
//             <div style={{ display: 'flex', overflowX: 'auto' }}>
//                 {chartsData.map((chartData, index) => (
//                     <div key={index} style={{ minWidth: '400px', marginRight: '0.5em', overflowX: 'auto' }}>
//                         <Chart options={chartData.options} series={chartData.series} type="line" height={350} />
//                     </div>
//                 ))}
//             </div>
//         </div>
//     );
// };

// export default SalesComparisonChart;
import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

// Dynamically import ApexCharts
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

const SalesComparisonChart = ({ startDate, endDate }) => {
    const [chartsData, setChartsData] = useState([]);
    const [sharedSeries, setSharedSeries] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/pos/getOrderDetails?startDate=${startDate}&endDate=${endDate}`);
                const result = await response.json();

                // Group data by odt_name (sales type)
                const groupedData = result.reduce((acc, item) => {
                    item.orderdetail.forEach(order => {
                        if (!acc[order.odt_name]) {
                            acc[order.odt_name] = {};
                        }
                        if (!acc[order.odt_name][order.ocreated_at]) {
                            acc[order.odt_name][order.ocreated_at] = {};
                        }
                        if (!acc[order.odt_name][order.ocreated_at][item.sm_name]) {
                            acc[order.odt_name][order.ocreated_at][item.sm_name] = 0;
                        }
                        // Sum the odde_sum for the same sm_name and ocreated_at
                        acc[order.odt_name][order.ocreated_at][item.sm_name] += order.odde_sum;
                    });
                    return acc;
                }, {});

                // Prepare categories (ocreated_at)
                const categories = [...new Set(result.flatMap(item => item.orderdetail.map(order => order.ocreated_at)))];

                // Prepare the shared series for the legend (showing only once)
                const seriesData = result.map(item => ({
                    sm_name: item.sm_name,
                    smt_name: item.smt_name
                }));

                const uniqueSeries = Array.from(new Set(seriesData.map(s => `${s.smt_name} (${s.sm_name})`)));

                const sharedSeries = uniqueSeries.map((name, index) => ({
                    name: name, // Each series represents smt_name (sm_name)
                    color: ['#73664B', '#C5B182', '#E3D8BF'][index % 3], // Assign colors from the color palette
                    data: [] // Initialize empty data for shared series
                }));

                setSharedSeries(sharedSeries);

                // Prepare chart data for each odt_name
                const charts = Object.keys(groupedData).map((salesType) => {
                    const chartSeries = sharedSeries.map(sm => ({
                        name: sm.name,
                        data: categories.map(date => {
                            const dataForDate = groupedData[salesType][date];
                            const [smt_name, sm_name] = sm.name.split(' (');
                            const actualSmName = sm_name ? sm_name.slice(0, -1) : ''; // Remove closing parenthesis
                            return dataForDate && dataForDate[actualSmName] ? dataForDate[actualSmName] : 0;
                        })
                    }));

                    return {
                        options: {
                            chart: {
                                height: 350,
                                type: 'line',
                                zoom: {
                                    enabled: false
                                },
                                toolbar: {
                                    show: false // Show toolbar for all charts
                                }
                            },
                            stroke: {
                                width: [5, 7, 5],
                                curve: 'straight',
                                dashArray: [0, 8, 5]
                            },
                            title: {
                                text: `Sales for ${salesType}`,
                                align: 'left',
                                style: {
                                    color: '#73664B'
                                }
                            },
                            xaxis: {
                                categories: categories,
                                labels: {
                                    rotate: -90, // Rotate the x-axis labels to vertical
                                    rotateAlways: true, // Ensure labels are always rotated
                                    style: {
                                        fontSize: '12px',
                                        colors: '#73664B'
                                    }
                                }
                            },
                            colors: sharedSeries.map(sm => sm.color),
                            tooltip: {
                                y: {
                                    formatter: (val) => `${val.toFixed(2)} บาท`
                                }
                            },
                            grid: {
                                padding: {
                                    right: 20,
                                    left: 20
                                }
                            },
                            legend: {
                                show: false // Disable legend for individual charts
                            }
                        },
                        series: chartSeries
                    };
                });

                setChartsData(charts);
            } catch (error) {
                console.error('Error fetching sales data:', error);
            }
        };

        fetchData();
    }, [startDate, endDate]);

    return (
        <div>
            {/* Render shared legend */}
            <div style={{ marginBottom: '20px', display: 'flex', justifyContent: 'center', fontSize: '12px' }}>
                {sharedSeries.map((sm, index) => (
                    <div key={index} style={{ display: 'flex', alignItems: 'center', marginRight: '1em' }}>
                        <div style={{ width: '10px', height: '10px', backgroundColor: sm.color, marginRight: '5px' }}></div>
                        <span style={{ color: '#73664B' }}>{sm.name}</span>
                    </div>
                ))}
            </div>

            {/* Render individual charts */}
            <div style={{ display: 'flex', overflowX: 'auto' }}>
                {chartsData.map((chartData, index) => (
                    <div key={index} style={{ minWidth: '400px', marginRight: '0.5em', overflowX: 'auto' }}>
                        <Chart options={chartData.options} series={chartData.series} type="line" height={350} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SalesComparisonChart;