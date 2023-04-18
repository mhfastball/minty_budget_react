import React, { useState, useEffect } from 'react';

function Table() {
  const [data, setData] = useState([]);
  const [textData, setTextData] = useState("")
  const [jsonData, setJsonData] = useState([])

useEffect(() => {
fetch('localhost')
.then(response => {
  if (response.ok) {
    return response.json().then(data => {
      const jsonData = data.json_data;
      const textData = data.text_data;
      return [textData, jsonData];
    });
  } else {
    throw new Error('Network response was no go');
  }
})
.then(([textData, jsonData]) => {
  setTextData(textData);
  setJsonData(jsonData);
})
.catch(error => console.error(error));
}, []);

  return (
    <div>
    {textData && <p>{textData}</p>}
    <table>
      <thead>
        <tr>
          <th>Month</th>
          <th>Amount</th>
          <th>Over/Under</th>
        </tr>
      </thead>
      <tbody>
        {jsonData.map(row => (
          <tr key={row.id}>
            <td>{row.month}</td>
            <td>{row.amount}</td>
            <td>{row.over_under}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>  
  );
}

export default Table;
