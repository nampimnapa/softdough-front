import React, { Fragment, useState, useEffect, ChangeEvent } from 'react';
import { Kanit } from "next/font/google";
import { useRouter } from 'next/router';
import Link from "next/link";
import { Button, Input, RadioGroup, Radio, Checkbox, User, cn, CheckboxGroup, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter } from "@nextui-org/react";
import { Dialog, DialogPanel, DialogTitle, DialogBackdrop, Transition } from '@headlessui/react';
import { Tabs, Tab, } from "@nextui-org/react";
import { Spinner, useDisclosure, Image } from "@nextui-org/react";
import { Card, CardBody, CardFooter, Chip } from "@nextui-org/react";
import { CheckIcon } from '@heroicons/react/solid'
import { format } from 'date-fns';
import { th } from 'date-fns/locale';
// import generatePDF from "../components/puppeteer/generatepdf";
import { getSession } from '../utils/session';
import { XMarkIcon } from '@heroicons/react/24/outline'
import {
    PencilSquareIcon,
    ChartPieIcon,
    ChevronDownIcon,
    ChevronUpIcon,
    CubeIcon,
    MegaphoneIcon,
    Cog6ToothIcon,
    UserGroupIcon,
    CurrencyDollarIcon,
    QueueListIcon,
    UserCircleIcon, MagnifyingGlassIcon, TrashIcon

} from "@heroicons/react/24/outline";
const kanit = Kanit({
    subsets: ["thai", "latin"],
    weight: ["100", "200", "300", "400", "500", "600", "700"],
});


interface Sale {
    sm_id: number;
    sm_name: string;
    sm_price: number;
    smt_id: number;
    fix: string;
    qty_per_unit: number;
    pd_id: number;
    picture: string;
}

interface Promotion {
    dc_name: string;
    dc_diccountprice: number;
    minimum: number;
}

function Pos() {
    const router = useRouter();
    const { id } = router.query;

    const [Sale, setSale] = useState([]);
    const [Promotion, setPromotion] = useState([]);

    const [typesellmenufix, setTypesellmenufix] = useState([]);
    const [typesellmenumix, setTypesellmenumix] = useState([]);
    const [statusLoading, setStatusLoading] = useState(false);
    const [statusLoadingSM, setStatusLoadingSM] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [isOpen2, setIsOpen2] = useState(false);
    const [isOpen3, setIsOpen3] = useState(false);
    const [isOpenEdit, setIsOpenEdit] = useState(false);
    const [isOpenEditMix, setIsOpenEditMix] = useState(false);


    const [selectedSale, setSelectedSale] = useState(null);
    const [selectedItems, setSelectedItems] = useState([]);
    const [selectedPromotion, setSelectedPromotion] = useState(null);
    const [selectedPromotionfree, setSelectedPromotionfree] = useState<PromoFree | null>(null);
    const [price, setPrice] = useState([]);
    const [addressData, setAddressData] = useState(null);
    const [Mix, setMix] = useState([]);
    const [sessionData, setSessionData] = useState(null);


    const closeModal = () => {
        setIsOpen(false);
        setSelectedSale(null);
        setSelectedFreeId(null);
        setQuantity(1);
    };
    const handleCancel = () => {
        setIsOpenEdit(false);
    };
    interface Promotion {
        dc_name: string,
        dc_diccountprice: number,
        minimum: number

    }
    interface Sale {
        sm_id: number,
        sm_name: String,
        sm_price: number,
        smt_id: number,
        fix: string,
        qty_per_unit: number,
        pd_id: number

    }
    interface PromoFreeDetail {
        smbuy_id: number;
        smfree_id: number;
        smbuy_idnamet: string;
        smfree_idnamet: string;
        smbuytype: string;
        smfreetype: string;
    }

    interface PromoFree {
        flatMap: any;
        pm_id: number;
        pm_name: string;
        pm_datestart: string;
        pm_dateend: string;
        detail: PromoFreeDetail[];
    }
    interface PriceDeli {
        odt_id2: number; // Adjust if these fields are optional
        odt_name2: string;
        odtd_price2: number;
        odt_id3: number;
        odt_name3: string;
        odtd_price3: number;
    }

    interface SaleType {
        sm_id: number;
        sm_name: string;
        sm_price: number;
        pricedeli: PriceDeli[];

    }

    interface SelectEdit {
        sm_id: number;
        sm_name: string;
        sm_price: number;
        status: string;
        fix: string;
        picture: string;
        smt_id: number;
        smt_name: string;
        qty_per_unit: number;
        mixItems: MixItem[];
    }

    interface MixItem {
        pd_id: number,
        pd_name: string,
        quantity: number
    }

    const [selectedSaleId, setSelectedSaleId] = useState<string | null>(null);
    let selectedDiff = "";

    const [selectedSaleNames, setSelectedSaleNames] = useState<string | null>(null); // เก็บชื่อของสินค้าที่ถูกเลือกทั้งหมดในรูปแบบอาร์เรย์

    const handleSaleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedSaleId(event.target.value);
        // เก็บข้อมูลสินค้าใหม่ที่ถูกเลือก
        // const newSelectedItem = { id: event.target.value };
        // setSelectedItems((prevItems) => [...prevItems, newSelectedItem]);
    };

    const handleAddToCart = () => {
        if (selectedSale) {
            const newItem = {
                ...selectedSale,
                quantity: quantity,
                id: selectedFreeId,
                mixItems: selectedSale.fix === "2" ? selectedPdIds.map(id => {
                    const item = Mix.find(m => m.pd_id === id);
                    return {
                        pd_id: id,
                        pd_name: item ? item.pd_name : 'Unknown',
                        quantity: quantities[id] || 1
                    };
                }) : []
            };
            setSelectedItems((prevItems) => [...prevItems, newItem]);
            setSelectedFreeId(null);
            closeModal();
            closeModalmix();
            console.log(selectedPdIds)
            console.log(quantities)
        }
    };

    const handleRemoveItem = (index) => {
        setSelectedItems((prevItems) => prevItems.filter((_, i) => i !== index));
    };
    const [todayDate, setTodayDate] = useState('');
    const [smfreeIdNameMap, setSmfreeIdNameMap] = useState<Map<number, string>>(new Map());

    useEffect(() => {
        const today = new Date().toLocaleDateString(); // Format as needed
        setTodayDate(today);
    }, []);
    useEffect(() => {
        setSessionData(getSession())
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/pos/sm`)
            .then(response => response.json())
            .then(data => {
                setSale(data);
                setStatusLoading(true);
            })
            .catch(error => {
                console.error('Error fetching unit data:', error);
            });

        fetch(`${process.env.NEXT_PUBLIC_API_URL}/promotion/readdis`)
            .then(response => response.json())
            .then(data2 => {
                setTypesellmenufix(data2);
                setTypesellmenumix(data2);
                // console.log(data2);
            })
            .catch(error => {
                console.error('Error fetching unit data:', error);
            });

        fetch(`${process.env.NEXT_PUBLIC_API_URL}/promotion/readdis`)
            .then(response => response.json())
            .then(promo => {
                setPromotion(promo);
                // setStatusLoading(true);
            })
            .catch(error => {
                console.error('Error fetching unit data:', error);
            });
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/setting/price`)
            .then(response => response.json())
            .then(price => {
                setPrice(price);
                // setStatusLoading(true);
            })
            .catch(error => {
                console.error('Error fetching unit data:', error);
            });
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/promotion/readfree`)
            .then(response => response.json())
            .then(promofree => {
                setSelectedPromotionfree(promofree);
                // setStatusLoading(true);
                // สร้างแผนที่ smfree_id กับชื่อ
                const idNameMap = new Map<number, string>();
                promofree.flatMap(promotion => promotion.detail).forEach(item => {
                    idNameMap.set(item.smfree_id, item.smfree_idnamet);
                });
                setSmfreeIdNameMap(idNameMap);
                // console.log('smfreeIdNameMap:', idNameMap); // ตรวจสอบค่าของ smfreeIdNameMap

            })
            .catch(error => {
                console.error('Error fetching unit data:', error);
            });
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/setting/address`)
            .then((response) => {
                // console.log('Full response:', response); // Log the full response
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json(); // Parse JSON if the response is okay
            })
            .then((data) => {
                // console.log('Fetched data:', data); // Log the parsed data
                if (data && Array.isArray(data) && data.length > 0) {
                    // console.log('Address object:', data[0]); // Log the first object in the array
                    setAddressData(data[0]); // Set the first object from the array
                    // setStatusLoading(true); // Indicate loading is complete
                }
            })
            .catch((error) => {
                console.error('Error fetching address data:', error);
                // setStatusLoading(false); // Loading failed
            });



    }, [id, setSale]);

    const [quantity, setQuantity] = useState(1); // Initial quantity set to 1

    const incrementQuantity = () => {
        setQuantity(prevQuantity => prevQuantity + 1);
    };

    const decrementQuantity = () => {
        setQuantity(prevQuantity => Math.max(prevQuantity - 1, 1)); // Ensure quantity doesn't go below 1
    };


    const handleIncreaseQuantity = (id) => {
        setSelectedItems((prevItems) =>
            prevItems.map((item) =>
                item.sm_id === id ? { ...item, quantity: item.quantity + 1 } : item
            )
        );
    };

    const handleDecreaseQuantity = (id) => {
        setSelectedItems((prevItems) =>
            prevItems.map((item) =>
                item.sm_id === id && item.quantity > 1
                    ? { ...item, quantity: item.quantity - 1 }
                    : item
            )
        );
    };
    const calculateTotalPrice = () => {
        const totalPrice = selectedItems.reduce((total, item) => total + item.sm_price * item.quantity, 0);
        const discount = selectedPromotion ? selectedPromotion.dc_diccountprice : 0;
        return totalPrice - discount;
    };
    const [netTotal, setNetTotal] = useState(0); // State for net total
    useEffect(() => {
        const newNetTotal = calculateTotalPrice();
        setNetTotal(newNetTotal);
    }, [selectedItems, selectedPromotion, calculateTotalPrice]);

    const [totalPrice, setTotalPrice] = useState(0); // State to store total price

    const calculateTotalPriceBeforeDiscount = (selectedItems) => {
        return selectedItems.reduce((total, item) => total + item.sm_price * item.quantity, 0);
    };
    Promotion.filter((promotion) => calculateTotalPriceBeforeDiscount(selectedItems) >= promotion.minimum)

    useEffect(() => {
        const price = calculateTotalPriceBeforeDiscount(selectedItems); // Calculate total price
        setTotalPrice(price); // Update state with the new total price
    }, [selectedItems]); // Depend on selectedItems

    // const filteredSales = Sale.filter((sale) => sale.smt_id === 4);

    // ส่วน promotion ส่วนลด
    const handlePromotionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedPromoName = event.target.value;
        const selectedPromo = Promotion.find(promo => promo.dc_name === selectedPromoName);
        setSelectedPromotion(selectedPromo || null);
    };



    // const selectedSaleName = filteredSales.find(sale => sale.sm_id.toString() === selectedSaleId)?.sm_name;

    // const getFreeItemNames = (saleId) => {
    //     if (!selectedPromotionfree || !selectedPromotionfree.length) {
    //         return [];
    //     }

    //     // Flatten the details and filter by the saleId
    //     const freeItems = selectedPromotionfree.flatMap(promotion =>
    //         promotion.detail
    //     ).filter(detail => detail.smbuy_id === saleId);

    //     // Return an array of free item names
    //     return freeItems.map(item => item.smfree_id);
    // };
    const getFreeItemNames = (saleId: number) => {
        if (!Array.isArray(selectedPromotionfree)) {
            return [];
        }

        // ดึงข้อมูลรายการฟรีที่ตรงกับ saleId
        const freeItems = selectedPromotionfree
            .map(promotion => promotion.detail) // ใช้ map เพื่อดึง detail
            .flat() // ใช้ flat เพื่อรวม array ที่ซ้อนกัน
            .filter(detail => detail.smbuy_id === saleId);

        // ส่งกลับเป็น smfree_id
        return freeItems.map(item => item.smfree_id);
    };


    // const isRadioDisabled = (sm_id) => {
    //     if (!selectedSale) {
    //         return true; // If no sale is selected, disable all radios
    //     }

    //     const freeItemIds = getFreeItemNames(selectedSale.sm_id); // Get free item IDs for the currently selected sale

    //     // Disable if the current sm_id is NOT in the list of free item IDs
    //     return !freeItemIds.includes(sm_id);
    // };

    const [isOpenmix, setIsOpenmix] = useState(false);
    const closeModalmix = () => {
        setIsOpenmix(false);
        setIsOpenEditMix(false);
        setSelectedPdIdEdit([]);
        setSelectedPdIds([]);
        setQuantities({});
        setQuantity(1);
        setStatusLoadingSM(false)
    };
    const openModal = (sale) => {
        const fixValue = String(sale.fix);
        if (fixValue === "2") {
            getSalesMenu(sale)
            setIsOpen(false);
            setIsOpenmix(true);
            setSelectedSale(sale);
            setQuantity(1);
        } else {
            setIsOpenmix(false);
            setIsOpen(true);
            setQuantity(1);
            setSelectedSale(sale);
            setSelectedFreeId(null); // รีเซ็ตค่า selectedFreeId เมื่อเปิด Modal ใหม่
            getFreeItemNames(sale.sm_id);
        }
    };

    const getSalesMenu = (sale: any) => {
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/pos/sm/${sale.sm_id}`)
            .then(response => response.json())
            .then(data => {
                setMix(data);
                setStatusLoadingSM(true);
            })
            .catch(error => {
                console.error('Error fetching unit data:', error);
            });
    }

    // ฟังก์ชันเปิด modal
    // const openModal = (sale) => {
    //     if (isPromotionAvailable(sale.sm_id)) {
    //         setIsOpen(true);
    //         setSelectedSale(sale);
    //         setQuantity(1); // Reset quantity to 1 whenever a new item is selected
    //     } else {
    //         alert("This item does not have any promotions.");
    //     }
    // };
    const [selectedFreeId, setSelectedFreeId] = useState<string | null>(null);

    const handleFreeIdChange = (event: ChangeEvent<HTMLInputElement>) => {
        setSelectedFreeId(event.target.value);
    };

    // Function to handle changes when a radio button is selected
    const handleFreeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedFreeId(event.target.value); // เข้าถึงค่า string จาก event
    };

    var freeItemIds = getFreeItemNames(selectedSale?.sm_id || 0);




    // delivery
    const [selectedDeliveryOption, setSelectedDeliveryOption] = useState(1);

    const handleDeliveryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedValue = parseInt(event.target.value, 10) ?? 1; // Convert value to number
        let nameURL = ""
        if (selectedValue == 1)
            nameURL = `${process?.env?.NEXT_PUBLIC_API_URL}/pos/sm`

        else {
            nameURL = `${process?.env?.NEXT_PUBLIC_API_URL}/pos/small/${selectedValue}`
        }
        setSelectedDeliveryOption(selectedValue);
        console.log("Updated selectedDeliveryOption:", selectedValue); // Log updated value

        fetch(nameURL)
            .then(response => response.json())
            .then(data => {
                setSale(data);
                setStatusLoading(true);
            })
            .catch(error => {
                console.error('Error fetching unit data:', error);
            });
    };


    const getPriceBasedOnDelivery = (sale: SaleType) => {
        if (selectedDeliveryOption === null) return sale.sm_price; // Default price
        // Defensive check

        // Initialize `pricedeli` to an empty array if it's undefined
        const pricedeli = sale.pricedeli || [];

        // console.log("Selected Delivery Option:", selectedDeliveryOption);
        // console.log("pricedeli data:", pricedeli);

        const deliveryOption = pricedeli.find(d =>
            d.odt_id2 === selectedDeliveryOption || d.odt_id3 === selectedDeliveryOption
        );

        // console.log("Delivery Option Found:", deliveryOption);

        return deliveryOption ? deliveryOption.odtd_price2 : sale.sm_price;
    };

    // confirm
    const openModal2 = () => {
        setIsOpen2(true);

    };
    const closeModal2 = () => {
        setIsOpen2(false);
    };
    // เงินทอน
    const [paymentMethod, setPaymentMethod] = useState('t'); //วิธีจ่ายเงิน
    const [cashReceived, setCashReceived] = useState(0); // Customer's payment amount
    // Handle payment method change
    const handlePaymentChange = (e) => {
        const selectedValue = e.target.value;
        setPaymentMethod(selectedValue);
        console.log("เลือกวิธีจ่าย:", paymentMethod);
    };

    // Calculate change
    const calculateChange = () => {
        const totalPrice = calculateTotalPrice();
        return cashReceived - totalPrice;
    };


    const openModal3 = () => {
        setIsOpen3(true);

    };

    const closeModal3 = () => {
        setIsOpen3(false);
    };

    const formatAddress = (data) => {
        if (!data || !thaiAddressData) return 'ไม่มีข้อมูลที่อยู่';

        let provinceName = data.sh_province;
        let amphureName = data.sh_ampher;
        let tambonName = data.sh_district;

        // ค้นหาข้อมูลจังหวัด
        const province = thaiAddressData.find(p =>
            p.id.toString() === data.sh_province || p.name_th === data.sh_province
        );

        if (province) {
            provinceName = province.name_th;

            // ค้นหาข้อมูลอำเภอ
            const amphure = province.amphure.find(a => {
                const amphurId = data.sh_ampher.length > 4 ? data.sh_ampher.substring(0, 4) : data.sh_ampher;
                return a.id.toString() === amphurId || a.name_th === data.sh_ampher;
            });

            if (amphure) {
                amphureName = amphure.name_th;

                // ค้นหาข้อมูลตำบล
                // ถ้า sh_district เป็นรหัสอำเภอ ให้ใช้ตำบลแรกของอำเภอนั้น
                if (data.sh_district === amphure.id.toString()) {
                    tambonName = amphure.tambon[0]?.name_th || 'ไม่ระบุตำบล';
                } else {
                    const tambon = amphure.tambon.find(t => {
                        const tambonId = data.sh_district.length > 6 ? data.sh_district.substring(0, 6) : data.sh_district;
                        return t.id.toString() === tambonId || t.name_th === data.sh_district;
                    });

                    if (tambon) {
                        tambonName = tambon.name_th;
                    } else {
                        console.log(`ไม่พบข้อมูลตำบลสำหรับ: ${data.sh_district}`);
                        tambonName = 'ไม่ระบุตำบล';
                    }
                }
            } else {
                console.log(`ไม่พบข้อมูลอำเภอสำหรับ: ${data.sh_ampher}`);
                amphureName = 'ไม่ระบุอำเภอ';
            }
        } else {
            console.log(`ไม่พบข้อมูลจังหวัดสำหรับ: ${data.sh_province}`);
            provinceName = 'ไม่ระบุจังหวัด';
        }

        return `${data.sh_address}, ตำบล${tambonName}, อำเภอ${amphureName}, จังหวัด${provinceName}, รหัสไปรษณีย์ ${data.sh_zipcode}`;
    };
    // Debug: Check what data is being fetched
    // console.log('address data:', addressData);
    const [selectedPdIds, setSelectedPdIds] = useState([]);
    // const [quantities, setQuantities] = useState({});
    const [error, setError] = useState("");
    const [quantities, setQuantities] = useState<{ [key: number]: number }>({});


    // Functions to increment and decrement quantity
    const incrementQuantitymix = (pd_id: number) => {
        const currentTotal = getTotalSelectedItems();
        if (currentTotal < selectedSale.qty_per_unit) {
            setQuantities({
                ...quantities,
                [pd_id]: (quantities[pd_id] || 1) + 1,
            });
        }
    };

    const decrementQuantitymix = (pd_id: number) => {
        if (quantities[pd_id] > 1) {
            setQuantities({
                ...quantities,
                [pd_id]: quantities[pd_id] - 1,
            });
        } else {
            // ถ้าจำนวนเหลือ 1 และกดลบ ให้นำรายการออกจากการเลือก
            const newSelectedPdIds = selectedPdIds.filter(id => id !== pd_id);
            setSelectedPdIds(newSelectedPdIds);

            // ลบข้อมูลจำนวนของรายการนี้ออก
            const { [pd_id]: _, ...restQuantities } = quantities;
            setQuantities(restQuantities);
        }
    };
    // Function to handle checkbox change
    const handleCheckboxChange = (pd_id: number) => {
        if (selectedPdIds.includes(pd_id)) {
            // If already selected, remove it from the list
            const newSelectedIds = selectedPdIds.filter(id => id !== pd_id);
            setSelectedPdIds(newSelectedIds);

            // Remove the quantity entry for this pd_id
            const { [pd_id]: _, ...rest } = quantities; // Remove the entry from quantities
            setQuantities(rest);
        } else {
            // Check if adding this item would exceed the limit
            const currentTotal = Object.values(quantities).reduce((acc, qty) => acc + qty, 0);
            if (currentTotal < selectedSale.qty_per_unit) {
                setSelectedPdIds([...selectedPdIds, pd_id]);
                setQuantities({ ...quantities, [pd_id]: 1 }); // Initialize with quantity 1
            }
        }
    };

    const [todayDateTime, setTodayDateTime] = useState('');

    useEffect(() => {
        const updateDateTime = () => {
            const now = new Date();
            const formattedDateTime = now.toLocaleString();
            setTodayDateTime(formattedDateTime);
        };

        updateDateTime();

        const intervalId = setInterval(updateDateTime, 1000);
        return () => clearInterval(intervalId);
    }, []);

    const today = new Date();
    // Update odChange whenever cashReceived changes
    const [odChange, setOdChange] = useState(0);
    useEffect(() => {
        if (paymentMethod === 'c' && cashReceived > 0) {
            setOdChange(calculateChange()); // Store calculated change
        } else {
            setOdChange(0); // Reset change if payment method is not cash
        }
    }, [cashReceived, paymentMethod, calculateChange]);

    const handleSubmit = async () => {
        const discountTotal = selectedPromotion ? selectedPromotion.dc_diccountprice : 0; // Get discount amount

        // Format the current date to MySQL's DATETIME format (using Bangkok timezone)
        const today = new Date();
        const todayDateTime = today.toLocaleString('sv-SE', {
            timeZone: 'Asia/Bangkok',
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false // ใช้รูปแบบ 24 ชั่วโมง
        }).replace('T', ' '); // แปลงเป็นฟอร์แมต "YYYY-MM-DD HH:MM:SS"

        const allItems = selectedItems.map(product => {
            const isFreeItem = product.id !== null && smfreeIdNameMap.has(parseInt(product.id));
            return {
                sm_id: product.sm_id,
                quantity: product.quantity,
                price: isFreeItem ? 0 : product.sm_price,
                isFreeItem: isFreeItem,
                smfree_id: isFreeItem ? parseInt(product.id) : null // Use the ID directly
            };
        });
        const dataOrder = {
            od_date: todayDateTime,
            od_qtytotal: selectedItems.reduce((total, product) => total + product.quantity, 0),
            od_sumdetail: totalPrice, // State to store total price
            od_change: odChange, //เงินทอน
            od_pay: cashReceived, //จำนวนเงินสดที่ลูกค้าจ่าย
            od_paytype: paymentMethod,
            od_status: 1, //1ปกติ 0ยกเลิก
            od_net: netTotal,
            od_discounttotal: discountTotal, //ส่วนลด
            note: "",

            sh_id: addressData.sh_id, //ที่อยู่
            odt_id: selectedDeliveryOption, //ประเภทรายการขาย
            dc_id: selectedPromotion?.dc_id || null,
            user_id: sessionData || 1,
            selectedItems,
            freeItems: allItems.filter(item => item.isFreeItem)
        };
        console.log("dataOrder : ", dataOrder)

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/pos/order`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify(dataOrder),
            });

            const result = await response.json();
            if (response.ok) {
                console.log("Order created successfully");
                alert("Order created successfully");

                const pdfResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/pos/pdf-viewer`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    credentials: 'include',
                });

                if (pdfResponse.ok) {
                    const pdfBlob = await pdfResponse.blob();
                    const pdfUrl = URL.createObjectURL(pdfBlob);
                    window.open(pdfUrl, '_blank');
                    console.log('PDF Blob:', pdfBlob);

                } else {
                    const errorData = await pdfResponse.json();
                    console.error('Error displaying PDF:', errorData.error);
                }
                // if (response.ok) {
                //     console.log("Order created successfully");
                //     alert("Order created successfully");


                //     // ส่ง request ไปที่ /generate-pdf พร้อมข้อมูล order ที่เพิ่งสร้าง
                //     const pdfResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/generate-pdf`, {
                //         method: 'POST',
                //         headers: {
                //             'Content-Type': 'application/json',
                //         },
                //         body: JSON.stringify(dataOrder), // ส่งข้อมูล order เพื่อสร้าง PDF
                //     });

                //     if (pdfResponse.ok) {
                //         const pdfBlob = await pdfResponse.blob();
                //         const pdfUrl = URL.createObjectURL(pdfBlob);
                //         window.open(pdfUrl, '_blank'); // เปิด PDF ในหน้าต่างใหม่
                //     } else {
                //         console.error('Error generating PDF');
                //     }
                // } else {
                //     console.error("Failed to create order");
                // }



                closeModal3
                closeModal2
            } else {
                console.error("Failed to create order",);
            }
        } catch (error) {
            console.error("Error submitting order:", error);
        }
    }
    // const handleOpenWindow = () => {
    //     const pdfWindow = window.open('');
    //     if (pdfWindow) {
    //         pdfWindow.document.write('This is a test window');
    //         pdfWindow.document.close();
    //     } else {
    //         console.error("Failed to open test window");
    //     }
    // };
    const [thaiAddressData, setThaiAddressData] = useState(null);

    useEffect(() => {
        setSelectedPdIds([]);
        setQuantities({});
        setQuantity(1);
    }, [selectedSale]);

    // เก็บจำนวนที่เลือก
    const getTotalSelectedItems = () => {
        return selectedPdIds.reduce((total, id) => total + (quantities[id] || 1), 0);
    };

    // Edit selected
    const [editProduct, setEditProduct] = useState<SelectEdit | null>();
    const [freeItemIdEdit, setFreeItemIdEdit] = useState(null)
    const [indexEdit, setIndexEdit] = useState(null)
    const [selectedPdIdEdit, setSelectedPdIdEdit] = useState([]);
    const openModalsEdit = (selectedid: any) => {
        setFreeItemIdEdit(getFreeItemNames(selectedItems[selectedid].sm_id || 0))
        setEditProduct(selectedItems[selectedid])
        setQuantityEdit(selectedItems[selectedid].quantity)
        setSelectedFreeIdEdit(selectedItems[selectedid].id)
        const pdIds = selectedItems[selectedid].mixItems.map(item => item.pd_id) || [];
        const QpdIds = selectedItems[selectedid].mixItems.reduce((acc, item) => {
            acc[item.pd_id] = item.quantity;
            return acc;
        }, {});
        setQuantitiesEdit(QpdIds);
        setSelectedPdIdEdit(pdIds);
        setIndexEdit(selectedid);
        if (selectedItems[selectedid].fix == "1") {
            setIsOpenEdit(true);
        } else if (selectedItems[selectedid].fix == "2" && pdIds) {
            // const pdIds = selectedItems[selectedid].mixItems.map(item => item.pd_id);
            console.log(quantitiesEdit)

            // setSelectedPdIdEdit(pdIds);
            setIsOpenEditMix(true);
        }


        console.log(selectedItems[selectedid])
    }

    // จำนวนสินค้าในหน้าแก้ไข
    const [quantityEdit, setQuantityEdit] = useState(1);
    const incrementQuantityEdit = () => {
        setQuantityEdit(prevQuantity => prevQuantity + 1);
    };
    const decrementQuantityEdit = () => {
        setQuantityEdit(prevQuantity => Math.max(prevQuantity - 1, 1));
    };

    // แก้ไขสินค้าแถม
    const [selectedFreeIdEdit, setSelectedFreeIdEdit] = useState<string | null>(null);
    const handleFreeIdChangeEdit = (event: ChangeEvent<HTMLInputElement>) => {
        setSelectedFreeIdEdit(event.target.value);
    };

    const updateItemAtIndex = (array, index, newValues) => {
        return array.map((item, i) =>
            i === index ? { ...item, ...newValues } : item
        );
    };

    // บันทึกการแก้ไข
    const submitEdit = () => {
        if (editProduct && indexEdit !== null) {
            const updatedItems = updateItemAtIndex(selectedItems, indexEdit, {
                ...editProduct,
                quantity: quantityEdit,
                id: selectedFreeIdEdit,
                mixItems: editProduct.fix === "2" ? selectedPdIdEdit.map(id => {
                    const item = Mix.find(m => m.pd_id === id);
                    return {
                        pd_id: id,
                        pd_name: item ? item.pd_name : 'Unknown',
                        quantity: quantitiesEdit[id] || 1
                    };
                }) : []
            });
            // const newItem = {
            //     ...editProduct,
            //     quantity: quantityEdit,
            //     id: selectedFreeIdEdit,
            //     mixItems: editProduct.fix === "2" ? selectedPdIdEdit.map(id => {
            //         const item = Mix.find(m => m.pd_id === id);
            //         return {
            //             pd_id: id,
            //             pd_name: item ? item.pd_name : 'Unknown',
            //             quantity: quantitiesEdit[id] || 1
            //         };
            //     }) : []
            // };
            setSelectedItems(updatedItems);
            setIsOpenEdit(false); // ปิด modal
            setIsOpenEditMix(false); // ปิด modal
            // รีเซ็ตค่าต่างๆ
            setEditProduct(null);
            setIndexEdit(null);
            setQuantityEdit(1);
            setSelectedFreeIdEdit(null);

        }
    };

    const handleCheckboxChangeEdit = (pd_id: number) => {
        if (selectedPdIdEdit.includes(pd_id)) {
            // If already selected, remove it from the list
            const newSelectedIds = selectedPdIdEdit.filter(id => id !== pd_id);
            setSelectedPdIdEdit(newSelectedIds);

            // Remove the quantity entry for this pd_id
            const { [pd_id]: _, ...rest } = quantitiesEdit; // Remove the entry from quantities
            setQuantitiesEdit(rest);
        } else {
            // Check if adding this item would exceed the limit
            const currentTotal = Object.values(quantitiesEdit).reduce((acc, qty) => acc + qty, 0);
            if (currentTotal < editProduct.qty_per_unit) {
                setSelectedPdIdEdit([...selectedPdIdEdit, pd_id]);
                setQuantitiesEdit({ ...quantitiesEdit, [pd_id]: 1 }); // Initialize with quantity 1
            }
        }
    };

    const [quantitiesEdit, setQuantitiesEdit] = useState<{ [key: number]: number }>({});
    const getTotalSelectedItemsEdit = () => {
        return selectedPdIdEdit.reduce((total, id) => total + (quantitiesEdit[id] || 1), 0);
    };

    // Functions to increment and decrement quantity
    const incrementQuantitymixEdit = (pd_id: number) => {
        const currentTotal = getTotalSelectedItemsEdit();
        if (currentTotal < editProduct.qty_per_unit) {
            setQuantitiesEdit({
                ...quantitiesEdit,
                [pd_id]: (quantitiesEdit[pd_id] || 1) + 1,
            });
        }
    };

    const decrementQuantitymixEdit = (pd_id: number) => {
        if (quantitiesEdit[pd_id] > 1) {
            setQuantitiesEdit({
                ...quantitiesEdit,
                [pd_id]: quantitiesEdit[pd_id] - 1,
            });
        } else {
            // ถ้าจำนวนเหลือ 1 และกดลบ ให้นำรายการออกจากการเลือก
            const newSelectedPdIds = selectedPdIds.filter(id => id !== pd_id);
            setSelectedPdIds(newSelectedPdIds);

            // ลบข้อมูลจำนวนของรายการนี้ออก
            const { [pd_id]: _, ...restQuantities } = quantitiesEdit;
            setQuantitiesEdit(restQuantities);
        }
    };

    const test =
    {
        "sm_id": 5,
        "sm_name": "ออริจินอล M",
        "sm_price": 80,
        "status": "c",
        "fix": "1",
        "picture": "images/logo.svg",
        "smt_id": 1,
        "smt_name": "กล่อง M",
        "qty_per_unit": 4,
        "quantity": 1,
        "id": "3",
        "mixItems": []
    }

    if(getSession()?.st_id){
console.log("session", getSession().st_id)
setSessionData(getSession().st_id)
    }

// console.log("session", getSession().st_id)

    return (
        <div className={`${kanit.className} max-h-[calc(100vh-50px)]`}>
            <div className="flex flex-col ">
                {/* nav ส่วนบน */}
                <nav className="bg-white border-gray-200 dark:bg-gray-900 w-full border border-b-[#C5B182] border-b-1">
                    <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                        <div className="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
                            <UserCircleIcon className="h-6 w-6 text-[#73664B] justify-end" />
                            <span className="text-[#73664B] pl-2">นายฉันทกร อุดรพันธ์</span>
                        </div>
                        <div
                            className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
                            id="navbar-user"
                        >
                            <ul className="flex flex-col font-medium p-0 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                                <li>
                                    <a
                                        href="#"
                                        className="block py-2 px-3 text-white rounded md:bg-transparent md:text-[#73664B] md:p-0"
                                        aria-current="page"
                                    >
                                        ซอฟโดว์ แอดมิน
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>

                <main className="flex flex-grow bg-white">
                    {/* Left Content */}
                    <div className="flex-grow overflow-y-auto pl-4 pt-4">
                        {/* Content that can scroll independently */}
                        <div>
                            <p className='text-[#F2B461] font-medium m-1'>ทำรายการขาย</p>
                            <div className="flex justify-between">
                                <form className="flex items-center w-full transform scale-75  ">
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

                            </div>
                            <div className="w-full">
                                <div className="flex w-full flex-col">
                                    <Tabs
                                        aria-label="Options"
                                        color="primary"
                                        variant="underlined"
                                        classNames={{
                                            tabList: "gap-6 w-full relative rounded-none p-0 mx-2 border-b-1 border-b-[#E3D8BF]",
                                            cursor: "w-full bg-[#73664B]",
                                            tab: "max-w-fit px-0 h-12",
                                            tabContent: "group-data-[selected=true]:text-[#73664B]"
                                        }}
                                    >
                                        {/* Tab 1 */}
                                        <Tab
                                            key="product"
                                            title={
                                                <div className="flex items-center space-x-2">
                                                    <span>สินค้า</span>
                                                </div>
                                            }
                                        >
                                            <div className="second-tab-layout mx-1  max-h-[calc(100vh-225px)] overflow-y-auto">
                                                <div className="relative overflow-x-auto ">
                                                    {statusLoading ? (
                                                        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-5 lg:grid-cols-3 2xl:grid-cols-7 gap-4">
                                                            {Sale && Sale.length > 0 ? (
                                                                Sale.map((sale, index) => (
                                                                    <Card key={index}
                                                                        onClick={() => openModal(sale)}
                                                                        shadow="sm" isPressable onPress={() => console.log("item pressed")}
                                                                        className="card w-40 max-w-xs  bg-base-100 shadow-md mx-2 h-48 ml-1 mb-4 ">
                                                                        <CardBody className="overflow-visible p-0">
                                                                            <Image
                                                                                // shadow="sm"
                                                                                // radius="lg"
                                                                                width="100%"
                                                                                alt={sale.picture}
                                                                                className="w-full object-cover h-[140px]"
                                                                                src={sale.picture}
                                                                            />
                                                                        </CardBody>
                                                                        <CardFooter className="text-small justify-between">
                                                                            <p className='text-[#73664B]'>{sale.sm_name}</p>
                                                                            <p className="text-[#F2B461]">{getPriceBasedOnDelivery(sale)}</p>
                                                                        </CardFooter>
                                                                    </Card>

                                                                ))
                                                            ) : (
                                                                <div className="flex justify-center items-center w-full">
                                                                    <p className="text-sm text-gray-400">ไม่มีข้อมูล</p>
                                                                </div>
                                                            )}

                                                        </div>
                                                    ) : (
                                                        <Spinner label="Loading..." color="warning" className="flex justify-center m-60" />
                                                    )}
                                                </div>
                                            </div>
                                        </Tab>
                                        {/* tab2 */}
                                        {/* Tab Menu */}
                                        <Tab
                                            key="promotion"
                                            title={
                                                <div className="flex items-center space-x-2">
                                                    <span>โปรโมชันของแถมวันนี้</span>
                                                </div>
                                            }
                                        >
                                            <div className="second-tab-layout mx-1">
                                                <div className="relative overflow-x-auto ">
                                                    <div className="m-4 grid grid-cols-3 gap-3">
                                                        {Array.isArray(selectedPromotionfree) && selectedPromotionfree.map((ingredients, idx) => {
                                                            const endDate = new Date(ingredients.pm_dateend);

                                                            // Skip rendering if endDate is before today
                                                            if (endDate < today) {
                                                                return null;
                                                            }
                                                            // Extract unique smbuytype and smfreetype values
                                                            // const smbuyTypes = [...new Set(ingredients.detail.map(detail => detail.smbuytype))].join(', ');
                                                            // const smfreeTypes = [...new Set(ingredients.detail.map(detail => detail.smfreetype))].join(', ');

                                                            const smbuyTypes = Array.from(new Set(ingredients.detail.map(detail => detail.smbuytype))).join(', ');
                                                            const smfreeTypes = Array.from(new Set(ingredients.detail.map(detail => detail.smfreetype))).join(', ');

                                                            return (
                                                                <Link href={`/promotion/${ingredients.pm_id}`} key={ingredients.pm_id + "link"}>
                                                                    <div key={ingredients.pm_id} className="card bg-base-100 shadow-[0px_0px_7px_0px_#EEE8DA]">
                                                                        <div className="card-body p-4">
                                                                            <div className="flex flex-row items-center justify-between">
                                                                                <div className="card-title text-[#F2B461]">{ingredients.pm_name}</div>

                                                                            </div>
                                                                            <p className="text-[#73664B] text-sm">ประเภทสินค้าที่ซื้อ : {smbuyTypes}</p>
                                                                            <p className="text-[#73664B] text-sm">ประเภทสินค้าที่แถม : {smfreeTypes}</p>
                                                                            <p className="text-[#73664B] text-sm">เริ่มโปรโมชั่น : {ingredients.pm_datestart}</p>
                                                                            <p className="text-[#73664B] text-sm">สิ้นสุดโปรโมชั่น : {ingredients.pm_dateend}</p>
                                                                        </div>
                                                                    </div>
                                                                </Link>
                                                            );
                                                        })}
                                                    </div>
                                                </div>
                                            </div>
                                        </Tab>
                                        <Tab
                                            key="promotion1"
                                            title={
                                                <div className="flex items-center space-x-2">
                                                    <span>โปรโมชันลดราคาวันนี้</span>
                                                </div>
                                            }
                                        >
                                            <div className="third-tab-layout mx-1">
                                                <div className="relative overflow-x-auto ">
                                                    <div className="m-4 grid grid-cols-3 gap-3">
                                                        {Array.isArray(Promotion) && Promotion.map((promotion) => {
                                                            const endDate = new Date(promotion.dateend);

                                                            // Skip rendering if endDate is before today
                                                            if (endDate < today) {
                                                                return null;
                                                            }

                                                            return (
                                                                <div key={promotion.dc_id} className="card bg-base-100 shadow-[0px_0px_7px_0px_#EEE8DA]">
                                                                    <div className="card-body p-4">
                                                                        <div className="flex flex-row items-center justify-between">
                                                                            <div className="card-title text-[#F2B461]">{promotion.dc_name}</div>
                                                                            {/* <Link href={`/promotion/editdis/${promotion.dc_id}`} className="flex justify-end">
                                                                                <PencilSquareIcon className="h-5 w-5 text-[#73664B] ml-auto" />
                                                                            </Link> */}
                                                                        </div>
                                                                        <p className="text-[#73664B] text-sm">รายละเอียด: {promotion.dc_detail}</p>
                                                                        <p className="text-[#73664B] text-sm">ราคาส่วนลด: {promotion.dc_diccountprice} บาท</p>
                                                                        <p className="text-[#73664B] text-sm">เริ่มโปรโมชั่น: {promotion.datestart}</p>
                                                                        <p className="text-[#73664B] text-sm">สิ้นสุดโปรโมชั่น: {promotion.dateend}</p>
                                                                    </div>
                                                                </div>
                                                            );
                                                        })}

                                                    </div>
                                                </div>
                                            </div>
                                        </Tab>
                                    </Tabs>
                                </div>
                            </div>
                            {/* Repeat or add more content to make the left section scrollable */}

                        </div>
                    </div>

                    {/* Right Order Panel */}
                    <div className="relative w-screen max-w-sm h-[calc(100vh-60px)] overflow-hidden border-l-1">
                        <div className="pointer-events-auto h-full w-full transform transition duration-500 ease-in-out bg-white shadow-xl flex flex-col">
                            {/* ส่วนหัว */}
                            <div className="px-4 py-4 sm:px-6">
                                <div className="flex items-start justify-between">
                                    <p className="text-lg font-medium text-[#73664B]">คำสั่งซื้อ</p>
                                </div>
                                <div className="mt-2">
                                    <p className="font-normal text-[#73664B]">วันที่ : {todayDateTime}</p>
                                </div>
                                <div className="mt-2">
                                    <select
                                        id="countries"
                                        className="bg-[#E3D9C0] block w-full rounded-md py-1.5 text-[#73664B] shadow-sm sm:text-sm sm:leading-6 pl-2"
                                        name="sell"
                                        onChange={handleDeliveryChange}
                                    >
                                        <option value="1">ขายหน้าร้าน</option>
                                        <option value="2">Line Man</option>
                                        <option value="3">Grab</option>
                                    </select>
                                </div>
                            </div>

                            {/* ส่วนรายการสินค้า (สามารถสกรอลล์ได้) */}
                            <div className="flex-1 overflow-y-auto px-4 sm:px-6">
                                <ul role="list" className="divide-y divide-gray-200">
                                    {selectedItems.map((product, index) => (
                                        <li key={index} className="py-6 flex">
                                            <div className="h-10 w-10 flex-shrink-0 overflow-hidden rounded-md border border-gray-200 flex justify-center items-center">
                                                <p className='text-[#F2B461]'>{product.quantity}x</p>
                                            </div>
                                            <div className="ml-4 flex flex-1 flex-col">
                                                <div>
                                                    <div className="flex justify-between text-base font-medium text-[#73664B]">
                                                        <h3>{product.sm_name}</h3>
                                                        <p className="ml-4">{(product.sm_price * product.quantity).toFixed(2)} บาท</p>
                                                    </div>
                                                    {product.id && smfreeIdNameMap.get(parseInt(product.id)) && (
                                                        <p className="mt-1 text-sm font-light ">
                                                            แถมฟรี: {smfreeIdNameMap.get(parseInt(product.id))}
                                                        </p>
                                                    )}
                                                    {product.mixItems && product.mixItems.length > 0 && (
                                                        <div className="mt-1 text-sm font-light ">
                                                            <p>ประกอบด้วย:</p>
                                                            <ul className="list-disc list-inside pl-2">
                                                                {product.mixItems.map((item, idx) => (
                                                                    <li key={idx}>{item.pd_name} x{item.quantity}</li>
                                                                ))}
                                                            </ul>
                                                        </div>
                                                    )}
                                                </div>
                                                <div className="flex items-center justify-between text-sm mt-2">
                                                    <div className="flex items-center">
                                                        <p onClick={() => openModalsEdit(index)} className='text-[#F2B461] cursor-pointer'>แก้ไข</p>
                                                    </div>
                                                    <button
                                                        type="button"
                                                        onClick={() => handleRemoveItem(index)}
                                                        className="text-[#FF6B6B] hover:text-[#FF3E3E]"
                                                    >
                                                        <TrashIcon className="h-5 w-5" />
                                                    </button>
                                                </div>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* ส่วนท้าย */}
                            <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                                <div className="mb-4">
                                    <select
                                        id="promotion"
                                        className="bg-[#E3D9C0] block w-full rounded-md py-1.5 text-[#73664B] shadow-sm sm:text-sm sm:leading-6 pl-2"
                                        name="promotion"
                                        onChange={handlePromotionChange}
                                    >
                                        <option value="">ไม่มีโปรโมชัน</option>
                                        {Promotion.filter((promotion) => calculateTotalPriceBeforeDiscount(selectedItems) >= promotion.minimum)
                                            .map((promotion, index) => (
                                                <option key={index} value={promotion.dc_name}>
                                                    {promotion.dc_name}, {promotion.dc_diccountprice}
                                                </option>
                                            ))}
                                    </select>
                                </div>
                                <div className="flex justify-between text-sm text-[#73664B] mb-2">
                                    <p>ยอดรวม</p>
                                    <p>{calculateTotalPriceBeforeDiscount(selectedItems).toFixed(2)} บาท</p>
                                </div>
                                <div className="flex justify-between text-sm text-[#73664B] mb-2">
                                    <p>ส่วนลด</p>
                                    <p>- {selectedPromotion ? selectedPromotion.dc_diccountprice.toFixed(2) : '0.00'} บาท</p>
                                </div>
                                <div className="flex justify-between text-base font-medium text-[#73664B] mb-6">
                                    <p>รวมสุทธิ</p>
                                    <p>{calculateTotalPrice().toFixed(2)} บาท</p>
                                </div>
                                <Button
                                    onClick={openModal2}
                                    className="flex items-center justify-center rounded-md border border-transparent bg-[#73664B] px-6 py-3 text-base font-medium text-white shadow-sm w-full hover:bg-[#5E523C]"
                                >
                                    ยืนยัน
                                </Button>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
            {/* <div className="flex justify-start"> */}
            <div className="w-1/2  mt-10  flex justify-start ">
                <>
                    {isOpen2 && (
                        <Transition appear show={isOpen2} as={Fragment} >
                            <Dialog as="div" onClose={closeModal} className={`relative z-10 ${kanit.className}`}>
                                <Transition.Child
                                    as={Fragment}
                                    enter="ease-out duration-300"
                                    enterFrom="opacity-0"
                                    enterTo="opacity-100"
                                    leave="ease-in duration-200"
                                    leaveFrom="opacity-100"
                                    leaveTo="opacity-0"
                                >
                                    <div className="fixed inset-0 bg-black/25" />
                                </Transition.Child>

                                <div className="fixed inset-0 overflow-y-auto">
                                    <div className="flex min-h-full items-center justify-center p-4 text-center">
                                        <Transition.Child
                                            as={Fragment}
                                            enter="ease-out duration-300"
                                            enterFrom="opacity-0 scale-95"
                                            enterTo="opacity-100 scale-100"
                                            leave="ease-in duration-200"
                                            leaveFrom="opacity-100 scale-100"
                                            leaveTo="opacity-0 scale-95"
                                        >
                                            <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                                <Dialog.Title
                                                    as="h3"
                                                    className="text-lg font-medium leading-6  text-center text-[#73664B]"
                                                >
                                                    รายละเอียดคำสั่งซื้อ
                                                </Dialog.Title>

                                                <div className="mx-6 ">
                                                    <p className="text-lg text-[#73664B] font-medium mt-3">
                                                        รายการ
                                                    </p>

                                                    <div className="space-y-4">
                                                        {selectedItems.map((product, index) => (
                                                            <li key={index} className="flex">
                                                                <div className="h-8 w-8 flex-shrink-0 overflow-hidden rounded-md border border-gray-200 flex justify-center items-center">
                                                                    <p className='text-[#F2B461] text-xs'>{product.quantity}x</p>
                                                                </div>
                                                                <div className="ml-4 flex flex-1 flex-col">
                                                                    <div>
                                                                        <div className="flex justify-between text-base font-medium">
                                                                            <h3 className='text-black'>{product.sm_name}</h3>
                                                                            <p className="ml-4 text-black">{(product.sm_price * product.quantity).toFixed(2)} บาท</p>
                                                                        </div>
                                                                        {product.id && smfreeIdNameMap.get(parseInt(product.id)) && (
                                                                            <p className="mt-1 text-sm font-light ">
                                                                                x {smfreeIdNameMap.get(parseInt(product.id))}
                                                                            </p>
                                                                        )}
                                                                        {product.mixItems && product.mixItems.length > 0 && (
                                                                            <div className="mt-1 text-sm font-light ">
                                                                                <ul className="list-disc list-inside pl-2">
                                                                                    {product.mixItems.map((item, idx) => (
                                                                                        <li key={idx}>{item.pd_name} x{item.quantity}</li>
                                                                                    ))}
                                                                                </ul>
                                                                            </div>
                                                                        )}
                                                                    </div>
                                                                </div>
                                                            </li>
                                                        ))}

                                                    </div>

                                                    <div className="mt-6 space-y-2">
                                                        <div className="flex justify-between">
                                                            <p>ยอดรวม</p>
                                                            <p>{calculateTotalPriceBeforeDiscount(selectedItems).toFixed(2)} บาท</p>
                                                        </div>
                                                        <div className="flex justify-between">
                                                            <p>ส่วนลด</p>
                                                            <p>- {selectedPromotion ? selectedPromotion.dc_diccountprice.toFixed(2) : '0.00'} บาท</p>
                                                        </div>
                                                        <div className="flex justify-between font-base font-medium">
                                                            <p>รวมสุทธิ</p>
                                                            <p>{calculateTotalPrice().toFixed(2)} บาท</p>
                                                        </div>
                                                    </div>

                                                    <div className="mt-6">
                                                        <p>การชำระเงิน:</p>
                                                        <select
                                                            id="countries"
                                                            className="bg-[#E3D9C0] mt-2 block w-full rounded-md py-1.5 text-[#73664B] shadow-sm sm:text-sm sm:leading-6 pl-2"
                                                            name="sell"
                                                            onChange={handlePaymentChange}

                                                        >
                                                            <option value="t" >โอนจ่าย</option>
                                                            <option value="c" >เงินสด</option>

                                                        </select>

                                                    </div>
                                                    {paymentMethod === 'c' && (
                                                        <div className="mt-4">
                                                            <label htmlFor="cashReceived" className="block text-sm text-gray-600">จำนวนเงินที่ลูกค้าจ่าย:</label>
                                                            <input
                                                                type="number"
                                                                id="cashReceived"
                                                                className="mt-1 w-full rounded-md border-gray-300 py-1.5 pl-2 text-gray-900 shadow-sm sm:text-sm"
                                                                placeholder="กรอกจำนวนเงิน"
                                                                value={cashReceived}
                                                                onChange={(e) => setCashReceived(parseFloat(e.target.value))}
                                                            />

                                                            <div className="flex justify-between mt-3  text-[#73664B]">
                                                                <p className='font-base font-medium'>เงินทอน:</p>
                                                                <p>{cashReceived > 0 ? calculateChange().toFixed(2) : '0.00'} บาท</p>
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>

                                                {/*  choose */}
                                                <div className="flex justify-end mt-5">
                                                    <div className="inline-flex justify-end">
                                                        <button
                                                            type="button"
                                                            className="text-[#73664B] inline-flex justify-center rounded-md border border-transparent  px-4 py-2 text-sm font-medium hover:bg-[#FFFFDD] focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                                            onClick={closeModal2}
                                                        >
                                                            ยกเลิก
                                                        </button>
                                                        <button
                                                            type="button"
                                                            className="text-[#C5B182] inline-flex justify-center rounded-md border border-transparent  px-4 py-2 text-sm font-medium  hover:bg-[#FFFFDD] focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                                            onClick={openModal3}

                                                        ><Link href="#">
                                                                ยืนยัน
                                                            </Link></button>
                                                    </div>
                                                </div>
                                            </Dialog.Panel>
                                        </Transition.Child>
                                    </div>
                                </div>
                            </Dialog>
                        </Transition>
                    )
                    }
                </>
            </div>
            <div className="w-1/2  mt-10  flex justify-start ">
                <>
                    {isOpen3 && (
                        <Transition appear show={isOpen2} as={Fragment} >
                            <Dialog as="div" onClose={closeModal} className={`relative z-10 ${kanit.className}`}>
                                <Transition.Child
                                    as={Fragment}
                                    enter="ease-out duration-300"
                                    enterFrom="opacity-0"
                                    enterTo="opacity-100"
                                    leave="ease-in duration-200"
                                    leaveFrom="opacity-100"
                                    leaveTo="opacity-0"
                                >
                                    <div className="fixed inset-0 bg-black/25" />
                                </Transition.Child>

                                <div className="fixed inset-0 overflow-y-auto">
                                    <div className="flex min-h-full items-center justify-center p-4 text-center">
                                        <Transition.Child
                                            as={Fragment}
                                            enter="ease-out duration-300"
                                            enterFrom="opacity-0 scale-95"
                                            enterTo="opacity-100 scale-100"
                                            leave="ease-in duration-200"
                                            leaveFrom="opacity-100 scale-100"
                                            leaveTo="opacity-0 scale-95"
                                        >
                                            <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                                <Dialog.Title
                                                    as="h3"
                                                    className="text-lg font-medium leading-6  text-center text-[#73664B]"
                                                >
                                                    รายละเอียดคำสั่งซื้อ
                                                </Dialog.Title>

                                                <div className="mx-6 ">
                                                    <div className='mt-3'>
                                                        <p className="text-gray-700">{formatAddress(addressData)}</p>

                                                    </div>
                                                    {/* ต้องเข้า dn หลังจากนี้ เลขที่ใบเสร็จจะสร้างตอนหลังจากนี้ จะออกตอน export pdf */}
                                                    {/* <p className=" ">
                                                        เลขที่ใบเสร็จ :
                                                    </p> */}
                                                    <p className="">
                                                        วันที่ : {todayDateTime}
                                                    </p>
                                                    <p className=" ">
                                                        คำสั่งซื้อ: {selectedDeliveryOption === 1 ? 'ขายหน้าร้าน' : selectedDeliveryOption === 2 ? 'Line Man' : selectedDeliveryOption === 3 ? 'Grab' : ''}
                                                    </p>
                                                    <p className=" ">
                                                        พนักงานขาย :
                                                    </p>
                                                    <p className=" ">
                                                        การขำระเงิน : {paymentMethod === 't' ? 'โอนจ่าย' : paymentMethod === 'c' ? 'เงินสด' : ''}
                                                    </p>
                                                    <p className="mt-3">
                                                        รายการ
                                                    </p>

                                                    <div className="space-y-4">
                                                        {selectedItems.map((product, index) => (
                                                            <li key={index} className="flex">
                                                                <div className="h-8 w-8 flex-shrink-0 overflow-hidden rounded-md border border-gray-200 flex justify-center items-center">
                                                                    <p className='text-[#F2B461] text-xs'>{product.quantity}x</p>
                                                                </div>
                                                                <div className="ml-4 flex flex-1 flex-col">
                                                                    <div>
                                                                        <div className="flex justify-between text-base font-medium">
                                                                            <h3 className='text-black'>{product.sm_name}</h3>
                                                                            <p className="ml-4 text-black">{(product.sm_price * product.quantity).toFixed(2)} บาท</p>
                                                                        </div>
                                                                        {product.id && smfreeIdNameMap.get(parseInt(product.id)) && (
                                                                            <p className="mt-1 text-sm font-light ">
                                                                                x {smfreeIdNameMap.get(parseInt(product.id))}
                                                                            </p>
                                                                        )}
                                                                        {product.mixItems && product.mixItems.length > 0 && (
                                                                            <div className="mt-1 text-sm font-light ">
                                                                                <ul className="list-disc list-inside pl-2">
                                                                                    {product.mixItems.map((item, idx) => (
                                                                                        <li key={idx}>{item.pd_name} x{item.quantity}</li>
                                                                                    ))}
                                                                                </ul>
                                                                            </div>
                                                                        )}
                                                                    </div>
                                                                </div>
                                                            </li>
                                                        ))}

                                                    </div>

                                                    <div className="mt-6 space-y-2">
                                                        <div className="flex justify-between">
                                                            <p>ยอดรวม</p>
                                                            <p>{calculateTotalPriceBeforeDiscount(selectedItems).toFixed(2)} บาท</p>
                                                        </div>
                                                        <div className="flex justify-between">
                                                            <p>ส่วนลด</p>
                                                            <p>- {selectedPromotion ? selectedPromotion.dc_diccountprice.toFixed(2) : '0.00'} บาท</p>
                                                        </div>
                                                        <div className="flex justify-between font-base font-medium">
                                                            <p>รวมสุทธิ</p>
                                                            <p>{calculateTotalPrice().toFixed(2)} บาท</p>
                                                        </div>
                                                        {paymentMethod === 'c' && (
                                                            <div className='space-y-2'>
                                                                <div className="flex justify-between">
                                                                    <p>เงินสด</p>
                                                                    <p>{cashReceived.toFixed(2)} บาท</p>
                                                                </div>
                                                                <div className="flex justify-between ">
                                                                    <p>เงินทอน</p>
                                                                    <p>{cashReceived > 0 ? calculateChange().toFixed(2) : '0.00'} บาท</p>
                                                                </div>
                                                            </div>
                                                        )}

                                                    </div>



                                                    {/* {paymentMethod === 'cash' && (
                                                        <div className="mt-4">

                                                            <div className="flex justify-between mt-3 text-sm text-[#73664B]">
                                                                <p>เงินสด:</p>
                                                                <p>{cashReceived} บาท</p>
                                                            </div>

                                                            <div className="flex justify-between mt-3 text-sm text-[#73664B]">
                                                                <p>เงินทอน:</p>
                                                                <p>{cashReceived > 0 ? calculateChange().toFixed(2) : '0.00'} บาท</p>
                                                            </div>
                                                        </div>
                                                    )} */}
                                                </div>

                                                {/*  choose */}
                                                <div className="flex justify-end mt-5">
                                                    <div className="inline-flex justify-end">
                                                        <button
                                                            type="button"
                                                            className="text-[#73664B] inline-flex justify-center rounded-md border border-transparent  px-4 py-2 text-sm font-medium hover:bg-[#FFFFDD] focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                                            onClick={closeModal3}
                                                        >
                                                            ยกเลิก
                                                        </button>
                                                        <button
                                                            type="button"
                                                            className="text-[#C5B182] inline-flex justify-center rounded-md border border-transparent  px-4 py-2 text-sm font-medium  hover:bg-[#FFFFDD] focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                                            onClick={handleSubmit}
                                                        >
                                                            ยืนยัน
                                                        </button>
                                                    </div>
                                                </div>
                                            </Dialog.Panel>
                                        </Transition.Child>
                                    </div>
                                </div>
                            </Dialog>
                        </Transition>
                    )
                    }
                </>
            </div>

            <div className="w-1/2  mt-10  flex justify-start ">
                <>
                    {isOpen && (
                        <Transition appear show={isOpen} as={Fragment}>
                            <Dialog as="div" onClose={closeModal} className={`relative z-10 ${kanit.className}`}>
                                <Transition.Child
                                    as={Fragment}
                                    enter="ease-out duration-300"
                                    enterFrom="opacity-0"
                                    enterTo="opacity-100"
                                    leave="ease-in duration-200"
                                    leaveFrom="opacity-100"
                                    leaveTo="opacity-0"
                                >
                                    <div className="fixed inset-0 bg-black/25" />
                                </Transition.Child>

                                <div className="fixed inset-0 overflow-y-auto">
                                    <div className="flex min-h-full items-center justify-center p-4 text-center ">
                                        <Transition.Child
                                            as={Fragment}
                                            enter="ease-out duration-300"
                                            enterFrom="opacity-0 scale-95"
                                            enterTo="opacity-100 scale-100"
                                            leave="ease-in duration-200"
                                            leaveFrom="opacity-100 scale-100"
                                            leaveTo="opacity-0 scale-95"
                                        >
                                            <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-gray-50 text-left align-middle shadow-xl transition-all">
                                                <div>
                                                    {selectedSale && (
                                                        <Card shadow="sm">
                                                            <CardBody className="overflow-visible p-0 bg-white">
                                                                <Image
                                                                    alt={'/default-image.png'}
                                                                    shadow="sm"
                                                                    width={448}
                                                                    src={selectedSale.picture || '/default-image.png'}  // Fallback if picture is missing
                                                                    className="object-cover h-[140px] bg-white"
                                                                />
                                                            </CardBody>
                                                        </Card>
                                                    )}

                                                    <Dialog.Title
                                                        as="h3"
                                                        className="text-lg bg-white pb-3 font-medium leading-6 text-[73664B] px-4 pt-4 flex justify-between"
                                                    >
                                                        <p>{selectedSale.sm_name}</p>
                                                        <p className="text-[#F2B461]">ราคา {selectedSale.sm_price != null ? selectedSale.sm_price : 'N/A'}฿</p>
                                                    </Dialog.Title>
                                                    <div className="px-4 pb-2 pt-2 mt-1 bg-white">

                                                        {freeItemIds.length > 0 && (
                                                            <>
                                                                <div>
                                                                    <p className="text-lg font-medium">
                                                                        ของแถม
                                                                    </p>
                                                                    <p className='text-sm text-[#73664B] font-normal'>จำเป็นต้องระบุ</p>
                                                                </div>


                                                                <RadioGroup
                                                                    value={selectedFreeId}
                                                                    onChange={handleFreeIdChange}
                                                                    className='mt-2'
                                                                >
                                                                    {freeItemIds.map(id => (
                                                                        <Radio
                                                                            key={id}
                                                                            value={id.toString()}
                                                                            classNames={{
                                                                                base: cn(
                                                                                    "inline-flex max-w-full w-full bg-content1 m-0",
                                                                                    "hover:bg-content2 items-center justify-start",
                                                                                    "cursor-pointer rounded-lg gap-2 p-2 border-2 border-transparent",
                                                                                    "data-[selected=true]:border-primary"
                                                                                ),
                                                                            }}
                                                                        >
                                                                            {smfreeIdNameMap.get(id) || 'No Name Available'}
                                                                        </Radio>
                                                                    ))}
                                                                </RadioGroup>
                                                            </>
                                                        )}

                                                    </div>

                                                    <div className='px-4 pb-4 pt-2 mt-1 bg-white'>
                                                            <p className="text-lg font-medium">จำนวน</p>
                                                            <div className="flex items-center justify-center mt-2">
                                                                <button
                                                                    onClick={decrementQuantity}
                                                                    className="btn btn-square bg-[#D9CAA7] btn-sm flex items-center justify-center"
                                                                    disabled={quantity == 1}
                                                                >
                                                                    <svg className="text-[#73664B] w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256">
                                                                        <path fill="currentColor" d="M228 128a12 12 0 0 1-12 12H40a12 12 0 0 1 0-24h176a12 12 0 0 1 12 12" />
                                                                    </svg>
                                                                </button>
                                                                <span className="w-10 text-center mx-2 text-lg">{quantity}</span>
                                                                <button
                                                                    onClick={incrementQuantity}
                                                                    className="btn btn-square bg-[#D9CAA7] btn-sm flex items-center justify-center"
                                                                >
                                                                    <svg className="text-[#73664B] w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256">
                                                                        <path fill="currentColor" d="M228 128a12 12 0 0 1-12 12h-76v76a12 12 0 0 1-24 0v-76H40a12 12 0 0 1 0-24h76V40a12 12 0 0 1 24 0v76h76a12 12 0 0 1 12 12" />
                                                                    </svg>
                                                                </button>
                                                            </div>
                                                        </div>

                                                        <div className="flex p-4 w-full bg-white mt-1">

                                                            <button
                                                                type="button"
                                                                className="inline-flex justify-center w-1/2 rounded-md border border-transparent bg-gray-200 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                                                onClick={closeModal}
                                                            >
                                                                ยกเลิก
                                                            </button>
                                                            <div className='mx-1'></div>
                                                            <button
                                                                type="button"
                                                                className="inline-flex justify-center w-1/2 rounded-md border border-transparent bg-[#C5B182] px-4 py-2 text-sm font-medium text-white hover:bg-[#A89362] focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                                                onClick={handleAddToCart}
                                                            >
                                                                เพิ่มลงตะกร้า
                                                            </button>
                                                        </div>

                                                </div>
                                            </Dialog.Panel>
                                        </Transition.Child>
                                    </div>
                                </div>
                            </Dialog>
                        </Transition>
                    )}
                </>
            </div>

            <div className="w-1/2  mt-10  flex justify-start ">
                <>
                    {isOpenmix && (
                        <Transition appear show={isOpenmix} as={Fragment} >
                            <Dialog as="div" onClose={closeModal} className={`relative z-10 ${kanit.className} bg-gray-500`}>
                                <Transition.Child
                                    as={Fragment}
                                    enter="ease-out duration-300"
                                    enterFrom="opacity-0"
                                    enterTo="opacity-100"
                                    leave="ease-in duration-200"
                                    leaveFrom="opacity-100"
                                    leaveTo="opacity-0"
                                >
                                    <div className="fixed inset-0 bg-black/25" />
                                </Transition.Child>

                                <div className="fixed inset-0 overflow-y-auto ">
                                    <div className="flex min-h-full items-center justify-center p-4 text-center">
                                        <Transition.Child
                                            as={Fragment}
                                            enter="ease-out duration-300"
                                            enterFrom="opacity-0 scale-95"
                                            enterTo="opacity-100 scale-100"
                                            leave="ease-in duration-200"
                                            leaveFrom="opacity-100 scale-100"
                                            leaveTo="opacity-0 scale-95"
                                        >
                                            <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-gray-50 text-left align-middle shadow-xl transition-all">
                                                <div>
                                                    {selectedSale && (
                                                        <Card shadow="sm" className='bg-white'>
                                                            <CardBody className="overflow-visible p-0 bg-white">
                                                                <Image
                                                                    alt={'/default-image.png'}
                                                                    shadow="sm"
                                                                    width={448}
                                                                    src={selectedSale.picture || '/default-image.png'}  // Fallback if picture is missing
                                                                    className="object-cover h-[140px] bg-white"
                                                                />
                                                            </CardBody>
                                                        </Card>
                                                    )}

                                                    <Dialog.Title
                                                        as="h3"
                                                        className="text-lg bg-white pb-3 font-medium leading-6 text-[73664B] px-4 pt-4 flex justify-between"
                                                    >
                                                        <p>{selectedSale.sm_name}</p>
                                                        <p className="text-[#F2B461]">ราคา {selectedSale.sm_price != null ? selectedSale.sm_price : 'N/A'}฿</p>
                                                    </Dialog.Title>
                                                    <div className='px-4 pb-2 pt-2 mt-1 bg-white'>
                                                        {selectedSale && (
                                                            <div className='flex justify-between items-center'>
                                                                <div>
                                                                    <p className="text-lg font-medium">
                                                                        สินค้า
                                                                    </p>
                                                                    <p className='text-sm text-[#73664B] font-normal'>กรุณาเลือก {selectedSale.qty_per_unit} รายการ</p>
                                                                </div>
                                                                <div>
                                                                    <Chip size="sm">{getTotalSelectedItems()}/{selectedSale.qty_per_unit}</Chip>
                                                                </div>
                                                            </div>
                                                        )}
                                                        <div className="flex flex-col gap-1 w-full max-h-80 overflow-y-auto">
                                                            {Mix.length > 0 ? (
                                                                Mix.map(id => (
                                                                    <Checkbox
                                                                        key={id.pd_id}
                                                                        aria-label={id.pd_name}
                                                                        classNames={{
                                                                            base: cn(
                                                                                "inline-flex max-w-md w-full bg-content1 m-0",
                                                                                "hover:bg-content2 items-center justify-start",
                                                                                "cursor-pointer rounded-lg gap-2 p-2 border-2 border-transparent",
                                                                                "data-[selected=true]:border-primary"
                                                                            ),
                                                                            label: "w-full",
                                                                        }}
                                                                        isDisabled={
                                                                            selectedSale &&
                                                                            !selectedPdIds.includes(id.pd_id) &&
                                                                            getTotalSelectedItems() >= selectedSale.qty_per_unit
                                                                        }
                                                                        checked={selectedPdIds.includes(id.pd_id)}
                                                                        onChange={() => handleCheckboxChange(id.pd_id)}
                                                                    >
                                                                        <div className="w-full flex justify-between gap-2">
                                                                            <User
                                                                                avatarProps={{ size: "md", src: id.picture }}
                                                                                description={id.pdc_name}
                                                                                name={id.pd_name || 'No Name Available'}
                                                                            />
                                                                            <div className="flex flex-col items-end gap-1">
                                                                                {selectedPdIds.includes(id.pd_id) && (
                                                                                    <>
                                                                                        <div className="flex items-center mt-2">
                                                                                            <button
                                                                                                onClick={() => decrementQuantitymix(id.pd_id)}
                                                                                                className="btn btn-square bg-[#D9CAA7] btn-xs"
                                                                                                disabled={quantities[id.pd_id] <= 1}
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
                                                                                            <span className="w-4 text-center mx-2">{quantities[id.pd_id] || 1}</span>
                                                                                            <button
                                                                                                onClick={() => incrementQuantitymix(id.pd_id)}
                                                                                                className="btn btn-square bg-[#D9CAA7] btn-xs"
                                                                                                disabled={getTotalSelectedItems() >= selectedSale.qty_per_unit}
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
                                                                                        </div>
                                                                                    </>
                                                                                )}
                                                                            </div>
                                                                        </div>
                                                                    </Checkbox>
                                                                ))
                                                            ) : (
                                                                <p>ไม่มีรายการสินค้า</p>
                                                            )}
                                                        </div>
                                                    </div>

                                                    <div className='px-4 pb-4 pt-2 mt-1 bg-white'>
                                                            <p className="text-lg font-medium">จำนวน</p>

                                                            <div className='flex items-center justify-center mt-1 w-full'>
                                                                <button
                                                                    onClick={decrementQuantity}
                                                                    className="btn btn-square bg-[#D9CAA7] btn-sm flex items-center justify-center"
                                                                    disabled={quantity == 1}
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
                                                                <span className="w-10 text-center mx-2 text-lg">{quantity}</span>
                                                                <button
                                                                    onClick={incrementQuantity}
                                                                    className="btn btn-square bg-[#D9CAA7] btn-sm flex items-center justify-center"

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
                                                            </div>
                                                        </div>

                                                    {/*  choose */}
                                                    <div className="flex justify-end p-4 w-full bg-white mt-1">
                                                        <div className="inline-flex justify-end w-full">
                                                            <button
                                                                type="button"
                                                                className="bg-gray-200 inline-flex justify-center rounded-md border border-transparent w-1/2 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                                                onClick={closeModalmix}
                                                            >
                                                                ยกเลิก
                                                            </button>
                                                            <div className='mx-1'></div>
                                                            <button
                                                                type="button"
                                                                className={`${getTotalSelectedItems() !== selectedSale.qty_per_unit ? ('bg-[#c9c9c9] ') : ('bg-[#C5B182] hover:bg-[#A89362]')} text-white inline-flex justify-center rounded-md border border-transparent w-1/2 px-4 py-2 text-sm font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2`}
                                                                onClick={handleAddToCart}
                                                                disabled={getTotalSelectedItems() !== selectedSale.qty_per_unit}
                                                            >
                                                                เพิ่มลงตะกร้า</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </Dialog.Panel>
                                        </Transition.Child>
                                    </div>
                                </div>
                            </Dialog>
                        </Transition>
                    )
                    }
                </>
            </div>

            <div className="w-1/2  mt-10  flex justify-start ">
                <>
                    {isOpenEdit && (
                        <Transition appear show={isOpenEdit} as={Fragment}>
                            <Dialog as="div" onClose={closeModal} className={`relative z-10 ${kanit.className}`}>
                                <Transition.Child
                                    as={Fragment}
                                    enter="ease-out duration-300"
                                    enterFrom="opacity-0"
                                    enterTo="opacity-100"
                                    leave="ease-in duration-200"
                                    leaveFrom="opacity-100"
                                    leaveTo="opacity-0"
                                >
                                    <div className="fixed inset-0 bg-black/25" />
                                </Transition.Child>

                                <div className="fixed inset-0 overflow-y-auto">
                                    <div className="flex min-h-full items-center justify-center p-4 text-center">
                                        <Transition.Child
                                            as={Fragment}
                                            enter="ease-out duration-300"
                                            enterFrom="opacity-0 scale-95"
                                            enterTo="opacity-100 scale-100"
                                            leave="ease-in duration-200"
                                            leaveFrom="opacity-100 scale-100"
                                            leaveTo="opacity-0 scale-95"
                                        >
                                            <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white text-left align-middle shadow-xl transition-all">
                                                <div>
                                                    {editProduct && (
                                                        <Card shadow="sm">
                                                            <CardBody className="overflow-visible p-0">
                                                                <Image
                                                                    alt={'/default-image.png'}
                                                                    shadow="sm"
                                                                    width={448}
                                                                    src={editProduct.picture || '/default-image.png'}  // Fallback if picture is missing
                                                                    className="object-cover h-[140px]"
                                                                />
                                                            </CardBody>
                                                        </Card>
                                                    )}

                                                    <Dialog.Title
                                                        as="h3"
                                                        className="text-lg font-medium leading-6 text-[73664B] px-4 pt-4 flex justify-between"
                                                    >
                                                        <p>{editProduct.sm_name}</p>
                                                        <p className="text-[#F2B461]">ราคา {editProduct.sm_price != null ? editProduct.sm_price : 'N/A'}฿</p>
                                                    </Dialog.Title>
                                                    <div className="p-4">
                                                        <div>
                                                            <p className="text-lg font-medium">
                                                                สินค้า
                                                            </p>
                                                            <p className='text-sm text-[#73664B] font-normal'>จำเป็นต้องระบุ</p>
                                                        </div>

                                                        {freeItemIdEdit.length > 0 ? (
                                                            <RadioGroup
                                                                value={selectedFreeIdEdit}
                                                                onChange={handleFreeIdChangeEdit}
                                                                className='mt-2'
                                                            >
                                                                {freeItemIdEdit.map(id => (
                                                                    <Radio
                                                                        key={id}
                                                                        value={id.toString()}
                                                                        classNames={{
                                                                            base: cn(
                                                                                "inline-flex max-w-full w-full bg-content1 m-0",
                                                                                "hover:bg-content2 items-center justify-start",
                                                                                "cursor-pointer rounded-lg gap-2 p-2 border-2 border-transparent",
                                                                                "data-[selected=true]:border-primary"
                                                                            ),
                                                                        }}
                                                                    >
                                                                        {smfreeIdNameMap.get(id) || 'No Name Available'}
                                                                    </Radio>
                                                                ))}
                                                            </RadioGroup>
                                                        ) : (
                                                            <p>ไม่มีรายการฟรี</p>
                                                        )}



                                                        <div>
                                                            <p className="text-lg font-medium mt-2">จำนวน</p>
                                                            <div className="flex items-center justify-center mt-2">
                                                                <button
                                                                    onClick={decrementQuantityEdit}
                                                                    className="btn btn-square bg-[#D9CAA7] btn-sm flex items-center justify-center"
                                                                    disabled={quantityEdit == 1}
                                                                >
                                                                    <svg className="text-[#73664B] w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256">
                                                                        <path fill="currentColor" d="M228 128a12 12 0 0 1-12 12H40a12 12 0 0 1 0-24h176a12 12 0 0 1 12 12" />
                                                                    </svg>
                                                                </button>
                                                                <span className="w-10 text-center mx-2 text-lg">{quantityEdit}</span>
                                                                <button
                                                                    onClick={incrementQuantityEdit}
                                                                    className="btn btn-square bg-[#D9CAA7] btn-sm flex items-center justify-center"
                                                                >
                                                                    <svg className="text-[#73664B] w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256">
                                                                        <path fill="currentColor" d="M228 128a12 12 0 0 1-12 12h-76v76a12 12 0 0 1-24 0v-76H40a12 12 0 0 1 0-24h76V40a12 12 0 0 1 24 0v76h76a12 12 0 0 1 12 12" />
                                                                    </svg>
                                                                </button>
                                                            </div>
                                                        </div>

                                                        <div className="mt-4 flex w-full">

                                                            <button
                                                                type="button"
                                                                className="inline-flex justify-center w-1/2 rounded-md border border-transparent bg-gray-200 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                                                onClick={handleCancel}
                                                            >
                                                                ยกเลิก
                                                            </button>
                                                            <div className='mx-1'></div>
                                                            <button
                                                                type="button"
                                                                className="inline-flex justify-center w-1/2 rounded-md border border-transparent bg-[#C5B182] px-4 py-2 text-sm font-medium text-white hover:bg-[#A89362] focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                                                onClick={submitEdit}
                                                            >
                                                                อัปเดตตะกร้า
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </Dialog.Panel>
                                        </Transition.Child>
                                    </div>
                                </div>
                            </Dialog>
                        </Transition>
                    )}
                </>
            </div>

            <div className="w-1/2  mt-10  flex justify-start ">
                <>
                    {isOpenEditMix && (
                        <Transition appear show={isOpenEditMix} as={Fragment} >
                            <Dialog as="div" onClose={closeModal} className={`relative z-10 ${kanit.className}`}>
                                <Transition.Child
                                    as={Fragment}
                                    enter="ease-out duration-300"
                                    enterFrom="opacity-0"
                                    enterTo="opacity-100"
                                    leave="ease-in duration-200"
                                    leaveFrom="opacity-100"
                                    leaveTo="opacity-0"
                                >
                                    <div className="fixed inset-0 bg-black/25" />
                                </Transition.Child>

                                <div className="fixed inset-0 overflow-y-auto">
                                    <div className="flex min-h-full items-center justify-center p-4 text-center">
                                        <Transition.Child
                                            as={Fragment}
                                            enter="ease-out duration-300"
                                            enterFrom="opacity-0 scale-95"
                                            enterTo="opacity-100 scale-100"
                                            leave="ease-in duration-200"
                                            leaveFrom="opacity-100 scale-100"
                                            leaveTo="opacity-0 scale-95"
                                        >
                                            <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white text-left align-middle shadow-xl transition-all">
                                                <div>
                                                    {editProduct && (
                                                        <Card shadow="sm">
                                                            <CardBody className="overflow-visible p-0">
                                                                <Image
                                                                    alt={'/default-image.png'}
                                                                    shadow="sm"
                                                                    width={448}
                                                                    src={editProduct.picture || '/default-image.png'}  // Fallback if picture is missing
                                                                    className="object-cover h-[140px]"
                                                                />
                                                            </CardBody>
                                                        </Card>
                                                    )}

                                                    <Dialog.Title
                                                        as="h3"
                                                        className="text-lg font-medium leading-6 text-[73664B] px-4 pt-4 flex justify-between"
                                                    >
                                                        <p>{editProduct.sm_name}</p>
                                                        <p className="text-[#F2B461]">ราคา {editProduct.sm_price != null ? editProduct.sm_price : 'N/A'}฿</p>
                                                    </Dialog.Title>
                                                    <div className='p-4'>
                                                        {editProduct && (
                                                            <div className='flex justify-between items-center'>
                                                                <div>
                                                                    <p className="text-lg font-medium">
                                                                        สินค้า
                                                                    </p>
                                                                    <p className='text-sm text-[#73664B] font-normal'>กรุณาเลือก {editProduct.qty_per_unit} รายการ</p>
                                                                </div>
                                                                <div>
                                                                    <Chip size="sm">{getTotalSelectedItemsEdit()}/{editProduct.qty_per_unit}</Chip>
                                                                </div>
                                                            </div>
                                                        )}
                                                        <div className="flex flex-col gap-1 w-full max-h-80 overflow-y-auto">
                                                            {Mix.length > 0 ? (
                                                                Mix.map(id => (
                                                                    <Checkbox
                                                                        key={id.pd_id}
                                                                        aria-label={id.pd_name}
                                                                        classNames={{
                                                                            base: cn(
                                                                                "inline-flex max-w-md w-full bg-content1 m-0",
                                                                                "hover:bg-content2 items-center justify-start",
                                                                                "cursor-pointer rounded-lg gap-2 p-2 border-2 border-transparent",
                                                                                "data-[selected=true]:border-primary"
                                                                            ),
                                                                            label: "w-full",
                                                                        }}
                                                                        isDisabled={
                                                                            editProduct &&
                                                                            !selectedPdIdEdit.includes(id.pd_id) &&
                                                                            getTotalSelectedItemsEdit() >= editProduct.qty_per_unit
                                                                        }
                                                                        checked={selectedPdIdEdit.includes(id.pd_id)}
                                                                        isSelected={selectedPdIdEdit.includes(id.pd_id)}
                                                                        onChange={() => handleCheckboxChangeEdit(id.pd_id)}
                                                                    >
                                                                        <div className="w-full flex justify-between gap-2">
                                                                            <User
                                                                                avatarProps={{ size: "md", src: id.picture }}
                                                                                description={id.pdc_name}
                                                                                name={id.pd_name || 'No Name Available'}
                                                                            />
                                                                            <div className="flex flex-col items-end gap-1">
                                                                                {selectedPdIdEdit.includes(id.pd_id) && (
                                                                                    <>
                                                                                        <div className="flex items-center mt-2">
                                                                                            <button
                                                                                                onClick={() => decrementQuantitymixEdit(id.pd_id)}
                                                                                                className="btn btn-square bg-[#D9CAA7] btn-xs"
                                                                                                disabled={quantitiesEdit[id.pd_id] <= 1}
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
                                                                                            <span className="w-4 text-center mx-2">{quantitiesEdit[id.pd_id] || 1}</span>
                                                                                            <button
                                                                                                onClick={() => incrementQuantitymixEdit(id.pd_id)}
                                                                                                className="btn btn-square bg-[#D9CAA7] btn-xs"
                                                                                                disabled={getTotalSelectedItemsEdit() >= editProduct.qty_per_unit}
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
                                                                                        </div>
                                                                                    </>
                                                                                )}
                                                                            </div>
                                                                        </div>
                                                                    </Checkbox>
                                                                ))
                                                            ) : (
                                                                <p>ไม่มีรายการสินค้า</p>
                                                            )}
                                                        </div>

                                                        <div>
                                                            <p className="text-lg font-medium mt-2">จำนวน</p>

                                                            <div className='flex items-center justify-center mt-2 w-full'>
                                                                <button
                                                                    onClick={decrementQuantityEdit}
                                                                    className="btn btn-square bg-[#D9CAA7] btn-sm flex items-center justify-center"
                                                                    disabled={quantity == 1}
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
                                                                <span className="w-10 text-center mx-2 text-lg">{quantityEdit}</span>
                                                                <button
                                                                    onClick={incrementQuantityEdit}
                                                                    className="btn btn-square bg-[#D9CAA7] btn-sm flex items-center justify-center"

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
                                                            </div>
                                                        </div>
                                                    </div>

                                                    {/*  choose */}
                                                    <div className="flex justify-end p-4 w-full">
                                                        <div className="inline-flex justify-end w-full">
                                                            <button
                                                                type="button"
                                                                className="bg-gray-200 inline-flex justify-center rounded-md border border-transparent w-1/2 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                                                onClick={closeModalmix}
                                                            >
                                                                ยกเลิก
                                                            </button>
                                                            <div className='mx-1'></div>
                                                            <button
                                                                type="button"
                                                                className={`${getTotalSelectedItemsEdit() !== editProduct.qty_per_unit ? ('bg-[#c9c9c9] ') : ('bg-[#C5B182] hover:bg-[#A89362]')} text-white inline-flex justify-center rounded-md border border-transparent w-1/2 px-4 py-2 text-sm font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2`}
                                                                onClick={submitEdit}
                                                                disabled={getTotalSelectedItemsEdit() !== editProduct.qty_per_unit}
                                                            >
                                                                เพิ่มลงตะกร้า</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </Dialog.Panel>
                                        </Transition.Child>
                                    </div>
                                </div>
                            </Dialog>
                        </Transition>
                    )
                    }
                </>
            </div>
        </div >

        // </div>


    )
}

export default Pos