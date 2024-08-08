//ได้แล้ว เพิ่ม แก้ไข
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { MagnifyingGlassIcon, PlusIcon, PencilSquareIcon } from "@heroicons/react/24/outline";

function type() {
  const router = useRouter();
  const { id } = router.query;
  const [typeProducts, setTypeProducts] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [openInput, setOpenInput] = useState(0);
  const [newValue, setNewValue] = useState('');
  const [newProductName, setNewProductName] = useState('');
  const [isAdding, setAdding] = useState(false);
  const [message, setMessage] = useState('Loading');
  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/expenses/readtype`)
        .then(response => response.json())
        .then(data => {
            setTypeProducts(data);
        })
        .catch(error => {
            console.error('Error fetching unit data:', error);
        });

}, [id]);

  const changeInput = (id) => {
    setOpenInput(id);
    setIsEditing(true);
  };

  const handleInputChange = (event, id) => {
    const newValueData = event.target.value;
    setTypeProducts(prevProducts => {
      return prevProducts.map(product => {
        if (product.ept_id === id) {
          return { ...product, ept_name: newValueData };
        }
        return product;
      });
    });
  };

  const handleCancelEdit = () => {
    setOpenInput(0);
    setAdding(false);
    setIsEditing(false);
    setMessage('');
  };

  const handleSaveChanges = async (idData) => {
    setOpenInput(0);
    setIsEditing(false);
    const foundItem = typeProducts.find(item => item.ept_id == idData);
    const requestData = { ept_name: foundItem.ept_name };

    // แก้ไขประเภทสินค้า 
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/expenses/updatetype/${idData}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(requestData),
    });
    const responseData = await response.json();
    setMessage(responseData.message === 'update success' ? 'Data updated successfully' : responseData.message || 'Error occurred');
  };

  const handleAddProduct = () => {
    setAdding(true);
  };

  const handleAddChanges = async () => {
    if (newProductName.trim() !== '') {
      const newId = typeProducts.length > 0 ? typeProducts[typeProducts.length - 1].ept_id + 1 : 1;
      const newProduct = { ept_id: newId, ept_name: newProductName };

      setTypeProducts(prevProducts => [...prevProducts, newProduct]);
      setNewProductName('');
      setOpenInput(0);
      setAdding(false);
    }

    // เพิ่มประเภทสินค้า
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/expenses/addtype`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ept_name: newProductName }),
    });
    const responseData = await response.json();
    setMessage(responseData.message === 'success' ? 'Data added successfully' : responseData.message || 'Error occurred');
  };

  return (
    <div className="h-screen">
      <p className='text-[#F2B461] font-medium m-4'>ประเภทรายการขาย</p>
      <div className="flex justify-between">
        
      </div>
      <div className="w-full">
        <div className="flex w-full flex-col">
          <div className="relative overflow-x-auto mx-4">
            <div className="flex items-center justify-end mb-2">
              <button
                className="scale-90 px-3 p-2 text-sm rounded-full text-white bg-[#73664B] border hover:bg-[#5E523C] flex"
                onClick={handleAddProduct}
              >
                <PlusIcon className="h-5 w-5 text-white mr-2" />
                เพิ่ม
              </button>
            </div>
            <table className="w-full text-sm text-center table-fixed">
              <thead>
                <tr className="text-white font-normal bg-[#908362]">
                  <th scope="col" className="px-3 py-3 w-64">
                    เมนู
                  </th>
                  <th scope="col" className="px-12 py-3 whitespace-nowrap overflow-hidden">
                    หน้าร้าน
                  </th>
                  <th scope="col" className="px-12 py-3 whitespace-nowrap overflow-hidden">
                    Line Man
                  </th>
                  <th scope="col" className="px-12 py-3 whitespace-nowrap overflow-hidden">
                    Grab                  
                </th>
                </tr>
              </thead>
              <tbody>
                {typeProducts.length > 0 || isAdding ? (
                  typeProducts.map((type, index) => (
                    <tr key={type.ept_id} className={index % 2 === 0 ? "odd:bg-white" : "even:bg-[#F5F1E8]"}>

                      <td scope="row" className="px-3 py-1 w-96 text-[#73664B] whitespace-nowrap dark:text-white">{index + 1}</td>
                      {openInput === type.ept_id ? (
                        <td className="py-1 text-left w-96 text-[#73664B] whitespace-nowrap overflow-hidden">
                          <input
                            className="w-full h-9 focus:outline-none border"
                            type="text"
                            defaultValue={type.ept_name}
                            onChange={(event) => handleInputChange(event, type.ept_id)}
                          />
                        </td>
                      ) : (
                        <td className="ms-7 py-1 text-left text-[#73664B] whitespace-nowrap overflow-hidden">{type.ept_name}</td>
                      )}
                      {isEditing && openInput === type.ept_id ? (
                        <td className="me-2 my-1 pt-[0.30rem] pb-[0.30rem] flex items-center justify-end">
                          <button type="button" onClick={handleCancelEdit} className="border px-4 py-1 rounded-xl bg-[#F26161] text-white font-light">
                            ยกเลิก
                          </button>
                          <button
                            type="button"
                            onClick={() => handleSaveChanges(type.ept_id)}
                            className="border px-4 py-1 rounded-xl bg-[#87DA46] text-white font-light"
                          >
                            บันทึก
                          </button>
                        </td>
                      ) : (
                        <td className="me-2 py-4 flex items-center justify-end whitespace-nowrap overflow-hidden">
                          <button type="button" onClick={() => changeInput(type.ept_id)}>
                            <a href="#" className="w-full flex justify-center items-center">
                              <PencilSquareIcon className="h-4 w-4 text-[#73664B]" />
                            </a>
                          </button>
                        </td>
                      )}
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="3" className="text-center text-sm text-[#73664B] py-3">
                      ไม่มีข้อมูลประเภทรายการจ่าย
                    </td>
                  </tr>
                )}
                {isAdding && (
                  <tr key="new" className={typeProducts.length % 2 === 0 ? "odd:bg-white" : "even:bg-[#F5F1E8]"}>
                    <td scope="row" className="px-3 py-1 w-96 text-[#73664B] whitespace-nowrap dark:text-white">
                      {typeProducts.length + 1}
                    </td>
                    <td className="py-1 text-left w-96 text-[#73664B] whitespace-nowrap overflow-hidden">
                      <input
                        className="w-full h-9 focus:outline-none border"
                        type="text"
                        value={newProductName}
                        onChange={(event) => setNewProductName(event.target.value)}
                      />
                    </td>
                    <td className="me-2 my-1 pt-[0.30rem] pb-[0.30rem] flex items-center justify-end">
                      <button
                        type="button"
                        onClick={handleCancelEdit}
                        className="border px-4 py-1 rounded-xl bg-[#F26161] text-white font-light"
                      >
                        ยกเลิก
                      </button>
                      <button
                        type="button"
                        onClick={handleAddChanges}
                        className="border px-4 py-1 rounded-xl bg-[#87DA46] text-white font-light"
                      >
                        บันทึก
                      </button>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default type;
