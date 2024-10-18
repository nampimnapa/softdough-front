import React, { Fragment, useEffect, useState, useRef } from "react";
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import { IoCalculator } from "react-icons/io5";
import Link from "next/link";
import { ChevronLeftIcon, MagnifyingGlassIcon, PlusIcon, PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";
import { Kanit } from "next/font/google";
import { Icon } from '@iconify/react';
import { useRouter } from "next/router";
import { Divider, Switch, Popover, PopoverTrigger, PopoverContent, Tooltip, Input, Select, SelectItem, Card, CardFooter, Spinner, Image, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure, Button } from "@nextui-org/react";
import Head from 'next/head'


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

function Recipeall() {
    const router = useRouter();
    const { id } = router.query;
    const [Recipe, setRecipe] = useState([]);
    const [statusLoading, setStatusLoading] = useState(false);
    const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
    const { isOpen: isOpenEdit, onOpen: onOpenEdit, onOpenChange: onOpenChangeEdit, onClose: onCloseEdit } = useDisclosure();
    const { isOpen: isOpenRead, onOpen: onOpenRead, onOpenChange: onOpenChangeRead, onClose: onCloseRead } = useDisclosure();
    const [unitOptions, setUnitOptions] = useState([]);
    const [productCat, setProductCat] = useState([]);
    const [ingredientsOptions, setIngredientsOptions] = useState<Ingredients[]>([]);
    const [uploadedImage, setUploadedImage] = useState(null);
    const [imageUpload, setImageUpload] = useState(null);
    const [Ingredientall, setIngredientall] = React.useState([]);
    const [isOpenPop, setIsOpenPop] = React.useState(false);

    // สูตรการคำนวณ //
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
    const [result, setResult] = useState("0");
    //////////////

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

        // ตัวแปรอื่น ๆ ที่เกี่ยวข้อง
    }

    interface Ingredients {
        ind_id: string;
        ind_name: string;
        un_ind_name: string
        un_ind: number;
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

    const [TypeProduct, setTypeProduct] = useState([]);
    interface TypeProduct {
        pdc_id: string;
        pdc_name: string;

    }
    useEffect(() => {
        setStatusLoading(false)
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/product/productsall`)
            .then(response => response.json())
            .then(data => {
                setRecipe(data);
                setStatusLoading(true)
            })
            .catch(error => {
                console.error('Error fetching unit data:', error);
            });
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/product/readcat`)
            .then(response => response.json())
            .then(data => {
                setTypeProduct(data);
            })
            .catch(error => {
                console.error('Error fetching unit data:', error);
            });

        fetch(`${process.env.NEXT_PUBLIC_API_URL}/salesmenu/unit`)
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

    const getRecipe = () => {
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/product/productsall`)
            .then(response => response.json())
            .then(data => {
                setRecipe(data);
                // setStatusLoading(true)
            })
            .catch(error => {
                console.error('Error fetching unit data:', error);
            });
    }

    const [product, setProduct] = useState({
        pd_name: '',
        pd_qtyminimum: 0,
        status: 'A',
        picture: "/images/logo.svg",
        pd_unit: '1',
        pdc_id: 1,
    });

    const [recipeData, setRecipeData] = useState({
        qtylifetime: "",
        produced_qty: ""
    })

    // ที่เก็บค่ากรอกเข้ามาเพื่อเพิ่มวัตถุดิบ
    const [ingredientsFood, setIngredientsFood] = useState({
        ind_id: "",
        ingredients_qty: null,
        un_id: ""
    });

    // เก็บค่าที่รับการเพิ่มวัตถุดิบ
    const [ingredientsFoodSave, setIngredientsFoodSave] = useState([]);

    // เก็บค่าเตครื่องแปลงสูคร
    const [convertData, setConvertData] = useState({
        convert_before: 0,
        convert_before_type: "ช้อนชา",
        convert_after_type: "",
        convert_after: 0
    });

    // Upload image
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
                    "picture": data.pathFile
                }));
            })
            .catch(error => console.error(error));


    };

    const inputRef = useRef(null);


    const handleClick = () => {
        inputRef.current.click();
    };

    // Delete image
    const handleClickDelete = () => {
        setProduct(prevState => ({
            ...prevState,
            picture: '/images/logo.svg'
        }));
        setUploadedImage(null);
        setImageUpload(null);
    }

    // input recipe
    const handleProductInputChangeFix = (e) => {
        const { name, value } = e.target;
        setProduct(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    // Add ingredients
    const handleIngredientsFood = (e) => {
        const { name, value } = e.target;
        setIngredientsFood(prevState => ({
            ...prevState,
            [name]: value
        }));

        if (name == "ind_id") {
            const un_ind_find = ingredientsOptions.find(ingredient => ingredient.ind_id == value)?.un_ind
            setIngredientsFood(prevState => ({
                ...prevState,
                "un_id": un_ind_find ? un_ind_find.toString() : prevState.un_id
            }));
        }
    }

    const handlerecipeData = (e) => {
        const { name, value } = e.target;
        setRecipeData(prevState => ({
            ...prevState,
            [name]: value
        }));
    }

    // แปลงค่า
    const handleConvert = (e) => {
        const { name, value } = e.target;
        setConvertData(prevState => ({
            ...prevState,
            [name]: value
        })
        )
        // console.log(ingredientsOptions.find(unit => unit.ind_id == ingredientsFood.ind_id)?.un_ind_name)

        if (name == "convert_before") {
            const convertedValue = convert(value, convertData.convert_before_type, ingredientsOptions.find(unit => unit.ind_id == ingredientsFood.ind_id)?.un_ind_name);
            setResult(convertedValue.toString());
        } else {
            const convertedValue = convert(convertData.convert_before, value, ingredientsOptions.find(unit => unit.ind_id == ingredientsFood.ind_id)?.un_ind_name);
            setResult(convertedValue.toString());
        }

    }

    // ย้ายค่าไปใส่ช่องเพื่อเพิ่มวัตถุดิบ
    const handleConvertAfter = () => {
        setIngredientsFood(prevState => ({
            ...prevState,
            "ingredients_qty": parseFloat(result)
        }));
        setIsOpenPop(false)
    }

    // ล้างค่าในเครื่องแปลง
    const handleConvertCencel = () => {
        setConvertData({
            convert_before: 0,
            convert_before_type: "ช้อนชา",
            convert_after_type: "",
            convert_after: 0
        })
        setResult("0");
        setIsOpenPop(false)
    }

    // ปิด Modal
    const handleModalClose = () => {
        setIngredientsFood({
            ind_id: "",
            ingredients_qty: null,
            un_id: ""
        })
        onClose()
    }

    // เพิ่มวัถตุดิบเข้าสินค้า
    const handleSubmitIngredient = () => {
        setIngredientsFoodSave((prevIngredients) => {
            const existingIngredient = prevIngredients.find(
                (ingredient) => parseInt(ingredient.ind_id) === parseInt(ingredientsFood.ind_id)
            );

            if (existingIngredient) {
                return prevIngredients.map((ingredient) =>
                    parseInt(ingredient.ind_id) === parseInt(ingredientsFood.ind_id)
                        ? {
                            ...ingredient,
                            ingredients_qty: parseFloat(ingredient.ingredients_qty) + parseFloat(ingredientsFood.ingredients_qty)
                        }
                        : ingredient
                );
            } else {
                // แปลงค่าของ ind_id และ ingredients_qty ก่อนเพิ่มเข้า array
                return [
                    ...prevIngredients,
                    {
                        ...ingredientsFood,
                        ind_id: parseInt(ingredientsFood.ind_id),
                        ingredients_qty: parseFloat(ingredientsFood.ingredients_qty),
                        un_id: parseInt(ingredientsFood.un_id)
                    }
                ];
            }
        });
        setIngredientsFood({
            ind_id: "",
            ingredients_qty: null,
            un_id: ""
        })
    }

    // ลบวัตถุดิบออกจากสินค้า
    const removeIngredient = (ingredientName) => {
        setIngredientsFoodSave((prevIngredients) =>
            prevIngredients.filter((ingredient) => ingredient.ind_id != ingredientName)
        );
    };

    const handleSubmitAdd = async () => {
        const productData = {
            pd_name: product.pd_name,
            pd_qtyminimum: typeof product.pd_qtyminimum === 'string' ? parseInt(product.pd_qtyminimum) : product.pd_qtyminimum,
            status: product.status,
            picture: product.picture,
            pdc_id: typeof product.pdc_id === 'string' ? parseInt(product.pdc_id) : product.pdc_id,
            recipe: {
                qtylifetime: parseInt(recipeData.qtylifetime),
                produced_qty: parseInt(recipeData.produced_qty),
                un_id: parseInt(product.pd_unit)
            },
            recipedetail: ingredientsFoodSave
        }

        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/product/addProductWithRecipe`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(productData),

        });
        const responseData = await response.json();
        console.log(responseData)

        if (responseData.status === 200) {

            console.log('Data added successfully');
            getRecipe();
            onClose();

        } else {
            console.log(responseData.message || 'Error occurred');
        }
    }

    // Edit recipe
    const [editProduct, setEditProduct] = useState({
        "pd_id": 0,
        "pd_name": "",
        "pd_qtyminimum": 0,
        "pdc_name": "",
        "status": "",
        "picture": "",
        "created_at": "",
        "updated_at": "",
        "rc_id": 0,
        "un_name": "",
        "qtylifetime": 0,
        "produced_qty": 0,
        "pdc_id": "",
        "recipedetail": [
        ]
    })
    const handleEdit = async (idedit) => {
        console.log(idedit)
        await fetch(`${process.env.NEXT_PUBLIC_API_URL}/product/pdset/${idedit}`)
            .then(response => response.json())
            .then(data => {
                setEditProduct(data);
                setIngredientsFoodSaveEdit(data.recipedetail);
                setUploadedImage(data.picture);
                if (data.status == "A") {
                    setSwitchStatus(true)
                } else if (data.status == "N") {
                    setSwitchStatus(false)
                }
                onOpenEdit();
            })



    }

    // input recipe Edit
    const handleProductInputEdit = (e) => {
        const { name, value } = e.target;
        setEditProduct(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    // ingredientsFoodEdit สำหรับแก้ไข
    const [ingredientsFoodEdit, setIngredientsFoodSaveEdit] = useState([]);
    const [switchStatus, setSwitchStatus] = useState(false);

    const changeStatus = () => {
        setSwitchStatus(!switchStatus);
        if (switchStatus) {
            setEditProduct((prevProduct) => ({
                ...prevProduct,
                status: "N"
            }));
        } else {
            setEditProduct((prevProduct) => ({
                ...prevProduct,
                status: "A"
            }));
        }
    }

    // แก้ไขวัถตุดิบเข้าสินค้า
    const handleSubmitIngredientEdit = () => {
        setIngredientsFoodSaveEdit((prevIngredients) => {
            const existingIngredient = prevIngredients.find(
                (ingredient) => parseInt(ingredient.ind_id) === parseInt(ingredientsFood.ind_id)
            );

            if (existingIngredient) {
                return prevIngredients.map((ingredient) =>
                    parseInt(ingredient.ind_id) === parseInt(ingredientsFood.ind_id)
                        ? {
                            ...ingredient,
                            ingredients_qty: parseFloat(ingredient.ingredients_qty) + parseFloat(ingredientsFood.ingredients_qty)
                        }
                        : ingredient
                );
            } else {
                // แปลงค่าของ ind_id และ ingredients_qty ก่อนเพิ่มเข้า array
                return [
                    ...prevIngredients,
                    {
                        ...ingredientsFood,
                        ind_id: parseInt(ingredientsFood.ind_id),
                        ingredients_qty: parseFloat(ingredientsFood.ingredients_qty),
                        un_id: parseInt(ingredientsFood.un_id)
                    }
                ];
            }
        });
        setIngredientsFood({
            ind_id: "",
            ingredients_qty: null,
            un_id: ""
        })
    }

    // ลบวัตถุดิบออกจากสินค้าแก้ไข
    const removeIngredientEdit = (ingredientName) => {
        setIngredientsFoodSaveEdit((prevIngredients) =>
            prevIngredients.filter((ingredient) => ingredient.ind_id != ingredientName)
        );
    };

    // Submit Edit
    const handleSubmitEdit = async () => {
        const productData = {
            pd_name: editProduct.pd_name,
            pd_qtyminimum: typeof editProduct.pd_qtyminimum === 'string' ? parseInt(editProduct.pd_qtyminimum) : editProduct.pd_qtyminimum,
            status: editProduct.status,
            picture: editProduct.picture,
            pdc_id: productCat.find(cat => cat.pdc_name == editProduct.pdc_name)?.pdc_id,
            recipe: {
                qtylifetime: typeof editProduct.qtylifetime === 'string' ? parseInt(editProduct.qtylifetime) : editProduct.qtylifetime,
                produced_qty: typeof editProduct.produced_qty === 'string' ? parseInt(editProduct.produced_qty) : editProduct.produced_qty,
                un_id: unitOptions.find(units => units.un_name == editProduct.un_name)?.un_id
            },
            recipedetail: ingredientsFoodEdit
        }

        console.log(productData)

        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/product/editProductWithRecipe/${editProduct.pd_id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(productData),

        });
        const responseData = await response.json();
        console.log(responseData)

        if (responseData.message === 'Product updated successfully!') {

            console.log('Product updated successfully!');
            getRecipe();
            onCloseEdit();
        } else {
            console.log(responseData.message || 'Error occurred');
        }
    }

    // อ่านสูตรอาหาร
    const handleRead = async (idedit) => {
        console.log(idedit)
        await fetch(`${process.env.NEXT_PUBLIC_API_URL}/product/pdset/${idedit}`)
            .then(response => response.json())
            .then(data => {
                setEditProduct(data);
                setIngredientsFoodSaveEdit(data.recipedetail);
                setUploadedImage(data.picture);
                if (data.status == "A") {
                    setSwitchStatus(true)
                } else if (data.status == "N") {
                    setSwitchStatus(false)
                }
                onOpenRead();
            })



    }

    // console.log("editProduct: ", editProduct)
    // console.log("convert", convertData)
    // console.log("ingredientsFoodSave", ingredientsFoodSave)

    return (
        <div className="overflow-auto flex flex-col">
            <Head>
                <title>สูตรอาหาร - Softdough</title>
            </Head>
            <p className='text-[#F2B461] font-medium m-4'>สูตรอาหาร</p>
            <div className="flex justify-between">
                <form className="flex items-center w-full transform scale-75">
                    <div className="relative w-1/2 ">
                        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none ">
                            <MagnifyingGlassIcon className="h-6 w-6  text-[#C5B182]" />
                        </div>
                        <input type="text"
                            id="simple-search"
                            className="bg-[#FFFFF8] border border-[#C5B182] block w-full ps-10 p-2.5 rounded-full placeholder:text-[#C5B182] focus:outline-none"
                            placeholder="ค้นหา" required ></input>
                    </div>
                    <button type="submit" className="p-2 ms-2 text-sm  rounded-full text-white bg-[#C5B182] border  hover:bg-[#5E523C]">
                        ค้นหา
                    </button>
                </form>
                <div className="mr-4 scale-90 flex items-center">
                    {/* <Link href={`./addrecipe`}> */}
                    <button
                        onClick={() => onOpen()}
                        className="px-3 p-2 text-sm rounded-full text-white bg-[#73664B] border  hover:bg-[#5E523C] flex">
                        <PlusIcon className="h-5 w-5 text-white mr-2" />
                        เพิ่ม
                    </button>
                    {/* </Link> */}
                </div>
            </div>


            {statusLoading ? (
                TypeProduct.map(product =>
                    <div key={product.pdc_id}>
                        <p className="font-medium m-4 text-[#C5B182]  border-b-1 border-b-[#C5B182] ">{product.pdc_name}</p>

                        <div className="flex flex-wrap ">
                            {
                                Recipe && Recipe.length > 0 ? (
                                    Recipe.filter(recipe => recipe.pdc_id === product.pdc_id).map((recipe, index) => (
                                        <div key={index} className="card w-60 bg-base-100 shadow-xl mx-2 h-80 ml-5 mb-4">
                                            <figure className="w-full h-96">
                                                <Image src={recipe.picture == null ? "/images/logo.svg" : recipe.picture} alt="Recipe Image" className="object-cover" />
                                            </figure>
                                            <div className="card-body">
                                                <div className="flex justity-between">
                                                    <p className="text-mediem text-[#73664B]">
                                                        {recipe.pd_name}
                                                    </p>
                                                    <button type="button" onClick={() => handleEdit(recipe.pd_id)}>
                                                        {/* <Link href={`/product/recipeedit/${recipe.pd_id}`} className="w-full flex justify-center items-center"> */}

                                                        <PencilSquareIcon className="h-4 w-4 text-[#73664B]" />
                                                        {/* </Link> */}
                                                    </button>
                                                </div>
                                                <div className="flex justify-between">
                                                    <div className="flex justify-start">
                                                        <p className="text-sm text-[#73664B]">จำนวนที่ทำได้ : </p>
                                                    </div>
                                                    <div className="flex justify-end">
                                                        <p className="text-sm text-[#73664B]">{recipe.produced_qty} ชิ้น</p>
                                                    </div>
                                                </div>
                                                <div className="flex justify-between">
                                                    <div className="flex justify-start">
                                                        <p className="text-sm text-[#73664B]">จำนวนขั้นต่ำ</p>
                                                    </div>
                                                    <div className="flex justify-end">
                                                        <p className="text-sm text-[#73664B]">{recipe.pd_qtyminimum} ชิ้น</p>
                                                    </div>
                                                </div>
                                                <div className="card-actions flex justify-between">
                                                    <div className="flex justify-items-center">
                                                        <p className="text-sm text-[#DACB46]">ขั้นต่ำใหม่</p>
                                                        <button>
                                                            <Icon icon="system-uicons:reset" className="my-1 mx-1 text-sm text-[#DACB46] font-bold" />
                                                        </button>
                                                    </div>
                                                    <button className="flex justify-end" onClick={() => handleRead(recipe.pd_id)}>
                                                        {/* <Link href={`./recipedetail/${recipe.pd_id}`}> */}
                                                        <div className="badge badge-outline">สูตรอาหาร</div>
                                                        {/* </Link> */}
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="flex justify-center items-center w-full">
                                        <p className="text-sm text-gray-400">ไม่มีข้อมูลสูตรอาหาร</p>
                                    </div>
                                )}
                        </div>
                    </div>
                )) : (
                <Spinner label="Loading..." color="warning" className="flex justify-center m-60" />
            )}


            {/* Model Add */}
            <Modal isOpen={isOpen} onOpenChange={onOpenChange} isDismissable={false} isKeyboardDismissDisabled={true} size="3xl">
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1 text-[#F2B461]" style={{ fontFamily: 'kanit' }}>เพิ่มสูตรอาหาร</ModalHeader>
                            <ModalBody style={{ fontFamily: 'kanit' }}>
                                <div className='flex'>
                                    <div className='mr-5 '>
                                        <Card isFooterBlurred radius="lg" className="border-none max-w-[400px] max-h-[400px]">
                                            <Image
                                                alt="Product"
                                                className="w-[250px] object-cover h-[250px]"
                                                height={400}
                                                sizes={`(max-width: 768px) ${400}px, ${400}px`}
                                                src={uploadedImage || "/images/logo.svg"}
                                                width={400}
                                            />
                                            <CardFooter className="flex justify-center before:bg-white/10 border-white/20 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10">
                                                <Button
                                                    className="text-tiny text-white bg-[#73664B]"
                                                    color="danger"
                                                    radius="lg"
                                                    size="sm"
                                                    onClick={handleClick}
                                                >
                                                    เปลี่ยน
                                                </Button>

                                                {uploadedImage != null && (
                                                    <Button
                                                        className="text-tiny text-white bg-[#73664B]"
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
                                        <small className="text-default-400">รองรับไฟล์ .png .jpg</small>
                                        <input
                                            style={{ display: 'none' }}
                                            ref={inputRef}
                                            type="file"
                                            accept="image/*"  // Restrict to image files
                                            multiple={false}  // Prevent multiple file selection

                                            onChange={handleFileChange}
                                        />

                                    </div>

                                    <div className="w-2/3">
                                        <Select
                                            isRequired
                                            label="ประเภทสินค้า"
                                            className="mb-3 bg-fourth text-primary"
                                            size="sm"
                                            color="primary"
                                            name="pdc_id"
                                            onChange={handleProductInputChangeFix}
                                        >
                                            {productCat.map(type => (
                                                <SelectItem key={type.pdc_id} value={type.pdc_id}>
                                                    {type.pdc_name}
                                                </SelectItem>
                                            ))}
                                        </Select>
                                        <Input
                                            isRequired
                                            type="text"
                                            label="ชื่อสินค้า"
                                            size="sm"
                                            width="100%"
                                            className="mb-3 bg-fourth text-primary"
                                            color="primary"
                                            name="pd_name"
                                            onChange={handleProductInputChangeFix}
                                        // value={editProduct?.pd_name}
                                        />
                                        <Input
                                            isRequired
                                            type="number"
                                            label="จำนวนสินค้าขั้นต่ำ"
                                            size="sm"
                                            width="100%"
                                            className="mb-3 bg-fourth text-primary"
                                            color="primary"
                                            name="pd_qtyminimum"
                                            onChange={handleProductInputChangeFix}
                                        />
                                        <Select
                                            isRequired
                                            label="หน่วยสินค้า"
                                            className="mb-3 bg-fourth text-primary"
                                            size="sm"
                                            color="primary"
                                            name="pd_unit"
                                            onChange={handleProductInputChangeFix}
                                        >
                                            {unitOptions.map(type => (
                                                <SelectItem key={type.un_id} value={type.un_id}>
                                                    {type.un_name}
                                                </SelectItem>
                                            ))}
                                        </Select>

                                        <Input
                                            isRequired
                                            type="number"
                                            label="สูตรอาหารผลิตได้"
                                            size="sm"
                                            width="100%"
                                            className="mb-3 bg-fourth text-primary"
                                            color="primary"
                                            name="produced_qty"
                                            onChange={handlerecipeData}
                                        />

                                        <Input
                                            isRequired
                                            type="number"
                                            label="จำนวนวันที่อยู่ได้ของสินค้า"
                                            size="sm"
                                            width="100%"
                                            className="mb-3 bg-fourth text-primary"
                                            color="primary"
                                            name="qtylifetime"
                                            onChange={handlerecipeData}
                                        />
                                    </div>
                                </div>
                                <p className="font-medium text-[#C5B182]  border-b-1 border-b-[#C5B182] ">รายละเอียดวัตถุดิบ</p>
                                <div className="grid grid-cols-7 gap-2 items-center">
                                    <Select
                                        isRequired
                                        label="วัตถุดิบ"
                                        className=" bg-fourth text-primary col-span-2"
                                        size="sm"
                                        color="primary"
                                        name="ind_id"
                                        onChange={handleIngredientsFood}
                                        selectedKeys={ingredientsFood.ind_id ? [ingredientsFood.ind_id] : []}
                                    >
                                        {ingredientsOptions.map(type => (
                                            <SelectItem key={type.ind_id} value={type.ind_id}>
                                                {type.ind_name}
                                            </SelectItem>
                                        ))}
                                    </Select>
                                    <div className="flex items-center col-span-2">
                                        <Input
                                            isRequired
                                            type="number"
                                            label="ปริมาณ"
                                            size="sm"
                                            width="100%"
                                            className=" bg-fourth text-primary"
                                            color="primary"
                                            name="ingredients_qty"
                                            onChange={handleIngredientsFood}
                                            value={ingredientsFood.ingredients_qty == null ? "" : ingredientsFood.ingredients_qty}
                                        />

                                        <Popover placement="bottom" isOpen={isOpenPop} onOpenChange={(open) => setIsOpenPop(open)} showArrow offset={10} style={{ fontFamily: 'kanit' }} backdrop="opaque">
                                            <PopoverTrigger>
                                                <Button isIconOnly className="ml-2" variant="light" isDisabled={ingredientsFood.ind_id === "" ? true : false}>
                                                    <IoCalculator className="text-2xl" />
                                                </Button>
                                            </PopoverTrigger>
                                            <PopoverContent className="w-[340px]">
                                                {(titleProps) => (
                                                    <div className="px-1 py-2 w-full">
                                                        <p className="text-small font-bold text-foreground" {...titleProps}>
                                                            เครื่องแปลงหน่วย
                                                        </p>
                                                        <div className="mt-2 flex w-full">
                                                            <Input onChange={handleConvert} size="sm" name="convert_before" label="กรุณากรอกค่า" type="number" className=" bg-fourth text-primary" color="primary" />
                                                            <Select
                                                                label="หน่วยแปลง"
                                                                color="primary"
                                                                className="max-w-md bg-fourth text-primary ml-2"
                                                                size="sm"
                                                                value={convertData.convert_before_type}
                                                                name="convert_before_type"
                                                                onChange={handleConvert}
                                                                defaultSelectedKeys={["ช้อนชา"]}
                                                            >
                                                                {UnitDetail.map((item) => (
                                                                    <SelectItem key={item.name} value={item.name}>{item.name}</SelectItem>
                                                                ))}
                                                            </Select>
                                                        </div>

                                                        <div className="mt-2 flex w-full">
                                                            <Input value={result !== null ? result : "0"} onValueChange={setResult} name="convert_after" size="sm" label="ค่าที่แปลงแล้ว" readOnly type="number" className=" bg-fourth text-primary" color="primary" />
                                                            <Select
                                                                label="หน่วยแปลง"
                                                                color="primary"
                                                                name="convert_after_type"
                                                                className="max-w-md bg-fourth text-primary ml-2"
                                                                size="sm"
                                                                isDisabled
                                                                selectedKeys={ingredientsFood.ind_id ? [ingredientsOptions.find(unit => unit.ind_id == ingredientsFood.ind_id)?.un_ind_name] : []}
                                                            // onChange={handleConvert}
                                                            >
                                                                {UnitDetail.map(type => (
                                                                    <SelectItem key={type.name} value={type.name}>
                                                                        {type.name}
                                                                    </SelectItem>
                                                                ))}
                                                            </Select>
                                                        </div>
                                                        <div className="flex justify-end mt-3">
                                                            <Button className="bg-[#C5B182] text-white mr-2" onPress={() => setIsOpenPop(false)}>
                                                                ปิด
                                                            </Button>
                                                            <Button className="text-white bg-[#736648]" onClick={() => handleConvertAfter()}>
                                                                แทนที่
                                                            </Button>
                                                        </div>
                                                    </div>
                                                )}
                                            </PopoverContent>
                                        </Popover>

                                    </div>
                                    <Select
                                        isRequired
                                        label="หน่วย"
                                        name="un_id"
                                        size="sm"
                                        color="primary"
                                        className=" bg-fourth text-primary col-span-2"
                                        isDisabled
                                        selectedKeys={ingredientsFood.ind_id ? [ingredientsFood.un_id] : []}
                                    >
                                        <SelectItem key={ingredientsFood.un_id}>{ingredientsOptions.find(ingreds => ingreds.ind_id == ingredientsFood.ind_id)?.un_ind_name}</SelectItem>
                                    </Select>

                                    <Button className="text-white bg-[#F2B461]" size="md" onClick={handleSubmitIngredient} isDisabled={ingredientsFood.ind_id == '' || ingredientsFood.ingredients_qty == null || ingredientsFood.ingredients_qty == 0 ? true : false}>
                                        เพิ่มวัตถุดิบ
                                    </Button>
                                </div>

                                <div className="h-[200px] overflow-x-auto ">
                                    <table className="w-full text-sm text-center text-gray-500">
                                        <thead className="">
                                            <tr className="text-white  font-normal  bg-[#908362]  ">
                                                <td scope="col" className="px-6 py-3 ">
                                                    วัตถุดิบ
                                                </td>
                                                <td scope="col" className="px-6 py-3">
                                                    ปริมาณ
                                                </td>
                                                <td scope="col" className="px-6 py-3">
                                                    หน่วย
                                                </td>
                                                <td scope="col" className="px-6 py-3">

                                                </td>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {ingredientsFoodSave == null || ingredientsFoodSave.length === 0 ? (
                                                <tr>
                                                    <td colSpan={4} className="py-3">ไม่พบวัตถุดิบ</td>
                                                </tr>
                                            ) : ingredientsFoodSave.map((ing, index) => (
                                                <tr key={index} className="odd:bg-white  even:bg-[#F5F1E8] border-b h-10">
                                                    <td scope="row" className="text-[#73664B] px-6 py-1   whitespace-nowrap">
                                                        {ingredientsOptions.find(ingredient => ingredient.ind_id == ing.ind_id)?.ind_name}
                                                    </td>
                                                    <td className="px-6 py-1 text-[#73664B]">
                                                        {ing.ingredients_qty}
                                                    </td>
                                                    <td className="px-6 py-1 text-[#73664B]">
                                                        {ingredientsOptions.find(ingreds => ingreds.ind_id == ing.ind_id)?.un_ind_name}
                                                    </td>
                                                    <td>
                                                        <Button isIconOnly variant="light" onClick={() => removeIngredient(ing.ind_id)}>
                                                            <TrashIcon className="h-5 w-5 text-red-500" />
                                                        </Button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>


                            </ModalBody>
                            <ModalFooter>
                                <Button className="bg-[#C5B182] text-white" onPress={() => handleModalClose()}>
                                    ปิด
                                </Button>
                                <Button className="text-white bg-[#736648]" onClick={handleSubmitAdd}>
                                    บันทึก
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>


            {/* Model Edit */}
            <Modal isOpen={isOpenEdit} onOpenChange={onOpenChangeEdit} isDismissable={false} isKeyboardDismissDisabled={true} size="3xl">
                <ModalContent>
                    {(onCloseEdit) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1 text-[#F2B461]" style={{ fontFamily: 'kanit' }}>แก้ไขสูตรอาหาร</ModalHeader>
                            <ModalBody style={{ fontFamily: 'kanit' }}>
                                <div className='flex'>
                                    <div className='mr-5 '>
                                        <Card isFooterBlurred radius="lg" className="border-none max-w-[400px] max-h-[400px]">
                                            <Image
                                                alt="Product"
                                                className="w-[250px] object-cover h-[250px]"
                                                height={400}
                                                sizes={`(max-width: 768px) ${400}px, ${400}px`}
                                                src={uploadedImage || "/images/logo.svg"}
                                                width={400}
                                            />
                                            <CardFooter className="flex justify-center before:bg-white/10 border-white/20 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10">
                                                <Button
                                                    className="text-tiny text-white bg-[#73664B]"
                                                    color="danger"
                                                    radius="lg"
                                                    size="sm"
                                                    onClick={handleClick}
                                                >
                                                    เปลี่ยน
                                                </Button>

                                                {uploadedImage != null && (
                                                    <Button
                                                        className="text-tiny text-white bg-[#73664B]"
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
                                        <small className="text-default-400">รองรับไฟล์ .png .jpg</small>
                                        <input
                                            style={{ display: 'none' }}
                                            ref={inputRef}
                                            type="file"
                                            onChange={handleFileChange}
                                        />
                                    </div>

                                    <div className="w-2/3">
                                        <Select
                                            isRequired
                                            label="ประเภทสินต้า"
                                            className="mb-3 bg-fourth text-primary"
                                            size="sm"
                                            color="primary"
                                            name="pdc_id"
                                            onChange={handleProductInputEdit}
                                            selectedKeys={[editProduct.pdc_name]}
                                            value={productCat.find(cat => cat.pdc_name == editProduct.pdc_name)?.pdc_id}
                                        >
                                            {productCat.map(type => (
                                                <SelectItem key={type.pdc_name} value={type.pdc_id}>
                                                    {type.pdc_name}
                                                </SelectItem>
                                            ))}
                                        </Select>
                                        <Input
                                            isRequired
                                            type="text"
                                            label="ชื่อสินค้า"
                                            size="sm"
                                            width="100%"
                                            className="mb-3 bg-fourth text-primary"
                                            color="primary"
                                            name="pd_name"
                                            onChange={handleProductInputEdit}
                                            value={editProduct.pd_name}
                                        />
                                        <Input
                                            isRequired
                                            type="number"
                                            label="จำนวนสินค้าขั้นต่ำ"
                                            size="sm"
                                            width="100%"
                                            className="mb-3 bg-fourth text-primary"
                                            color="primary"
                                            name="pd_qtyminimum"
                                            onChange={handleProductInputEdit}
                                            value={editProduct.pd_qtyminimum.toString()}
                                        />
                                        <Select
                                            isRequired
                                            label="หน่วยสินค้า"
                                            className="mb-3 bg-fourth text-primary"
                                            size="sm"
                                            color="primary"
                                            name="pd_unit"
                                            onChange={handleProductInputEdit}
                                            selectedKeys={[editProduct.un_name]}
                                        >
                                            {unitOptions.map(type => (
                                                <SelectItem key={type.un_name} value={type.un_id}>
                                                    {type.un_name}
                                                </SelectItem>
                                            ))}
                                        </Select>

                                        <Input
                                            isRequired
                                            type="number"
                                            label="สูตรอาหารผลิตได้"
                                            size="sm"
                                            width="100%"
                                            className="mb-3 bg-fourth text-primary"
                                            color="primary"
                                            name="produced_qty"
                                            onChange={handleProductInputEdit}
                                            value={editProduct.produced_qty.toString()}
                                        />

                                        <Input
                                            isRequired
                                            type="number"
                                            label="จำนวนวันที่อยู่ได้ของสินค้า"
                                            size="sm"
                                            width="100%"
                                            className="mb-3 bg-fourth text-primary"
                                            color="primary"
                                            name="qtylifetime"
                                            onChange={handleProductInputEdit}
                                            value={editProduct.qtylifetime.toString()}
                                        />

                                        <Switch
                                            isSelected={switchStatus}
                                            onChange={changeStatus}
                                            classNames={{
                                                base: "inline-flex flex-row-reverse w-full max-w-md bg-content1 hover:bg-content2 items-center justify-between cursor-pointer rounded-lg gap-2 p-2 mb-3 border-2 border-transparent data-[selected=true]:border-primary",
                                                wrapper: "p-0 h-4 overflow-visible",
                                                thumb: "w-6 h-6 border-2 shadow-lg group-data-[hover=true]:border-primary group-data-[selected=true]:ml-6 group-data-[pressed=true]:w-7 group-data-[selected]:group-data-[pressed]:ml-4",
                                            }}
                                        >
                                            <div className="flex flex-col gap-1">
                                                <p className="text-small text-primary">สถานะสินค้า: {switchStatus ? "เปิดใช้งาน" : "ปิดใช้งาน"}</p>
                                                <p className="text-tiny text-default-400">
                                                    {switchStatus ? "สูตรอาหารจะแสดงให้ใช้งาน" : "สูตรอาหารจะไม่แสดงให้ใช้งาน"}
                                                </p>
                                            </div>
                                        </Switch>
                                    </div>
                                </div>
                                <p className="font-medium text-[#C5B182]  border-b-1 border-b-[#C5B182] ">รายละเอียดวัตถุดิบ</p>
                                <div className="grid grid-cols-7 gap-2 items-center">
                                    <Select
                                        isRequired
                                        label="วัตถุดิบ"
                                        className=" bg-fourth text-primary col-span-2"
                                        size="sm"
                                        color="primary"
                                        name="ind_id"
                                        onChange={handleIngredientsFood}
                                        selectedKeys={ingredientsFood.ind_id ? [ingredientsFood.ind_id] : []}
                                    >
                                        {ingredientsOptions.map(type => (
                                            <SelectItem key={type.ind_id} value={type.ind_id}>
                                                {type.ind_name}
                                            </SelectItem>
                                        ))}
                                    </Select>
                                    <div className="flex items-center col-span-2">
                                        <Input
                                            isRequired
                                            type="number"
                                            label="ปริมาณ"
                                            size="sm"
                                            width="100%"
                                            className=" bg-fourth text-primary"
                                            color="primary"
                                            name="ingredients_qty"
                                            onChange={handleIngredientsFood}
                                            value={ingredientsFood.ingredients_qty == null ? "" : ingredientsFood.ingredients_qty}
                                        />

                                        <Popover placement="bottom" isOpen={isOpenPop} onOpenChange={(open) => setIsOpenPop(open)} showArrow offset={10} style={{ fontFamily: 'kanit' }} backdrop="opaque">
                                            <PopoverTrigger>
                                                <Button isIconOnly className="ml-2" variant="light" isDisabled={ingredientsFood.ind_id === "" ? true : false}>
                                                    <IoCalculator className="text-2xl" />
                                                </Button>
                                            </PopoverTrigger>
                                            <PopoverContent className="w-[340px]">
                                                {(titleProps) => (
                                                    <div className="px-1 py-2 w-full">
                                                        <p className="text-small font-bold text-foreground" {...titleProps}>
                                                            เครื่องแปลงหน่วย
                                                        </p>
                                                        <div className="mt-2 flex w-full">
                                                            <Input onChange={handleConvert} size="sm" name="convert_before" label="กรุณากรอกค่า" type="number" className=" bg-fourth text-primary" color="primary" />
                                                            <Select
                                                                label="หน่วยแปลง"
                                                                color="primary"
                                                                className="max-w-md bg-fourth text-primary ml-2"
                                                                size="sm"
                                                                value={convertData.convert_before_type}
                                                                name="convert_before_type"
                                                                onChange={handleConvert}
                                                                defaultSelectedKeys={["ช้อนชา"]}
                                                            >
                                                                {UnitDetail.map((item) => (
                                                                    <SelectItem key={item.name} value={item.name}>{item.name}</SelectItem>
                                                                ))}
                                                            </Select>
                                                        </div>

                                                        <div className="mt-2 flex w-full">
                                                            <Input value={result !== null ? result : "0"} onValueChange={setResult} name="convert_after" size="sm" label="ค่าที่แปลงแล้ว" readOnly type="number" className=" bg-fourth text-primary" color="primary" />
                                                            <Select
                                                                label="หน่วยแปลง"
                                                                color="primary"
                                                                name="convert_after_type"
                                                                className="max-w-md bg-fourth text-primary ml-2"
                                                                size="sm"
                                                                isDisabled
                                                                selectedKeys={ingredientsFood.ind_id ? [ingredientsOptions.find(unit => unit.ind_id == ingredientsFood.ind_id)?.un_ind_name] : []}
                                                            // onChange={handleConvert}
                                                            >
                                                                {UnitDetail.map(type => (
                                                                    <SelectItem key={type.name} value={type.name}>
                                                                        {type.name}
                                                                    </SelectItem>
                                                                ))}
                                                            </Select>
                                                        </div>
                                                        <div className="flex justify-end mt-3">
                                                            <Button className="bg-[#C5B182] text-white mr-2" onPress={() => setIsOpenPop(false)}>
                                                                ปิด
                                                            </Button>
                                                            <Button className="text-white bg-[#736648]" onClick={() => handleConvertAfter()}>
                                                                แทนที่
                                                            </Button>
                                                        </div>
                                                    </div>
                                                )}
                                            </PopoverContent>
                                        </Popover>

                                    </div>
                                    <Select
                                        isRequired
                                        label="หน่วย"
                                        name="un_id"
                                        size="sm"
                                        color="primary"
                                        className=" bg-fourth text-primary col-span-2"
                                        isDisabled
                                        selectedKeys={ingredientsFood.ind_id ? [ingredientsFood.un_id] : []}
                                    >
                                        <SelectItem key={ingredientsFood.un_id}>{ingredientsOptions.find(ingreds => ingreds.ind_id == ingredientsFood.ind_id)?.un_ind_name}</SelectItem>
                                    </Select>

                                    <Button className="text-white bg-[#F2B461]" size="md" onClick={handleSubmitIngredientEdit} isDisabled={ingredientsFood.ind_id == '' || ingredientsFood.ingredients_qty == null || ingredientsFood.ingredients_qty == 0 ? true : false}>
                                        เพิ่มวัตถุดิบ
                                    </Button>
                                </div>

                                <div className="h-[200px] overflow-x-auto ">
                                    <table className="w-full text-sm text-center text-gray-500">
                                        <thead className="">
                                            <tr className="text-white  font-normal  bg-[#908362]  ">
                                                <td scope="col" className="px-6 py-3 ">
                                                    วัตถุดิบ
                                                </td>
                                                <td scope="col" className="px-6 py-3">
                                                    ปริมาณ
                                                </td>
                                                <td scope="col" className="px-6 py-3">
                                                    หน่วย
                                                </td>
                                                <td scope="col" className="px-6 py-3">

                                                </td>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {ingredientsFoodEdit == null || ingredientsFoodEdit.length === 0 ? (
                                                <tr>
                                                    <td colSpan={4} className="py-3">ไม่พบวัตถุดิบ</td>
                                                </tr>
                                            ) : ingredientsFoodEdit.map((ing, index) => (
                                                <tr key={index} className="odd:bg-white  even:bg-[#F5F1E8] border-b h-10">
                                                    <td scope="row" className="text-[#73664B] px-6 py-1   whitespace-nowrap">
                                                        {ingredientsOptions.find(ingredient => ingredient.ind_id == ing.ind_id)?.ind_name}
                                                    </td>
                                                    <td className="px-6 py-1 text-[#73664B]">
                                                        {ing.ingredients_qty}
                                                    </td>
                                                    <td className="px-6 py-1 text-[#73664B]">
                                                        {ingredientsOptions.find(ingreds => ingreds.ind_id == ing.ind_id)?.un_ind_name}
                                                    </td>
                                                    <td>
                                                        <Button isIconOnly variant="light" onClick={() => removeIngredientEdit(ing.ind_id)}>
                                                            <TrashIcon className="h-5 w-5 text-red-500" />
                                                        </Button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>


                            </ModalBody>
                            <ModalFooter>
                                <Button className="bg-[#C5B182] text-white" onPress={onCloseEdit}>
                                    ปิด
                                </Button>
                                <Button className="text-white bg-[#736648]" onClick={() => handleSubmitEdit()}>
                                    บันทึก
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>

            {/* Model Read */}
            <Modal isOpen={isOpenRead} onOpenChange={onOpenChangeRead} isDismissable={false} isKeyboardDismissDisabled={true} size="3xl">
                <ModalContent>
                    {(onCloseRead) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1 text-[#F2B461]" style={{ fontFamily: 'kanit' }}>แก้ไขสูตรอาหาร</ModalHeader>
                            <ModalBody style={{ fontFamily: 'kanit' }}>
                                <div className='flex'>
                                    <div className='mr-5 '>
                                        <Card isFooterBlurred radius="lg" className="border-none max-w-[400px] max-h-[400px]">
                                            <Image
                                                alt="Product"
                                                className="w-[250px] object-cover h-[250px]"
                                                height={400}
                                                sizes={`(max-width: 768px) ${400}px, ${400}px`}
                                                src={uploadedImage || "/images/logo.svg"}
                                                width={400}
                                            />

                                        </Card>
                                    </div>

                                    <div className="w-2/3">
                                        <Select
                                            isDisabled
                                            label="ประเภทสินค้า"
                                            className="mb-3 bg-fourth text-primary"
                                            size="sm"
                                            color="primary"
                                            name="pdc_id"
                                            selectedKeys={[editProduct.pdc_name]}
                                            value={productCat.find(cat => cat.pdc_name == editProduct.pdc_name)?.pdc_id}
                                        >
                                            {productCat.map(type => (
                                                <SelectItem key={type.pdc_name} value={type.pdc_id}>
                                                    {type.pdc_name}
                                                </SelectItem>
                                            ))}
                                        </Select>
                                        <Input
                                            isReadOnly
                                            type="text"
                                            label="ชื่อสินค้า"
                                            size="sm"
                                            width="100%"
                                            className="mb-3 bg-fourth text-primary"
                                            color="primary"
                                            name="pd_name"
                                            value={editProduct.pd_name}
                                        />
                                        <Input
                                            isReadOnly
                                            type="number"
                                            label="จำนวนสินค้าขั้นต่ำ"
                                            size="sm"
                                            width="100%"
                                            className="mb-3 bg-fourth text-primary"
                                            color="primary"
                                            name="pd_qtyminimum"
                                            value={editProduct.pd_qtyminimum.toString()}
                                        />
                                        <Select
                                            isDisabled
                                            label="หน่วยสินค้า"
                                            className="mb-3 bg-fourth text-primary"
                                            size="sm"
                                            color="primary"
                                            name="pd_unit"
                                            selectedKeys={[editProduct.un_name]}
                                        >
                                            {unitOptions.map(type => (
                                                <SelectItem key={type.un_name} value={type.un_id}>
                                                    {type.un_name}
                                                </SelectItem>
                                            ))}
                                        </Select>

                                        <Input
                                            isReadOnly
                                            type="number"
                                            label="สูตรอาหารผลิตได้"
                                            size="sm"
                                            width="100%"
                                            className="mb-3 bg-fourth text-primary"
                                            color="primary"
                                            name="qtylifetime"
                                            value={editProduct.qtylifetime.toString()}
                                        />

                                        <Input
                                            isReadOnly
                                            type="number"
                                            label="จำนวนวันที่อยู่ได้ของสินค้า"
                                            size="sm"
                                            width="100%"
                                            className="mb-3 bg-fourth text-primary"
                                            color="primary"
                                            name="produced_qty"
                                            value={editProduct.produced_qty.toString()}
                                        />

                                        <Switch
                                            isDisabled
                                            isSelected={switchStatus}
                                            onChange={changeStatus}
                                            classNames={{
                                                base: "inline-flex flex-row-reverse w-full max-w-md bg-content1 hover:bg-content2 items-center justify-between cursor-pointer rounded-lg gap-2 p-2 mb-3 border-2 border-transparent data-[selected=true]:border-primary",
                                                wrapper: "p-0 h-4 overflow-visible",
                                                thumb: "w-6 h-6 border-2 shadow-lg group-data-[hover=true]:border-primary group-data-[selected=true]:ml-6 group-data-[pressed=true]:w-7 group-data-[selected]:group-data-[pressed]:ml-4",
                                            }}
                                        >
                                            <div className="flex flex-col gap-1">
                                                <p className="text-small text-primary">สถานะสินค้า: {switchStatus ? "เปิดใช้งาน" : "ปิดใช้งาน"}</p>
                                                <p className="text-tiny text-default-400">
                                                    {switchStatus ? "สูตรอาหารจะแสดงให้ใช้งาน" : "สูตรอาหารจะไม่แสดงให้ใช้งาน"}
                                                </p>
                                            </div>
                                        </Switch>
                                    </div>
                                </div>
                                <p className="font-medium text-[#C5B182]  border-b-1 border-b-[#C5B182] ">รายละเอียดวัตถุดิบ</p>


                                <div className="h-[200px] overflow-x-auto ">
                                    <table className="w-full text-sm text-center text-gray-500">
                                        <thead className="">
                                            <tr className="text-white  font-normal  bg-[#908362]  ">
                                                <td scope="col" className="px-6 py-3 ">
                                                    วัตถุดิบ
                                                </td>
                                                <td scope="col" className="px-6 py-3">
                                                    ปริมาณ
                                                </td>
                                                <td scope="col" className="px-6 py-3">
                                                    หน่วย
                                                </td>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {ingredientsFoodEdit == null || ingredientsFoodEdit.length === 0 ? (
                                                <tr>
                                                    <td colSpan={4} className="py-3">ไม่พบวัตถุดิบ</td>
                                                </tr>
                                            ) : ingredientsFoodEdit.map((ing, index) => (
                                                <tr key={index} className="odd:bg-white  even:bg-[#F5F1E8] border-b h-10">
                                                    <td scope="row" className="text-[#73664B] px-6 py-1   whitespace-nowrap">
                                                        {ingredientsOptions.find(ingredient => ingredient.ind_id == ing.ind_id)?.ind_name}
                                                    </td>
                                                    <td className="px-6 py-1 text-[#73664B]">
                                                        {ing.ingredients_qty}
                                                    </td>
                                                    <td className="px-6 py-1 text-[#73664B]">
                                                        {ingredientsOptions.find(ingreds => ingreds.ind_id == ing.ind_id)?.un_ind_name}
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>


                            </ModalBody>
                            <ModalFooter>
                                <Button className="bg-[#C5B182] text-white" onPress={onCloseRead}>
                                    ปิด
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>

        </div>
    )
}

export default Recipeall