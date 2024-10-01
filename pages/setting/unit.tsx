import React, { useEffect, useState } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { Tab } from '@headlessui/react';
import Link from "next/link";
import { CheckboxGroup, Checkbox } from "@nextui-org/react";
import { Accordion, AccordionItem, Button } from "@nextui-org/react";


export default function Unit() {
    // https://std.moc.go.th/std/codelist_detail/69?page=13
    const Unit =
        [{ id: 1, name: "ถุง" },
        { id: 2, name: "แกลลอน" },
        { id: 3, name: "ขวด" },
        { id: 4, name: "แผง" },
        { id: 5, name: "กระป๋อง" },
        { id: 6, name: "กล่อง" },
        { id: 7, name: "ถ้วย" },
        { id: 8, name: "ถัง" },
        { id: 9, name: "แผ่น" },
        { id: 10, name: "ก้อน" },
        { id: 11, name: "มิลลิลิตร" },
        { id: 12, name: "ลิตร" },
        { id: 13, name: "ลูกบาศก์เซนติเมตร" },
        { id: 14, name: "ลูกบาศก์เมตร" },
        { id: 15, name: "ออนซ์" },
        { id: 16, name: "กรัม" },
        { id: 17, name: "กิโลกรัม" },
        { id: 18, name: "ฟอง เบอร์ 0" },
        { id: 16, name: "ฟอง เบอร์ 1" },
        { id: 17, name: "ฟอง เบอร์ 2" },
        { id: 18, name: "ฟอง เบอร์ 3" },
        { id: 19, name: "ฟอง เบอร์ 4" }

        ];

    const UnitPro =
        [{ id: 1, name: "กล่อง" },
        { id: 2, name: "ชิ้น" },
        { id: 3, name: "ถ้วย" },


        ];
    const [selected, setSelected] = React.useState([]);

    // // หาเผื่อจะได้หาทีเดียว
    // const UnitCal =
    //     [{ id: 1, name: "มิลลิลิตร" },
    //     { id: 2, name: "ลิตร" },
    //     { id: 3, name: "ลูกบาศก์เซนติเมตร" },
    //     { id: 4, name: "ลูกบาศก์เมตร" },
    //     { id: 5, name: "ออนซ์" },
    //     { id: 6, name: "กรัม" },
    //     { id: 7, name: "กิโลกรัม" },
    //     { id: 5, name: "ช้อนโต๊ะ" },
    //     { id: 6, name: "ช้อนชา" },
    //     { id: 7, name: "ถ้วยตวง" },
    //     { id: 8, name: "1/4 ถ้วยตวง" },
    //     { id: 9, name: "1/3 ถ้วยตวง" },
    //     { id: 10, name: "1/2 ถ้วยตวง" },
    //     { id: 11, name: "1/4 ช้อนชา" },
    //     { id: 12, name: "1/2 ช้อนชา" }
    //     ];
    // // Conversion factors (you may need to define more conversion factors)
    // const conversionFactors = {
    //     "กรัม": 1,
    //     "กิโลกรัม": 1000,
    //     "มิลลิลิตร": 1, // For liquid
    //     "ลิตร": 1000,
    //     "ลูกบาศก์เซนติเมตร": 1,
    //     "ลูกบาศก์เมตร": 1000000,
    //     "ออนซ์": 30, // 1 ounce = 30 grams
    //     "ช้อนโต๊ะ": 15, // 1 tablespoon = 15 ml for liquid, 15 grams for dry
    //     "ช้อนชา": 5, // 1 teaspoon = 5 ml for liquid, 5 grams for dry
    //     "ถ้วยตวง": 240, // 1 cup = 240 ml for liquid, 240 grams for dry
    //     "ไพน์": 480, // 1 pint = 480 grams (not specifically defined, but used as a rough estimate)
    //     "1/4 ช้อนชา": 1.25,
    //     "1/2 ช้อนชา": 2.5,
    //     "1 ช้อนชา": 5,
    //     "1/4 ถ้วยตวง": 60,
    //     "1/3 ถ้วยตวง": 80,
    //     "1/2 ถ้วยตวง": 120,
    //     "1 ถ้วยตวง": 240
    // };
    // // Function to convert units
    // function convert(value: number, fromUnit: string, toUnit: string): number {
    //     if (!(fromUnit in conversionFactors) || !(toUnit in conversionFactors)) {
    //         throw new Error('Conversion factor for the provided units is not defined.');
    //     }

    //     const fromFactor = conversionFactors[fromUnit];
    //     const toFactor = conversionFactors[toUnit];
    //     return value * (fromFactor / toFactor);
    // }

    // // Example usage
    // const gramsToTeaspoons = convert(5, "กรัม", "ช้อนชา"); // Convert 5 grams to teaspoons
    // console.log(`5 กรัม = ${gramsToTeaspoons} ช้อนชา`);

    // const millilitersToTablespoons = convert(15, "มิลลิลิตร", "ช้อนโต๊ะ"); // Convert 15 ml to tablespoons
    // console.log(`15 มิลลิลิตร = ${millilitersToTablespoons} ช้อนโต๊ะ`);

    // const gramsToCups = convert(240, "กรัม", "ถ้วยตวง"); // Convert 240 grams to cups
    // console.log(`240 กรัม = ${gramsToCups} ถ้วยตวง`);

    const [selectedIngredients, setSelectedIngredients] = React.useState([]);
    const [selectedProducts, setSelectedProducts] = React.useState([]);
    const [unitind, setUnitind] = React.useState([]);
    const [unitpro, setUnitpro] = React.useState([]);


    interface UnitType {
        un_id: string;
        un_name: string;
        // ตัวแปรอื่น ๆ ที่เกี่ยวข้อง
    }
    useEffect(() => {
        // Fetch unit data from the server and set the options
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/ingredient/unit`)
            .then(response => response.json())
            .then(data => {
                setUnitind(data);
            })
            .catch(error => {
                console.error('Error fetching unit data:', error);
            });
    }, []); // Run only once on component mount
    useEffect(() => {
        // Fetch unit data from the server and set the options
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/salesmenu/unit`)
            .then(response => response.json())
            .then(data => {
                setUnitpro(data);
            })
            .catch(error => {
                console.error('Error fetching unit data:', error);
            });
    }, []); // Run only once on component mount

    const handleConfirm = async () => {
        const payload = {
            "1": { detail: selectedIngredients },
        };
        console
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/ingredient/unit`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });

            if (!response.ok) {
                throw new Error('ไม่สามารถเพิ่ม');
            }

            console.log('เพิ่มเรียบร้อยแล้ว!');
        } catch (error) {
            console.error('เกิดข้อผิดพลาด:', error.message);
            // Handle error (e.g., show error message to user)
        }
    };
    const handleConfirmP = async () => {
        const payload = {
            "2": { detail: selectedProducts }
        };
        console
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/ingredient/unit`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });

            if (!response.ok) {
                throw new Error('ไม่สามารถเพิ่ม');
            }

            console.log('เพิ่มเรียบร้อยแล้ว!');
        } catch (error) {
            console.error('เกิดข้อผิดพลาด:', error.message);
            // Handle error (e.g., show error message to user)
        }
    };
    const isUnitDisabled = (unitName) => {
        return unitind.some((u) => u.un_name === unitName);
    };
    const isUnitDisabled1 = (unitName) => {
        return unitpro.some((u) => u.un_name === unitName);
    };
    return (
        <div>
            <p className='text-[#F2B461] font-medium m-4'>ตั้งค่าหน่วยวัตถุดิบ/สินค้า</p>

            <Accordion variant="splitted">
                <AccordionItem key="1" aria-label="หน่วยวัตถุดิบ" title="หน่วยวัตถุดิบ"
                    className="flex flex-col w-full "
                    classNames={{ title: "text-[#5E523C] text-medium" }}
                >
                    <div className="flex flex-col gap-3 mx-1 mb-4">
                        <p className="text-sm text-[#5E523C]">เลือกหน่วยวัตถุดิบที่ต้องการใช้</p>
                        <CheckboxGroup
                            size="md"
                            orientation="horizontal"

                            // label="เลือกหน่วยวัตถุดิบที่ต้องการใช้"
                            color="warning"
                            value={selectedIngredients}
                            onValueChange={setSelectedIngredients}
                            classNames={{
                                base: "w-full "
                            }}
                        >
                            {Unit.map(unit => (
                                <Checkbox key={unit.id} value={unit.name}
                                    isDisabled={isUnitDisabled(unit.name)}
                                >
                                    {unit.name}
                                </Checkbox>
                            ))}
                        </CheckboxGroup>
                        <p className="text-default-500 text-small">หน่วยวัตถุดิบ : {selectedIngredients.join(", ")}</p>
                    </div>
                    <div className="flex justify-end">
                        <Button
                            onClick={handleConfirm}
                            type="button" className="ml-2 text-white bg-[#73664B] focus:outline-none  focus:ring-4 focus:ring-gray-200 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 ">บันทึก</Button>
                    </div>
                </AccordionItem>

                <AccordionItem key="2" aria-label="หน่วยวัตถุดิบ" title="หน่วยสินค้า"
                    className="flex flex-col w-full "
                    classNames={{ title: "text-[#5E523C] text-medium" }}
                >
                    <div className="flex flex-col gap-3 mx-1 mb-4">
                        <p className="text-sm text-[#5E523C]">เลือกหน่วยวัตถุดิบที่ต้องการใช้</p>
                        <CheckboxGroup
                            size="md"
                            orientation="horizontal"

                            // label="เลือกหน่วยวัตถุดิบที่ต้องการใช้"
                            color="warning"
                            value={selectedProducts}
                            onValueChange={setSelectedProducts}
                            classNames={{
                                base: "w-full "
                            }}
                        >
                            {UnitPro.map(unit => (
                                <Checkbox key={unit.id} value={unit.name}
                                isDisabled={isUnitDisabled1(unit.name)}>
                                    {unit.name}
                                </Checkbox>
                            ))}
                        </CheckboxGroup>
                        <p className="text-default-500 text-small">หน่วยวัตถุดิบ : {selectedProducts.join(", ")}</p>
                    </div>
                    <div className="flex justify-end">
                        <Button
                            onClick={handleConfirmP}

                            type="button" className="ml-2 text-white bg-[#73664B] focus:outline-none  focus:ring-4 focus:ring-gray-200 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 ">บันทึก</Button>
                    </div>
                </AccordionItem>

            </Accordion>
        </div>
    )
}
