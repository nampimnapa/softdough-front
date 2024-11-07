// import React, { useState, useEffect } from 'react';
// import dynamic from 'next/dynamic';

// // Dynamically import ApexCharts to avoid SSR issues
// const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

// const CostChart = ({ startDate, endDate }) => {
//     const [options, setOptions] = useState({});
//     const [series, setSeries] = useState([]);


//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/ingredient/getIngredientUsedDetails?startDate=${startDate}&endDate=${endDate}`);
//                 const result = await response.json();

//                 // จัดเตรียมข้อมูลสำหรับ chart
//                 const chartData = result.map(item => ({
//                     pd_name: item.pd_name,
//                     pdc_name: item.pdc_name, // ดึง pdc_name มาด้วย
//                     used: item.used.map(usedItem => ({
//                         pdo: usedItem.pdo,
//                         pdo_id_name: usedItem.pdo_id_name,
//                         pdocreated_at: usedItem.pdocreated_at,
//                         sumCost: usedItem.sumCost,
//                         perPiece: usedItem.perPiece,
//                         un_name: usedItem.un_name
//                     }))
//                 }));

//                 // สร้าง categories เป็น pdo_id_name พร้อม pdocreated_at
//                 const pdoCategories = [...new Set(chartData.flatMap(product => product.used.map(u => `${u.pdo_id_name} (${u.pdocreated_at})`)))];

//                 // จัดเตรียมข้อมูลสำหรับ stacked bar chart
//                 const chartSeries = chartData.map(product => ({
//                     // รวม pdc_name และ pd_name ด้วยกัน
//                     name: `${product.pdc_name}(${product.pd_name})`,
//                     data: pdoCategories.map(pdo_category => {
//                         const usedItem = product.used.find(u => `${u.pdo_id_name} (${u.pdocreated_at})` === pdo_category);
//                         return usedItem ? usedItem.sumCost : 0; // ถ้าไม่มีข้อมูลใช้ค่า 0
//                     })
//                 }));

//                 // อัปเดต options
//                 const chartOptions = {
//                     chart: {
//                         type: 'bar',
//                         height: 350,
//                         stacked: true,
//                     },
//                     plotOptions: {
//                         bar: {
//                             horizontal: true,
//                             dataLabels: {
//                                 total: {
//                                     enabled: true,  // แสดงผลรวมที่ปลายแท่งกราฟ
//                                     style: {
//                                         fontSize: '13px',  // ขนาดฟ้อนผลรวม
//                                         fontWeight: 900,
//                                         colors: ['#73664B']  // สีฟ้อนผลรวม
//                                     }
//                                 },
//                             },
//                         },
//                     },
//                     colors: ['#73664B', '#C5B182', '#E3D8BF', '#F5F1E8', '#F2B461'],  // กำหนดสีที่คุณต้องการ
//                     xaxis: {
//                         categories: pdoCategories,
//                         labels: {
//                             formatter: function (val) {
//                                 return val.toString();
//                             },
//                             style: {
//                                 colors: '#73664B', // สีของฟ้อนในแกน X
//                                 fontSize: '12px', // ขนาดฟ้อน
//                             },
//                         },
//                     },
//                     yaxis: {
//                         title: {
//                             style: {
//                                 color: '#73664B', // สีของฟ้อนในชื่อแกน Y
//                             },
//                         },
//                         labels: {
//                             style: {
//                                 colors: '#73664B', // สีของฟ้อนในแกน Y
//                             },
//                         },
//                     },
//                     tooltip: {
//                         enabled: true, // เปิดใช้งาน tooltip
//                         style: {
//                             fontSize: '12px', // ขนาดฟ้อนใน tooltip
//                             colors: ['#73664B'], // สีฟ้อนใน tooltip
//                         },
//                         y: {
//                             formatter: function (val, { series, seriesIndex, dataPointIndex, w }) {
//                                 const usedItem = chartData[seriesIndex].used[dataPointIndex];
//                                 return `${usedItem.sumCost.toFixed(2)} บาท ( ${usedItem.perPiece.toFixed(2)} บาท/${usedItem.un_name} )`;
//                             },
//                         },
//                         marker: {
//                             show: true, // แสดงเครื่องหมายบน tooltip
//                         },
//                         x: {
//                             formatter: function (val) {
//                                 return ` ${val}`; // แสดงค่า category ของแท่งกราฟ
//                             },
//                         },
//                     },
//                     fill: {
//                         opacity: 1,
//                     },
//                     legend: {
//                         position: 'top',
//                         horizontalAlign: 'left',
//                         offsetX: 40,
//                         labels: {
//                             colors: '#73664B', // สีฟ้อนใน legend
//                             fontSize: '12px', // ขนาดฟ้อนใน legend
//                         },
//                     },
//                 };

//                 // อัปเดต options และ series ใน state
//                 setOptions(chartOptions);
//                 setSeries(chartSeries);
//             } catch (error) {
//                 console.error('Error fetching data:', error);
//             }
//         };

//         fetchData();
//     }, [startDate, endDate]);


//     return <Chart options={options} series={series} type="bar" height={350} />;
// };

// export default CostChart;

//เพิ่มกรณีข้อมูลเยอะแต่ยังไม่เห็นภาไ
import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';

// Dynamically import ApexCharts to avoid SSR issues
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

const CostChart = ({ startDate, endDate }) => {
    const [options, setOptions] = useState({});
    const [series, setSeries] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/dash/getIngredientUsedDetails?startDate=${startDate}&endDate=${endDate}`);
                const result = await response.json();

                // จัดเตรียมข้อมูลสำหรับ chart
                const chartData = result.map(item => ({
                    pd_name: item.pd_name,
                    pdc_name: item.pdc_name, // ดึง pdc_name มาด้วย
                    used: item.used.map(usedItem => ({
                        pdo: usedItem.pdo,
                        pdo_id_name: usedItem.pdo_id_name,
                        pdocreated_at: usedItem.pdocreated_at,
                        sumCost: usedItem.sumCost,
                        perPiece: usedItem.perPiece,
                        un_name: usedItem.un_name
                    }))
                }));

                // // สร้าง categories เป็น pdo_id_name พร้อม pdocreated_at
                // const pdoCategories = [...new Set(chartData.flatMap(product => product.used.map(u => `${u.pdo_id_name} (${u.pdocreated_at})`)))];

                // // จัดเตรียมข้อมูลสำหรับ stacked bar chart
                // const chartSeries = chartData.map(product => ({
                //     // รวม pdc_name และ pd_name ด้วยกัน
                //     name: `${product.pdc_name}(${product.pd_name})`,
                //     data: pdoCategories.map(pdo_category => {
                //         const usedItem = product.used.find(u => `${u.pdo_id_name} (${u.pdocreated_at})` === pdo_category);
                //         return usedItem ? usedItem.sumCost : 0; // ถ้าไม่มีข้อมูลใช้ค่า 0
                //     })
                // }));

                // สร้าง categories เป็นเฉพาะ pdocreated_at
                const pdoCategories = [...new Set(chartData.flatMap(product => product.used.map(u => u.pdocreated_at)))];

                // จัดเตรียมข้อมูลสำหรับ stacked bar chart
                const chartSeries = chartData.map(product => ({
                    // รวม pdc_name และ pd_name ด้วยกัน
                    name: `${product.pdc_name}(${product.pd_name})`,
                    data: pdoCategories.map(pdo_created_at => {
                        // หา usedItem โดยยังคงใช้ pdo_id_name สำหรับการจับคู่ข้อมูล
                        const usedItem = product.used.find(u => u.pdocreated_at === pdo_created_at);
                        return usedItem ? usedItem.sumCost : 0; // ถ้าไม่มีข้อมูลใช้ค่า 0
                    })
                }));

                // อัปเดต options
                const chartOptions = {
                    chart: {
                        type: 'bar',
                        height: 350,
                        stacked: true,
                        zoom: {
                            enabled: true,
                            type: 'x',
                            autoScaleYaxis: true,
                        },
                        toolbar: {
                            show: true,
                            tools: {
                                zoom: true,
                                zoomin: true,
                                zoomout: true,
                                pan: true,
                                reset: true,
                            }
                        },
                    },
                    plotOptions: {
                        bar: {
                            horizontal: true,
                            barHeight: '70%',
                            dataLabels: {
                                position: 'center',
                                orientation: 'vertical',
                                style: {
                                    fontSize: '13px',
                                    fontWeight: 900,
                                    color: '#FFFFFF',
                                },
                                formatter: function (val) {
                                    return val.toFixed(2);
                                },
                                rotation: 90,
                                total: {
                                    enabled: true,
                                    style: {
                                        fontSize: '13px',
                                        fontWeight: 'bold',
                                        color: '#73664B'
                                    },
                                    formatter: function (seriesTotal) {
                                        return seriesTotal.toFixed(2); // แสดงผลรวมที่ปลายแท่ง
                                    }
                                }
                            }
                        }
                    },
                    colors: ['#4B3A2B', '#7A6A52', '#D1B687', '#8F7352', '#E8872F', '#3B3028'],
                    xaxis: {
                        categories: pdoCategories,
                        labels: {
                            formatter: function (val) {
                                return val;
                            },
                            style: {
                                colors: '#73664B',
                                fontSize: '12px',
                            },
                        },
                    },
                    yaxis: {
                        title: {
                            style: {
                                color: '#73664B',
                            },
                        },
                        labels: {
                            style: {
                                colors: '#73664B',
                            },
                        },
                    },
                    tooltip: {
                        enabled: true,
                        style: {
                            fontSize: '12px',
                            colors: ['#73664B'],
                        },
                        y: {
                            formatter: function (val, { series, seriesIndex, dataPointIndex, w }) {
                                const usedItem = chartData[seriesIndex]?.used[dataPointIndex];
                                if (usedItem) {
                                    return `${usedItem.sumCost.toFixed(2)} บาท ( ${usedItem.perPiece.toFixed(2)} บาท/${usedItem.un_name} )`;
                                } else {
                                    return 'No data';
                                }
                            },
                        },
                        marker: {
                            show: true,
                        },
                        x: {
                            formatter: function (val) {
                                return ` ${val}`;
                            },
                        },
                    },
                    fill: {
                        opacity: 1,
                    },
                    legend: {
                        position: 'top',
                        horizontalAlign: 'left',
                        offsetX: 40,
                        labels: {
                            colors: '#73664B',
                            fontSize: '12px',
                        },
                    },
                    scrollbar: {
                        enabled: true,
                        hide: false,
                        barHeight: 6,
                        dragHeight: 4,
                    },
                };
                
                

                // อัปเดต options และ series ใน state
                setOptions(chartOptions);
                setSeries(chartSeries);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [startDate, endDate]);

    return <Chart options={options} series={series} type="bar" height={350} />;
};

export default CostChart;

// useEffect(() => {
    //     const fetchData = async () => {
    //         try {
    //             const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/ingredient/getIngredientUsedDetails?startDate=${startDate}&endDate=${endDate}`);
    //             const result = await response.json();

    //             // จัดเตรียมข้อมูลสำหรับ chart
    //             const chartData = result.map(item => ({
    //                 pd_name: item.pd_name,
    //                 pdc_name: item.pdc_name, // ดึง pdc_name มาด้วย
    //                 used: item.used.map(usedItem => ({
    //                     pdo: usedItem.pdo,
    //                     pdo_id_name: usedItem.pdo_id_name,
    //                     pdocreated_at: usedItem.pdocreated_at,
    //                     sumCost: usedItem.sumCost,
    //                     perPiece: usedItem.perPiece,
    //                     un_name: usedItem.un_name
    //                 }))
    //             }));

    //             // สร้าง categories เป็น pdo_id_name พร้อม pdocreated_at
    //             const pdoCategories = [...new Set(chartData.flatMap(product => product.used.map(u => `${u.pdo_id_name} (${u.pdocreated_at})`)))];

    //             // จัดเตรียมข้อมูลสำหรับ stacked bar chart
    //             const chartSeries = chartData.map(product => ({
    //                 // รวม pdc_name และ pd_name ด้วยกัน
    //                 name: `${product.pdc_name}(${product.pd_name})`,
    //                 data: pdoCategories.map(pdo_category => {
    //                     const usedItem = product.used.find(u => `${u.pdo_id_name} (${u.pdocreated_at})` === pdo_category);
    //                     return usedItem ? usedItem.sumCost : 0; // ถ้าไม่มีข้อมูลใช้ค่า 0
    //                 })
    //             }));

    //             // อัปเดต options
    //             const chartOptions = {
    //                 chart: {
    //                     type: 'bar',
    //                     height: 350,
    //                     stacked: true,
    //                 },
    //                 plotOptions: {
    //                     bar: {
    //                         horizontal: true,
    //                         dataLabels: {
    //                             position: 'center', // ตำแหน่งของข้อมูลในแท่งให้อยู่ตรงกลาง
    //                             style: {
    //                                 fontSize: '14px', // ขนาดฟ้อน
    //                                 colors: ['#73664B'], // สีฟ้อน
    //                             },
    //                         },
    //                     },
    //                 },
    //                 colors: ['#73664B', '#C5B182', '#E3D8BF', '#F5F1E8', '#F2B461'],  // กำหนดสีที่คุณต้องการ
    //                 xaxis: {
    //                     categories: pdoCategories,
    //                     labels: {
    //                         formatter: function (val) {
    //                             return val.toString();
    //                         },
    //                         style: {
    //                             colors: '#73664B', // สีของฟ้อนในแกน X
    //                             fontSize: '12px', // ขนาดฟ้อน
    //                         },
    //                     },
    //                 },
    //                 yaxis: {
    //                     title: {
    //                         style: {
    //                             color: '#73664B', // สีของฟ้อนในชื่อแกน Y
    //                         },
    //                     },
    //                     labels: {
    //                         style: {
    //                             colors: '#73664B', // สีของฟ้อนในแกน Y
    //                         },
    //                     },
    //                 },
    //                 tooltip: {
    //                     enabled: true, // เปิดใช้งาน tooltip
    //                     style: {
    //                         fontSize: '12px', // ขนาดฟ้อนใน tooltip
    //                         colors: ['#73664B'], // สีฟ้อนใน tooltip
    //                     },
    //                     y: {
    //                         formatter: function (val, { series, seriesIndex, dataPointIndex, w }) {
    //                             const usedItem = chartData[seriesIndex].used[dataPointIndex];
    //                             return `${usedItem.sumCost.toFixed(2)} บาท ( ${usedItem.perPiece.toFixed(2)} บาท/${usedItem.un_name} )`;
    //                         },
    //                     },
    //                     marker: {
    //                         show: true, // แสดงเครื่องหมายบน tooltip
    //                     },
    //                     // ปรับตำแหน่ง tooltip
    //                     x: {
    //                         formatter: function (val) {
    //                             return ` ${val}`; // แสดงค่า category ของแท่งกราฟ
    //                         },
    //                     },
    //                 },
    //                 fill: {
    //                     opacity: 1,
    //                 },
    //                 legend: {
    //                     position: 'top',
    //                     horizontalAlign: 'left',
    //                     offsetX: 40,
    //                     labels: {
    //                         colors: '#73664B', // สีฟ้อนใน legend
    //                         fontSize: '12px', // ขนาดฟ้อนใน legend
    //                     },
    //                 },
    //             };


    //             // อัปเดต options และ series ใน state
    //             setOptions(chartOptions);
    //             setSeries(chartSeries);
    //         } catch (error) {
    //             console.error('Error fetching data:', error);
    //         }
    //     };

    //     fetchData();
    // }, [startDate, endDate]);