import React, { useState, useRef, useEffect } from 'react'
import { CheckboxGroup, Checkbox, Switch, Input, Card, CardBody, Radio, Avatar, cn, RadioGroup, Button, CardFooter, Spinner, Modal, ModalContent, ModalHeader, ModalBody, Image } from "@nextui-org/react";

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
interface editSellProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  onClose: () => void;
  typesellmenufix: any;
  typesellmenumix: any;
  idFix: any;
  updateSaleData: any;
}

export default function EditSalesFixTwo({
  isOpen,
  onOpenChange,
  onClose,
  typesellmenufix,
  typesellmenumix,
  idFix,
  updateSaleData
}: editSellProps) {

  const [uploadedImage, setUploadedImage] = useState(null);
  const [dataSm, setDataSm] = useState(null);
  const [dataSmd, setDataSmd] = useState([]);
  const [dataSmOld, setDataSmOld] = useState(null);
  const [dataSmdOld, setDataSmdOld] = useState([]);
  const [switchStatus, setSwitchStatus] = useState(false);
  const [isLoanding, setIsLoading] = useState(false);
  var dataarrayDataSMDs = [];
  const [doughAllData, setDoughAllData] = useState([]);
  const [statusLoadingApi, setStatusLoadingApi] = useState(false);
  const [selected, setSelected] = React.useState("");
  const [sellSelectMix, setSellSelectMix] = React.useState([]);

  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen && idFix) {
      setStatusLoadingApi(false)
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
      const dateSMLoad = { sm_id: data[0].sm_id, sm_name: data[0].sm_name, sm_price: data[0].sm_price, status: data[0].status, smt_id: data[0].smt_id, qty_per_unit: data[0].qty_per_unit, smt_name: data[0].smt_name, picture: data[0].picture, fix: data[0].fix }
      setDataSm(dateSMLoad)
      setUploadedImage(data[0].picture)
      setDataSmOld(dateSMLoad);
      if (data[0].status == "o") {
        setSwitchStatus(true);
      } else if (data[0].status == "c") {
        setSwitchStatus(false);
      }
      dataarrayDataSMDs.push({ pd_id: data.pd_id, qty: data.qty })

      setSelected(data[0].pd_id)
      const sellSelectMix = data.map((pro) => pro.pd_id.toString());
      console.log(sellSelectMix)
      setSellSelectMix(sellSelectMix);
      setDataSmdOld(sellSelectMix)

      fetch(`${process.env.NEXT_PUBLIC_API_URL}/product/productsall`)
        .then(response => response.json())
        .then(data => {
          setDoughAllData(data);
        })
        .catch(error => {
          console.error('Error fetching unit data:', error);
        });

      setStatusLoadingApi(true)

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

  const addData = (data) => {
    setDataSm(prevState => ({
      ...prevState,
      picture: data
    }));
  }

  const handleProductInputChangeFix = (e) => {
    const { name, value } = e.target;
    setDataSm(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

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

  function handleSubmit() {
    const newProducts = sellSelectMix.map(item => ({ pd_id: item }));
    submitData(newProducts);
  }

  function submitData(data){
    setIsLoading(true);

    var dataLog = { sm_name: dataSm.sm_name, smt_id: dataSm.smt_id, sm_price: dataSm.sm_price, status: dataSm.status, fix: dataSm.fix, picture: dataSm.picture, salesmenudetail: data };
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
        setIsChanged(false);
        setIsLoading(false);
        onClose();
        updateSaleData();
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }

  const [isChanged, setIsChanged] = useState(false);

  useEffect(() => {
    const changesInSm = hasChanges(dataSm, dataSmOld);
    const changesInSmd = hasArrayChanges(sellSelectMix, dataSmdOld);
    setIsChanged(changesInSm || changesInSmd);
  }, [dataSm, sellSelectMix]);

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

  const handSelectedChange = (e: { target: { value: string; }; }) => {
    // const selectedValue = JSON.parse(e.target.value);
    const pd_id = e.target.value;
    const pdData = [{ pd_id: parseInt(pd_id), qty: null }]

    setDataSmd(pdData)
  };


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
          statusLoadingApi ? (
            <>
              <ModalHeader className="flex flex-col gap-1">แก้ไขเมนูสำหรับขาย</ModalHeader>
              <ModalBody style={{ fontFamily: 'kanit' }}>
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
                  <CardBody className="h-[190px] overflow-auto">
                    {/* <RadioGroup
                      name="prodiff"
                      onChange={handSelectedChange}
                      value={selected}
                      onValueChange={setSelected}
                    >
                      {doughAllData.map((diff, index) => (
                        <CustomRadio value={diff.pd_id} key={index}>
                          <div className="flex justify-center items-center">
                            <Avatar radius="sm" src={diff.picture} />
                            <p className="justify-center ml-3">{diff.pd_id}</p>
                          </div>
                        </CustomRadio>
                      ))}

                    </RadioGroup> */}

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
                          key={dough.pd_id} value={dough.pd_id.toString()}
                        >
                          <div className="flex justify-start items-center gap-1">
                            <Avatar radius="sm" src={dough.picture} />
                            <p className="justify-center ml-3">{dough.pd_name}</p>
                          </div>
                        </Checkbox>
                      ))}
                    </CheckboxGroup>
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
