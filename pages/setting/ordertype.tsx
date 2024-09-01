//ลองเล่นเช็คผิดพลาด something
import React, { useEffect, useState, Fragment } from "react";
import { useRouter } from "next/router";
import { MagnifyingGlassIcon, PlusIcon, PencilSquareIcon, CurrencyDollarIcon, Cog6ToothIcon } from "@heroicons/react/24/outline";
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { ChevronDownIcon, } from '@heroicons/react/20/solid'
import { Dialog, Transition } from '@headlessui/react';


function Type() {
    const router = useRouter();
    const { id } = router.query;
    const [Salesmenu, setSalesmenu] = useState([]);
    const [Salesmenu1, setSalesmenu1] = useState([]);

    const [OrderTypes, setOrderTypes] = useState([]);
    const [OrderTypeshow, setOrderTypesshow] = useState([]);

    const [selectedId, setSelectedId] = useState(null);

    const [isEditing, setIsEditing] = useState(false);
    const [openInput, setOpenInput] = useState(0);
    const [newValue, setNewValue] = useState('');
    const [newProductName, setNewProductName] = useState('');
    const [isAdding, setAdding] = useState(false);
    const [message, setMessage] = useState('Loading');
    const Type = [
        { id: 1, name: "หน้าร้าน" },
        { id: 2, name: "Line Man", per: 30 },
        { id: 3, name: "Grab", per: 30 }
    ];

    useEffect(() => {
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/setting/price`)
            .then(response => response.json())
            .then(data => {
                setSalesmenu(data);
                // setSalesmenu1(data);

            })
            .catch(error => {
                console.error('Error fetching unit data:', error);
            });

        // fetch(`${process.env.NEXT_PUBLIC_API_URL}/ordertype`)
        //     .then(response => response.json())
        //     .then(data => {
        //         setOrderTypes(data);
        //     })
        //     .catch(error => {
        //         console.error('Error fetching order types:', error);
        //     });

        fetch(`${process.env.NEXT_PUBLIC_API_URL}/setting/ordertype`)
            .then(response => response.json())
            .then(data => {
                setOrderTypesshow(data);
            })
            .catch(error => {
                console.error('Error fetching order types:', error);
            });

    }, [id]);

    //หน้าร้าน
    const changeInput = (id) => {
        setOpenInput(id);
        setIsEditing(true);
    };

    //แก้ไขราคาบางอัน
    const handleInputChange = (event, smId) => {
        const newValue = event.target.value;
        setSalesmenu((prevMenus) =>
            prevMenus.map((menu) =>
                menu.sm_id === smId ? { ...menu, sm_price: newValue } : menu
            )
        );
    };

    const handleSaveChanges = async () => {
        // สร้าง array ของข้อมูลที่ได้รับการอัปเดตจาก Salesmenu
        const updatedMenu = Salesmenu.map(menu => ({
            sm_id: menu.sm_id,
            price: menu.sm_price
        }));

        console.log(updatedMenu, "updatedMenu");

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/setting/updateprices`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(updatedMenu)
            });

            if (response.ok) {
                console.log('อัปเดตราคาสำเร็จ');
                // สามารถเพิ่ม logic เพื่อรีเฟรชหน้าได้ที่นี่
                // window.location.reload();
            } else {
                console.error('ข้อผิดพลาดในการอัปเดตราคา');
            }
        } catch (error) {
            console.error('ข้อผิดพลาด:', error);
        }

        setOpenInput(0); // ปิด input หลังจากบันทึกแล้ว
    };



    //เดลิ
    const [isEditing1, setIsEditing1] = useState(false);
    const [openInput1, setOpenInput1] = useState(0);
    const changeInput1 = (id) => {
        setOpenInput1(id);
        setIsEditing1(true);
    };

    // const [editingValues, setEditingValues] = useState({});

    //ไม่อยากใช้ load หน้า หาวิธีเข้าไปข้างใน detail
    const handleInputChange1 = (event, smId) => {
        const newValue = event.target.value;
        console.log(newValue, "newValue")
        setSalesmenu((prevMenus) =>
            prevMenus.map((menu) =>
                menu.sm_id === smId ? { ...menu, [`odtd_price${selectedId}`]: newValue } : menu
            )
        );
        // console.log("setSalesmenu1",Salesmenu1)
        console.log("setSalesmenu", Salesmenu)

    };

    const handleSaveChanges1 = async () => {
        if (!selectedId) {
            console.error('No selected ID.');
            return;
        }

        const updatedMenu = Salesmenu.map(menu => {
            // หา pricedeli item ที่ตรงกับ selectedId
            const priceDetail = menu.pricedeli?.find(p => p[`odt_id${selectedId}`] !== undefined);

            return {
                sm_id: menu.sm_id,
                // ใช้ค่า odtd_price${selectedId} จาก menu ถ้ามี, มิฉะนั้นใช้จาก priceDetail
                price: menu?.[`odtd_price${selectedId}`] || (priceDetail ? priceDetail[`odtd_price${selectedId}`] : 0),
                odt_id: selectedId
            };
        });


        // อันไหนไม่แก้แล้วมันเป็น undefine
        // const updatedMenu = Salesmenu1.map(menu => {


        //     return {
        //         sm_id: menu.sm_id,
        //         price: menu?.[`odtd_price${selectedId}`],
        //         odt_id: selectedId
        //     };
        // });


        console.log(updatedMenu, "updatedMenu");

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/setting/updatepricesdeli`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(updatedMenu)
            });

            if (response.ok) {
                console.log('อัปเดตราคาสำเร็จ');
                // Optionally, add logic to refresh the page or update UI
                window.location.reload();
            } else {
                console.error('ข้อผิดพลาดในการอัปเดตราคา');
            }
        } catch (error) {
            console.error('ข้อผิดพลาด:', error);
        }

        setOpenInput1(0); // ปิด input หลังจากบันทึกแล้ว
    };




    const handleCancelEdit = () => {
        setOpenInput(0);
        setAdding(false);
        setIsEditing(false);
        setMessage('');
        setOpenInput1(0);
        setIsEditing1(false);
        // setEditingValues(false);

    };

    const handleAddProduct = () => {
        setAdding(true);
    };


    //add
    const [isOpenAdd, setIsOpen] = useState(false);

    const [selectedName, setSelectedName] = useState(""); // State to store the selected name
    const [priceUpValue, setPriceUpValue] = useState(0);

    const closeModal = () => {
        setIsOpen(false);
        // ลองเพิ่มเติม
        setPriceUpValue(0);
    };

    const openModal = (id, name) => {
        setIsOpen(id);
        setSelectedName(name); // Store the selected name in state

    };


    // const handlePriceUpChange = (event) => {
    //     setPriceUpValue(parseFloat(event.target.value));
    // };

    const handleSubmit = () => {
        const payload = {
            odt_id: selectedId, // หรือ id ที่คุณต้องการส่งไป
            odt_name: selectedName,
            odt_per: Type.find(type => type.id === selectedId)?.per || 0,
            priceup: priceUpValue,
            detail: Salesmenu.map(menu => ({
                sm_id: menu.sm_id,
                sm_price: menu.sm_price
            }))
        };
        // console.log(payload, "payload")

        // ส่ง payload ไปยัง API
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/setting/addordertype`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
                router.reload(); // รีเฟรชหน้า

            })
            .catch((error) => {
                console.error('Error:', error);
            });
        closeModal(); // ปิด Dialog หลังจากส่งข้อมูลเสร็จ
    };

    //edit deli all
    const [isOpenEdit, setIsOpen1] = useState(false);

    const closeModal1 = () => {
        //  for edit
        setIsOpen1(false);
        // ลองเพิ่มเติม
        setPriceUpValue(0);
    };

    const openModal1 = (id, name) => {
        setSelectedName(name); // Store the selected name in state
        //  for edit
        setIsOpen1(id);
    };

    const handleSubmit1 = () => {
        const payload = {
            priceup: priceUpValue,
            detail: Salesmenu.map(menu => {
                // Find the pricedeli item that matches the selectedId
                const priceDetail = menu.pricedeli?.find(p => p[`odt_id${selectedId}`] !== undefined);

                return {
                    sm_id: menu.sm_id,
                    price: priceDetail ? priceDetail[`odtd_price${selectedId}`] : null, // Access the correct odtd_price
                    odt_id: selectedId, // This should be the selected ID for the operation
                };
            })
        };
        console.log(payload, "payload")


        // Send the payload to the API
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/setting/updatepriceswithincrement`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
                router.reload(); // Refresh the page

            })
            .catch((error) => {
                console.error('Error:', error);
            });

        closeModal1(); // Close the modal after submitting

    };

    //edit หน้าร้าน all

    const [isOpenEdit1, setIsOpen2] = useState(false);

    const closeModal2 = () => {
        //  for edit
        setIsOpen2(false);
        // ลองเพิ่มเติม
        setPriceUpValue(0);
    };

    const openModal2 = (id, name) => {
        setSelectedName(name); // Store the selected name in state
        //  for edit
        setIsOpen2(id);
    };

    const handleSubmit2 = () => {
        const payload = {
            priceup: priceUpValue,
            detail: Salesmenu.map(menu => ({
                sm_id: menu.sm_id,
                price: menu.sm_price
            }))
        };
        console.log(payload, "payload")


        // Send the payload to the API
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/setting/updatepricesallup`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
                router.reload(); // Refresh the page

            })
            .catch((error) => {
                console.error('Error:', error);
            });

        closeModal2(); // Close the modal after submitting

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
                                    <td scope="col" className="px-3 py-3 w-64 ">
                                        เมนู
                                    </td>

                                    {Type.map((type) => {
                                        // Check if the current type.id exists in the fetched data
                                        //อาจจะมีเงื่อนไขเพิ่มมาอีก
                                        const matchedOrderType = OrderTypeshow.find(orderType => orderType.odt_id === type.id);
                                        // console.log(matchedOrderType, "matchedOrderType")
                                        return (
                                            <td key={type.id} scope="col" className="">
                                                <Menu as="div" className="relative inline-block text-left">
                                                    <div>
                                                        <MenuButton className="inline-flex w-full justify-center gap-x-1.5 px-3 py-2 ring-inset ring-gray-300 hover:text-[#73664B]">
                                                            {type.name}
                                                            <ChevronDownIcon aria-hidden="true" className="-mr-1 h-5 w-5" />
                                                        </MenuButton>
                                                    </div>
                                                    <MenuItems
                                                        transition
                                                        className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-md ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                                                    >
                                                        <div className="py-1">
                                                            {type.id === 1 ? (
                                                                <>
                                                                    <MenuItem>
                                                                        <div
                                                                            onClick={() => changeInput(type.id)}
                                                                            className="flex flex-row items-center px-4 py-2 text-[#73664B] data-[focus]:bg-[#F5F1E8] data-[focus]:text-[#73664B]"
                                                                        >
                                                                            <PencilSquareIcon className="-mr-1 h-4 w-4 mr-2" />
                                                                            แก้ไขราคาขาย
                                                                        </div>
                                                                    </MenuItem>
                                                                    <MenuItem>
                                                                        <div
                                                                            onClick={() => {
                                                                                openModal2(type.id, type.name);
                                                                                setSelectedId(type.id); // บันทึก id ที่เลือกไว้
                                                                            }}
                                                                            className="flex flex-row items-center px-4 py-2 text-[#73664B] data-[focus]:bg-[#F5F1E8] data-[focus]:text-[#73664B]">
                                                                            <PencilSquareIcon className="-mr-1 h-4 w-4 mr-2" />
                                                                            แก้ไขราคาขายทั้งหมด
                                                                        </div>
                                                                    </MenuItem>
                                                                </>
                                                            ) : (
                                                                <>
                                                                    {matchedOrderType ? (
                                                                        <>
                                                                            <MenuItem>
                                                                                <div
                                                                                    onClick={() => changeInput1(type.id)}
                                                                                    className="flex flex-row items-center px-4 py-2 text-[#73664B] data-[focus]:bg-[#F5F1E8] data-[focus]:text-[#73664B]"
                                                                                >
                                                                                    <PencilSquareIcon className="-mr-1 h-4 w-4 mr-2" />
                                                                                    แก้ไขราคาขาย
                                                                                </div>
                                                                            </MenuItem>
                                                                            <MenuItem>
                                                                                <div
                                                                                    onClick={() => {
                                                                                        openModal1(type.id, type.name);
                                                                                        setSelectedId(type.id); // บันทึก id ที่เลือกไว้
                                                                                    }}
                                                                                    className="flex flex-row items-center px-4 py-2 text-[#73664B] data-[focus]:bg-[#F5F1E8] data-[focus]:text-[#73664B]">
                                                                                    <PencilSquareIcon className="-mr-1 h-4 w-4 mr-2" />
                                                                                    แก้ไขราคาขายทั้งหมด
                                                                                </div>
                                                                            </MenuItem>
                                                                        </>
                                                                    ) : (
                                                                        <>
                                                                            <MenuItem>
                                                                                <div
                                                                                    onClick={() => {
                                                                                        openModal(type.id, type.name);
                                                                                        setSelectedId(type.id); // บันทึก id ที่เลือกไว้
                                                                                    }}
                                                                                    className="flex flex-row items-center px-4 py-2 text-[#73664B] data-[focus]:bg-[#F5F1E8] data-[focus]:text-[#73664B]"
                                                                                >
                                                                                    <CurrencyDollarIcon className="-mr-1 h-4 w-4 mr-2" />
                                                                                    เพิ่มราคาขายทั้งหมด
                                                                                </div>
                                                                            </MenuItem>

                                                                        </>
                                                                    )}
                                                                </>
                                                            )}
                                                        </div>
                                                    </MenuItems>
                                                </Menu>
                                            </td>
                                        );
                                    })}


                                </tr>
                            </thead>
                            <tbody>

                                {Salesmenu.length > 0 ? (
                                    Salesmenu.map((menu, index) => (
                                        <tr key={index} className="border-b">
                                            <td className="px-3 py-1 text-left text-[#73664B] whitespace-nowrap overflow-hidden">
                                                {`${menu.sm_name} (${menu.smt_name})`}
                                            </td>
                                            {Type.map((type) => {
                                                if (type.id === 1) {
                                                    return (
                                                        <td key={type.id} className="px-12 py-1 text-[#73664B]">
                                                            {openInput === type.id ? (
                                                                <input
                                                                    className="w-full h-9 focus:outline-none border text-center"
                                                                    type="text"
                                                                    defaultValue={menu.sm_price}
                                                                    onChange={(event) => handleInputChange(event, menu.sm_id)}
                                                                />
                                                            ) : (
                                                                menu.sm_price || "ไม่มีข้อมูล"
                                                            )}
                                                        </td>
                                                    );

                                                } else {
                                                    const priceInfo = menu.pricedeli && Array.isArray(menu.pricedeli)
                                                        ? menu.pricedeli.find(p => p[`odt_id${type.id}`])
                                                        : null;

                                                    return (
                                                        <td key={type.id} className="px-12 py-1 text-[#73664B]">
                                                            {openInput1 === type.id ? (
                                                                <input
                                                                    className="w-full h-9 focus:outline-none border text-center"
                                                                    type="text"
                                                                    defaultValue={priceInfo?.[`odtd_price${type.id}`] || 0}
                                                                    onChange={(event) => handleInputChange1(event, menu.sm_id)}
                                                                    onFocus={() => setSelectedId(type.id)} // Set the selected ID when input is focused
                                                                />
                                                            ) : (
                                                                priceInfo ? priceInfo[`odtd_price${type.id}`] : "ไม่มีข้อมูล"
                                                            )}
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
                        {/* หน้าร้าน */}
                        {openInput !== 0 && (
                            <div className="mt-4 flex justify-end space-x-2">
                                <button
                                    type="button"
                                    onClick={handleCancelEdit}
                                    className="border px-4 py-1 rounded-xl bg-[#F26161] text-white font-light"
                                >
                                    ยกเลิก
                                </button>
                                <button
                                    type="button"
                                    onClick={() => handleSaveChanges()}
                                    className="border px-4 py-1 rounded-xl bg-[#87DA46] text-white font-light"
                                >
                                    บันทึก
                                </button>
                            </div>
                        )}
                        {/* เดลิ */}
                        {openInput1 !== 0 && (
                            <div className="mt-4 flex justify-end space-x-2">
                                <button
                                    type="button"
                                    onClick={handleCancelEdit}
                                    className="border px-4 py-1 rounded-xl bg-[#F26161] text-white font-light"
                                >
                                    ยกเลิก
                                </button>
                                <button
                                    type="button"
                                    onClick={() => handleSaveChanges1()}
                                    className="border px-4 py-1 rounded-xl bg-[#87DA46] text-white font-light"
                                >
                                    บันทึก
                                </button>
                            </div>
                        )}

                        {isOpenAdd && (
                            <Transition appear show={isOpenAdd} as={Fragment}>
                                <Dialog as="div" className="relative z-10" onClose={closeModal}>
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
                                                        className="text-lg font-medium leading-6 text-[#73664B]"
                                                    >
                                                        เพิ่มราคารายการขายของ {selectedName} {/* Display the selected name */}
                                                    </Dialog.Title>
                                                    <div className="mt-2">
                                                        <p className="text-sm text-[#73664B] ">
                                                            บวกจากราคาปกติทุกเมนู
                                                        </p>
                                                        <input
                                                            type="number"
                                                            name=""
                                                            id="sum"
                                                            placeholder="ราคา"
                                                            value={priceUpValue}
                                                            onChange={(event) => setPriceUpValue(parseFloat(event.target.value))}
                                                            className="px-3 mt-2 focus:outline-none bg-[#FFFFDD] block w-full rounded-t-md border border-b-[#C5B182] py-1.5 text-[#C5B182] shadow-sm  placeholder:text-[#C5B182]   sm:text-sm sm:leading-6"
                                                        />


                                                    </div>
                                                    <div className="flex justify-end mt-2">
                                                        <button
                                                            type="button"
                                                            className="text-[#73664B] inline-flex justify-center rounded-md border border-transparent px-4 py-2 text-sm font-medium hover:bg-[#FFFFDD] focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                                            onClick={closeModal}
                                                        >
                                                            ยกเลิก
                                                        </button>
                                                        <button
                                                            type="button"
                                                            className="text-[#C5B182] inline-flex justify-center rounded-md border border-transparent px-4 py-2 text-sm font-medium hover:bg-[#FFFFDD] focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                                            onClick={handleSubmit}
                                                        >
                                                            ยืนยัน
                                                        </button>
                                                    </div>
                                                </Dialog.Panel>
                                            </Transition.Child>
                                        </div>
                                    </div>
                                </Dialog>
                            </Transition>
                        )}

                        {isOpenEdit && (
                            <Transition appear show={isOpenEdit} as={Fragment}>
                                <Dialog as="div" className="relative z-10" onClose={closeModal1}>
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
                                                        className="text-lg font-medium leading-6 text-[#73664B]"
                                                    >
                                                        แก้ไขราคารายการขายของ {selectedName} {/* Display the selected name */}
                                                    </Dialog.Title>
                                                    <div className="mt-2">
                                                        <p className="text-sm text-[#73664B] ">
                                                            บวกจากราคาเดิมทุกเมนู
                                                        </p>
                                                        <input
                                                            type="number"
                                                            name=""
                                                            id="sum"
                                                            placeholder="ราคา"
                                                            value={priceUpValue}
                                                            onChange={(event) => setPriceUpValue(parseFloat(event.target.value))}
                                                            className="px-3 mt-2 focus:outline-none bg-[#FFFFDD] block w-full rounded-t-md border border-b-[#C5B182] py-1.5 text-[#C5B182] shadow-sm  placeholder:text-[#C5B182]   sm:text-sm sm:leading-6"
                                                        />


                                                    </div>
                                                    <div className="flex justify-end mt-2">
                                                        <button
                                                            type="button"
                                                            className="text-[#73664B] inline-flex justify-center rounded-md border border-transparent px-4 py-2 text-sm font-medium hover:bg-[#FFFFDD] focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                                            onClick={closeModal1}
                                                        >
                                                            ยกเลิก
                                                        </button>
                                                        <button
                                                            type="button"
                                                            className="text-[#C5B182] inline-flex justify-center rounded-md border border-transparent px-4 py-2 text-sm font-medium hover:bg-[#FFFFDD] focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                                            onClick={handleSubmit1}
                                                        >
                                                            ยืนยัน
                                                        </button>
                                                    </div>
                                                </Dialog.Panel>
                                            </Transition.Child>
                                        </div>
                                    </div>
                                </Dialog>
                            </Transition>
                        )}

                        {/* หน้าร้านทุกตัวบวกเพิ่ม */}
                        {isOpenEdit1 && (
                            <Transition appear show={isOpenEdit1} as={Fragment}>
                                <Dialog as="div" className="relative z-10" onClose={closeModal2}>
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
                                                        className="text-lg font-medium leading-6 text-[#73664B]"
                                                    >
                                                        แก้ไขราคารายการขายของ {selectedName} {/* Display the selected name */}
                                                    </Dialog.Title>
                                                    <div className="mt-2">
                                                        <p className="text-sm text-[#73664B] ">
                                                            บวกจากราคาเดิมทุกเมนู
                                                        </p>
                                                        <input
                                                            type="number"
                                                            name=""
                                                            id="sum"
                                                            placeholder="ราคา"
                                                            value={priceUpValue}
                                                            onChange={(event) => setPriceUpValue(parseFloat(event.target.value))}
                                                            className="px-3 mt-2 focus:outline-none bg-[#FFFFDD] block w-full rounded-t-md border border-b-[#C5B182] py-1.5 text-[#C5B182] shadow-sm  placeholder:text-[#C5B182]   sm:text-sm sm:leading-6"
                                                        />


                                                    </div>
                                                    <div className="flex justify-end mt-2">
                                                        <button
                                                            type="button"
                                                            className="text-[#73664B] inline-flex justify-center rounded-md border border-transparent px-4 py-2 text-sm font-medium hover:bg-[#FFFFDD] focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                                            onClick={closeModal2}
                                                        >
                                                            ยกเลิก
                                                        </button>
                                                        <button
                                                            type="button"
                                                            className="text-[#C5B182] inline-flex justify-center rounded-md border border-transparent px-4 py-2 text-sm font-medium hover:bg-[#FFFFDD] focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                                            onClick={handleSubmit2}
                                                        >
                                                            ยืนยัน
                                                        </button>
                                                    </div>
                                                </Dialog.Panel>
                                            </Transition.Child>
                                        </div>
                                    </div>
                                </Dialog>
                            </Transition>
                        )}
                    </div>
                </div>
            </div>
        </div >
    );
}

export default Type;
