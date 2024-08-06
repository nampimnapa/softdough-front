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
interface Ingredients {
  ind_id: string;
  ind_name: string;
}
interface ProductCat {
  pdc_id: string;
  pdc_name: string;
}
interface Recipe {
  pd_name: String,
  pd_qtyminimum: number,
  status: String,
  picture: String,
  pdc_id: number,
  qtylifetime: number,
  produced_qty: number,
  un_id: number,
  ind_id: number,
  ingredients_qty: number,

}
interface PdodDetail {
  pd_id: number;
  pd_name: string;
  pdc_name: string;
  pdo_id: number;
  pdod_id: number | null;
  qty: number;
  status: string;
}
function Editpdod() {
  const router = useRouter();
  const { id } = router.query;
  // เก็บที่ fetch มา ดีเทลใหญ่ดีเทลเล็ก
  const [detail, setDetail] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [productCat, setProductCat] = useState([]);
  const [Ingredientall, setIngredientall] = useState<any[]>([]);
  const [ingredientsOptions, setIngredientsOptions] = useState<Ingredients[]>([]);
  const [Recipe, setRecipe] = useState([]);

  useEffect(() => {

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/product/readcat`)
      .then(response => response.json())
      .then(data => {
        setProductCat(data);
      })
      .catch(error => {
        console.error('Error fetching unit data:', error);
      });
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/product/productsall`)
      .then(response => response.json())
      .then(data => {
        setRecipe(data);
      })
      .catch(error => {
        console.error('Error fetching unit data:', error);
      });
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
  const [selectedProductType, setSelectedProductType] = useState(1); // ประเภทสินค้าที่ถูกเลือก
  const [selectedProductId, setSelectedProductId] = useState(1); // ประเภทสินค้าที่ถูกเลือก
  const [addedDetail, setAddedDetail] = useState([]);
  const filteredProducts = Recipe.filter(product => product.pdc_id === selectedProductType);




  const handleAddDetail = (event: React.FormEvent) => {
    event.preventDefault();

    const selectedProduct = filteredProducts.find(product => product.pd_id === selectedProductId);
    const typepd = productCat.find(type => type.pdc_id === selectedProductType)?.pdc_name;

    if (!selectedProduct) {
      alert('กรุณาเลือกสินค้า');
      return;
    }

    const enteredQuantity = parseInt((document.getElementById('num') as HTMLInputElement).value);
    if (isNaN(enteredQuantity) || enteredQuantity <= 0) {
      alert('กรุณากรอกจำนวนที่ถูกต้อง');
      return;
    }

    const existingDetailIndex = detail.pdodetail.findIndex((detail: PdodDetail) => detail.pd_id === selectedProduct.pd_id);
    if (existingDetailIndex >= 0) {
      const updatedDetail = [...detail.pdodetail];
      updatedDetail[existingDetailIndex].qty += enteredQuantity;
      setDetail({ ...detail, pdodetail: updatedDetail });
    } else {
      const newDetail: PdodDetail = {
        pd_id: selectedProduct.pd_id,
        pd_name: selectedProduct.pd_name,
        pdc_name: typepd || '',
        pdo_id: detail.pdo_id,
        pdod_id: null,
        qty: enteredQuantity,
        status: '1',
      };
      setDetail({ ...detail, pdodetail: [...detail.pdodetail, newDetail] });
    }

    setSelectedProductType(1);
    (document.getElementById('product') as HTMLSelectElement).value = '';
    (document.getElementById('num') as HTMLInputElement).value = '';
  };
  console.log(detail)
  console.log(addedDetail)
  const handleDeleteProduct = (idx: number) => {
    setDetail(prevDetail => {
      const newDetail = { ...prevDetail };
      newDetail.pdodetail.splice(idx, 1);
      return newDetail;

    });
  };

  const [isChecked, setIsChecked] = useState(true); // State to track checkbox status

  const handleCheckboxChange = async (id) => {
    setIsChecked(!isChecked); // Toggle checkbox status
    console.log(isChecked)
  };
  const [isOpen, setIsOpen] = useState(false);

  const closeModal = () => {
    setIsOpen(false);
  };

  const openModal = () => {
    setIsOpen(true);
  };
  const handleCancel = () => {
    closeModal(); // ปิด Modal หลังจากที่รีเซ็ตค่าเรียบร้อย
  };
  const getProductNameById = (productId) => {
    const product = Recipe.find((item) => item.pd_id === productId);
    return product ? product.pd_name : '';
  };
  const [message, setMessage] = useState('Loading');

  const handleConfirm = async () => {
    const pdo_status = isChecked ? 2 : 1;
    const productionOrder = { pdo_status };

    // Create the data structure to be sent to the server
    // const dataToEdit = detail.pdodetail.map(detail => 
    //   ({ pd_id: detail.pd_id, qty: detail.qty }));
    const dataToEdit = [
      ...detail.pdodetail,
      ...addedDetail
    ].map(detail => ({
      pd_id: detail.pd_id,
      qty: detail.qty
    }));

    const postData = {
      dataToEdit

    };

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/production/editData/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(postData),
    });

    const responseData = await response.json();
    console.log(postData);

    if (responseData.status === 200) {
      setMessage('Data update successfully');
      router.push(`/detail/${detail.pdo_id}`);
    } else {
      setMessage(responseData.message || 'Error occurred');
    }

  }


  return (

    <div>
      <button className='my-3 mx-5 '>
        <Link href={`../add`} className="text-sm w-full flex justify-center items-center text-[#F2B461] hover:text-[#D9CAA7]">
          <ChevronLeftIcon className="h-5 w-5 text-[#F2B461] hover:text-[#D9CAA7]" />
          เพิ่มวัตถุดิบที่ใช้
        </Link>
      </button>
      <p className='my-1 mx-6 font-semibold text-[#C5B182] border-b  border-[#C5B182] py-2'>แก้ไขวัตถุดิบที่ใช้ตามใบสั่งผลิต</p>
      {detail !== null ? (
        <div>
          <p className="text-sm px-6 py-2 text-[#73664B]">ใบสั่งผลิต : {detail.pdo_id_name}</p>
          <p className="text-sm px-6 py-2 text-[#73664B]">วันที่สั่งผลิต : {detail.updated_at}</p>
          <div className="flex w-1/2 justify-start px-6">
            <label className="block text-sm  leading-6 text-[#73664B]  mt-3 text-left ">
              หมายเหตุ :</label>
            <div className="mt-2 col-span-3 ml-3">
              <input
                type="text"
                name="note"
                id="note"
                className="px-3 focus:outline-none bg-[#FFFFDD] block w-full rounded-t-md border border-b-[#C5B182] py-1.5 text-[#C5B182] shadow-sm  placeholder:text-[#C5B182]   sm:text-sm sm:leading-6"
              />
            </div>
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}

      <div className="flex justify-start">
        <div className="w-1/2  mt-10  flex justify-start " >
          <Link href="/product/sell_all">
            <Button href="/product/sell_all"
              onClick={handleCancel}
              type="button"
              className=" text-white bg-[#C5B182] focus:outline-none  font-medium rounded-full text-sm px-5 py-2.5  mb-2 ml-6">
              ยกเลิก</Button>
          </Link>
          <>
            {isOpen && (
              <Transition appear show={isOpen} as={Fragment} >
                <Dialog as="div" onClose={closeModal}  className={`relative z-10 ${kanit.className}`}>
                  <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <div className="fixed inset-0 bg-black/25" />
                  </Transition.Child>

                  <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4 text-center">
                      <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0 scale-95"
                        enterTo="opacity-100 scale-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100 scale-100"
                        leaveTo="opacity-0 scale-95"
                      >
                        <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                          <Dialog.Title
                            as="h3"
                            className="text-lg font-medium leading-6 text-[73664B]"
                          >
                            ยืนยันการแก้ไขใบสั่งผลิต
                          </Dialog.Title>
                          <div className="mt-2">
                            <p className="text-sm text-[#73664B]">
                              คุณต้องการแก้ไขใบสั่งผลิตหรือไม่
                            </p>
                          </div>
                          {/*  choose */}
                          <div className="flex justify-end">
                            <div className="inline-flex justify-end">
                              <button
                                type="button"
                                className="text-[#73664B] inline-flex justify-center rounded-md border border-transparent  px-4 py-2 text-sm font-medium hover:bg-[#FFFFDD] focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                onClick={closeModal}
                              >
                                ยกเลิก
                              </button>

                              <button
                                type="button"
                                className="text-[#C5B182] inline-flex justify-center rounded-md border border-transparent  px-4 py-2 text-sm font-medium  hover:bg-[#FFFFDD] focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                onClick={handleConfirm}
                              ><Link href={`../detail/${id}`}>
                                  ยืนยัน
                                </Link></button>
                            </div>
                          </div>
                        </Dialog.Panel>
                      </Transition.Child>
                    </div>
                  </div>
                </Dialog>
              </Transition>
            )
            }
          </>
          <Button onClick={openModal} type="button" className="ml-2 text-white bg-[#73664B] focus:outline-none  focus:ring-4 focus:ring-gray-200 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 ">บันทึก</Button>
        </div >
      </div>
    </div>


  )
}

export default Editpdod