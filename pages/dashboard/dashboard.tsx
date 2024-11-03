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
import CostChart from '../../components/dashboard/cost.js'; // Add your CostChart component
import OrderChart from '../../components/dashboard/sellall.js'; // Add your CostChart component
import SalesComparisonChart from '../../components/dashboard/typeorder.js';
import Column from '../../components/dashboard/column.js';


import { format } from 'date-fns';

const Home = () => {
  const [data, setData] = useState([]);
  const [totalSum, setTotalSum] = useState(0);
  const [selectedMonth, setSelectedMonth] = useState(format(new Date(), 'yyyy-MM')); // เริ่มต้นที่เดือนปัจจุบัน
  const [startDate, setStartDate] = useState('2024-01-01'); // วันที่เริ่มต้น
  const [endDate, setEndDate] = useState('2024-12-31'); // วันที่สิ้นสุด
  const [startDate1, setStartDate1] = useState('2024-01-01'); // วันที่เริ่มต้น
  const [endDate1, setEndDate1] = useState('2024-12-31'); // วันที่สิ้นสุด


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/dash/readalldash?month=${selectedMonth}`);
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

    <div className="h-screen  flex">
      <div className="flex-1 overflow-y-auto">
        <p className='text-[#F2B461] font-medium m-4'>ภาพรวม</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 m-4">
  <div className="text-[#73664B] text-center p-4 rounded-lg shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)]">
    <p className="font-medium mb-2 mt-2">รายการจ่าย</p>
    <label htmlFor="month-select" className="mr-2">เลือกเดือน :</label>
    <input
      type="month"
      id="month-select"
      value={selectedMonth}
      onChange={handleMonthChange}
      className="border rounded p-1 text-sm md:text-base"
    />
    <h2 className="mt-2">ยอดรวมทั้งหมด: {totalSum.toLocaleString()}</h2>
    <Donut data={data} />
  </div>

  <div className="text-center text-[#73664B] p-4 rounded-lg shadow">
    <p className="font-medium mb-2">ต้นทุนวัตถุดิบ</p>

    {/* Input Fields สำหรับวันที่ */}
    <div className="mb-4">
      <label className="mr-2">วันที่เริ่มต้น:</label>
      <input
        type="date"
        value={startDate}
        onChange={(e) => setStartDate(e.target.value)}
        className="border rounded p-1 text-sm md:text-base"
      />
      <label className="mr-2 ml-4">วันที่สิ้นสุด:</label>
      <input
        type="date"
        value={endDate}
        onChange={(e) => setEndDate(e.target.value)}
        className="border rounded p-1 text-sm md:text-base"
      />
    </div>

    <CostChart startDate={startDate} endDate={endDate} />
  </div>
</div>

<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 gap-4 m-4">
  <div className="text-center text-[#73664B] p-4 rounded-lg shadow">
    <p className="font-medium mb-2">ยอดขายสินค้า</p>

    {/* Input Fields สำหรับวันที่ */}
    <div className="mb-4">
      <label className="mr-2">วันที่เริ่มต้น:</label>
      <input
        type="date"
        value={startDate1}
        onChange={(e) => setStartDate1(e.target.value)}
        className="border rounded p-1 text-sm md:text-base"
      />
      <label className="mr-2 ml-4">วันที่สิ้นสุด:</label>
      <input
        type="date"
        value={endDate1}
        onChange={(e) => setEndDate1(e.target.value)}
        className="border rounded p-1 text-sm md:text-base"
      />
    </div>
    <OrderChart startDate={startDate1} endDate={endDate1} />
    <Column startDate={startDate1} endDate={endDate1} />
    {/* <p className="font-medium mb-2">ยอดขายสินค้าตามประเภทรายการขาย</p> */}
    {/* <SalesComparisonChart startDate={startDate1} endDate={endDate1} /> */}
  </div>



          <div className="grid grid-cols-1 gap-1 m-4">
          

          </div>
        </div>

      </div>

    </div >
  );
};

export default Home;

