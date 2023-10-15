import React, { useEffect, useState } from 'react'
import { useParams, useLocation, Navigate } from 'react-router-dom'
import API from '../../axios'
import html2pdf from 'html2pdf.js';
import './Bill.css'

const Bill = () => {
  const { oid } = useParams();
  const location = useLocation() ; 
  const [resp, setResp] = useState({});
  const [bill, setBill] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const resp = await API.post("/restaurant/viewBill", { orderId: oid });
      console.log(resp.data);
      setResp(resp.data);
      setBill(resp.data.bill)
    }
    fetchData();
  }, []);
  const handlePrint = () => {
     window.print();
   
  };
  const handleDownloadPDF = () => {
    const element = document.getElementById('bill-content'); // Replace with the actual ID of the bill content div.
    
    html2pdf()
      .from(element)
      .save('bill.pdf');
  };

  return (
    <>
     {/* { resp.data
     } */}
      <div className='billBackground' id="bill-content">
        <h2>EasyDining</h2>
        <h3>Phone : {resp.customer}</h3>
        <h3>Bill No : {resp.orderId}</h3>
        <h3>Restaurant : {resp.rid}</h3>
        <h3>Date : {resp.billDate}</h3>
        <h3>Time of bill : {resp.billTime}</h3>

        <div className='billDiv'>
          <table className='billTable'>
            <tr>
              <th>Sr</th>
              <th>Item</th>
              <th>Price</th>
              <th>Qty</th>
              <th>Total Price</th>
            </tr>
            {
              bill.map((ele, index) => {
                return (
                  <tr className='itemRow'>
                    <td>{index}</td>
                    <td>{ele.name}</td>
                    <td>{ele.price}</td>
                    <td>{ele.quantity}</td>
                    <td>{ele.quantity * ele.price}</td>
                  </tr>
                )
              })
            }

            <tr className='grandTotalRow'>
              <td colSpan={4}>Grand Total</td>
              <th className='grandTotal'>{resp.billAmt}</th>
            </tr>
          </table>
        </div>
      </div>
      <div className="print-download">
      <button type="button" onClick={handlePrint}  >Print Bill</button>
        <button onClick={handleDownloadPDF}>Download PDF</button>
    
      </div>
       
    </>
  )
}

export default Bill