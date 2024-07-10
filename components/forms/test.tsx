import React, { useState, useRef, useEffect } from 'react';
import {
  Switch,
  Select,
  SelectItem,
  Input,
  Image,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Button,
  Divider,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  useDisclosure,
} from "@nextui-org/react";
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
  idFix,
}: EditSellProps) {
  const [dataSm, setDataSm] = useState(null);
  const [dataSmd, setDataSmd] = useState([]);
  const [uploadedImage, setUploadedImage] = useState(null);
  const inputRef = useRef(null);
  const [doughAllData, setDoughAllData] = useState([]);
  const [value, setValue] = useState<string>("");
  const [switchStatus, setSwitchStatus] = useState(false);

  // Calculate the remaining quantity
  const selectedType = typesellmenufix.find(type => type.id === dataSm?.smt_id.toString());
  const remainingQuantity = selectedType ? selectedType.num - dataSmd?.reduce((acc, item) => acc + item.qty, 0) : 0;

  // Fetch sales menu data when modal is open and idFix changes
  useEffect(() => {
    if (isOpen && idFix) {
      getDataSM();
    }
  }, [isOpen, idFix]);

  const getDataSM = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/salesmenu/sm/${idFix}`);
      if (!response.ok) throw new Error(`Error fetching unit data: ${response.statusText}`);
      const data = await response.json();
      setDataSm(data.sm);
      setUploadedImage(data.sm.picture);
      setDataSmd(data.smd);
      typesellmenufix.forEach(item => {
        if (item.id == data.sm.smt_id) {
          setValue(item.name);
        }
      });
      setSwitchStatus(data.sm.status === "o");

      const productResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/product/productsall`);
      const productData = await productResponse.json();
      setDoughAllData(productData);
    } catch (error) {
      console.error('Error fetching unit data:', error);
    }
  };

  const changeStatus = () => {
    setSwitchStatus(!switchStatus);
    setDataSm(prevProduct => ({
      ...prevProduct,
      status: switchStatus ? "c" : "o",
    }));
  };

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

  const handleFileChange = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      setUploadedImage(URL.createObjectURL(file));
      event.target.value = null;
      const formData = new FormData();
      formData.append("file", file);
      fetch("/api/uploadimage", {
        method: "POST",
        body: formData,
      })
        .then(response => {
          if (!response.ok) throw new Error('Network response was not ok');
          return response.json();
        })
        .then(data => {
          // handle response data
        })
        .catch(error => console.error(error));
    }
  };

  const handleClickDelete = () => {
    setUploadedImage(null);
    setDataSm(prevState => ({
      ...prevState,
      picture: '/images/logo.svg',
    }));
  };

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      placement="center"
      size="xl"
      isDismissable={false}
      isKeyboardDismissDisabled={true}
    >
      <ModalContent>
        {onClose => (
          <>
            <ModalHeader className="flex flex-col gap-1">แก้ไขเมนูสำหรับขาย</ModalHeader>
            <ModalBody style={{ fontFamily: 'kanit' }}>
              <div className="flex">
                <div className="mr-5">
                  <Card isFooterBlurred radius="lg" className="border-none max-w-[200px] max-h-[200px]">
                    <Image
                      alt="Image"
                      className="w-[200px] object-cover h-[200px]"
                      height={200}
                      src={uploadedImage || "/images/logo.svg"}
                      width={200}
                    />
                    <CardFooter className="flex justify-center py-1 absolute bottom-1 w-[calc(100%-8px)]">
                      <Button
                        className="text-tiny text-white bg-[#73664B]"
                        color="danger"
                        radius="lg"
                        size="sm"
                        onClick={() => inputRef.current.click()}
                      >
                        เปลี่ยน
                      </Button>
                      {uploadedImage && (
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
                    name="name"
                    value={dataSm?.sm_name}
                  />
                  <Select
                    isRequired
                    label="ประเภทเมนูสำหรับขาย"
                    className="max-w-xs mb-3 bg-fourth text-primary"
                    size="sm"
                    color="primary"
                    name="type"
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
                    name="price"
                    value={dataSm?.sm_price}
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
                          name="type"
                          selectedKeys={[product.pd_name]}
                        >
                          {doughAllData.map(prod =>
                            prod.pdc_id === 1 && (
                              <SelectItem key={prod.pd_name} value={prod.pd_id}>
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
                      // onClick={handleAddProduct}
                      isDisabled={remainingQuantity === 0}
                    >
                      เลือกสินค้าเพิ่มเติม
                    </Button>
                  </div>
                </CardBody>
              </Card>
            </ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
