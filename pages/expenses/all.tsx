
// select มีปห
// import React, { useEffect, useState } from "react";
// import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
// import { Select, SelectItem } from "@nextui-org/react";

// //ยังไม่ใส่ปุ่ม select ค่ะคุณน้า
// function classNames(...classes) {
//     return classes.filter(Boolean).join(' ');
// }

// interface Staff {
//     ep_id: number;
//     ep_date: string;
//     ept_name: string;
//     ep_note: string;
//     ep_sum_formatted: string;
//     st_name: string;
// }

// interface Ingredients {
//     ept_id: string;
//     ept_name: string;
// }

// function StaffIndex() {
//     const [staff, setStaff] = useState<Staff[]>([]);
//     const [loading, setLoading] = useState(true);
//     const [searchTerm, setSearchTerm] = useState("");
//     const [error, setError] = useState<string | null>(null);

//     useEffect(() => {
//         fetch(`${process.env.NEXT_PUBLIC_API_URL}/expenses/readall`, {
//             credentials: 'include' // Ensure cookies are sent with the request
//         })
//             .then(response => {
//                 if (!response.ok) {
//                     throw new Error(`Network response was not ok: ${response.status} ${response.statusText}`);
//                 }
//                 return response.json();
//             })
//             .then(data => {
//                 setStaff(data);
//                 setLoading(false);
//             })
//             .catch(error => {
//                 console.error('Error:', error);
//                 setError(`Failed to load data: ${error.message}`);
//                 setLoading(false);
//             });
//     }, []);


//     const [ingredientsOptions, setIngredientsOptions] = useState<Ingredients[]>([]);
//     const [selectedKeys, setSelectedKeys] = useState<Set<string>>(new Set());

//     useEffect(() => {
//         // Fetch unit data from the server and set the options
//         fetch(`${process.env.NEXT_PUBLIC_API_URL}/expenses/readtype`)
//           .then(response => response.json())
//           .then(data => {
//             setIngredientsOptions(data);
//           })
//           .catch(error => {
//             console.error('Error fetching unit data:', error);
//           });
//       }, []);


//     // Function to get selected names based on selected keys
//     const getSelectedNames = () => {
//         return Array.from(selectedKeys).map(key => {
//             const ingredient = ingredientsOptions.find(item => item.ept_id === key);
//             return ingredient ? ingredient.ept_name : '';
//         }).join(", ");
//     };

//     return (
//         <div className="h-screen bg-white">
//             <p className="text-[#F2B461] font-medium m-4">รายการจ่ายทั้งหมด</p>
//             <form className="flex items-center transform scale-75" onSubmit={(e) => e.preventDefault()}>
//                 <div className="relative w-1/2">
//                     <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
//                         <MagnifyingGlassIcon className="h-6 w-6 text-[#C5B182]" />
//                     </div>
//                     <input
//                         type="text"
//                         id="simple-search"
//                         className="bg-[#FFFFF8] border border-[#C5B182] block w-full ps-10 p-2.5 rounded-full placeholder:text-[#C5B182] focus:outline-none"
//                         placeholder="ค้นหา"
//                         value={searchTerm}
//                         onChange={(e) => setSearchTerm(e.target.value)}
//                     />
//                 </div>
//                 <button type="submit" className="p-2 ms-2 text-sm rounded-full text-white bg-[#C5B182] border hover:bg-[#5E523C]">
//                     ค้นหา
//                     <span className="sr-only">Search</span>
//                 </button>
//             </form>

//             <div className="flex w-full max-w-xs flex-col gap-2">
//                 <div className="flex items-center gap-2">
//                     <Select
//                         // label="Favorite Animal"
//                         selectionMode="multiple"
//                         placeholder="Select an animal"
//                         selectedKeys={selectedKeys}
//                         className="max-w-xs"
//                         onSelectionChange={(keys) => {
//                             const stringKeys = new Set(Array.from(keys).map(String));
//                             setSelectedKeys(stringKeys);
//                         }}
//                     >
//                         {ingredientsOptions.map((ingredient) => (
//                             <SelectItem key={ingredient.ept_id} value={ingredient.ept_id}>
//                                 {ingredient.ept_name}
//                             </SelectItem>
//                         ))}
//                     </Select>
//                     <div className="text-small text-default-500">
//                         Selected: {getSelectedNames()}
//                     </div>
//                 </div>
//             </div>

//             <div className="mt-2 p-4">
//                 <div className="relative overflow-x-auto">
//                     {loading && <p className="text-center py-3">Loading...</p>}
//                     {error && <p className="text-center py-3 text-red-500">{error}</p>}
//                     {!loading && !error && staff.length === 0 && (
//                         <p className="text-center py-3">No staff found</p>
//                     )}
//                     {!loading && !error && (
//                         <table className="w-full text-sm text-center text-gray-500">
//                             <thead>
//                                 <tr className="text-white font-normal bg-[#908362]">
//                                     <th scope="col" className="px-6 py-3">วัน/เดือน/ปี</th>
//                                     <th scope="col" className="px-6 py-3">ประเภทรายการจ่าย</th>
//                                     <th scope="col" className="px-6 py-3">รายละเอียด</th>
//                                     <th scope="col" className="px-6 py-3">จำนวนเงิน</th>
//                                     <th scope="col" className="px-6 py-3">พนักงาน</th>
//                                 </tr>
//                             </thead>
//                             <tbody>
//                                 {staff.map((staffItem, idx) => (
//                                     <tr key={staffItem.ep_id} className={classNames(idx % 2 === 0 ? 'bg-[#F5F1E8]' : 'bg-white', 'border-b h-10', 'text-[#73664B]')}>
//                                         <td scope="row" className="px-6 py-1">
//                                             {staffItem.ep_date}
//                                         </td>
//                                         <td className="px-6 py-1">
//                                             {staffItem.ept_name}
//                                         </td>
//                                         <td className="px-6 py-1">
//                                             {staffItem.ep_note}
//                                         </td>
//                                         <td className="px-6 py-1">
//                                             {staffItem.ep_sum_formatted}
//                                         </td>
//                                         <td className="px-6 py-1">
//                                             {staffItem.st_name}
//                                         </td>
//                                     </tr>
//                                 ))}
//                             </tbody>
//                         </table>
//                     )}
//                 </div>
//             </div>

//         </div>
//     );
// }

// export default StaffIndex;

import React, { useEffect, useState } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { Select, SelectItem, colors } from "@nextui-org/react";

function classNames(...classes) {
    return classes.filter(Boolean).join(' ');
}

interface Staff {
    ep_id: number;
    ep_date: string;
    ept_name: string;
    ep_note: string;
    ep_sum_formatted: string;
    st_name: string;
}

interface Ingredients {
    ept_id: string;
    ept_name: string;
}

function StaffIndex() {
    const [staff, setStaff] = useState<Staff[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [ingredientsOptions, setIngredientsOptions] = useState<Ingredients[]>([]);
    const [selectedKeys, setSelectedKeys] = useState<Set<string>>(new Set());

    useEffect(() => {
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/expenses/readall`, {
            credentials: 'include' // Ensure cookies are sent with the request
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Network response was not ok: ${response.status} ${response.statusText}`);
                }
                return response.json();
            })
            .then(data => {
                setStaff(data);
                setLoading(false);

                // Extract unique ingredient options from the staff data
                const uniqueIngredients: Ingredients[] = Array.from(new Set(data.map((item: Staff) => item.ept_name))).map(name => ({
                    ept_id: name as string,
                    ept_name: name as string
                }));
                setIngredientsOptions(uniqueIngredients);
            })
            .catch(error => {
                console.error('Error:', error);
                setError(`Failed to load data: ${error.message}`);
                setLoading(false);
            });
    }, []);

    const getSelectedNames = () => {
        return Array.from(selectedKeys).join(", ");
    };

    const filteredStaff = staff.filter(staffItem =>
        selectedKeys.size === 0 || selectedKeys.has(staffItem.ept_name)
    );

    return (
        <div className="h-screen bg-white">
            <p className="text-[#F2B461] font-medium m-4">รายการจ่ายทั้งหมด</p>
            

            {/* <div className="flex w-full max-w-xs flex-col gap-2">
                <div className="flex items-center gap-2">
                    <Select
                        selectionMode="multiple"
                        placeholder="Select an ingredient"
                        selectedKeys={selectedKeys}
                        className="max-w-xs custom-select"
                        onSelectionChange={(keys) => {
                            const stringKeys = new Set(Array.from(keys).map(String));
                            setSelectedKeys(stringKeys);
                        }}
                    >
                        {ingredientsOptions.map((ingredient) => (
                            <SelectItem key={ingredient.ept_id} value={ingredient.ept_id}>
                                {ingredient.ept_name}
                            </SelectItem>
                        ))}
                    </Select>

                    <div className="text-small text-default-500">
                        Selected: {getSelectedNames()}
                    </div>
                </div>
            </div> */}
            <div className="flex items-center mt-2 pl-4 gap-2">
                <div className="flex-none w-1/3">
                    <Select
                        selectionMode="multiple"
                        placeholder="เลือกประเภทรายการจ่าย"
                        selectedKeys={selectedKeys}
                        onSelectionChange={(keys) => {
                            const stringKeys = new Set(Array.from(keys).map(String));
                            setSelectedKeys(stringKeys);
                        }}
                        style={{
                            maxWidth: '25rem', /* Adjust the width as needed */
                            backgroundColor: '#E3D8BF', /* Light yellow background */
                            borderRadius: '0.375rem', /* Rounded corners */
                            boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)', /* Subtle shadow */
                            color: '#73664B', /* Text color */
                            height: '2rem', /* Reduce height */
                            padding: '0.25rem 0.5rem' /* Reduce padding */
                        }}
                    >
                        {ingredientsOptions.map((ingredient) => (
                            <SelectItem key={ingredient.ept_id} value={ingredient.ept_id}>
                                {ingredient.ept_name}
                            </SelectItem>
                        ))}
                    </Select>
                </div>
                <div className="flex-grow text-sm text-[#73664B]">
                    ประเภทรายการจ่ายที่เลือก : {getSelectedNames()}
                </div>
            </div>



            <div className="mt-2 p-4">
                <div className="relative overflow-x-auto">
                    {/* สร้างการตรวจสอบเงื่อนไขว่ากำลังโหลดหรือมีข้อผิดพลาดหรือไม่ */}
                    {!loading && !error && (
                        <table className="min-w-full table-auto text-sm text-center text-gray-500">
                            <thead>
                                <tr className="text-white font-normal bg-[#908362]">
                                    <td scope="col" className="px-6 py-3 whitespace-nowrap">วัน/เดือน/ปี</td>
                                    <td scope="col" className="px-6 py-3 whitespace-nowrap">ประเภทรายการจ่าย</td>
                                    <td scope="col" className="px-6 py-3 whitespace-nowrap">รายละเอียด</td>
                                    <td scope="col" className="px-6 py-3 whitespace-nowrap">จำนวนเงิน</td>
                                    <td scope="col" className="px-6 py-3 whitespace-nowrap">พนักงาน</td>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredStaff.map((staffItem, idx) => (
                                    <tr key={staffItem.ep_id} className={classNames(idx % 2 === 0 ? 'bg-[#F5F1E8]' : 'bg-white', 'border-b h-10', 'text-[#73664B]')}>
                                        <td scope="row" className=" py-1">
                                            {staffItem.ep_date}
                                        </td>
                                        <td className="py-1">
                                            {staffItem.ept_name}
                                        </td>
                                        <td className="py-1">
                                            {staffItem.ep_note}
                                        </td>
                                        <td className="py-1">
                                            {staffItem.ep_sum_formatted}
                                        </td>
                                        <td className="py-1">
                                            {staffItem.st_name}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                    {loading && <p className="text-center text-sm text-[#73664B] py-3">Loading...</p>}
                    {error && <p className="text-center text-sm py-3 text-red-500">{error}</p>}
                    {!loading && !error && filteredStaff.length === 0 && (
                        <p className="text-center text-sm text-[#73664B] py-3">ไม่มีรายการจ่าย</p>
                    )}
                </div>
            </div>


        </div>
    );
}

export default StaffIndex;