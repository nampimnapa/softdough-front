// หน้าตา ไม่ใช้หน้านี้
// import React, { Component } from 'react';
// import Chart from 'react-apexcharts'

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

import React, { Component } from 'react';
import dynamic from 'next/dynamic';

// โหลด react-apexcharts แบบ dynamic โดยปิดการทำงานใน SSR
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

class Donut extends Component {
  constructor(props) {
    super(props);

    this.state = {
      options: {
        labels: this.props.labels,
        legend: {
          position: 'bottom'
        }
      },
      series: this.props.series
    };
  }

  componentDidUpdate(prevProps) {
    if (prevProps.series !== this.props.series || prevProps.labels !== this.props.labels) {
      this.setState({
        options: {
          ...this.state.options,
          labels: this.props.labels
        },
        series: this.props.series
      });
    }
  }

  render() {
    return (
      <div className="donut">
        <Chart options={this.state.options} series={this.state.series} type="donut" width="380" />
      </div>
    );
  }
}

export default Donut;
