import React, { Fragment, useEffect, useState, useRef } from "react";
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import { IoCalculator } from "react-icons/io5";
import Link from "next/link";
import { ChevronLeftIcon, MagnifyingGlassIcon, PlusIcon, PencilSquareIcon } from "@heroicons/react/24/outline";
import { Kanit } from "next/font/google";
import { Icon } from '@iconify/react';
import { useRouter } from "next/router";
import { Divider, Popover, PopoverTrigger, PopoverContent, Tooltip, Input, Select, SelectItem, Card, CardFooter, Spinner, Image, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure, Button } from "@nextui-org/react";
import Head from 'next/head'


function Recipeall() {
    const router = useRouter();
    const { id } = router.query;
    const [Recipe, setRecipe] = useState([]);
    const [statusLoading, setStatusLoading] = useState(false);
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [unitOptions, setUnitOptions] = useState([]);
    const [productCat, setProductCat] = useState([]);
    const [ingredientsOptions, setIngredientsOptions] = useState<Ingredients[]>([]);
    const [uploadedImage, setUploadedImage] = useState(null);
    const [imageUpload, setImageUpload] = useState(null);
    const [Ingredientall, setIngredientall] = React.useState([]);
    const [isOpenPop, setIsOpenPop] = React.useState(false);
    const unit = [
        { key: "teaspoon", label: "ช้อนชา" },
        { key: "tablespoon", label: "ช้อนโต๊ะ" },
    ]

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

    const [product, setProduct] = useState({
        pd_name: '',
        pd_qtyminimum: 0,
        status: 'A',
        picture: "/images/logo.svg",
        pd_unit: '1',
        pdc_id: 1,
        recipe: {
            qtylifetime: "",
            produced_qty: "",
            un_id: 0
        },
        recipedetail: []
    });

    const [ingredientsFood, setIngredientsFood] = useState({
        ind_id: "",
        ingredients_qty: 0,
        un_id: ""
    })

    const [ convertData, setConvertData] = useState({
        convert_before: 0,
        convert_before_type: "teaspoon",
        convert_after_type: "",
        convert_after: 0
    })

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

    const handleClickDelete = () => {
        setProduct(prevState => ({
            ...prevState,
            picture: '/images/logo.svg'
        }));
        setUploadedImage(null);
        setImageUpload(null);
    }

    const handleProductInputChangeFix = (e) => {
        const { name, value } = e.target;
        setProduct(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

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

    const handleConvert = (e) => {
        const { name, value } = e.target;
        setConvertData(prevState => ({
            ...prevState,
            [name]: value
        })
    )}

    console.log("convert", convertData)

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
                    <button onClick={() => onOpen()} className="px-3 p-2 text-sm rounded-full text-white bg-[#73664B] border  hover:bg-[#5E523C] flex">
                        <PlusIcon className="h-5 w-5 text-white mr-2" />
                        เพิ่ม
                    </button>
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
                                                    <button type="button">
                                                        <Link href={`/product/recipeedit/${recipe.pd_id}`} className="w-full flex justify-center items-center">
                                                            <PencilSquareIcon className="h-4 w-4 text-[#73664B]" />
                                                        </Link>
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
                                                    <button className="flex justify-end">
                                                        <Link href={`./recipedetail/${recipe.pd_id}`}>
                                                            <div className="badge badge-outline">สูตรอาหาร</div>
                                                        </Link>
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
                                            onChange={handleProductInputChangeFix}
                                        >
                                            {productCat.map(type => (
                                                <SelectItem key={`Cet${type.pdc_id}`} value={type.pdc_id}>
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

                                        >
                                            {unitOptions.map(type => (
                                                <SelectItem key={`Unit${type.un_id}`} value={type.un_id}>
                                                    {type.un_name}
                                                </SelectItem>
                                            ))}
                                        </Select>
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
                                            type="text"
                                            label="ปริมาณ"
                                            size="sm"
                                            width="100%"
                                            className=" bg-fourth text-primary"
                                            color="primary"
                                            name="ingredients_qty"
                                            onChange={handleIngredientsFood}
                                        />

                                        <Popover placement="bottom" isOpen={isOpenPop} onOpenChange={(open) => setIsOpenPop(open)} showArrow offset={10} style={{ fontFamily: 'kanit' }}  backdrop="opaque">
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
                                                                defaultSelectedKeys={["teaspoon"]}
                                                            >
                                                                {unit.map((item) => (
                                                                    <SelectItem key={item.key} value={item.key}>{item.label}</SelectItem>
                                                                ))}
                                                            </Select>
                                                        </div>

                                                        <div className="mt-2 flex w-full">
                                                            <Input onChange={handleConvert} name="convert_after" size="sm" label="ค่าที่แปลงแล้ว" defaultValue="0" readOnly type="number" className=" bg-fourth text-primary" color="primary" />
                                                            <Select
                                                                label="หน่วยแปลง"
                                                                color="primary"
                                                                name="convert_after_type"
                                                                className="max-w-md bg-fourth text-primary ml-2"
                                                                size="sm"
                                                                isDisabled
                                                                selectedKeys={ingredientsFood.ind_id ? [ingredientsFood.un_id] : []}
                                                                onChange={handleConvert}
                                                            >
                                                                {unitOptions.map(type => (
                                                                    <SelectItem key={type.un_id} value={type.un_id}>
                                                                        {type.un_name}
                                                                    </SelectItem>
                                                                ))}
                                                            </Select>
                                                        </div>

                                                        <div className="flex justify-end mt-3">
                                                            <Button className="bg-[#C5B182] text-white mr-2" onPress={()=> setIsOpenPop(false)}>
                                                                ปิด
                                                            </Button>
                                                            <Button className="text-white bg-[#736648]">
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
                                        {ingredientsFood.ind_id === "" ? (
                                            <SelectItem key="placeholder">เลือกวัตถุดิบก่อน</SelectItem>
                                        ) : (
                                            unitOptions.map(type => (
                                                <SelectItem key={type.un_id} value={type.un_id}>
                                                    {type.un_name}
                                                </SelectItem>
                                            ))
                                        )}
                                    </Select>

                                    <Button className="text-white bg-[#F2B461]" size="md">
                                        เพิ่มวัตถุดิบ
                                    </Button>
                                </div>


                            </ModalBody>
                            <ModalFooter>
                                <Button className="bg-[#C5B182] text-white" onPress={onClose}>
                                    ปิด
                                </Button>
                                <Button className="text-white bg-[#736648]" onPress={onClose}>
                                    บันทึก
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