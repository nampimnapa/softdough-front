import React, { useState, useRef, useEffect } from 'react';
import { Switch, CheckboxGroup, Tabs, Chip, User, Tab, cn, Input, Avatar, Card, CardHeader, CardBody, Divider, ScrollShadow, Button, Select, SelectItem, CardFooter, Spinner, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure, Checkbox, Textarea, RadioGroup, Radio, Breadcrumbs, BreadcrumbItem, Image } from "@nextui-org/react";
import { CiTrash } from "react-icons/ci";

interface EditSellProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  onClose: () => void;
  typesellmenufix: any;
  typesellmenumix: any;
  idFix: any;
}

export default function EditSalesFixOne({
  isOpen,
  onOpenChange,
  onClose,
  typesellmenufix,
  typesellmenumix,
  idFix
}: EditSellProps) {

  const [dataSm, setDataSm] = useState(null);
  const [dataSmd, setDataSmd] = useState([]);
  const [dataSmOld, setDataSmOld] = useState(null);
  const [dataSmdOld, setDataSmdOld] = useState([]);
  const [uploadedImage, setUploadedImage] = useState(null);
  const inputRef = useRef(null);
  const [doughAllData, setDoughAllData] = useState([]);
  const [value, setValue] = React.useState<string>("");
  const selectedType = typesellmenufix.find(type => type.id === dataSm?.smt_id.toString());
  // const remainingQuantity = selectedType ? selectedType.num - dataSmd?.reduce((acc, item) => acc + item.qty, 0) : 0;
  const remainingQuantity = selectedType ? selectedType.num - dataSmd.reduce((acc, item) => acc + item.qty, 0) : 0;
  const [switchStatus, setSwitchStatus] = useState(false);
  const [isDataChanged, setIsDataChanged] = useState(false);
  const [isLoanding, setIsLoading] = useState(false);


  const changeStatus = () => {
    setSwitchStatus(!switchStatus);
    if (switchStatus) {
      setDataSm((prevProduct) => ({
        ...prevProduct,
        status: "c"
      }));
    } else {
      setDataSm((prevProduct) => ({
        ...prevProduct,
        status: "o"
      }));
    }
  }

  const handleQuantityChange = (index, delta) => {
    setDataSmd(prevState => {
      const updatedProducts = prevState.map((item, idx) => {
        if (idx === index) {
          const newQty = Math.max(0, item.qty + delta);
          return { ...item, qty: newQty };
        }
        return item;
      });
      return updatedProducts;
    });
  };

  useEffect(() => {
    if (isOpen && idFix) {
      getDataSM();
    }
    
  }, [isOpen, idFix]);

  const getDataSM = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/salesmenu/sm/${idFix}`);
      if (!response.ok) {
        throw new Error(`Error fetching unit data: ${response.statusText}`);
      }
      const data = await response.json();
      setDataSm(data.sm);
      setUploadedImage(data.sm.picture)
      setDataSmd(data.smd);
      setDataSmOld(data.sm);
      setDataSmdOld(data.smd);
      typesellmenufix.forEach(item => {
        if (item.id == data.sm.smt_id) {
          setValue(item.name);
        }
      });
      if (data.sm.status == "o") {
        setSwitchStatus(true);
      } else if (data.sm.status == "c") {
        setSwitchStatus(false);
      }

      fetch(`${process.env.NEXT_PUBLIC_API_URL}/product/productsall`)
        .then(response => response.json())
        .then(data => {
          setDoughAllData(data);
        })
        .catch(error => {
          console.error('Error fetching unit data:', error);
        });
    } catch (error) {
      console.error('Error fetching unit data:', error);
    }
  };

  const handleClick = () => {
    inputRef.current.click();
  };

  const handleFileChange = (event) => {
    const fileObj = event.target.files && event.target.files[0];
    if (!fileObj) {
      return;
    }
    setUploadedImage(URL.createObjectURL(fileObj));
    console.log("Original => ", fileObj)
    console.log("Uploaded => ", URL.createObjectURL(fileObj))
    // setImageUpload(fileObj); // Missing variable `imageUpload`

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
        addData(data.pathFile);
      })
      .catch(error => console.error(error));
  };

  const handleClickDelete = () => {
    setDataSm(prevState => ({
      ...prevState,
      picture: '/images/logo.svg'
    }));
    setUploadedImage(null);
  }

  const handleSubmit = () => {
    // console.log("SM : ", dataSm);
    // console.log("SMD : ", dataSmd);
    setIsLoading(true);
    var dataLog = {sm_name:dataSm.sm_name,smt_id:dataSm.smt_id,sm_price:dataSm.sm_price,status:dataSm.status,fix:dataSm.fix,picture:dataSm.picture,salesmenudetail:dataSmd};
    console.log("dataSM : ", dataLog);

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/salesmenu/editsm/${dataSm.sm_id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dataLog),
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      console.log('Success:', data);
      setIsLoading(false);
      onClose();
    })
    .catch(error => {
      console.error('Error:', error);
    });
  }

  const handleProductInputChangeFix = (e) => {
    const { name, value } = e.target;
    setDataSm(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const addData = (data) => {
    setDataSm(prevState => ({
      ...prevState,
      picture: data
    }));
  }

  const handleAddProduct = () => {
    setDataSmd(prevState => [
      ...prevState, 
      { pd_name: '', qty: 1 }
    ]);
  };
  
  const handleProductChange = (index, value) => {
    setDataSmd(prevState => {
      const updatedProducts = [...prevState];
      updatedProducts[index].pd_name = value;
      const selectedProduct = doughAllData.find(type => type.pd_name === value.toString());
      console.log(selectedProduct)
      return updatedProducts;
    });
  };
  
  
  // console.log("dataSmd", dataSmd);
  // console.log(JSON.stringify(dataSm) === JSON.stringify(dataSmOld))

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      placement="center"
      size='xl'
      isDismissable={false} 
      isKeyboardDismissDisabled={true}
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">แก้ไขเมนูสำหรับขาย</ModalHeader>
            <ModalBody style={{ fontFamily: 'kanit' }}>
              <div className='flex'>
                <div className='mr-5 '>
                  <Card isFooterBlurred radius="lg" className="border-none max-w-[200px] max-h-[200px]">
                    <Image
                      alt="Product"
                      className="w-[200px] object-cover h-[200px]"
                      height={200}
                      sizes={`(max-width: 768px) ${200}px, ${200}px`}
                      src={uploadedImage || "/images/logo.svg"}
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

                <div className="w-2/3">
                  <Input
                    isRequired
                    type="text"
                    label="ชื่อเมนู"
                    size="sm"
                    width="100%"
                    className="mb-3 bg-fourth text-primary"
                    color="primary"
                    name="sm_name"
                    value={dataSm?.sm_name || ""}
                    onChange={handleProductInputChangeFix}
                  />
                  <Select
                    isRequired
                    label="ประเภทเมนูสำหรับขาย"
                    className="max-w-xs mb-3 bg-fourth text-primary"
                    size="sm"
                    color="primary"
                    name="smt_id"
                    selectedKeys={[value]}
                    isDisabled
                  >
                    {typesellmenufix.map(type => (
                      <SelectItem key={type.name} value={type.id}>
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
                    className="mb-3 bg-fourth text-primary"
                    color="primary"
                    name="sm_price"
                    value={dataSm?.sm_price || ""}
                    onChange={handleProductInputChangeFix}
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
                        {switchStatus ? "สินค้ากำลังแสดงที่หน้าเมนูขายหน้าร้าน" : "สินค้าปิดแสดงที่หน้าเมนูขายหน้าร้าน"}
                      </p>
                    </div>
                  </Switch>
                </div>
              </div>
              <Card>
                <CardHeader className="flex justify-between">
                  <p className="text-xs text-[#73664B]">จำนวนสินค้าทั้งหมด: {dataSm?.qty_per_unit}</p>
                  <p className="text-xs text-[#73664B]">จำนวนชิ้นคงเหลือ: {remainingQuantity}</p>
                </CardHeader>
                <Divider />
                <CardBody className="h-[150px] overflow-auto">
                  {dataSmd.map((product, index) => (
                    <div key={index} className="flex items-center w-full mt-3">
                      <div className="flex h-min items-center w-3/4">
                        <Select
                          isRequired
                          label="ประเภทเมนูสำหรับขาย"
                          className="max-w-xs bg-fourth text-primary"
                          size="sm"
                          color="primary"
                          name="pd_name"
                          selectedKeys={[product.pd_name]}
                          onChange={(e) => handleProductChange(index, e.target.value)}
                        >
                          {doughAllData.map(prod =>
                            prod.pdc_id === 1 && (
                              <SelectItem key={prod.pd_name} value={prod.pd_name}>
                                {prod.pd_name}
                              </SelectItem>
                            )
                          )}
                        </Select>
                      </div>
                      <div className="flex w-full">
                        <p className="text-sm px-2 pl-10 w-2/3 text-[#73664B]">จำนวนชิ้น:</p>
                        <div className="flex items-center w-3/5">
                          <button
                            className="btn btn-square bg-[#D9CAA7] btn-sm"
                            onClick={() => handleQuantityChange(index, -1)}
                            disabled={product.qty === 0}
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
                          <span className="w-4 text-center mx-2">{product.qty}</span>
                          <button
                            className="btn btn-square bg-[#D9CAA7] btn-sm"
                            onClick={() => handleQuantityChange(index, 1)}
                            disabled={remainingQuantity === 0}
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
                          <CiTrash className="text-red-500 text-3xl ml-5" />
                        </div>
                      </div>
                    </div>
                  ))}
                  <div className="flex justify-center my-2">
                    <Button
                      radius="full"
                      size="sm"
                      className="text-white bg-[#73664B]"
                      // Add your handleAddProduct function here
                      onClick={handleAddProduct}
                      isDisabled={remainingQuantity === 0}
                    >
                      เลือกสินค้าเพิ่มเติม
                    </Button>
                  </div>
                </CardBody>
              </Card>
              <div className="flex justify-end mt-4">
                <Button className="bg-[#C5B182] text-white" variant="flat" onPress={onClose} radius="full">
                  ปิด
                </Button>
                <Button onClick={() => { handleSubmit() }} className="text-white bg-[#73664B] ml-3" radius="full" >
                  {isLoanding ? (<><Spinner size="sm" className='text-white' color="default" /> กำลังบันทึก</>) : "บันทึก"}
                </Button>
              </div>
            </ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
  )
}
