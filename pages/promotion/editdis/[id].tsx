import React, { Fragment, useEffect, useState } from "react";
import Link from "next/link";
import { ChevronLeftIcon } from "@heroicons/react/24/outline";
import Datepicker from "react-tailwindcss-datepicker";
import { Dialog, Transition } from "@headlessui/react";
import { Kanit } from "next/font/google";
import { useRouter } from "next/router";
import { Button } from "@nextui-org/react";

const kanit = Kanit({
  subsets: ["thai", "latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700"],
});

type Staff = {
  dc_id: string;
  dc_name: string;
  dc_detail: string;
  dc_diccountprice: string;
  datestart: string;
  dateend: string;
  minimum: string;

};

function DetailStaff() {
  const router = useRouter();
  const { id } = router.query;
  const [staff, setStaff] = useState<Staff>({
    dc_id: "",
    dc_name: "",
    dc_detail: "",
    dc_diccountprice: "",
    datestart: "",
    dateend: "",
    minimum: "",
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/promotion/readdis/${id}`)
        .then((response) => response.json())
        .then((data) => {
          setStaff(data);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error:", error);
          setLoading(false);
        });
    }
  }, [id]);

  const handleEditWork = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/promotion/update/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(staff),
      });

      const responseData = await response.json();

      if (response.ok) {
        console.log(responseData.message);
        router.push(`/promotion/discountall`);
      } else {
        console.error("Update failed:", responseData);
      }
    } catch (error) {
      console.error("Error updating staff data:", error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setStaff((prevFormIn) => ({
      ...prevFormIn,
      [name]: value,
    }));
  };

  const [isOpen, setIsOpen] = useState(false);

  const closeModal = () => {
    setIsOpen(false);
  };

  const openModal = () => {
    setIsOpen(true);
  };

  const handleDateChange = (field: 'datestart' | 'dateend', date: { startDate: string, endDate: string }) => {
    setStaff((prevFormIn) => ({
      ...prevFormIn,
      [field]: field === 'datestart' ? date.startDate : date.endDate,
    }));
  };

  return (
    <div className="h-screen">
      <button className="my-3 mx-5">
        <Link href="/promotion/discountall" className="text-sm w-full flex justify-center items-center text-[#F2B461] hover:text-[#D9CAA7]">
          <ChevronLeftIcon className="h-5 w-5 text-[#F2B461] hover:text-[#D9CAA7]" />
          โปรโมชันส่วนลด
        </Link>
      </button>
      <p className="my-1 mx-6 font-semibold text-[#C5B182] border-b border-[#C5B182] py-2">แก้ไขโปรโมชั่นส่วนลด</p>
      <div className="ww mr-5 ml-5">
        <div className="mt-5 md:w-5/6 sm:w-4/5 justify-center ">
          <form>
          <div className="grid md:grid-cols-3 sm:grid-cols-2 items-center ">
              <label className=" text-sm font-medium leading-6 text-[#73664B]  mt-3 md:text-right sm:text-left mr-5 items-center">
                วันที่เริ่มโปรโมชัน :
              </label>
              <div className="col-span-2">
                <Datepicker
                  useRange={false}
                  asSingle={true}
                  value={{
                    startDate: staff.datestart || null,
                    endDate: staff.datestart || null
                  }}
                  onChange={(newValue: any) => handleDateChange('datestart', newValue)}
                />
              </div>
              <label className=" text-sm font-medium leading-6 text-[#73664B]  mt-3 md:text-right sm:text-left mr-5 items-center">
                วันที่สิ้นสุดโปรโมชัน :
              </label>
              <div className="col-span-2">
                <Datepicker
                  useRange={false}
                  asSingle={true}
                  value={{
                    startDate: staff.dateend || null,
                    endDate: staff.dateend || null
                  }}
                  onChange={(newValue: any) => handleDateChange('dateend', newValue)}
                />
              </div>
            </div>
            <div className="grid md:grid-cols-3 sm:grid-cols-2 items-center ">
              <label htmlFor="dc_name" className=" text-sm font-medium leading-6 text-[#73664B]  mt-3 md:text-right sm:text-left mr-5 items-center">
                ชื่อโปรโมชัน :
              </label>
              <div className="mt-2 col-span-2">
                <input
                  required
                  value={staff.dc_name}
                  onChange={handleInputChange}
                  type="text"
                  name="dc_name"
                  id="dc_name"
                  autoComplete="family-name"
                  placeholder="ชื่อโปรโมชัน"
                  className="px-3 bg-[#FFFFDD] block w-full rounded-t-md border border-b-[#C5B182] py-1.5 text-[#C5B182] shadow-sm placeholder:text-[#C5B182] sm:text-sm sm:leading-6 focus:outline-none"
                />
              </div>
            </div>
            <div className="grid md:grid-cols-3 sm:grid-cols-2 items-center ">
              <label htmlFor="dc_diccountprice" className=" text-sm font-medium leading-6 text-[#73664B]  mt-3 md:text-right sm:text-left mr-5 items-center">
                ส่วนลด :
              </label>
              <div className="mt-2 col-span-2">
                <input
                  placeholder="จำนวนเงิน"
                  min="0"
                  type="number"
                  name="dc_diccountprice"
                  value={staff.dc_diccountprice}
                  onChange={handleInputChange}
                  autoComplete="family-name"
                  className="px-3 bg-[#FFFFDD] block w-full rounded-t-md border border-b-[#C5B182] py-1.5 text-[#C5B182] shadow-sm placeholder:text-[#C5B182] sm:text-sm sm:leading-6 focus:outline-none"
                />
              </div>
            </div>
            <div className="grid md:grid-cols-3 sm:grid-cols-2 items-center ">
              <label htmlFor="minimum" className=" text-sm font-medium leading-6 text-[#73664B]  mt-3 md:text-right sm:text-left mr-5 items-center">
                ยอดซื้อขั้นต่ำ :
              </label>
              <div className="mt-2 col-span-2">
                <input
                  placeholder="จำนวนเงิน"
                  min="0"
                  type="number"
                  name="minimum"
                  value={staff.minimum}
                  onChange={handleInputChange}
                  autoComplete="family-name"
                  className="px-3 bg-[#FFFFDD] block w-full rounded-t-md border border-b-[#C5B182] py-1.5 text-[#C5B182] shadow-sm placeholder:text-[#C5B182] sm:text-sm sm:leading-6 focus:outline-none"
                />
              </div>
            </div>
            <div className="grid md:grid-cols-3 sm:grid-cols-2 items-center ">
              <label htmlFor="dc_detail" className=" text-sm font-medium leading-6 text-[#73664B]  mt-3 md:text-right sm:text-left mr-5 items-center">
                รายละเอียด :
              </label>
              <div className="mt-2 col-span-2">
                <input
                  placeholder="รายละเอียด"
                  value={staff.dc_detail}
                  onChange={handleInputChange}
                  type="text"
                  name="dc_detail"
                  autoComplete="family-name"
                  className="px-3 bg-[#FFFFDD] block w-full rounded-t-md border border-b-[#C5B182] py-1.5 text-[#C5B182] shadow-sm placeholder:text-[#C5B182] sm:text-sm sm:leading-6 focus:outline-none"
                />
              </div>
            </div>
          </form>
          <div className="flex justify-start">
            <div className="w-1/2 mt-10 flex justify-start">
              <button>
                <Link href="/promotion/discountall" type="button" className="text-white bg-[#C5B182] focus:outline-none font-medium rounded-full text-sm px-5 py-2.5 mb-2 ml-6">
                  ยกเลิก
                </Link>
              </button>
              <>
                {isOpen && (
                  <Transition appear show={isOpen} as={Fragment} >
                    <Dialog as="div" className={`relative z-10 ${kanit.className}`} onClose={closeModal}>
                      <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0">
                        <div className="fixed inset-0 bg-black/25" />
                      </Transition.Child>
                      <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 text-center">
                          <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0 scale-95" enterTo="opacity-100 scale-100" leave="ease-in duration-200" leaveFrom="opacity-100 scale-100" leaveTo="opacity-0 scale-95">
                            <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                              <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-[#73664B]">
                                ยืนยันการแก้ไขส่วนลด
                              </Dialog.Title>
                              <div className="mt-2">
                                <p className="text-sm text-[#73664B]">คุณต้องการแก้ไขส่วนลด</p>
                              </div>
                              <div className="flex justify-end mt-2">
                                <div className="inline-flex justify-end">
                                  <Button type="button" className="text-[#73664B] bg-white inline-flex justify-center rounded-md border border-transparent px-4 py-2 text-sm font-medium hover:bg-[#FFFFDD] focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2" onClick={closeModal}>
                                    ยกเลิก
                                  </Button>
                                  <Button type="button" className="bg-white text-[#C5B182] inline-flex justify-center rounded-md border border-transparent px-4 py-2 text-sm font-medium hover:bg-[#FFFFDD] hover:text-[#73664B] focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2" onClick={handleEditWork}>
                                    ยืนยัน
                                  </Button>
                                </div>
                              </div>
                            </Dialog.Panel>
                          </Transition.Child>
                        </div>
                      </div>
                    </Dialog>
                  </Transition>
                )}
              </>
              <button onClick={openModal} type="button" className="ml-2 text-white bg-[#73664B] focus:outline-none focus:ring-4 focus:ring-gray-200 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2">
                บันทึก
              </button>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}

export default DetailStaff;