// import React, { useEffect, useState } from "react";
// import Link from "next/link";
// import { ChevronLeftIcon } from "@heroicons/react/24/outline";



// function Address() {
//     const [provinces, setProvinces] = useState([]);
//     const [amphures, setAmphures] = useState([]);
//     const [tambons, setTambons] = useState([]);
//     const [selected, setSelected] = useState({
//         province_id: undefined,
//         amphure_id: undefined,
//         tambon_id: undefined
//     });

//     useEffect(() => {
//         fetch(
//             "https://raw.githubusercontent.com/kongvut/thai-province-data/master/api_province_with_amphure_tambon.json"
//         )
//             .then((response) => response.json())
//             .then((result) => {
//                 setProvinces(result);
//             });
//     }, []);

//     const DropdownList = ({ label, id, list, child, childsId = [], setChilds = [] }: { label: any, id: any, list: any, child?: any, childsId?: any[], setChilds?: any[] }) => {
//         const onChangeHandle = (event: React.ChangeEvent<HTMLSelectElement>) => {
//             setChilds.forEach((setChild) => setChild([]));
//             const entries = childsId.map((child) => [child, undefined]);
//             const unSelectChilds = Object.fromEntries(entries);

//             const input = event.target.value;
//             const dependId = input ? Number(input) : undefined;
//             setSelected((prev) => ({ ...prev, ...unSelectChilds, [id]: dependId }));

//             if (!input) return;

//             if (child) {
//                 const parent = list.find((item: any) => item.id === dependId);
//                 const { [child]: childs } = parent;
//                 const [setChild] = setChilds;
//                 setChild(childs);
//             }
//         };

//         return (
//             <div className="mb-4">
//                 <label className="block text-sm font-medium text-gray-700">{label}</label>
//                 <select
//                     value={selected[id] || ""}
//                     onChange={onChangeHandle}
//                     className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
//                 >
//                     <option value="" disabled hidden>Select {label.toLowerCase()}</option>
//                     {list.map((item: any) => (
//                         <option key={item.id} value={item.id}>
//                             {item.name_th}
//                         </option>
//                     ))}
//                 </select>
//             </div>
//         );
//     };

//     return (
//         <div className='h-screen'>
//             {/* <button className='my-3 mx-5 '>
//                 <Link href="/ingredients/all" className="text-sm w-full flex justify-center items-center text-[#F2B461] hover:text-[#D9CAA7]">
//                     <ChevronLeftIcon className="h-5 w-5 text-[#F2B461] hover:text-[#D9CAA7]" />
//                     วัตถุดิบทั้งหมด
//                 </Link>
//             </button> */}
//             <p className="text-[#F2B461] font-medium m-4">ที่อยู่ร้านค้า</p>

//             {/* {ind !== null ? ( */}
//             <div className="flex justify-center">
//                 <div className="mt-5 w-1/2 ">
//                     <div className="grid grid-cols-4 items-center ">
//                         <div>
//                             <p className="block text-sm leading-6 text-[#73664B]  mt-3 text-left ">ชื่อที่อยู่ : </p>
//                             <p className="block text-sm leading-6 text-[#73664B]  mt-3 text-left ">ที่อยู่ :</p>
//                             <p className="block text-sm leading-6 text-[#73664B]  mt-3 text-left ">จังหวัด : </p>
//                             <p className="block text-sm leading-6 text-[#73664B]  mt-3 text-left ">อำเภอ : </p>
//                             <p className="block text-sm leading-6 text-[#73664B]  mt-3 text-left ">ตำบล : </p>
//                             <p className="block text-sm leading-6 text-[#73664B]  mt-3 text-left ">รหัสไปรษณีย์ : </p>
//                             <p className="block text-sm leading-6 text-[#73664B]  mt-3 text-left ">เบอร์โทร : </p>

//                         </div>
//                     </div>

//                 </div>
//             </div>

//             <div className="flex justify-center">
//                 <div className="w-1/2  mt-10  flex justify-start " >
//                     <button
//                         type="button"
//                         className="text-white bg-[#C5B182] focus:outline-none focus:ring-4 focus:ring-gray-200 font-medium rounded-full text-sm px-5 py-2.5 mb-2">
//                         ยกเลิก
//                     </button>

//                     <button  type="button" className="ml-3 text-white bg-[#73664B] focus:outline-none focus:ring-4 focus:ring-gray-200 font-medium rounded-full text-sm px-5 py-2.5 mb-2">บันทึก</button>
//                 </div>
//             </div>

//             <div className="App">
//                 <h1>Thailand Province List</h1>
//                 <DropdownList
//                     label="Province"
//                     id="province_id"
//                     list={provinces}
//                     child="amphure"
//                     childsId={["amphure_id", "tambon_id"]}
//                     setChilds={[setAmphures, setTambons]}
//                 />
//                 <DropdownList
//                     label="District"
//                     id="amphure_id"
//                     list={amphures}
//                     child="tambon"
//                     childsId={["tambon_id"]}
//                     setChilds={[setTambons]}
//                 />
//                 <DropdownList label="Sub-district" id="tambon_id" list={tambons} />
//                 <pre>{JSON.stringify(selected, null, 4)}</pre>
//             </div>

//         </div>


//     );
// }

// export default Address;


// แก้ไขกับจัวหวัดอำเภอไม่ขึ้น
// import React, { useEffect, useState } from "react";
// import { useRouter } from 'next/router';
// import Link from "next/link";
// import { ChevronLeftIcon } from "@heroicons/react/24/outline";

// function Address() {
//     const [provinces, setProvinces] = useState([]);
//     const [amphures, setAmphures] = useState([]);
//     const [tambons, setTambons] = useState([]);
//     const [selected, setSelected] = useState({
//         province_id: undefined,
//         amphure_id: undefined,
//         tambon_id: undefined
//     });
//     const [address, setAddress] = useState(null);
//     const [isEditing, setIsEditing] = useState(false);
//     const [formData, setFormData] = useState({
//         sh_name: "",
//         sh_address: "",
//         sh_tel: "",
//         sh_province: "",
//         sh_district: "",
//         sh_ampher: "",
//         sh_zipcode: ""
//     });

//     useEffect(() => {
//         fetch(
//             "https://raw.githubusercontent.com/kongvut/thai-province-data/master/api_province_with_amphure_tambon.json"
//         )
//             .then((response) => response.json())
//             .then((result) => {
//                 setProvinces(result);
//             });
//     }, []);

//     useEffect(() => {
//         fetch(`${process.env.NEXT_PUBLIC_API_URL}/setting/address`)
//             .then((response) => response.json())
//             .then((data) => {
//                 setAddress(data.length > 0 ? data[0] : null);
//                 if (data.length > 0) {
//                     setFormData({
//                         sh_name: data[0].sh_name,
//                         sh_address: data[0].sh_address,
//                         sh_tel: data[0].sh_tel,
//                         sh_province: data[0].sh_province,
//                         sh_district: data[0].sh_district,
//                         sh_ampher: data[0].sh_ampher,
//                         sh_zipcode: data[0].sh_zipcode
//                     });
//                 }
//             })
//             .catch((error) => console.error('Error fetching address:', error));
//     }, []);

//     const DropdownList = ({ label, id, list, child, childsId = [], setChilds = [] }) => {
//         const onChangeHandle = (event) => {
//             setChilds.forEach((setChild) => setChild([]));
//             const entries = childsId.map((child) => [child, undefined]);
//             const unSelectChilds = Object.fromEntries(entries);

//             const input = event.target.value;
//             const dependId = input ? Number(input) : undefined;
//             setSelected((prev) => ({ ...prev, ...unSelectChilds, [id]: dependId }));

//             setFormData((prev) => ({ ...prev, [id]: dependId }));

//             if (!input) return;

//             if (child) {
//                 const parent = list.find((item) => item.id === dependId);
//                 const { [child]: childs } = parent;
//                 const [setChild] = setChilds;
//                 setChild(childs);
//             }
//         };

//         return (
//             <div className="mb-4">
//                 <label className="block text-sm font-medium text-gray-700">{label}</label>
//                 <select
//                     value={selected[id] || ""}
//                     onChange={onChangeHandle}
//                     className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
//                 >
//                     <option value="" disabled hidden>Select {label.toLowerCase()}</option>
//                     {list.map((item) => (
//                         <option key={item.id} value={item.id}>
//                             {item.name_th}
//                         </option>
//                     ))}
//                 </select>
//             </div>
//         );
//     };

//     const handleInputChange = (e) => {
//         const { name, value } = e.target;
//         setFormData((prev) => ({ ...prev, [name]: value }));
//     };

//     const [message, setMessage] = useState('Loading');
//     const router = useRouter();

//     const handleAdd = async () => {
//         try {
//             const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/setting/addaddreess`, {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json'
//                 },
//                 body: JSON.stringify(formData)
//             });

//             const responseData = await response.json();

//             if (response.ok && responseData.message === 'success') {
//                 setMessage('Data added successfully');
//                 setAddress(responseData.data);
//                 setIsEditing(false);
//                 router.push('/setting/address');
//             } else {
//                 setMessage(responseData.message || 'Error occurred');
//             }
//         } catch (error) {
//             console.error('Error adding address:', error);
//             setMessage('Failed to fetch');
//         }
//     };

//     const handleEdit = async () => {
//         try {
//             const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/address/update`, {
//                 method: 'PUT',
//                 headers: {
//                     'Content-Type': 'application/json'
//                 },
//                 body: JSON.stringify(formData)
//             });

//             const responseData = await response.json();

//             if (response.ok && responseData.message === 'success') {
//                 setMessage('Data updated successfully');
//                 setAddress(responseData.data);
//                 setIsEditing(false);
//                 router.push('/setting/address');
//             } else {
//                 setMessage(responseData.message || 'Error occurred');
//             }
//         } catch (error) {
//             console.error('Error editing address:', error);
//             setMessage('Failed to fetch');
//         }
//     };


//     const getProvinceName = (id) => {
//         const province = provinces.find(p => p.id === id);
//         return province ? province.name_th : 'ยังไม่มีข้อมูล';
//     };

//     const getAmphureName = (id) => {
//         const amphure = amphures.find(a => a.id === id);
//         return amphure ? amphure.name_th : 'ยังไม่มีข้อมูล';
//     };

//     const getTambonName = (id) => {
//         const tambon = tambons.find(t => t.id === id);
//         return tambon ? tambon.name_th : 'ยังไม่มีข้อมูล';
//     };

//     return (
//         <div className='h-screen'>
//             <p className="text-[#F2B461] font-medium m-4">ที่อยู่ร้านค้า</p>

//             <div className="flex justify-center">
//                 <div className="mt-5 w-1/2">
//                     {isEditing ? (
//                         <div>
//                             <input
//                                 type="text"
//                                 name="sh_name"
//                                 placeholder="ชื่อที่อยู่"
//                                 value={formData.sh_name}
//                                 onChange={handleInputChange}
//                                 className="block text-sm leading-6 text-[#73664B] mt-3 text-left w-full border rounded-md p-2"
//                             />
//                             <input
//                                 type="text"
//                                 name="sh_address"
//                                 placeholder="ที่อยู่"
//                                 value={formData.sh_address}
//                                 onChange={handleInputChange}
//                                 className="block text-sm leading-6 text-[#73664B] mt-3 text-left w-full border rounded-md p-2"
//                             />
//                             <DropdownList
//                                 label="จังหวัด"
//                                 id="sh_province"
//                                 list={provinces}
//                                 child="amphure"
//                                 childsId={["sh_district", "sh_ampher"]}
//                                 setChilds={[setAmphures, setTambons]}
//                             />
//                             <DropdownList
//                                 label="อำเภอ"
//                                 id="sh_district"
//                                 list={amphures}
//                                 child="tambon"
//                                 childsId={["sh_ampher"]}
//                                 setChilds={[setTambons]}
//                             />
//                             <DropdownList
//                                 label="ตำบล"
//                                 id="sh_ampher"
//                                 list={tambons}
//                             />
//                             <input
//                                 type="text"
//                                 name="sh_zipcode"
//                                 placeholder="รหัสไปรษณีย์"
//                                 value={formData.sh_zipcode}
//                                 onChange={handleInputChange}
//                                 className="block text-sm leading-6 text-[#73664B] mt-3 text-left w-full border rounded-md p-2"
//                             />
//                             <input
//                                 type="text"
//                                 name="sh_tel"
//                                 placeholder="เบอร์โทร"
//                                 value={formData.sh_tel}
//                                 onChange={handleInputChange}
//                                 className="block text-sm leading-6 text-[#73664B] mt-3 text-left w-full border rounded-md p-2"
//                             />
//                         </div>
//                     ) : (
//                         <div>
//                             <p className="block text-sm leading-6 text-[#73664B] mt-3 text-left">ชื่อที่อยู่: {address ? address.sh_name : 'ยังไม่มีข้อมูล'}</p>
//                             <p className="block text-sm leading-6 text-[#73664B] mt-3 text-left">ที่อยู่: {address ? address.sh_address : 'ยังไม่มีข้อมูล'}</p>
//                            <p className="block text-sm leading-6 text-[#73664B] mt-3 text-left">จังหวัด: {address ? getProvinceName(address.sh_province) : 'ยังไม่มีข้อมูล'}</p>
//                             <p className="block text-sm leading-6 text-[#73664B] mt-3 text-left">อำเภอ: {address ? getAmphureName(address.sh_district) : 'ยังไม่มีข้อมูล'}</p>
//                             <p className="block text-sm leading-6 text-[#73664B] mt-3 text-left">ตำบล: {address ? getTambonName(address.sh_ampher) : 'ยังไม่มีข้อมูล'}</p>
//                             <p className="block text-sm leading-6 text-[#73664B] mt-3 text-left">รหัสไปรษณีย์: {address ? address.sh_zipcode : 'ยังไม่มีข้อมูล'}</p>
//                             <p className="block text-sm leading-6 text-[#73664B] mt-3 text-left">เบอร์โทร: {address ? address.sh_tel : 'ยังไม่มีข้อมูล'}</p>
//                         </div>
//                     )}
//                 </div>
//             </div>

//             <div className="flex justify-center">
//                 <div className="w-1/2 mt-10 flex justify-start">
//                     {isEditing ? (
//                         <>
//                             <button
//                                 type="button"
//                                 className="text-white bg-[#73664B] focus:outline-none focus:ring-4 focus:ring-gray-200 font-medium rounded-full text-sm px-5 py-2.5 mb-2"
//                                 onClick={address ? handleEdit : handleAdd}
//                             >
//                                 บันทึก
//                             </button>
//                             <button
//                                 type="button"
//                                 className="ml-3 text-white bg-[#C5B182] focus:outline-none focus:ring-4 focus:ring-gray-200 font-medium rounded-full text-sm px-5 py-2.5 mb-2"
//                                 onClick={() => setIsEditing(false)}
//                             >
//                                 ยกเลิก
//                             </button>
//                         </>
//                     ) : (
//                         <button
//                             type="button"
//                             className="text-white bg-[#C5B182] focus:outline-none focus:ring-4 focus:ring-gray-200 font-medium rounded-full text-sm px-5 py-2.5 mb-2"
//                             onClick={() => setIsEditing(true)}
//                         >
//                             {address ? 'แก้ไขที่อยู่' : 'เพิ่มที่อยู่'}
//                         </button>
//                     )}
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default Address;

import React, { useEffect, useState } from "react";
import { useRouter } from 'next/router';
import Link from "next/link";
import { ChevronLeftIcon } from "@heroicons/react/24/outline";

function Address() {
    const [provinces, setProvinces] = useState([]);
    const [amphures, setAmphures] = useState([]);
    const [tambons, setTambons] = useState([]);
    const [selected, setSelected] = useState({
        province_id: undefined,
        amphure_id: undefined,
        tambon_id: undefined
    });
    const [address, setAddress] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        sh_name: "",
        sh_address: "",
        sh_tel: "",
        sh_province: "",
        sh_district: "",
        sh_ampher: "",
        sh_zipcode: ""
    });

    useEffect(() => {
        fetch(
            "https://raw.githubusercontent.com/kongvut/thai-province-data/master/api_province_with_amphure_tambon.json"
        )
            .then((response) => response.json())
            .then((result) => {
                setProvinces(result);
            });
    }, []);

    useEffect(() => {
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/setting/address`)
            .then((response) => response.json())
            .then((data) => {
                setAddress(data.length > 0 ? data[0] : null);
                if (data.length > 0) {
                    setFormData({
                        sh_name: data[0].sh_name,
                        sh_address: data[0].sh_address,
                        sh_tel: data[0].sh_tel,
                        sh_province: data[0].sh_province,
                        sh_district: data[0].sh_district,
                        sh_ampher: data[0].sh_ampher,
                        sh_zipcode: data[0].sh_zipcode
                    });
                }
            })
            .catch((error) => console.error('Error fetching address:', error));
    }, []);

    const DropdownList = ({ label, id, list, child, childsId = [], setChilds = [] }) => {
        const onChangeHandle = (event) => {
            setChilds.forEach((setChild) => setChild([]));
            const entries = childsId.map((child) => [child, undefined]);
            const unSelectChilds = Object.fromEntries(entries);

            const input = event.target.value;
            const dependId = input ? Number(input) : undefined;
            setSelected((prev) => ({ ...prev, ...unSelectChilds, [id]: dependId }));

            setFormData((prev) => ({ ...prev, [id]: dependId }));

            if (!input) return;

            if (child) {
                const parent = list.find((item) => item.id === dependId);
                const { [child]: childs } = parent;
                const [setChild] = setChilds;
                setChild(childs);
            }
        };

        return (
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">{label}</label>
                <select
                    value={selected[id] || ""}
                    onChange={onChangeHandle}
                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                >
                    <option value="" disabled hidden>Select {label.toLowerCase()}</option>
                    {list.map((item) => (
                        <option key={item.id} value={item.id}>
                            {item.name_th}
                        </option>
                    ))}
                </select>
            </div>
        );
    };


    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const [message, setMessage] = useState('Loading');
    const router = useRouter();

    const handleAdd = async () => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/setting/addaddreess`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            const responseData = await response.json();

            if (response.ok && responseData.message === 'success') {
                setMessage('Data added successfully');
                setAddress(responseData.data);
                setIsEditing(false);
                router.push('/setting/address');
            } else {
                setMessage(responseData.message || 'Error occurred');
            }
        } catch (error) {
            console.error('Error adding address:', error);
            setMessage('Failed to fetch');
        }
    };

    const handleEdit = async () => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/address/update`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            const responseData = await response.json();

            if (response.ok && responseData.message === 'success') {
                setMessage('Data updated successfully');
                setAddress(responseData.data);
                setIsEditing(false);
                router.push('/setting/address');
            } else {
                setMessage(responseData.message || 'Error occurred');
            }
        } catch (error) {
            console.error('Error editing address:', error);
            setMessage('Failed to fetch');
        }
    };

    const findNameById = (list, id) => {
        const item = list.find((element) => element.id === id);
        // console.log(list,id,item)
        return item ? item.name_th : 'ไม่พบข้อมูล';
    };

    const findAmphureName = (provinceId, amphureId) => {
        const province = provinces.find(prov => prov.id === provinceId);
        if (province) {
            const amphure = province.amphure.find(amp => amp.id === amphureId);
            return amphure ? amphure.name_th : 'ไม่พบข้อมูล';
        }
        return 'ไม่พบข้อมูล';
    };

    const findTambonName = (provinceId, amphureId, tambonId) => {
        const province = provinces.find(prov => prov.id === provinceId);
        if (province) {
            const amphure = province.amphure.find(amp => amp.id === amphureId);
            if (amphure) {
                const tambon = amphure.tambon.find(tam => tam.id === tambonId);
                return tambon ? tambon.name_th : 'ไม่พบข้อมูล';
            }
        }
        return 'ไม่พบข้อมูล';
    };

    return (
        <div className='h-screen'>
            <p className="text-[#F2B461] font-medium m-4">ที่อยู่ร้านค้า</p>

            <div className="flex justify-center">
                <div className="mt-5 w-1/2">
                    {isEditing ? (
                        <div>
                            {/* <label className="block text-sm leading-6 text-[#73664B] mt-3 text-left">ชื่อที่อยู่:</label> */}
                            <input
                                type="text"
                                name="sh_name"
                                placeholder="ชื่อที่อยู่"
                                value={formData.sh_name}
                                onChange={handleInputChange}
                                className="block text-sm leading-6 text-[#73664B] mt-3 text-left w-full border rounded-md p-2"
                            />
                            <input
                                type="text"
                                name="sh_address"
                                placeholder="ที่อยู่"
                                value={formData.sh_address}
                                onChange={handleInputChange}
                                className="block text-sm leading-6 text-[#73664B] mt-3 text-left w-full border rounded-md p-2"
                            />
                            <DropdownList
                                label="จังหวัด"
                                id="sh_province"
                                list={provinces}
                                child="amphure"
                                childsId={["sh_district", "sh_ampher"]}
                                setChilds={[setAmphures, setTambons]}
                            // label="จังหวัด"
                            // id="sh_province"
                            // list={provinces}
                            // selected={formData}
                            // onChangeHandle={handleInputChange}
                            // isEditing={isEditing}
                            // address={address}
                            // provinces={provinces}
                            />
                            <DropdownList
                                label="อำเภอ"
                                id="sh_district"
                                list={amphures}
                                child="tambon"
                                childsId={["sh_ampher"]}
                                setChilds={[setTambons]}
                            />
                            <DropdownList
                                label="ตำบล"
                                id="sh_ampher"
                                list={tambons}
                            />
                            <input
                                type="text"
                                name="sh_zipcode"
                                placeholder="รหัสไปรษณีย์"
                                value={formData.sh_zipcode}
                                onChange={handleInputChange}
                                className="block text-sm leading-6 text-[#73664B] mt-3 text-left w-full border rounded-md p-2"
                            />
                            <input
                                type="text"
                                name="sh_tel"
                                placeholder="เบอร์โทร"
                                value={formData.sh_tel}
                                onChange={handleInputChange}
                                className="block text-sm leading-6 text-[#73664B] mt-3 text-left w-full border rounded-md p-2"
                            />
                        </div>
                    ) : (
                        <div>
                            <p className="block text-sm leading-6 text-[#73664B] mt-3 text-left">ชื่อที่อยู่: {address ? address.sh_name : 'ยังไม่มีข้อมูล'}</p>
                            <p className="block text-sm leading-6 text-[#73664B] mt-3 text-left">ที่อยู่: {address ? address.sh_address : 'ยังไม่มีข้อมูล'}</p>
                            <p className="block text-sm leading-6 text-[#73664B] mt-3 text-left">จังหวัด: {address ? findNameById(provinces, Number(address.sh_province)) : 'ยังไม่มีข้อมูล'}</p>
                            <p className="block text-sm leading-6 text-[#73664B] mt-3 text-left">อำเภอ: {address ? findAmphureName(Number(address.sh_province), Number(address.sh_district)) : 'ยังไม่มีข้อมูล'}</p>
                            <p className="block text-sm leading-6 text-[#73664B] mt-3 text-left">ตำบล: {address ? findTambonName(Number(address.sh_province), Number(address.sh_district), Number(address.sh_ampher)) : 'ยังไม่มีข้อมูล'}</p>
                            <p className="block text-sm leading-6 text-[#73664B] mt-3 text-left">รหัสไปรษณีย์: {address ? address.sh_zipcode : 'ยังไม่มีข้อมูล'}</p>
                            <p className="block text-sm leading-6 text-[#73664B] mt-3 text-left">เบอร์โทร: {address ? address.sh_tel : 'ยังไม่มีข้อมูล'}</p>
                        </div>
                    )}
                </div>
            </div>

            <div className="flex justify-center">
                {/* <div className="w-1/2 mt-10 flex justify-start"> */}
                {isEditing ? (
                    <>
                        <div className="w-1/2 mt-10 flex justify-start">
                            <button
                                type="button"
                                className="text-white bg-[#73664B] focus:outline-none focus:ring-4 focus:ring-gray-200 font-medium rounded-full text-sm px-5 py-2.5 mb-2"
                                onClick={address ? handleEdit : handleAdd}
                            >
                                บันทึก
                            </button>
                            <button
                                type="button"
                                className="ml-3 text-white bg-[#C5B182] focus:outline-none focus:ring-4 focus:ring-gray-200 font-medium rounded-full text-sm px-5 py-2.5 mb-2"
                                onClick={() => setIsEditing(false)}
                            >
                                ยกเลิก
                            </button>
                        </div>
                    </>
                ) : (
                    <div className="w-1/2 mt-10 flex justify-center">

                        <button
                            type="button"
                            className="text-white bg-[#C5B182] focus:outline-none focus:ring-4 focus:ring-gray-200 font-medium rounded-full text-sm px-5 py-2.5 mb-2"
                            onClick={() => setIsEditing(true)}
                        >
                            {address ? 'แก้ไขที่อยู่' : 'เพิ่มที่อยู่'}
                        </button>
                    </div>

                )}
                {/* </div> */}
            </div>
        </div>
    );
}

export default Address;
