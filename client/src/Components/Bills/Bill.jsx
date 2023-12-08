import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import API from '../../axios'
import html2pdf from 'html2pdf.js';
import './Bill.css'
import { useAuth } from '../../contexts/AuthContext';
import Ratings from './Ratings';

const Bill = () => {
  const { oid } = useParams();
  const [resp, setResp] = useState({});
  const [bill, setBill] = useState([]);
  const { currentUser } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      const resp = await API.post("/restaurant/viewBill", { orderId: oid });
      console.log(resp);

      setResp(resp.data);
      setBill(resp.data.bill)
    }
    fetchData();
  }, []);
  const handlePrint = () => {
    window.print();

  };
  const handleDownloadPDF = () => {
    const element = document.getElementById('bill-content');
    html2pdf()
      .from(element)
      .save('bill.pdf');
  };

  return (
    <>
      {resp.message == 'Bill Not Found' ? <h1>Bill Not Found</h1> :
        <div  className='billBackground' >
          <div className='bill_display ' id="bill-content">
            {/* <h2>EasyDining</h2> */}
            <h2>{resp.restaurant_name}</h2>
            <h4>Phone : {resp.customer}</h4>
            <h4>Date : {resp.billDate}</h4>
            <h4>Time of bill : {resp.billTime}</h4>
            <h6>Bill No : {resp.orderId}</h6>
            {/* <h6>Restaurant ID : {resp.rid}</h6> */}

           
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
                        <td>{index + 1}</td>
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
          <div className="print-download">
            <button type="button" className='btn btn-primary me-2' onClick={handlePrint}  >Print Bill</button>
            <button onClick={handleDownloadPDF} className='btn btn-primary'>Download PDF</button>
          </div>
      {currentUser.userType == 'customer' && <Ratings rid={resp.rid} />}

        </div>
      }
    </>
  )
}
export default Bill

