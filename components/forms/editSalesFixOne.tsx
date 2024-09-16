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
  updateSaleData: any;
}

export default function EditSalesFixOne({
  isOpen,
  onOpenChange,
  onClose,
  typesellmenufix,
  idFix,
  updateSaleData
}: EditSellProps) {

  const [dataSm, setDataSm] = useState(null);
  const [dataSmd, setDataSmd] = useState([]);
  const [dataSmOld, setDataSmOld] = useState(null);
  const [dataSmdOld, setDataSmdOld] = useState([]);
  const [uploadedImage, setUploadedImage] = useState(null);
  const inputRef = useRef(null);
  const [doughAllData, setDoughAllData] = useState([]);
  const [value, setValue] = React.useState<string>("");
  const selectedType = typesellmenufix.find(type => type.smt_id === dataSm?.smt_id);
  // const remainingQuantity = selectedType ? selectedType.num - dataSmd?.reduce((acc, item) => acc + item.qty, 0) : 0;
  const remainingQuantity = selectedType ? selectedType.qty_per_unit - dataSmd.reduce((acc, item) => acc + item.qty, 0) : 0;
  const [switchStatus, setSwitchStatus] = useState(false);
  const [isDataChanged, setIsDataChanged] = useState(false);
  const [isLoanding, setIsLoading] = useState(false);
  var dataarrayDataSMD = [];
  let dataType = [];
  const [statusLoadingApi, setStatusLoadingApi] = useState(false);
  const [productCategory, setProductCategory] = React.useState([]);
  const [productType, setProductType] = React.useState([]);

  // console.log(sellSelectMix)

  const handleProductTypeChange = (index, value) => {
    setProductType(prevState => {
      const updatedProducts = [...prevState];
      updatedProducts[index] = { pdc_id: productCategory.find(pdc => pdc.pdc_name == value)?.pdc_id };
      // console.log(value);

      return updatedProducts;
    });
  };


  useEffect(() => {
    getCategory();
  }, []);

  const getCategory = () => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/product/readcat`)
      .then(response => response.json())
      .then(data => setProductCategory(data))
      .catch(error => console.error('Error:', error));
  }

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
      setStatusLoadingApi(false);
      getDough();
    }
  }, [isOpen, idFix]);
  
  const getDough = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/product/productsall`);
      if (!response.ok) {
        throw new Error(`Error fetching dough data: ${response.statusText}`);
      }
      const data = await response.json();
      setDoughAllData(data);
  
      // Fetch sales menu data only after dough data has been successfully fetched
      await getDataSM(data);
  
    } catch (error) {
      console.error('Error fetching dough data:', error);
      setStatusLoadingApi(true); // Ensure loading state is updated even if there's an error
    }
  };
  
  const getDataSM = async (doughAllData) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/salesmenu/sm/${idFix}`);
      if (!response.ok) {
        throw new Error(`Error fetching sales menu data: ${response.statusText}`);
      }
      const data = await response.json();
  
      const dateSMLoad = {
        sm_id: data[0].sm_id,
        sm_name: data[0].sm_name,
        sm_price: data[0].sm_price,
        status: data[0].status,
        smt_id: data[0].smt_id,
        qty_per_unit: data[0].qty_per_unit,
        smt_name: data[0].smt_name,
        picture: data[0].picture,
        fix: data[0].fix
      };
      setDataSm(dateSMLoad);
      setUploadedImage(data[0].picture);
      setDataSmOld(dateSMLoad);
  
      if (data[0].status === "o") {
        setSwitchStatus(true);
      } else if (data[0].status === "c") {
        setSwitchStatus(false);
      }
  
      const dataarrayDataSMD = data.map(element => ({ pd_id: element.pd_id, qty: element.qty }));
      const dataType = data.map(element => {
        const dough = doughAllData.find(dough => dough.pd_id === element.pd_id);
        return dough ? { pdc_id: dough.pdc_id } : { pdc_id: null };
      });
  
      setDataSmd(dataarrayDataSMD);
      setDataSmdOld(dataarrayDataSMD);
      setProductType(dataType);
  
      setStatusLoadingApi(true);
  
    } catch (error) {
      console.error('Error fetching sales menu data:', error);
      setStatusLoadingApi(true); // Ensure loading state is updated even if there's an error
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
    var dataLog = { sm_name: dataSm.sm_name, smt_id: dataSm.smt_id, sm_price: dataSm.sm_price, status: dataSm.status, fix: dataSm.fix, picture: dataSm.picture, salesmenudetail: dataSmd };
    console.log("dataSM : ", dataLog);

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/salesmenu/editsm/${dataSm.sm_id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dataLog),
    })
      .then(response => {
        console.log('Success:', response);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        console.log('Success:', data);
        setIsLoading(false);
        onClose();
        updateSaleData();
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
    setProductType(prevState => [
      ...prevState,
      { pdc_id: 1 }
    ]);
  
    setDataSmd(prevState => [
      ...prevState,
      { pd_id: '', qty: 1 }
    ]);
  };
  

  const handleProductChange = (index, value) => {
    setDataSmd(prevState => {
      const updatedProducts = [...prevState];
      const selectedProduct = doughAllData.find(type => type.pd_name === value.toString())?.pd_id;
      updatedProducts[index].pd_id = selectedProduct;
      console.log(selectedProduct)
      return updatedProducts;
    });
  };

  const [isChanged, setIsChanged] = useState(false);

  useEffect(() => {
    const changesInSm = hasChanges(dataSm, dataSmOld);
    const changesInSmd = hasArrayChanges(dataSmd, dataSmdOld);
    setIsChanged(changesInSm && changesInSmd);
  }, [dataSm, dataSmd]);

  function hasChanges(newData, oldData) {
    for (let key in newData) {
      if (newData[key] !== oldData[key]) {
        return true;
      }
    }
    return false;
  }

  function hasArrayChanges(newData, oldData) {
    if (newData.length !== oldData.length) {
      return true;
    }

    for (let i = 0; i < newData.length; i++) {
      for (let key in newData[i]) {
        if (newData[i][key] !== oldData[i][key]) {
          return true;
        }
      }
    }

    return false;
  }

  const handleDelete = (index) => {
    setDataSmd(prevState => {
      const updatedProducts = [...prevState];
      updatedProducts.splice(index, 1);
      return updatedProducts;
    });

    setProductType(prevState => {
      const updatedProducts = [...prevState];
      updatedProducts.splice(index, 1);
      return updatedProducts;
    });
  };


  // console.log("dataSmOld", dataSmdOld);
  // console.log("dataSm", dataSmd);
  // console.log(dataSm == dataSmOld)
  console.log(productType)

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
          statusLoadingApi ? (
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
                    {/* <Select
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
                  </Select> */}
                    <Input
                      isDisabled
                      type="text"
                      label="ประเภทเมนูสำหรับขาย"
                      size="sm"
                      width="100%"
                      className="mb-3 bg-fourth text-primary"
                      color="primary"
                      value={dataSm?.smt_name || ""}
                      onChange={handleProductInputChangeFix}
                    />
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
                        <div className="flex h-min items-center w-2/4">
                          <Select
                            isRequired
                            label="ประเภทเมนู"
                            className="max-w-xs bg-fourth text-primary label-primary"
                            size="sm"
                            color="primary"
                            name="producttype"
                            selectedKeys={[productCategory.find(cat => cat.pdc_id == productType[index].pdc_id)?.pdc_name]}
                            onChange={(e) => handleProductTypeChange(index, e.target.value)}
                          >
                            {
                              productCategory.map((prod) => (
                                <SelectItem key={prod.pdc_name} value={prod.pdc_id}>
                                  {prod.pdc_name}
                                </SelectItem>
                              ))
                            }
                          </Select>
                        </div>
                        <div className="flex h-min items-center w-3/4">
                          <Select
                            isRequired
                            label="ประเภทเมนูสำหรับขาย"
                            className="max-w-xs bg-fourth text-primary"
                            size="sm"
                            color="primary"
                            name="pd_name"
                            selectedKeys={[doughAllData.find(dough => dough.pd_id == product.pd_id)?.pd_name]}
                            onChange={(e) => handleProductChange(index, e.target.value)}
                          >
                            {
                              doughAllData.map(prod =>
                                prod.pdc_id === productType[index]?.pdc_id ? (
                                  <SelectItem key={prod.pd_name} value={prod.pd_id}>
                                    {prod.pd_name}
                                  </SelectItem>
                                ) : null
                              )
                            }
                          </Select>
                        </div>
                        <div className="flex w-full">
                          <p className="text-sm px-2 pl-3 w-2/3 text-[#73664B]">จำนวนชิ้น:</p>
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
                            <CiTrash className="text-red-500 text-3xl ml-5" onClick={() => handleDelete(index)}/>
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
                  <Button onClick={() => { handleSubmit() }} className="text-white bg-[#73664B] ml-3" radius="full" isDisabled={!isChanged}>
                    {isLoanding ? (<><Spinner size="sm" className='text-white' color="default" /> กำลังบันทึก</>) : "บันทึก"}
                  </Button>
                </div>
              </ModalBody>
            </>
          ) : (
            <Spinner label="Loading..." color="warning" className='my-20' />
          )
        )}
      </ModalContent>
    </Modal>
  )
}
