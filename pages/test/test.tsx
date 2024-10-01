import React, { useState } from 'react';

const SalesmenuForm: React.FC = () => {
  const [smName, setSmName] = useState('');
  const [smtId, setSmtId] = useState('');
  const [smPrice, setSmPrice] = useState('');
  const [fix, setFix] = useState('');
  const [picture, setPicture] = useState<File | null>(null);
  const [salesmenudetail, setSalesmenudetail] = useState<Array<{ pd_id: number; qty: number }>>([]);
  const [responseMessage, setResponseMessage] = useState('');

  const handleSalesmenudetailChange = (index: number, key: keyof { pd_id: number; qty: number }, value: number) => {
    const updatedSalesmenudetail = [...salesmenudetail];
    updatedSalesmenudetail[index][key] = value;
    setSalesmenudetail(updatedSalesmenudetail);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  
    try {
      const formData = new FormData();
      formData.append('sm_name', smName);
      formData.append('smt_id', smtId);
      formData.append('sm_price', smPrice);
      formData.append('fix', fix);

      const formattedSalesmenudetail = JSON.stringify(salesmenudetail);
      formData.append('salesmenudetail', formattedSalesmenudetail);
  
      if (picture) formData.append('picture', picture);
  
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/salesmenu/addsm`, {
        method: 'POST',
        body: formData,
      });
  
      const responseData = await response.json();
      setResponseMessage(responseData.message);
    } catch (error) {
      console.error('Error:', error);
    }
  };
  

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>ชื่อเมนู:</label>
        <input type="text" value={smName} onChange={(e) => setSmName(e.target.value)} required />
      </div>
      <div>
        <label>รหัสประเภทเมนู:</label>
        <input type="text" value={smtId} onChange={(e) => setSmtId(e.target.value)} required />
      </div>
      <div>
        <label>ราคา:</label>
        <input type="text" value={smPrice} onChange={(e) => setSmPrice(e.target.value)} required />
      </div>
      <div>
        <label>Fix:</label>
        <input type="text" value={fix} onChange={(e) => setFix(e.target.value)} required />
      </div>
      <div>
        <label>รูปภาพ:</label>
        <input type="file" accept="image/*" onChange={(e) => setPicture(e.target.files?.[0] || null)} />
      </div>
      <div>
        <label>Salesmenudetail:</label>
        {salesmenudetail.map((item, index) => (
          <div key={index}>
            <label>รหัสสินค้า:</label>
            <input
              type="number"
              value={item.pd_id}
              onChange={(e) => handleSalesmenudetailChange(index, 'pd_id', parseInt(e.target.value))}
              required
            />
            <label>จำนวน:</label>
            <input
              type="number"
              value={item.qty}
              onChange={(e) => handleSalesmenudetailChange(index, 'qty', parseInt(e.target.value))}
              required
            />
          </div>
        ))}
        <button type="button" onClick={() => setSalesmenudetail([...salesmenudetail, { pd_id: 0, qty: 0 }])}>
          เพิ่มรายการ
        </button>
      </div>
      <button type="submit">ส่งข้อมูล</button>
      <div>{responseMessage}</div>
    </form>
  );
};

export default SalesmenuForm;