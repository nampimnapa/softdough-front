// ยังไม่มีอะไร
// import React, { useEffect, useState } from "react";
// import { useRouter } from "next/router";
// import { MagnifyingGlassIcon, PlusIcon, PencilSquareIcon } from "@heroicons/react/24/outline";
// import { count } from "console";

// function type() {
//     const router = useRouter();
//     const { id } = router.query;
//     const [Salesmenu, setSalesmenu] = useState([]);
//     const [isEditing, setIsEditing] = useState(false);
//     const [openInput, setOpenInput] = useState(0);
//     const [newValue, setNewValue] = useState('');
//     const [newProductName, setNewProductName] = useState('');
//     const [isAdding, setAdding] = useState(false);
//     const [message, setMessage] = useState('Loading');
//     useEffect(() => {
//         fetch(`${process.env.NEXT_PUBLIC_API_URL}/salemenu/small`)
//             .then(response => response.json())
//             .then(data => {
//                 setSalesmenu(data);
//             })
//             .catch(error => {
//                 console.error('Error fetching unit data:', error);
//             });

//     }, [id]);

//     const Type =
//         [{ id: 1, name: "หน้าร้าน" },
//         { id: 2, name: "Line man" },
//         { id: 3, name: "Grab" }
//         ];
//     const changeInput = (id) => {
//         setOpenInput(id);
//         setIsEditing(true);
//     };

//     const handleInputChange = (event, id) => {
//         const newValueData = event.target.value;
//         setSalesmenu(prevProducts => {
//             return prevProducts.map(product => {
//                 if (product.ept_id === id) {
//                     return { ...product, ept_name: newValueData };
//                 }
//                 return product;
//             });
//         });
//     };

//     const handleCancelEdit = () => {
//         setOpenInput(0);
//         setAdding(false);
//         setIsEditing(false);
//         setMessage('');
//     };

//     // const handleSaveChanges = async (idData) => {
//     //     setOpenInput(0);
//     //     setIsEditing(false);
//     //     const foundItem = typeProducts.find(item => item.ept_id == idData);
//     //     const requestData = { ept_name: foundItem.ept_name };

//     //     // แก้ไขประเภทสินค้า 
//     //     const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/expenses/updatetype/${idData}`, {
//     //         method: 'PATCH',
//     //         headers: { 'Content-Type': 'application/json' },
//     //         body: JSON.stringify(requestData),
//     //     });
//     //     const responseData = await response.json();
//     //     setMessage(responseData.message === 'update success' ? 'Data updated successfully' : responseData.message || 'Error occurred');
//     // };

//     const handleAddProduct = () => {
//         setAdding(true);
//     };

//     // const handleAddChanges = async () => {
//     //     if (newProductName.trim() !== '') {
//     //         const newId = typeProducts.length > 0 ? typeProducts[typeProducts.length - 1].ept_id + 1 : 1;
//     //         const newProduct = { ept_id: newId, ept_name: newProductName };

//     //         setTypeProducts(prevProducts => [...prevProducts, newProduct]);
//     //         setNewProductName('');
//     //         setOpenInput(0);
//     //         setAdding(false);
//     //     }

//     //     // เพิ่มประเภทสินค้า
//     //     const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/expenses/addtype`, {
//     //         method: 'POST',
//     //         headers: { 'Content-Type': 'application/json' },
//     //         body: JSON.stringify({ ept_name: newProductName }),
//     //     });
//     //     const responseData = await response.json();
//     //     setMessage(responseData.message === 'success' ? 'Data added successfully' : responseData.message || 'Error occurred');
//     // };

//     return (
//         <div className="h-screen">
//             <p className='text-[#F2B461] font-medium m-4'>ประเภทรายการขาย</p>
//             <div className="flex justify-between">

//             </div>
//             <div className="w-full">
//                 <div className="flex w-full flex-col">
//                     <div className="relative overflow-x-auto mx-4">
//                         <div className="flex items-center justify-end mb-2">
//                             <button
//                                 className="scale-90 px-3 p-2 text-sm rounded-full text-white bg-[#73664B] border hover:bg-[#5E523C] flex"
//                                 onClick={handleAddProduct}
//                             >
//                                 <PlusIcon className="h-5 w-5 text-white mr-2" />
//                                 เพิ่ม
//                             </button>
//                         </div>
//                         <table className="w-full text-sm text-center table-fixed">
//                             <thead>
//                                 <tr className="text-white font-normal bg-[#908362]">
//                                     <th scope="col" className="px-3 py-3 w-64">
//                                         เมนู
//                                     </th>
//                                     <th scope="col" className="px-12 py-3 whitespace-nowrap overflow-hidden">
//                                         หน้าร้าน
//                                     </th>
//                                     <th scope="col" className="px-12 py-3 whitespace-nowrap overflow-hidden">
//                                         Line Man
//                                     </th>
//                                     <th scope="col" className="px-12 py-3 whitespace-nowrap overflow-hidden">
//                                         Grab
//                                     </th>
//                                 </tr>
//                             </thead>
//                             <tbody>
//                                 <tr>

//                                     <td scope="row" className="px-3 py-1 w-96 text-[#73664B] whitespace-nowrap dark:text-white"></td>

//                                     </tr>


//                                 <td className="ms-7 py-1 text-left text-[#73664B] whitespace-nowrap overflow-hidden"></td>

//                                 <tr>
//                                     <td colSpan="3" className="text-center text-sm text-[#73664B] py-3">
//                                         ไม่มีข้อมูลสินค้า
//                                     </td>
//                                 </tr>


//                             </tbody>
//                         </table>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default type;

import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { MagnifyingGlassIcon, PlusIcon, PencilSquareIcon } from "@heroicons/react/24/outline";

function Type() {
    const router = useRouter();
    const { id } = router.query;
    const [Salesmenu, setSalesmenu] = useState([]);
    const [OrderTypes, setOrderTypes] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [openInput, setOpenInput] = useState(0);
    const [newValue, setNewValue] = useState('');
    const [newProductName, setNewProductName] = useState('');
    const [isAdding, setAdding] = useState(false);
    const [message, setMessage] = useState('Loading');
    const Type = [
        { id: 1, name: "หน้าร้าน" },
        { id: 2, name: "Line Man" },
        { id: 3, name: "Grab" }
    ];

    useEffect(() => {
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/salesmenu/small`)
            .then(response => response.json())
            .then(data => {
                setSalesmenu(data);
            })
            .catch(error => {
                console.error('Error fetching unit data:', error);
            });

        fetch(`${process.env.NEXT_PUBLIC_API_URL}/ordertype`)
            .then(response => response.json())
            .then(data => {
                setOrderTypes(data);
            })
            .catch(error => {
                console.error('Error fetching order types:', error);
            });

    }, [id]);

    const changeInput = (id) => {
        setOpenInput(id);
        setIsEditing(true);
    };

    const handleInputChange = (event, id) => {
        const newValueData = event.target.value;
        setSalesmenu(prevProducts => {
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

    const handleAddProduct = () => {
        setAdding(true);
    };

    return (
        <div className="h-screen">
            <p className='text-[#F2B461] font-medium m-4'>ประเภทรายการขาย</p>
            <div className="w-full">
                <div className="flex w-full flex-col">
                    <div className="relative overflow-x-auto mx-4">
                        {/* <div className="flex items-center justify-end mb-2">
                            <button
                                className="scale-90 px-3 p-2 text-sm rounded-full text-white bg-[#73664B] border hover:bg-[#5E523C] flex"
                                onClick={handleAddProduct}
                            >
                                <PlusIcon className="h-5 w-5 text-white mr-2" />
                                เพิ่ม
                            </button>
                        </div> */}
                        <table className="w-full text-sm text-center table-fixed">
                            <thead>
                                <tr className="text-white font-normal bg-[#908362]">
                                    <th scope="col" className="px-3 py-3 w-64">
                                        เมนู
                                    </th>
                                    {Type.map((type) => (
                                        <th key={type.id} scope="col" className="px-12 py-3 whitespace-nowrap overflow-hidden">
                                            {type.name}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {Salesmenu.length > 0 ? (
                                    Salesmenu.map((menu, index) => (
                                        <tr key={index} className="border-b">
                                            <td className="px-3 py-1 text-left text-[#73664B] whitespace-nowrap overflow-hidden">
                                                {/* {menu.sm_name} */}
                                                {`${menu.sm_name} (${menu.smt_name})`}
                                            </td>
                                            {Type.map((type) => {
                                                if (type.name === "หน้าร้าน") {
                                                    return (
                                                        <td key={type.id} className="px-12 py-1 text-[#73664B]">
                                                            {menu.sm_price || "ไม่มีข้อมูล"}
                                                        </td>
                                                    );
                                                } else {
                                                    const orderType = OrderTypes.find(order => order.type_name === type.name);
                                                    return (
                                                        <td key={type.id} className="px-12 py-1 text-[#73664B]">
                                                            {orderType ? orderType.some_value : "ไม่มีข้อมูล"}
                                                        </td>
                                                    );
                                                }
                                            })}
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={Type.length + 1} className="text-center text-sm text-[#73664B] py-3">
                                            ไม่มีข้อมูลสินค้า
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

export default Type;
