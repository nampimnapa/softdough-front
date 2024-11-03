// เอามา
// import React, { Component } from 'react';
// import dynamic from 'next/dynamic';

// // โหลด react-apexcharts แบบ dynamic โดยปิดการทำงานใน SSR
// const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

// class Donut extends Component {
//   constructor(props) {
//     super(props);

//     this.state = {
//       options: {},
//       series: [44, 55, 41, 17, 15],
//       labels: ['A', 'B', 'C', 'D', 'E']
//     }
//   }

//   render() {
//     return (
//       <div className="donut">
//         <Chart options={this.state.options} series={this.state.series} type="donut" width="380" />
//       </div>
//     );
//   }
// }

// export default Donut;

import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

// โหลด react-apexcharts แบบ dynamic โดยปิดการทำงานใน SSR
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

// const Donut = ({ data }) => {
//     const [chartData, setChartData] = useState({
//       options: {
//         labels: [],
//         colors: ['#4B3A2B', '#7A6A52', '#D1B687', '#8F7352', '#E8872F', '#3B3028'],  // กำหนดสีที่คุณต้องการ
//       },
//       series: [],
//     });
  
//     useEffect(() => {
//       if (Array.isArray(data) && data.length > 0) { 
//         const labels = data.map(item => item.ept_name || 'Unknown');
//         const series = data.map(item => item.total_sum || 0);
  
//         setChartData({
//           options: {
//             labels,
//             colors: ['#4B3A2B', '#7A6A52', '#D1B687', '#8F7352', '#E8872F', '#3B3028'],  // สีของกราฟ donut
//           },
//           series,
//         });
//       }
//     }, [data]);
  
//     return (
//       <div className="donut">
//         {chartData.series.length > 0 ? (
//           <Chart options={chartData.options} series={chartData.series} type="donut" width="380" />
//         ) : (
//           <p>No data available</p> 
//         )}
//       </div>
//     );
//   };
  
//   export default Donut;
const Donut = ({ data }) => {
  const [chartData, setChartData] = useState({
    options: {
      labels: [],
      colors: ['#4B3A2B', '#7A6A52', '#D1B687', '#8F7352', '#E8872F', '#3B3028'],
      legend: {
        position: 'top',           // ตำแหน่งให้อยู่ด้านบน
        horizontalAlign: 'center', // จัดให้อยู่กึ่งกลางแนวนอน
        markers: {
          shape: 'square',         // เปลี่ยนสัญลักษณ์เป็นสี่เหลี่ยม
        },
        itemMargin: {
          horizontal: 10,          // ระยะห่างระหว่างไอเท็มในแนวนอน
          vertical: 5,             // ระยะห่างระหว่างไอเท็มในแนวตั้ง
        },
        fontSize: '14px',          // ขนาดฟ้อนต์
        labels: {
          colors: '#73664B',       // สีของข้อความใน legend
        }
      }
    },
    series: [],
  });

  useEffect(() => {
    if (Array.isArray(data) && data.length > 0) { 
      const labels = data.map(item => item.ept_name || 'Unknown');
      const series = data.map(item => item.total_sum || 0);

      setChartData({
        options: {
          ...chartData.options,
          labels,
        },
        series,
      });
    }
  }, [data]);

  return (
    <div className="donut flex justify-center items-center">
  {chartData.series.length > 0 ? (
    <Chart options={chartData.options} series={chartData.series} type="donut" width="380" />
  ) : (
    <p>No data available</p> 
  )}
</div>

  );
};

export default Donut;

  