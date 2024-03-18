import React, { Fragment, useEffect, useState } from "react";
import Link from "next/link";
import {
  ChevronLeftIcon,
  MagnifyingGlassIcon,
  PlusIcon,
  PencilSquareIcon,
  TrashIcon
} from "@heroicons/react/24/outline";
import { Dialog, Transition } from '@headlessui/react';
import { Kanit } from "next/font/google";
import { useRouter } from "next/router";
import { Input } from "@nextui-org/react";
import { CheckboxGroup, Checkbox, colors, Button } from "@nextui-org/react";

const kanit = Kanit({
  subsets: ["thai", "latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700"],
});

function editpdod() {
  const router = useRouter();
  const { id } = router.query;
  const [detail, setDetail] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (id) {
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/production/readone/${id}`)
        .then(response => response.json())
        .then(data => {
          if (data.message) {
            console.error(data.message);
            setLoading(false);
          } else {
            setDetail(data);
            setLoading(false);
          }
        })
        .catch(error => {
          console.error('Error fetching production order:', error);
          setLoading(false);
        });
    }
  }, [id]);
  const handleDeleteIngredient = (index) => {
    setAddedIngredients((prevIngredients) => {
      const updatedIngredients = [...prevIngredients];
      updatedIngredients.splice(index, 1);
      return updatedIngredients;
    });
  };
  return (

    <div>
      <button className='my-3 mx-5 '>
        <Link href={`../detail/${id}`} className="text-sm w-full flex justify-center items-center text-[#F2B461] hover:text-[#D9CAA7]">
          <ChevronLeftIcon className="h-5 w-5 text-[#F2B461] hover:text-[#D9CAA7]" />
          รายการสั่งผลิต
        </Link>
      </button>
      <p className='my-1 mx-6 font-semibold text-[#C5B182] border-b  border-[#C5B182] py-2'>แก้ไขรายละเอียดใบสั่งผลิต</p>
      {detail !== null ? (
        <div>
          <p className="text-sm px-6 py-2 text-[#73664B]">ใบสั่งผลิต : {detail.pdo_id_name}</p>
          <p className="text-sm px-6 py-2 text-[#73664B]">วันที่สั่งผลิต : {detail.updated_at}</p>
          <p className="text-m px-6 py-2 text-[#73664B]">รายละเอียดใบสั่งผลิต</p>
          <div className="relative overflow-x-auto mx-6 mt-2">
            <table className="w-full text-sm text-center text-gray-500 ">
              <thead >
                <tr className="text-white  font-normal  bg-[#908362] ">
                  <td scope="col" className="px-6 py-3">
                    ประเภทสินค้า
                  </td>
                  <td scope="col" className="px-6 py-3">
                    สินค้า
                  </td>
                  <td scope="col" className="px-6 py-3">
                    จำนวน
                  </td>
                  <td scope="col" className="px-6 py-3">
                    
                  </td>
                </tr>
              </thead>
              <tbody>
                {detail.pdodetail.map((pdodetail, idx) => (
                  <tr key={idx} className="odd:bg-white  even:bg-[#F5F1E8] border-b h-10">
                    <td
                      scope="row"
                      className="px-6 py-1 whitespace-nowrap dark:text-white"
                    >
                      {pdodetail.pdc_name}
                    </td>
                    <td className="px-6 py-1">{pdodetail.pd_name}</td>

                    <td className="px-6 py-1 h-10 ">
                      {pdodetail.qty}
                    </td>
                    {/* <td className="px-6 py-4 flex items-center justify-center">
                                        {pdodetail.status}
                                        </td> */}
                    <td >
                      <button onClick={() => handleDeleteIngredient(idx)}>
                        <TrashIcon className="h-5 w-5 text-red-500" /></button>
                    </td>
                  </tr>

                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>

  )
}

export default editpdod