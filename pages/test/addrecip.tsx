import React, { useState } from 'react';

const conversionFactors = {
    "กรัม": 1,
    "กิโลกรัม": 1000,
    "มิลลิลิตร": 1,
    "ลิตร": 1000,
    "ลูกบาศก์เซนติเมตร": 1,
    "ลูกบาศก์เมตร": 1000000,
    "ออนซ์": 30,
    "ช้อนโต๊ะ": 15,
    "ช้อนชา": 5,
    "ถ้วยตวง": 240,
    "1/4 ช้อนชา": 1.25,
    "1/2 ช้อนชา": 2.5,
    "1/4 ถ้วยตวง": 60,
    "1/3 ถ้วยตวง": 80,
    "1/2 ถ้วยตวง": 120,
    "1 ถ้วยตวง": 240
};

function convert(value, fromUnit, toUnit) {
    if (!(fromUnit in conversionFactors) || !(toUnit in conversionFactors)) {
        throw new Error('Conversion factor for the provided units is not defined.');
    }

    const fromFactor = conversionFactors[fromUnit];
    const toFactor = conversionFactors[toUnit];
    return value * (fromFactor / toFactor);
}

const UnitConversion = () => {
    const UnitDetail = [
        { id: 1, name: "กรัม" },
        { id: 2, name: "กิโลกรัม" },
        { id: 3, name: "มิลลิลิตร" },
        { id: 4, name: "ลิตร" },
        { id: 5, name: "ออนซ์" },
        { id: 6, name: "ช้อนโต๊ะ" },
        { id: 7, name: "ช้อนชา" },
        { id: 8, name: "ถ้วยตวง" }
    ];

    const [quantity, setQuantity] = useState(0);
    const [fromUnit, setFromUnit] = useState(UnitDetail[0].name);
    const [toUnit, setToUnit] = useState(UnitDetail[1].name);
    const [result, setResult] = useState(null);

    const handleConvert = () => {
        const convertedValue = convert(quantity, fromUnit, toUnit);
        setResult(convertedValue);
    };

    console.log(toUnit)

    const data = [
        {
            "pd_name": "ฟักทอง",
            "pd_qtyminimum": 1,
            "status": "A",
            "picture": "/images/logo.svg",
            "pdc_id": 1,
            "recipe": {
                "qtylifetime": 1,
                "produced_qty": 1,
                "un_id": 1
            },
            "recipedetail": [
                {
                    "ind_id": 1,
                    "ingredients_qty": 2,
                    "un_id": 1
                }
            ]
        },
        
        {
            "pd_name": "ฟักทอง",
            "pd_qtyminimum": "1",
            "status": "A",
            "picture": "/images/logo.svg",
            "pdc_id": "Cet1",
            "recipe": {
                "qtylifetime": 1,
                "produced_qty": 1,
                "un_id": 1
            },
            "recipedetail": [
                {
                    "ind_id": "1",
                    "ingredients_qty": "2",
                    "un_id": "1"
                }
            ]
        }
    ]

    return (
        <div>
            <h1>Unit Conversion</h1>
            <div>
                <label>Quantity: </label>
                <input
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(parseFloat(e.target.value))}
                />

            </div>
            <div>
                <label>From Unit: </label>
                <select value={fromUnit} onChange={(e) => setFromUnit(e.target.value)}>
                    {UnitDetail.map((unit) => (
                        <option key={unit.id} value={unit.name}>
                            {unit.name}
                        </option>
                    ))}
                </select>
            </div>
            <div>
                <label>To Unit: </label>
                <select value={toUnit} onChange={(e) => setToUnit(e.target.value)}>
                    {UnitDetail.map((unit) => (
                        <option key={unit.id} value={unit.name}>
                            {unit.name}
                        </option>
                    ))}
                </select>
            </div>
            <button onClick={handleConvert}>Convert</button>

            {result !== null && (
                <div>
                    <h2>Result: {result} {toUnit}</h2>
                </div>
            )}
        </div>
    );
};

export default UnitConversion;
