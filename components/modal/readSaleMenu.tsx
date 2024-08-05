import React, { useState, useEffect } from 'react'
import { Switch, CheckboxGroup, Tabs, Chip, User, Tab, cn, Input, Avatar, Card, CardHeader, CardBody, Divider, ScrollShadow, Button, Select, SelectItem, CardFooter, Spinner, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure, Checkbox, Textarea, RadioGroup, Radio, Breadcrumbs, BreadcrumbItem, Image } from "@nextui-org/react";

interface ReadSellProps {
    isOpen: boolean;
    onOpenChange: (isOpen: boolean) => void;
    onClose: () => void;
    typesellmenufix: any;
    typesellmenumix: any;
    idFix: any;
    updateSaleData: any;
}

export default function ReadSaleMenu({
    isOpen,
    onOpenChange,
    onClose,
    typesellmenufix,
    idFix,
    updateSaleData
}: ReadSellProps) {
    const [dataSm, setDataSm] = useState(null);
    const [dataSmd, setDataSmd] = useState([]);
    const [dataSmOld, setDataSmOld] = useState(null);
    const [dataSmdOld, setDataSmdOld] = useState([]);
    const [uploadedImage, setUploadedImage] = useState(null);
    const [switchStatus, setSwitchStatus] = useState(false);
    var dataarrayDataSMD = [];
    const [doughAllData, setDoughAllData] = useState([]);
    const [statusLoadingApi, setStatusLoadingApi] = useState(false);


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
            console.log("data", data);
            // setDataSm(data.sm);
            const dateSMLoad = { sm_id: data[0].sm_id, sm_name: data[0].sm_name, sm_price: data[0].sm_price, status: data[0].status, smt_id: data[0].smt_id, qty_per_unit: data[0].qty_per_unit, smt_name: data[0].smt_name, picture: data[0].picture, fix: data[0].fix }
            setDataSm(dateSMLoad)
            setUploadedImage(data[0].picture)
            // setDataSmd(data.smd);
            setDataSmOld(dateSMLoad);
            // setDataSmdOld(data.smd);
            if (data[0].status == "o") {
                setSwitchStatus(true);
            } else if (data[0].status == "c") {
                setSwitchStatus(false);
            }

            data.forEach(element => {
                dataarrayDataSMD.push({ pd_id: element.pd_id, qty: element.qty })
            });
            setDataSmd(dataarrayDataSMD);
            setDataSmdOld(dataarrayDataSMD);



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
                            <ModalHeader className="flex flex-col gap-1">รายละเอียดเมนูสำหรับขาย</ModalHeader>
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

                                        </Card>
                                    </div>

                                    <div className="w-2/3">
                                        <Input
                                            isDisabled
                                            type="text"
                                            label="ชื่อเมนู"
                                            size="sm"
                                            width="100%"
                                            className="mb-3 bg-fourth text-primary"
                                            color="primary"
                                            name="sm_name"
                                            value={dataSm?.sm_name || ""}
                                        // onChange={handleProductInputChangeFix}
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
                                        // onChange={handleProductInputChangeFix}
                                        />
                                        <Input
                                            isDisabled
                                            type="number"
                                            label="ราคา"
                                            size="sm"
                                            width="100%"
                                            className="mb-3 bg-fourth text-primary"
                                            color="primary"
                                            name="sm_price"
                                            value={dataSm?.sm_price || ""}
                                        // onChange={handleProductInputChangeFix}
                                        />
                                        <Switch
                                            isDisabled
                                            isSelected={switchStatus}
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

                                <div className="h-[190px] overflow-x-auto ">
                                    <table className="w-full text-sm text-center text-gray-500">
                                        <thead className="">
                                            <tr className="text-white  font-normal  bg-[#908362]  ">
                                                <td scope="col" className="px-6 py-3 ">
                                                    ลำดับ
                                                </td>
                                                <td scope="col" className="px-6 py-3">
                                                    สินค้า
                                                </td>
                                                <td scope="col" className="px-6 py-3">
                                                    จำนวน
                                                </td>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {dataSmd.map((menu, index) => (
                                                <tr key={menu.smt_id} className="odd:bg-white  even:bg-[#F5F1E8] border-b h-10">
                                                    <td scope="row" className="text-[#73664B] px-6 py-1   whitespace-nowrap">
                                                        {index + 1}
                                                    </td>
                                                    <td className="px-6 py-1 text-[#73664B]">
                                                        <div className='flex justify-start items-center'>
                                                            <Avatar src={doughAllData.find(dough => dough.pd_id == menu.pd_id)?.picture || `/images/logo.svg`} radius="sm" className='mr-5'/>
                                                            {doughAllData.find(dough => dough.pd_id == menu.pd_id)?.pd_name}
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-1 text-[#73664B]">
                                                        {menu.qty || 1}
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>

                                <div className="flex justify-end mt-4">
                                    <Button className="bg-[#C5B182] text-white" variant="flat" onPress={onClose} radius="full">
                                        ปิด
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
