// // import React, { useEffect, useState ,ChangeEvent} from 'react';
// // import { useRouter } from 'next/router';

// // function Ingredient() {
// //     const router = useRouter();
// //     const [message, setMessage] = useState('Loading');
// //     const [unitOptions, setUnitOptions] = useState([]);
// //     const [formData, setFormData] = useState({
// //         pd_name: '',
// //         pd_qtyminimum: '',
// //         status: '',
// //         picture :'',
// //         pdc_id: '',

// //     });
// //     interface UnitType {
// //         pdc_id: string;
// //         pdc_name: string;
// //         // ตัวแปรอื่น ๆ ที่เกี่ยวข้อง
// //     }
// //     useEffect(() => {
// //         // Fetch unit data from the server and set the options
// //         fetch('http://localhost:8080/product/readcat')
// //             .then(response => response.json())
// //             .then(data => {
// //                 setUnitOptions(data);
// //             })
// //             .catch(error => {
// //                 console.error('Error fetching unit data:', error);
// //             });
// //     }, []); // Run only once on component mount

// //     const handleInputChange = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
// //         const { name, value } = event.target;
// //         setFormData((prevData) => ({
// //             ...prevData,
// //             [name]: value,
// //         }));
// //     };


// //     const handleSubmit = async (event: React.FormEvent<HTMLFormElement>)  => {
// //         event.preventDefault();

// //         try {
// //             // Send data to the server
// //             const response = await fetch('http://localhost:8080/product/addProductWithRecipe', {
// //                 method: 'POST',
// //                 headers: {
// //                     'Content-Type': 'application/json',
// //                 },
// //                 body: JSON.stringify(formData),
// //             });

// //             const responseData = await response.json();

// //             if (responseData.message === 'success') {
// //                 setMessage('Data added successfully');
// //                 // router.push('../ingredientall');
// //             } else {
// //                 setMessage(responseData.message || 'Error occurred');
// //             }

// //             // Reset the form after submission
// //             (event.target as HTMLFormElement).reset();
// //         } catch (error) {
// //             console.error('Error:', error);
// //             setMessage('Error occurred');
// //         }
// //     };

// //     return (
// //         <div>
// //             <form onSubmit={handleSubmit}>
// //                 <label htmlFor="pd_name">pd_name :</label>
// //                 <input
// //                     type="text"
// //                     name="pd_name"
// //                     value={formData.pd_name}
// //                     onChange={handleInputChange}
// //                 /> <br />

// //                 <label htmlFor="pdc_id">pdc_id :</label>
// //                 <select
// //                     name="pdc_id"
// //                     value={formData.pdc_id}
// //                     onChange={handleInputChange}
// //                 >
// //                     <option value="">หน่วยวัตถุดิบที่ซื้อ </option>
// //                     {unitOptions.map((unit: UnitType) => (
// //                         <option key={unit.pdc_id} value={unit.pdc_id}>
// //                             {unit.pdc_name}
// //                         </option>
// //                     ))}
// //                 </select> <br />

// //                 <label htmlFor="pd_qtyminimum">pd_qtyminimum :</label>
// //                 <input
// //                     type="number"
// //                     name="pd_qtyminimum"
// //                     value={formData.pd_qtyminimum}
// //                     onChange={handleInputChange}
// //                 /><br />

// //                 {/* <label htmlFor="pdc_id">pdc_id :</label>
// //                 <input
// //                     type="number"
// //                     name="pdc_id"
// //                     value={formData.pdc_id}
// //                     onChange={handleInputChange}
// //                 /><br /> */}
// //                 <label htmlFor="picture">picture :</label>
// //                 <input
// //                     type="file"
// //                     name="picture"
// //                     value={formData.picture}
// //                     onChange={handleInputChange}
// //                 /><br />
// //                 <label htmlFor="status">สถานะ :</label>
// //                 <input
// //                     type="text"
// //                     name="status"
// //                     value={formData.status}
// //                     onChange={handleInputChange}
// //                 /><br />
// //                 {/* คิดต่อส่วนสถานะ ยังไม่ลองแอด */}
// //                 <input type="submit" value="Submit" />
// //             </form>
// //         </div>
// //     );
// // }

// // export default Ingredient;
// import React, { useState } from 'react';

// function ProductWithRecipe() {
//     const [message, setMessage] = useState('');
//     const [formData, setFormData] = useState({
//         pd_name: '',
//         pd_qtyminimum: '',
//         status: '',
//         picture: null, // File input will be stored here
//         pdc_id: '',
//     });

//     const handleSubmit = async (event: React.FormEvent) => {
//         event.preventDefault();

//         const formDataToSend = new FormData();
//         formDataToSend.append('pd_name', formData.pd_name);
//         formDataToSend.append('pd_qtyminimum', formData.pd_qtyminimum);
//         formDataToSend.append('status', formData.status);
//         formDataToSend.append('picture', formData.picture);
//         formDataToSend.append('pdc_id', formData.pdc_id);

//         try {
//             const response = await fetch('http://localhost:8080/product/addProductWithRecipe', {
//                 method: 'POST',
//                 body: formDataToSend
//             });

//             if (response.ok) {
//                 const responseData = await response.json();
//                 console.log(responseData);

//                 if (responseData.message === 'success') {
//                     setMessage('Data added successfully');
//                 } else {
//                     setMessage('Error occurred');
//                 }
//             } else {
//                 setMessage('Error occurred');
//             }
//         } catch (error) {
//             console.error('Error:', error);
//             setMessage('Error occurred');
//         }
//     };

//     const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
//         const { name, value } = event.target;
//         setFormData({ ...formData, [name]: value });
//     };

//     const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//         const file = event.target.files && event.target.files[0];
//         setFormData({ ...formData, picture: file });
//     };

//     return (
//         <div>
//             <form onSubmit={handleSubmit}>
//                 <label htmlFor="pd_name">Product Name</label>
//                 <input type="text" name="pd_name" value={formData.pd_name} onChange={handleChange} required /> <br />
//                 <label htmlFor="pd_qtyminimum">Product Quantity</label>
//                 <input type="number" name="pd_qtyminimum" value={formData.pd_qtyminimum} onChange={handleChange} required /><br />
//                 <label htmlFor="status">Status</label>
//                 <input type="text" name="status" value={formData.status} onChange={handleChange} required /><br />
//                 <label htmlFor="picture">Picture</label>
//                 <input type="file" name="picture" onChange={handleFileChange} id="" required /><br />
//                 <label htmlFor="pdc_id">Category ID</label>
//                 <input type="number" name="pdc_id" value={formData.pdc_id} onChange={handleChange} required /> <br />
//                 <input type="submit" value="Submit" />
//             </form>
//             {message && <p>{message}</p>}
//         </div>
//     );
// }

// export default ProductWithRecipe;

//ก่อนใช้.=h resize
// import React, { useState } from 'react';

// function ProductWithRecipe() {
//     const [message, setMessage] = useState('');
//     const [formData, setFormData] = useState({
//         pd_name: '',
//         pd_qtyminimum: '',
//         status: '',
//         picture: null,
//         pdc_id: 1,
//     });

//     const handleSubmit = async (event: React.FormEvent) => {
//         event.preventDefault();

//         const formDataToSend = new FormData();
//         Object.entries(formData).forEach(([key, value]) => {
//             if (key === 'picture') {
//                 formDataToSend.append('picture', value);
//             } else {
//                 formDataToSend.append(key, value);
//             }
//         });

//         try {
//             const response = await fetch('http://localhost:8080/product/addProductWithRecipe', {
//                 method: 'POST',
//                 body: formDataToSend
//             });

//             if (response.ok) {
//                 const responseData = await response.json();
//                 console.log(responseData);

//                 if (responseData.message === 'success') {
//                     setMessage('Data added successfully');
//                 } else {
//                     setMessage('Error occurred');
//                 }
//             } else {
//                 setMessage('Error occurred');
//             }
//         } catch (error) {
//             console.error('Error:', error);
//             setMessage('Error occurred');
//         }
//     };

//     const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
//         const { name, value } = event.target;
//         setFormData({ ...formData, [name]: value });
//     };

//     const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//         const file = event.target.files && event.target.files[0];
//         setFormData({ ...formData, picture: file });
//     };

//     return (
//         <div>
//             <form onSubmit={handleSubmit}>
//                 <label htmlFor="pd_name">Product Name</label>
//                 <input type="text" name="pd_name" value={formData.pd_name} onChange={handleChange} required /> <br />
//                 <label htmlFor="pd_qtyminimum">Product Quantity</label>
//                 <input type="number" name="pd_qtyminimum" value={formData.pd_qtyminimum} onChange={handleChange} required /><br />
//                 <label htmlFor="status">Status</label>
//                 <input type="text" name="status" value={formData.status} onChange={handleChange} required /><br />
//                 <label htmlFor="picture">Picture</label>
//                 <input type="file" name="picture" onChange={handleFileChange} id="" required /><br />
//                 <label htmlFor="pdc_id">Category ID</label>
//                 <input type="number" name="pdc_id" value={formData.pdc_id} onChange={handleChange} required /> <br />

//                 <input type="submit" value="Submit" />
//             </form>
//             {message && <p>{message}</p>}
//         </div>
//     );
// }

// export default ProductWithRecipe;
// ลอง resize
// import React, { useState } from 'react';
// import { imageFileResizer } from 'react-image-file-resizer'; // Import the correct method

// function ProductWithRecipe() {
//     const [message, setMessage] = useState('');
//     const [formData, setFormData] = useState({
//         pd_name: '',
//         pd_qtyminimum: '',
//         status: '',
//         picture: null,
//         pdc_id: '',
//     });

//     const handleSubmit = async (event: React.FormEvent) => {
//         event.preventDefault();

//         const formDataToSend = new FormData();
//         Object.entries(formData).forEach(([key, value]) => {
//             formDataToSend.append(key, value);
//         });

//         try {
//             const response = await fetch('http://localhost:8080/product/addProductWithRecipe', {
//                 method: 'POST',
//                 body: formDataToSend
//             });

//             if (response.ok) {
//                 const responseData = await response.json();
//                 console.log(responseData);

//                 if (responseData.message === 'success') {
//                     setMessage('Data added successfully');
//                 } else {
//                     setMessage('Error occurred');
//                 }
//             } else {
//                 setMessage('Error occurred');
//             }
//         } catch (error) {
//             console.error('Error:', error);
//             setMessage('Error occurred');
//         }
//     };

//     const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
//         const { name, value } = event.target;
//         setFormData({ ...formData, [name]: value });
//     };

//     const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
//         const file = event.target.files && event.target.files[0];

//         try {
//             imageFileResizer( // Call the imageFileResizer method
//                 file,
//                 300,
//                 300,
//                 'JPEG', // Example compress format, adjust as needed
//                 80, // Example quality, adjust as needed
//                 0, // Example rotation, adjust as needed
//                 (resizedFile) => {
//                     setFormData({ ...formData, picture: resizedFile });
//                 }
//             );
//         } catch (error) {
//             console.error('Error resizing image:', error);
//         }
//     };

//     return (
//         <div>
//             <form onSubmit={handleSubmit}>
//                 <label htmlFor="pd_name">Product Name</label>
//                 <input type="text" name="pd_name" value={formData.pd_name} onChange={handleChange} required /> <br />
//                 <label htmlFor="pd_qtyminimum">Product Quantity</label>
//                 <input type="number" name="pd_qtyminimum" value={formData.pd_qtyminimum} onChange={handleChange} required /><br />
//                 <label htmlFor="status">Status</label>
//                 <input type="text" name="status" value={formData.status} onChange={handleChange} required /><br />
//                 <label htmlFor="picture">Picture</label>
//                 <input type="file" name="picture" onChange={handleFileChange} id="" required /><br />
//                 <label htmlFor="pdc_id">Category ID</label>
//                 <input type="number" name="pdc_id" value={formData.pdc_id} onChange={handleChange} required /> <br />
//                 <input type="submit" value="Submit" />
//             </form>
//             {message && <p>{message}</p>}
//         </div>
//     );
// }

// export default ProductWithRecipe;
import React, { useState, useEffect } from 'react';

const ProductDetails: React.FC = () => {
    const [product, setProduct] = useState<any>(null);
    const pd_id = 34; // Replace with the actual product ID

    useEffect(() => {
        fetch(`http://localhost:8080/product/products/${pd_id}`)
            .then(response => response.json())
            .then(data => setProduct(data.product))
            .catch(error => console.error('Error fetching product:', error));
    }, [pd_id]);

    if (!product) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>Product Details</h1>
            <p>Product ID: {product.pd_id}</p>
            <p>Product Name: {product.pd_name}</p>
            <p>Product Quantity Minimum: {product.pd_qtyminimum}</p>
            <p>Status: {product.status}</p>
            {product.picture && <img src={product.picture} alt="Product Image" />}
        </div>
    );
};

export default ProductDetails;
