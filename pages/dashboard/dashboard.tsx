// import React from 'react';
// import Donut from '../../components/dashboard/donut.js';

// const Home = () => {
//   return (
//     <div>
//       <h1>My Donut Chart</h1>
//       <Donut />
//     </div>
//   );
// };

// export default Home;

//ปกติ
// import React, { useEffect, useState } from 'react';
// import Donut from '../../components/dashboard/donut.js';

// const Home = () => {
//   const [data, setData] = useState([]);
//   const [totalSum, setTotalSum] = useState(0);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/expenses/readalldash`);
//         const result = await response.json();
//         setData(result || []);

//         // คำนวณยอดรวมทั้งหมด
//         const sum = result.reduce((acc, item) => acc + (item.total_sum || 0), 0);
//         setTotalSum(sum);
//       } catch (error) {
//         console.error('Error fetching data:', error);
//         setData([]);
//       }
//     };

//     fetchData();
//   }, []);

//   return (
//     <div>
//       <h1>My Donut Chart</h1>
//       <h2>Total Sum: {totalSum.toLocaleString()}</h2> {/* แสดงยอดรวมทั้งหมด */}
//       <Donut data={data} />
//     </div>
//   );
// };

// export default Home;

// Home.js
// ลองเดือน
import React, { useEffect, useState } from 'react';
import Donut from '../../components/dashboard/donut.js';
import { format } from 'date-fns';

const Home = () => {
  const [data, setData] = useState([]);
  const [totalSum, setTotalSum] = useState(0);
  const [selectedMonth, setSelectedMonth] = useState(format(new Date(), 'yyyy-MM')); // เริ่มต้นที่เดือนปัจจุบัน

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/expenses/readalldash?month=${selectedMonth}`);
        const result = await response.json();
        setData(result || []);

        // คำนวณยอดรวมทั้งหมด
        const sum = result.reduce((acc, item) => acc + (item.total_sum || 0), 0);
        setTotalSum(sum);
      } catch (error) {
        console.error('Error fetching data:', error);
        setData([]);
      }
    };

    fetchData();
  }, [selectedMonth]); // เลือกแล้ว เปลี่ยนจะเรียกใช้ useEffect ใหม่

  const handleMonthChange = (event) => {
    setSelectedMonth(event.target.value);
  };

  return (

    <div className="h-screen">
      <p className='text-[#F2B461] font-medium m-4'>ภาพรวม</p>
      <div className="grid grid-cols-3 gap-4 m-4">
        <div className='text-[#73664B] text-center p-4 rounded-lg shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)]'>
          <p className='font-medium  mb-2'>รายการจ่าย</p>
          <label htmlFor="month-select" className='mr-2'>เลือกเดือน :</label>
          <input
            type="month"
            id="month-select"
            value={selectedMonth}
            onChange={handleMonthChange}
          />
          <h2>ยอดรวมทั้งหมด: {totalSum.toLocaleString()}</h2> {/* แสดงยอดรวมทั้งหมด */}
          <Donut data={data} /></div>
        {/* <!-- ... -->
        <div>09</div> */}

        <div className='text-[#73664B] text-center p-4 rounded-lg shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)]'>
          <p className='font-medium  mb-2'>รายการจ่าย</p>
          <label htmlFor="month-select" className='mr-2'>เลือกเดือน :</label>
          <input
            type="month"
            id="month-select"
            value={selectedMonth}
            onChange={handleMonthChange}
          />
          <h2>ยอดรวมทั้งหมด: {totalSum.toLocaleString()}</h2> {/* แสดงยอดรวมทั้งหมด */}
          <Donut data={data} /></div>
      </div>



    </div>
  );
};

export default Home;


