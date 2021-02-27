import React from "react";
import { parse } from "papaparse";
import "./App.css";

export default function App() {
  const [highlighted, setHighlighted] = React.useState(false);
  const [contacts, setContacts] = React.useState([

  ]);
 
  return (
    <div>
      <h1 className="text-center text-4xl ">Paymentsheet Generator</h1>
      <div
        className={`p-6 my-2 mx-auto max-w-md border-2 ${
          highlighted ? "border-green-600 bg-green-100" : "border-gray-600"
        }`}
        onDragEnter={() => {
          setHighlighted(true);
        }}
        onDragLeave={() => {
          setHighlighted(false);
        }}
        onDragOver={(e) => {
          e.preventDefault();
        }}
        onDrop={(e) => {
          e.preventDefault();
          setHighlighted(false);

          Array.from(e.dataTransfer.files)
            .filter((file) => file.type === "text/csv")
            .forEach(async (file) => {
              const text = await file.text();
              const result = parse(text, {dynamicTyping: true , header : true ,transformHeader:function(h) { 				return h.replace(/\s/g, ''); 			}});
              console.log(result.data);
      
              setContacts((existing) => [...existing, ...result.data]);
            });
        }}
      >
        Drag and Drop here CSV File.....
      </div>

      <table align="center"id="customers">
            <tr>
            <th>Order Number</th>
            <th>Profit/loss(%)</th>
            <th>Transferred Amount</th>
            <th>Total Marketplace Charges</th>
            </tr>
            
        {contacts.map((contact) => (
          
          <tr>
          <th>{contact.OrderNum}</th>
          <th>{(contact.SaleAmount-contact.CostPrice)*100/contact.CostPrice}</th>
          <th>{contact.TransferredAmount}</th>
          <th>{contact.Commission + contact.PaymentGateway + contact.PickPackFee}</th>
          </tr>
            


          
            
          
        ))}
      </table>
    </div>
  );
}