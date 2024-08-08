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

const Donut = ({ data }) => {
    const [chartData, setChartData] = useState({
      options: {
        labels: [],
        colors: [ '#73664B', '#C5B182', '#E3D8BF', '#F5F1E8', '#F2B461'],  // กำหนดสีที่คุณต้องการ
      },
      series: [],
    });
  
    useEffect(() => {
      if (Array.isArray(data) && data.length > 0) { 
        const labels = data.map(item => item.ept_name || 'Unknown');
        const series = data.map(item => item.total_sum || 0);
  
        setChartData({
          options: {
            labels,
            colors:  [ '#73664B', '#C5B182', '#E3D8BF', '#F5F1E8', '#F2B461'],  // สีของกราฟ donut
          },
          series,
        });
      }
    }, [data]);
  
    return (
      <div className="donut">
        {chartData.series.length > 0 ? (
          <Chart options={chartData.options} series={chartData.series} type="donut" width="380" />
        ) : (
          <p>No data available</p> 
        )}
      </div>
    );
  };
  
  export default Donut;
  