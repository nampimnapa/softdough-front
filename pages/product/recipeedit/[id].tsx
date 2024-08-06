import React, { Fragment, useEffect, useState, useRef } from "react";
import Link from "next/link";
import {
    ChevronLeftIcon,
    MagnifyingGlassIcon,
    PlusIcon,
    PencilSquareIcon,
    TrashIcon
} from "@heroicons/react/24/outline";
import { Kanit } from "next/font/google";
import { useRouter } from "next/router";
import { Input } from "@nextui-org/react";
import { Dialog, Transition } from '@headlessui/react';
import { Button, Card, Image, CardFooter, Spinner, Checkbox } from "@nextui-org/react";


const kanit = Kanit({
    subsets: ["thai", "latin"],
    weight: ["100", "200", "300", "400", "500", "600", "700"],
});

function Recipeedit() {
    const router = useRouter();
    const { id } = router.query;
    const [unitOptions, setUnitOptions] = useState([]);
    const [productCat, setProductCat] = useState([]);
    const [Ingredientall, setIngredientall] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [ingredientsOptions, setIngredientsOptions] = useState<Ingredients[]>([]);

    // ค่าเดิม
    const [productOld, setProductOld] = useState<any[]>([]);
    const [addedIngredientsOld, setAddedIngredientsOld] = useState([]);



    const [product, setProduct] = useState({
        "pd_id": 0,
        "pd_name": "",
        "pd_qtyminimum": 0,
        "picture": "",
        "pdc_id": 0,
        "status": "",
        "rc_id": 0,
        "qtylifetime": 0,
        "produced_qty": 0,
        "un_id": "0"
    });

// State to track checkbox status
    interface Ingredients {
        ind_id: string;
        ind_name: string;
        // ตัวแปรอื่น ๆ ที่เกี่ยวข้อง
    }
    interface UnitType {
        un_id: string;
        un_name: string;
        // ตัวแปรอื่น ๆ ที่เกี่ยวข้อง
    }
    interface ProductCat {
        pdc_id: string;
        pdc_name: string;
    }

    const [isChecked, setIsChecked] = useState(false);

    useEffect(() => {

        fetch(`${process.env.NEXT_PUBLIC_API_URL}/ingredient/unit`)
            .then(response => response.json())
            .then(data => {
                setUnitOptions(data);
            })
            .catch(error => {
                console.error('Error fetching unit data:', error);
            });

        fetch(`${process.env.NEXT_PUBLIC_API_URL}/product/readcat`)
            .then(response => response.json())
            .then(data => {
                setProductCat(data);
            })
            .catch(error => {
                console.error('Error fetching unit data:', error);
            });

        fetch(`${process.env.NEXT_PUBLIC_API_URL}/ingredient/read`)
            .then(response => response.json())
            .then(data => {
                setIngredientsOptions(data);
            })
            .catch(error => {
                console.error('Error fetching unit data:', error);
            });





    }, [id]);

    useEffect(() => {
        if (id) { // ตรวจสอบว่ามีค่า ID หรือยัง
            fetch(`${process.env.NEXT_PUBLIC_API_URL}/product/products/${id}`)
                .then(response => response.json())
                .then(data => {
                    setProduct(data.product);
                    setUploadedImage(data.product.picture);
                    setProductOld(data.product);
                    
                })
                .catch(error => {
                    console.error('Error fetching product data:', error);
                });
        }


    }, [id]);

    useEffect(() => {
        if (id) { // ตรวจสอบว่ามีค่า ID หรือยัง
            fetch(`${process.env.NEXT_PUBLIC_API_URL}/product/pdset/${id}`)
                .then(response => response.json())
                .then(data => {
                    // console.log(data.recipedetail);
                    setAddedIngredients(data.recipedetail);
                    setAddedIngredientsOld(data.recipedetail);
                    
                })
        }
        if(product.status !== ""){
            setIsChecked(product.status == "1");

        }

    }, [id,product]);


    const [currentPage, setCurrentPage] = useState("item1");


    const handleItemClick = (itemId) => {
        setCurrentPage(itemId); // อัพเดท state เมื่อมีการคลิกที่ลิงก์
    };

    const handleBackClick = () => {
        handleItemClick("item1"); // เมื่อกดปุ่ม "ถัดไป" ให้ตั้ง currentPage เป็น "item1"
    };

    const [addedIngredients, setAddedIngredients] = useState([]);
    const handleSubmit = (event) => {
        event.preventDefault();
        const ingredientId = parseInt((document.getElementById("ingredients") as HTMLSelectElement).value);
        const ingredientQty = parseInt((document.getElementById("count") as HTMLSelectElement).value);
        const unitId = parseInt((document.getElementById("unit") as HTMLSelectElement).value);
        const existingIngredient = addedIngredients.find((ingredient) => ingredient.ind_id === ingredientId && parseInt(ingredient.un_id) === unitId);
        const desiredIngredient = ingredientsOptions.find(ingredient => ingredient.ind_id == ingredientId.toString());


        if (existingIngredient) {
            // If the ingredient already exists, update the quantity
            setAddedIngredients((prevIngredients) => (
                prevIngredients.map((ingredient) =>
                    ingredient.ind_id === ingredientId && parseInt(ingredient.un_id) === unitId
                        ? { ...ingredient, ingredients_qty: ingredient.ingredients_qty + ingredientQty }
                        : ingredient
                )
            ));
        } else {
            // If the ingredient doesn't exist, add it to the list
            setAddedIngredients((prevIngredients) => [
                ...prevIngredients,
                { ind_id: ingredientId, ingredients_qty: ingredientQty, un_id: unitId, ind_name: desiredIngredient.ind_name }
            ]);
        }
        // Clear the input fields
        (document.getElementById("count") as HTMLInputElement).value = "";
    };


    const handleDeleteIngredient = (id) => {
        // setAddedIngredients(addedIngredients.splice(id,1));
        setAddedIngredients(prevIngredients => {
            const newIngredients = [...prevIngredients];
            newIngredients.splice(id, 1);
            return newIngredients;
          });
        console.log("ID :",id)
    };
    
    
    
    const [recipe, setRecipe] = useState({
        qtyLifetime: "0",
        produced_qty: "0"
    });
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setRecipe((prevRecipe) => ({
            ...prevRecipe,
            [name]: value
        }));
    };



    const handleClickDelete = () => {
        setProduct(prevState => ({
            ...prevState,
            picture: '/images/logo.svg'
        }));
        setUploadedImage(null);
    }

    const handleProductInputChange = (e) => {
        const { name, value } = e.target;
        setProduct((prevProduct) => ({
            ...prevProduct,
            [name]: value
        }));
    };
    const [uploadedImage, setUploadedImage] = useState(null);
    const [isLoanding, setIsLoading] = useState(false);


    const handleFileChange = (event) => {
        const fileObj = event.target.files && event.target.files[0];
        if (!fileObj) {
            return;
        }
        console.log("Oringinal => ", fileObj)
        console.log("Uploade => ", URL.createObjectURL(fileObj))
        setUploadedImage(URL.createObjectURL(fileObj));


        event.target.value = null;

        const formData = new FormData();
        formData.append("file", fileObj);

        fetch("/api/uploadimage", {
            method: "POST",
            body: formData,
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                setProduct((prevProduct) => ({
                    ...prevProduct,
                    "img": data.pathFile
                }));
            })
            .catch(error => console.error(error));


    };

    const inputRef = useRef(null);


    const handleClick = () => {
        inputRef.current.click();
    };

    const [message, setMessage] = useState('Loading');

    const handleNextClick = async () => {
        if (currentPage !== "item2") {
            handleItemClick("item2");
        }
        else {
            const productData = {
                pd_name: product.pd_name,
                pd_qtyminimum: typeof product.pd_qtyminimum === 'string' ? parseInt(product.pd_qtyminimum) : product.pd_qtyminimum,
                // picture: product.img ? product.img.toString('base64') : null, // แปลงรูปภาพเป็น base64 ก่อนส่ง                pdc_id: product.pdc_id,
                picture: product.picture,
                pdc_id: product.pdc_id,
                status: isChecked,
                recipe: {
                    qtylifetime: product.qtylifetime,
                    produced_qty: product.produced_qty,
                    un_id: parseInt(product.un_id)
                },
                recipedetail: addedIngredients.map((ingredient) => ({
                    ind_id: parseInt(ingredient.ind_id),
                    ingredients_qty: ingredient.ingredients_qty,
                    un_id: parseInt(ingredient.un_id)
                }))
            };
            console.log("Product Data:", productData);

            // const formData = new FormData();
            // formData.append('pd_name', product.name);
            // const qtymin = typeof product.qtymin === 'string' ? parseInt(product.qtymin, 10) : product.qtymin;
            // formData.append('pd_qtyminimum', qtymin.toString());
            // formData.append('status', product.status);
            // formData.append('pdc_id', product.pdc_id.toString());
            // formData.append('picture', product.img);
            // formData.append('recipe', JSON.stringify(productData.recipe));
            // formData.append('recipedetail', JSON.stringify(addedIngredients.map((ingredient) => ({
            //     ind_id: ingredient.id,
            //     ingredients_qty: ingredient.quantity,
            //     un_id: ingredient.unit
            // }))));


            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/product/editProductWithRecipe/${id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(productData),

            });
            const responseData = await response.json();
            console.log(responseData)

            if (responseData.message === 'Product updated successfully!') {

                setMessage('Product updated successfully!');
                router.push('/product/recipeall');
            } else {
                setMessage(responseData.message || 'Error occurred');
            }

            console.log(productData);
        }




    };


    const handleCheckboxChange = () => {
        setIsChecked(!isChecked); // เปลี่ยนสถานะของ checkbox
    
        const newValue = isChecked ? "0" : "1"; // สลับค่า
    
        setProduct(prevProduct => ({
            ...prevProduct,
            status: newValue
        }));
    };



    console.log("สินค้า : ",addedIngredients )

    return (

        <div className="h-screen">
            <button className='my-3 mx-5 '>
                <Link href="/product/recipeall" className="text-sm w-full flex justify-center items-center text-[#F2B461] hover:text-[#D9CAA7]">
                    <ChevronLeftIcon className="h-5 w-5 text-[#F2B461] hover:text-[#D9CAA7]" />
                    สูตรอาหาร
                </Link>
            </button>
            <p className='my-1 mx-6 font-semibold text-[#C5B182] border-b  border-[#C5B182] py-2'>แก้ไขสูตรอาหาร</p>

            {product.pd_id !== 0 ? (
                <div className="carousel w-full">
                    <div id="item1" className="carousel-item w-full">
                        <div className="flex w-full">
                            <div className="w-1/2">
                                <div className="flex justify-between w-full my-2">
                                    <div className=" flex h-min items-center">
                                        <p className="text-sm pl-6 text-[#73664B] mr-4 ">ประเภทสินค้า :</p>
                                        <select
                                            onChange={handleProductInputChange}
                                            id="pdc_id"
                                            className=" bg-[#E3D9C0] block rounded-md py-1.5 text-[#73664B] shadow-sm sm:text-sm sm:leading-6 pl-2"
                                            name="pdc_id"
                                            value={product.pdc_id ? product.pdc_id.toString() : ''}

                                        >
                                            {productCat.map((pd: ProductCat) => (
                                                <option key={pd.pdc_id} value={pd.pdc_id}>
                                                    {pd.pdc_name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                </div>
                                <div className="grid grid-cols-3 w-2/3 my-2 h-min">
                                    <p className="text-sm px-6 py-2 text-[#73664B] w-full">ชื่อสินค้า :</p>
                                    <input
                                        onChange={handleProductInputChange}
                                        placeholder="ชื่อสินค้า"
                                        type="text"
                                        name="pd_name"
                                        id="name"
                                        autoComplete="off"
                                        value={product.pd_name}
                                        className="col-span-2 px-3 bg-[#FFFFDD] block w-full rounded-t-md border border-b-[#C5B182] py-1.5 text-[#C5B182] shadow-sm placeholder:text-[#C5B182] sm:text-sm sm:leading-6 focus:outline-none"
                                    />
                                </div>
                                <div className="grid grid-cols-2 w-2/3 my-2">
                                    <p className="text-sm px-6 py-2 text-[#73664B]">จำนวนสินค้าชั้นต่ำ :</p>
                                    <input
                                        onChange={handleProductInputChange}
                                        placeholder="จำนวนสินค้าขั้นต่ำ"
                                        type="number"
                                        name="pd_qtyminimum"
                                        id="qtymin"
                                        autoComplete="off"
                                        value={product.pd_qtyminimum}
                                        className="px-3 bg-[#FFFFDD] block w-full rounded-t-md border border-b-[#C5B182] py-1.5 text-[#C5B182] shadow-sm placeholder:text-[#C5B182] sm:text-sm sm:leading-6 focus:outline-none"
                                    />
                                </div>
                                <div className="flex items-center w-3/4">
                                    <p className="text-sm pl-6 text-[#73664B]">หน่วยสินค้า :</p>
                                    <select
                                        onChange={handleProductInputChange}
                                        id="pd_unit"
                                        className="bg-[#E3D9C0] block rounded-md py-1.5 text-[#73664B] shadow-sm sm:text-sm sm:leading-6 pl-2 ml-7"
                                        name="pd_unit"
                                        value={product.un_id ? product.un_id.toString() : ''}
                                    >
                                        {unitOptions.map((unit: UnitType) => (
                                            <option key={unit.un_id} value={unit.un_id}>
                                                {unit.un_name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className="ml-6 mt-5">
                                    <Checkbox
                                        className="text-sm text-[#73664B]"
                                        radius="sm"
                                        color="warning"
                                        onChange={handleCheckboxChange}
                                        isSelected={isChecked}
                                    >
                                        ยืนยันการใช้งาน
                                    </Checkbox>
                                </div>
                            </div>
                            <div className="w-1/2">
                                <div className="flex w-full mt-3">
                                    <label className="text-sm mr-4 text-[#73664B]">รูปภาพ :</label>
                                    <Card isFooterBlurred radius="lg" className="border-none max-w-[200px] max-h-[200px]">
                                        <Image
                                            alt="Woman listing to music"
                                            className="w-[200px] object-cover h-[200px]"
                                            height={200}
                                            sizes={`(max-width: 768px) ${200}px, ${200}px`}
                                            src={uploadedImage || "/images/logo.svg"}
                                            // src="/images/logo.svg"
                                            width={200}
                                        />
                                        <CardFooter className="flex justify-center before:bg-white/10 border-white/20 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10">
                                            <Button
                                                className="text-tiny text-white bg-[#73664B]"
                                                color="danger"
                                                radius="lg"
                                                size="sm"
                                                onClick={handleClick}
                                            >
                                                เพิ่ม
                                            </Button>

                                            {uploadedImage != null && (
                                                <Button
                                                    className="text-tiny text-white bg-[#73664B] ml-3"
                                                    color="danger"
                                                    radius="lg"
                                                    size="sm"
                                                    onClick={handleClickDelete}
                                                >
                                                    นำออก
                                                </Button>
                                            )}
                                        </CardFooter>

                                    </Card>
                                    <input
                                        onChange={handleFileChange}
                                        style={{ display: 'none' }}
                                        ref={inputRef}
                                        name="img"
                                        id="img"
                                        type="file"
                                        className="file-input file-input-bordered file-input-sm w-full max-w-xs text-[#73664B]"
                                        accept="image/*"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* หน้า 2 */}
                    <div id="item2" className="carousel-item w-full " >
                        <div>
                            <p className="text-[#73664B] mx-6 my-2">สูตรอาหาร</p>
                            <form>
                                <div className="grid grid-cols-4">
                                    <div className="flex items-center justify-center">
                                        <p className="text-sm px-6 py-2 text-[#73664B] flex justify-center items-center">วัตถุดิบ:</p>
                                        <select id="ingredients"
                                            className="bg-[#E3D8BF] w-full block rounded-md border py-1 text-[#73664B] shadow-sm sm:text-sm sm:leading-6">
                                            {ingredientsOptions.map((ind: Ingredients) => (
                                                <option key={ind.ind_id} value={ind.ind_id}>
                                                    {ind.ind_name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className=" flex items-center justify-center">
                                        <p className="text-sm px-5 py-2 text-[#73664B] flex justify-center ">ปริมาณ:</p>
                                        <input
                                            min="1"
                                            type="number"
                                            name="count"
                                            id="count"
                                            className="px-3 bg-[#FFFFDD] w-1/2 block rounded-t-md border border-b-[#C5B182] py-1 text-[#C5B182] shadow-sm  placeholder:text-[#C5B182]  sm:text-sm sm:leading-6 focus:outline-none"
                                        />
                                    </div>
                                    <div className=" flex items-center justify-center">
                                        <p className="text-sm px-6 py-2 text-[#73664B] flex justify-center ">หน่วย:</p>
                                        <select id="unit"
                                            className="bg-[#E3D8BF] w-full block rounded-md border py-1 text-[#73664B] shadow-sm sm:text-sm sm:leading-6">
                                            {unitOptions.map((unit: UnitType) => (
                                                <option key={unit.un_id} value={unit.un_id}>
                                                    {unit.un_name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="scale-75 w-1/2 h-auto flex justify-center">
                                        <button
                                            onClick={handleSubmit}
                                            type="submit"
                                            value="เพิ่มวัตถุดิบ"
                                            className="text-lg text-white border  bg-[#F2B461] rounded-full py-2 px-2 ">เพิ่มวัตถุดิบ</button></div>
                                </div>
                            </form>
                            <div className="mx-6 mt-3">
                                <div className="flex flex-col">
                                    <div className="bg-[#908362] text-white text-sm flex">
                                        <div className="flex-1 py-3 text-center">วัตถุดิบ</div>
                                        <div className="flex-1 py-3 text-center">ปริมาณ</div>
                                        <div className="flex-1 py-3 text-center">หน่วย</div>
                                        <div className="flex-1 py-3 text-center"></div>
                                    </div>
                                    <div className="max-h-40 overflow-y-auto mb-5">
                                        <table className="w-full">
                                            <tbody className="w-full">
                                                {/* {addedIngredients.slice().reverse().map((ingredient) => (
                                                    <tr key={ingredient.ind_id} className="even:bg-[#F5F1E8] border-b h-10 text-sm odd:bg-white border-b h-10 text-sm flex items-center">
                                                        <td scope="col" className="flex-1 text-center">{ingredientsOptions.find((i) => parseInt(i.ind_id) === ingredient.id)?.ind_name}</td>
                                                        <td scope="col" className="flex-1 text-center">{ingredient.quantity}</td>
                                                        <td scope="col" className="flex-1 text-center">{unitOptions.find((u) => parseInt(u.un_id) === ingredient.unit)?.un_name}</td>
                                                        <td scope="col" className="flex-1 text-center">
                                                            <div className="flex items-center justify-center">
                                                                <button onClick={() => handleDeleteIngredient(ingredient.ind_id)}>
                                                                    <TrashIcon className="h-5 w-5 text-red-500" />
                                                                </button>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                ))} */}


                                                {addedIngredients && addedIngredients.length > 0 && addedIngredients.map((ingredient, index) => (
                                                    <tr key={index} className="even:bg-[#F5F1E8] border-b h-10 text-sm odd:bg-white flex items-center">
                                                        <td scope="col" className="flex-1 text-center">{ingredient.ind_name}</td>
                                                        <td scope="col" className="flex-1 text-center">{ingredient.ingredients_qty}</td>
                                                        <td scope="col" className="flex-1 text-center">{unitOptions.find((u) => parseInt(u.un_id) === ingredient.un_id)?.un_name}</td>
                                                        <td scope="col" className="flex-1 text-center">
                                                            <div className="flex items-center justify-center">
                                                                <button onClick={() => handleDeleteIngredient(index)}>
                                                                    <TrashIcon className="h-5 w-5 text-red-500" />
                                                                </button>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                                <div className="flex mx-6 items-center">
                                    <p className="text-sm pr-3">สูตรอาหารผลิตได้ :</p>
                                    <input
                                        onChange={handleInputChange}
                                        placeholder="จำนวน"
                                        min="1"
                                        type="number"
                                        name="qtylifetime"
                                        id="qtyLifetime"
                                        value={product.qtylifetime}
                                        className="px-3 bg-[#FFFFDD] w-1/12 block rounded-t-md border border-b-[#C5B182] py-1 text-[#C5B182] shadow-sm  placeholder:text-[#C5B182]  sm:text-sm sm:leading-6 focus:outline-none"
                                    />
                                    <p className="text-sm pl-3">ชิ้น</p>
                                </div>
                                <div className="flex mx-6 my-2 items-center">
                                    <p className="text-sm pr-3">จำนวนวันที่อยู่ได้ของสินค้า :</p>
                                    <input
                                        onChange={handleInputChange}
                                        placeholder="จำนวน"
                                        min="1"
                                        type="number"
                                        name="produced_qty"
                                        id="produced_qty"
                                        value={product.produced_qty}
                                        className="px-3 bg-[#FFFFDD] w-1/12 block rounded-t-md border border-b-[#C5B182] py-1 text-[#C5B182] shadow-sm  placeholder:text-[#C5B182]  sm:text-sm sm:leading-6 focus:outline-none"
                                    />
                                    <p className="text-sm pl-3">วัน</p>
                                </div>
                            </div>
                        </div >
                    </div>
                </div>
            ) :
                (
                    "Loading..."
                )}

            <div className="flex justify-center mt-5 ">
                <a
                    href="#item1"
                    className={`scale-50 h-6 w-6 btn btn-xs rounded-full ${currentPage === "item1" ? "bg-[#73664B]" : "bg-[#C5B182]"} hover:bg-[#73664B]`}
                    onClick={() => handleItemClick("item1")}
                ></a>
                <a
                    href="#item2"
                    className={`scale-50 h-6 w-6 btn btn-xs rounded-full ${currentPage === "item2" ? "bg-[#73664B]" : "bg-[#C5B182]"} hover:bg-[#73664B]`}
                    onClick={() => handleItemClick("item2")}
                ></a>
            </div>

            <div className="flex justify-start">
                <div className="flex justify-start">
                    <button onClick={handleBackClick}>
                        <Link
                            href={currentPage === "item2" ? "#item1" : "/product/recipeall"}
                            type="button"
                            className="text-white bg-[#C5B182] focus:outline-none font-medium rounded-full text-sm px-5 py-2.5 mb-2 ml-6"
                        >
                            {currentPage === "item2" ? "ย้อนกลับ" : "ยกเลิก"}
                        </Link>
                    </button>
                </div>
                <div className="flex justify-start">
                    <button onClick={handleNextClick} >
                        <Link
                            href="#item2"
                            type="button"
                            className={`ml-2 text-white bg-[#73664B] focus:outline-none focus:ring-4 focus:ring-gray-200 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 ${currentPage === "item2" ? "bg-[#73664B]" : "bg-[#73664B]"
                                }`}
                        >
                            {currentPage === "item2" ? (
                                isLoanding ? (<><Spinner size="sm" className='text-white' color="default" /> กำลังบันทึก</>) : "บันทึก"
                            ) : "ถัดไป"}
                        </Link>
                    </button>
                </div>
            </div>

        </div >

    )
}

export default Recipeedit