import React, { useState, useRef, useEffect } from 'react'
import { Switch, CheckboxGroup, Tabs, Chip, User, Tab, cn, Input, Avatar, Card, CardHeader, CardBody, Divider, ScrollShadow, Button, Select, SelectItem, CardFooter, Spinner, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure, Checkbox, Textarea, RadioGroup, Radio, Breadcrumbs, BreadcrumbItem, Image } from "@nextui-org/react";
import { CiTrash } from "react-icons/ci";
import { FaTrash } from 'react-icons/fa';
import menusell from '../data/menusell';
// import { revalidatePath } from 'next/cache';
import { useRouter } from 'next/router';

export const CustomRadio = (props) => {
  const { children, ...otherProps } = props;



  return (
    <Radio
      {...otherProps}
      classNames={{
        base: cn(
          "inline-flex max-w-full w-full bg-content1 m-0",
          "hover:bg-content2 items-center justify-start",
          "cursor-pointer rounded-lg gap-2 p-4 border-2 border-transparent",
          "data-[selected=true]:border-primary"
        ),
      }}
    >
      {children}
    </Radio>
  );
};

interface AddSellProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  onClose: () => void;
  typesellmenufix: any;
  typesellmenumix: any;
  doughAllData: any;
  diffAllData: any;
}



export default function AddSell({
  isOpen,
  onOpenChange,
  onClose,
  typesellmenufix,
  typesellmenumix,
  doughAllData,
  diffAllData,
}: AddSellProps) {

  const [sellMenuFix, setSellMenuFix] = useState({
    id: 8,
    name: "",
    price: 0,
    type: "",
    image: '/images/logo.svg',
    status: 'Close',
    selltype: 1,
    product: [

    ]
  });

  const [quantityData, setQuantityData] = useState(0);
  const selectedType = typesellmenufix.find(type => type.id === sellMenuFix.type.toString());
  const remainingQuantity = selectedType ? selectedType.num - sellMenuFix.product.reduce((acc, item) => acc + item.quantity, 0) : 0;
  const inputRef = useRef(null);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [imageUpload, setImageUpload] = useState(null);
  const [isLoanding, setIsLoading] = useState(false);
  const [submitRequested, setSubmitRequested] = useState(false);

  const router = useRouter();

  const [sellSelectMix, setSellSelectMix] = React.useState([]);

  const [switchStatus, setSwitchStatus] = useState(false);

  const changeStatus = () => {
    setSwitchStatus(!switchStatus);
    if (switchStatus) {
      setSellMenuFix((prevProduct) => ({
        ...prevProduct,
        status: "Close"
      }));
    } else {
      setSellMenuFix((prevProduct) => ({
        ...prevProduct,
        status: "Open"
      }));
    }
  }


  const handleAddProduct = () => {
    setSellMenuFix(prevState => ({
      ...prevState,
      product: [...prevState.product, { id: '', quantity: 1 }]
    }));
  };

  const handleSelechTypeTwo = () => {
    setSellMenuFix(prevState => ({
      ...prevState,
      product: [...prevState.product, { id: '0' }],
      type: "",
      image: '/images/logo.svg'
    }));
    setUploadedImage(null);
    setImageUpload(null);
  };

  const handleSelechTypeOne = () => {
    setSellMenuFix(prevState => ({
      ...prevState,
      product: [],
      type: "",
      image: '/images/logo.svg'
    }));
    setUploadedImage(null);
    setImageUpload(null);
  };

  const handleProductChange = (index, value) => {
    setSellMenuFix(prevState => {
      const updatedProducts = [...prevState.product];
      updatedProducts[index].id = value;
      return {
        ...prevState,
        product: updatedProducts
      };
    });
  };


  // const handleQuantityChange = (index, delta) => {
  //     setSellMenuFix(prevState => {
  //         const updatedProducts = [...prevState.product];
  //         updatedProducts[index].quantity = Math.max(updatedProducts[index].quantity + delta);


  //         return {
  //             ...prevState,
  //             product: updatedProducts
  //         };
  //     });
  // };

  const handleQuantityChange = (index, delta) => {
    setSellMenuFix(prevState => {
      const newProduct = { ...prevState.product[index] };
      newProduct.quantity = Math.max(0, newProduct.quantity + delta);

      const updatedProducts = prevState.product.map((item, idx) =>
        idx === index ? newProduct : item
      );

      return {
        ...prevState,
        product: updatedProducts
      };
    });
  };


  const handleDelete = (index) => {
    setSellMenuFix(prevState => {
      const updatedProducts = [...prevState.product];
      updatedProducts.splice(index, 1);
      return {
        ...prevState,
        product: updatedProducts
      };
    });
  };

  const handleProductInputChangeFix = (e) => {
    const { name, value } = e.target;
    setSellMenuFix(prevState => ({
      ...prevState,
      [name]: value,
      product: []
    }));
    setSellSelectMix([])
  };

  const handSelectedChange = (e) => {
    const selectedValue = JSON.parse(e.target.value);
    const { id, image } = selectedValue;

    setSellMenuFix((prevSellMenuFix) => ({
      ...prevSellMenuFix,
      product: [{ id: id, image: image }]
    }));

    if (imageUpload == null) {
      setUploadedImage(image);
      addData(image,"image");
    }

    // console.log(id);
    // console.log(image);
  };

  // console.log(sellMenuFix.product.length);

  const handleClick = () => {
    inputRef.current.click();
  };

  const handleFileChange = (event) => {
    const fileObj = event.target.files && event.target.files[0];
    if (!fileObj) {
      return;
    }
    setUploadedImage(URL.createObjectURL(fileObj));
    console.log("Oringinal => ", fileObj)
    console.log("Uploade => ", URL.createObjectURL(fileObj))
    setImageUpload(fileObj);

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
        addData(data.pathFile,"image");
      })
      .catch(error => console.error(error));
  };

  const handleClickDelete = () => {
    setSellMenuFix(prevState => ({
      ...prevState,
      image: '/images/logo.svg'
    }));
    setUploadedImage(null);
    setImageUpload(null);
  }

  const clearData = () => {
    setSellMenuFix({
      id: 8,
      name: "",
      price: 0,
      type: "",
      image: 'images/logo.svg',
      status: 'Close',
      selltype: 1,
      product: [

      ]
    })
    setImageUpload(null);
    setUploadedImage(null);
  }

  // console.log(sellMenuFix.product);

  const sellSubmit = async (sellType) => {
    if(sellType == 2){
    if (sellMenuFix.type == "4") {
      addData(2, "selltype");
    } else if (sellMenuFix.type == "1" || sellMenuFix.type == "2") {
      if (sellSelectMix.length > 0) {
        const newProducts = sellSelectMix.map(item => ({ id: item }));
        setSellMenuFix(prevState => ({
          ...prevState,
          product: [...prevState.product, ...newProducts]
        }));
      addData(2, "selltype");
      }
    }}
    // console.log(sellType);
    setIsLoading(true);
    setSubmitRequested(true);
  }

  const submit = () => {
    menusell.push(sellMenuFix);
    setTimeout(() => {
      setIsLoading(false);
      console.log(menusell);
      // console.log(sellMenuFix);
      clearData(); // เคลียร์ข้อมูลหลังจากเพิ่มข้อมูลเข้าอาร์เรย์
      onClose(); // ปิด Modal
      router.replace('/product/sell_all'); // นำทางไปยังหน้าอื่น
    }, 2000);
  }

  const addData = (data,name) => {
    setSellMenuFix(prevState => ({
      ...prevState,
      [name]: data
    }));
  }

  useEffect(() => {
    if (submitRequested) {
      submit();
      setSubmitRequested(false); // Reset the flag
    }
  }, [sellMenuFix, submitRequested]);

  console.log(sellMenuFix);


  return (


    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      placement="center"
      size='xl'
      isDismissable={false} isKeyboardDismissDisabled={true}
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1 text-[#F2B461]" style={{ fontFamily: 'kanit' }}>เพิ่มเมนูสำหรับขาย</ModalHeader>
            <ModalBody style={{ fontFamily: 'kanit' }}>
              <Tabs aria-label="Options" className="text-primary" style={{ color: "#73664B" }} onClick={handleSelechTypeOne}>

                {/* Tab1 */}

                <Tab key="fix" title="เมนูกำหนดไว้" className="text-primary" >
                  <div className='flex'>
                    <div className='mr-5 '>

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
                    <div className='w-2/3'>
                      {/* {Menu name} */}
                      <Input
                        isRequired
                        type="text"
                        label="ชื่อเมนู"
                        size="sm"
                        width="100%"
                        className='mb-3 bg-fourth text-primary label-primary'
                        color="primary"
                        name="name"
                        // variant="faded"
                        onChange={handleProductInputChangeFix}
                      />
                      <Select
                        isRequired
                        label="ประเภทเมนูสำหรับขาย"
                        className="max-w-xs mb-3 bg-fourth text-primary label-primary"
                        // variant="faded"
                        size="sm"
                        color="primary"
                        name="type"
                        onChange={handleProductInputChangeFix}

                      >
                        {typesellmenufix.map((type) => (
                          <SelectItem key={type.id} value={type.id}>
                            {type.name}
                          </SelectItem>
                        ))}
                      </Select>

                      <Input
                        isRequired
                        type="number"
                        label="ราคา"
                        size="sm"
                        width="100%"
                        className='mb-3 bg-fourth text-primary label-primary'
                        color="primary"
                        name="price"
                        onChange={handleProductInputChangeFix}

                      // variant="faded"
                      // onChange={(e) => setLname(e.target.value)}
                      />

                      <Switch
                        classNames={{
                          base: cn(
                            "inline-flex flex-row-reverse w-full max-w-md bg-content1 hover:bg-content2 items-center",
                            "justify-between cursor-pointer rounded-lg gap-2 p-2 mb-3 border-2 border-transparent",
                            "data-[selected=true]:border-primary",
                          ),
                          wrapper: "p-0 h-4 overflow-visible",
                          thumb: cn("w-6 h-6 border-2 shadow-lg",
                            "group-data-[hover=true]:border-primary",
                            //selected
                            "group-data-[selected=true]:ml-6",
                            // pressed
                            "group-data-[pressed=true]:w-7",
                            "group-data-[selected]:group-data-[pressed]:ml-4",
                          ),
                        }}
                        onChange={changeStatus}
                      >
                        <div className="flex flex-col gap-1">
                          <p className="text-small text-primary">สถานะสินค้า: {switchStatus ? "เปิดใช้งาน" : "ปิดใช้งาน"}</p>
                          <p className="text-tiny text-default-400">
                            {switchStatus ? "สินค้ากำลังแสดงที่หน้าเมนูขายหน้าร้าน" : "สินค้าปิดแสดงที่หน้าเมนูขายหน้าร้าน"}
                          </p>
                        </div>
                      </Switch>


                    </div>


                  </div>

                  <Card {...(sellMenuFix.type == "" ? { isDisabled: true } : { isDisabled: false })}>
                    <CardHeader className=" flex justify-between">
                      <p className="text-xs items-end justify-end text-[#73664B]">จำนวนสินค้าทั้งหมด : {sellMenuFix.product.length}</p>
                      <p className="text-xs items-end justify-end text-[#73664B]">จำนวนชิ้นคงเหลือ : {remainingQuantity}</p>
                    </CardHeader>
                    <Divider />
                    <CardBody className="h-[150px] overflow-auto">
                      {sellMenuFix.product.map((product, index) => (
                        <div key={index} className="flex items-center w-full mt-3">
                          <div className="flex h-min items-center w-3/4">
                            <Select
                              isRequired
                              label="ประเภทเมนูสำหรับขาย"
                              className="max-w-xs bg-fourth text-primary label-primary"
                              size="sm"
                              color="primary"
                              name="type"
                              onChange={(e) => handleProductChange(index, e.target.value)}
                            >
                              {doughAllData.map((prod) => (
                                <SelectItem key={prod.id} value={prod.id}>
                                  {prod.name}
                                </SelectItem>
                              ))}
                            </Select>
                          </div>
                          <div className="flex w-full">
                            <p className="text-sm px-2 pl-10 w-2/3 items-end justify-end py-2 text-[#73664B]">จำนวนชิ้น :</p>
                            <div className="flex items-center w-3/5">
                              <button
                                className="btn btn-square bg-[#D9CAA7] btn-sm"
                                onClick={() => handleQuantityChange(index, -1)}
                                disabled={sellMenuFix.product[index].id === "" || product.quantity === 0}
                              >
                                <svg
                                  className="text-[#73664B]"
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="1em"
                                  height="1em"
                                  viewBox="0 0 256 256"
                                >
                                  <path
                                    fill="currentColor"
                                    d="M228 128a12 12 0 0 1-12 12H40a12 12 0 0 1 0-24h176a12 12 0 0 1 12 12"
                                  />
                                </svg>
                              </button>
                              <span className="w-4 text-center mx-2">{product.quantity}</span>
                              <button
                                className="btn btn-square bg-[#D9CAA7] btn-sm"
                                onClick={() => handleQuantityChange(index, 1)}
                                disabled={sellMenuFix.product[index].id === "" || remainingQuantity === 0}

                              >
                                <svg
                                  className="text-[#73664B]"
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="1em"
                                  height="1em"
                                  viewBox="0 0 256 256"
                                >
                                  <path
                                    fill="currentColor"
                                    d="M228 128a12 12 0 0 1-12 12h-76v76a12 12 0 0 1-24 0v-76H40a12 12 0 0 1 0-24h76V40a12 12 0 0 1 24 0v76h76a12 12 0 0 1 12 12"
                                  />
                                </svg>
                              </button>

                              <CiTrash
                                className="text-red-500 text-3xl ml-5"
                                onClick={() => handleDelete(index)}
                              />

                            </div>

                          </div>
                        </div>
                      ))}
                      <div className="flex justify-center my-2">
                        <Button radius="full" size="sm" {...(sellMenuFix.type === "" || remainingQuantity === 0 ? { isDisabled: true } : { isDisabled: false })} className="text-white bg-[#73664B]" onClick={handleAddProduct}>
                          เลือกสินค้าเพิ่มเติม
                        </Button>
                      </div>
                    </CardBody>
                  </Card>

                  <div className="flex justify-end mt-4">
                    <Button className="bg-[#C5B182] text-white" variant="flat" onPress={onClose} onClick={clearData} radius="full">
                      ปิด
                    </Button>
                    <Button onClick={() => { sellSubmit(1) }} className="text-white bg-[#73664B] ml-3" radius="full" {...(sellMenuFix.name === "" || isLoanding ? { isDisabled: true } : { isDisabled: false })}>
                      {isLoanding ? (<><Spinner size="sm" className='text-white' color="default" /> กำลังบันทึก</>) : "บันทึก"}
                    </Button>
                  </div>
                </Tab>


                {/* Tab2 */}

                <Tab key="mix" title="เมนูคละหน้าร้าน" className="text-primary" onClick={handleSelechTypeTwo}>

                  <div className='flex'>
                    <div className='mr-5 '>

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
                    <div className='w-2/3'>
                      {/* {subject_id} */}
                      <Input
                        isRequired
                        type="text"
                        label="ชื่อเมนู"
                        size="sm"
                        width="100%"
                        className='mb-3 bg-fourth text-primary label-primary'
                        color="primary"
                        name="name"
                        // variant="faded"
                        onChange={handleProductInputChangeFix}
                      />
                      <Select
                        isRequired
                        label="ประเภทเมนูสำหรับขาย"
                        className="max-w-xs mb-3 bg-fourth text-primary label-primary"
                        // variant="faded"
                        size="sm"
                        color="primary"
                        name="type"
                        onChange={handleProductInputChangeFix}

                      >
                        {typesellmenumix.map((type) => (
                          <SelectItem key={type.id} value={type.id}>
                            {type.name}
                          </SelectItem>
                        ))}
                      </Select>

                      <Input
                        isRequired
                        type="number"
                        label="ราคา"
                        size="sm"
                        width="100%"
                        className='mb-3 bg-fourth text-primary label-primary'
                        color="primary"
                        name="price"
                        onChange={handleProductInputChangeFix}

                      // variant="faded"
                      // onChange={(e) => setLname(e.target.value)}
                      />

                      <Switch
                        classNames={{
                          base: cn(
                            "inline-flex flex-row-reverse w-full max-w-md bg-content1 hover:bg-content2 items-center",
                            "justify-between cursor-pointer rounded-lg gap-2 p-2 mb-3 border-2 border-transparent",
                            "data-[selected=true]:border-primary",
                          ),
                          wrapper: "p-0 h-4 overflow-visible",
                          thumb: cn("w-6 h-6 border-2 shadow-lg",
                            "group-data-[hover=true]:border-primary",
                            //selected
                            "group-data-[selected=true]:ml-6",
                            // pressed
                            "group-data-[pressed=true]:w-7",
                            "group-data-[selected]:group-data-[pressed]:ml-4",
                          ),
                        }}
                        onChange={changeStatus}
                      >
                        <div className="flex flex-col gap-1">
                          <p className="text-small text-primary">สถานะสินค้า: {switchStatus ? "เปิดใช้งาน" : "ปิดใช้งาน"}</p>
                          <p className="text-tiny text-default-400">
                            {switchStatus ? "สินค้ากำลังแสดงที่หน้าเมนูขายหน้าร้าน" : "สินค้าปิดแสดงที่หน้าเมนูขายหน้าร้าน"}
                          </p>
                        </div>
                      </Switch>


                    </div>


                  </div>


                  {sellMenuFix.type !== "" && (
                    <Card>
                      <CardBody className="h-[190px] overflow-auto">
                        {sellMenuFix.type == "4" ? (
                          <RadioGroup
                            name="prodiff"
                            onChange={handSelectedChange}
                            value={sellMenuFix.product.length > 0 ? JSON.stringify(sellMenuFix.product[0]) : JSON.stringify({ id: "0", image: "" })}

                          >
                            {diffAllData.map((diff, index) => (
                              <CustomRadio value={JSON.stringify({ id: diff.id, image: diff.image })} key={index}>
                                <div className="flex justify-center items-center">
                                  <Avatar radius="sm" src={diff.image} />
                                  <p className="justify-center ml-3">{diff.name}</p>
                                </div>
                              </CustomRadio>
                            ))}
                          </RadioGroup>
                        ) : sellMenuFix.type == "3" ? (
                          <RadioGroup
                            onChange={handSelectedChange}
                            value={sellMenuFix.product.length > 0 ? JSON.stringify(sellMenuFix.product[0]) : JSON.stringify({ id: "0", image: "" })}
                          >
                            {doughAllData.map((dough, index) => (
                              <CustomRadio value={JSON.stringify({ id: dough.id, image: dough.image })} key={index}>
                                <div className="flex justify-center items-center">
                                  <Avatar radius="sm" src={dough.image} />
                                  <p className="justify-center ml-3">{dough.name}</p>
                                </div>
                              </CustomRadio>
                            ))}
                          </RadioGroup>

                        ) : (
                          <CheckboxGroup
                            value={sellSelectMix}
                            onChange={(value) => setSellSelectMix(value)}
                          >
                            {doughAllData.map((dough, index) => (
                              <Checkbox
                                classNames={{
                                  base: cn(
                                    "inline-flex max-w-full w-full bg-content1 m-0",
                                    "hover:bg-content2 items-center justify-start",
                                    "cursor-pointer rounded-lg gap-2 p-4 border-2 border-transparent",
                                    "data-[selected=true]:border-primary"
                                  ),
                                  label: "w-full",
                                }}
                                key={dough.id} value={dough.id.toString()}
                              >
                                <div className="flex justify-start items-center gap-1">
                                  <Avatar radius="sm" src={dough.image} />
                                  <p className="justify-center ml-3">{dough.name}</p>
                                </div>
                              </Checkbox>
                            ))}
                          </CheckboxGroup>
                        )}
                      </CardBody>
                    </Card>
                  )}



                  <div className="flex justify-end mt-4">
                    <Button className="bg-[#C5B182] text-white" variant="flat" onPress={onClose} onClick={clearData} radius="full">
                      ปิด
                    </Button>
                    <Button onClick={() => { sellSubmit(2) }} className="text-white bg-[#73664B] ml-3" radius="full" {...(sellMenuFix.name === "" || isLoanding ? { isDisabled: true } : { isDisabled: false })}>
                      {isLoanding ? (<><Spinner size="sm" className='text-white' color="default" /> กำลังบันทึก</>) : "บันทึก"}
                    </Button>
                  </div>
                </Tab>
              </Tabs>



            </ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
  )
}