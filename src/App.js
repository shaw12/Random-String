import { useEffect, useState } from 'react';
import Chart from './components/Chart'
import './App.css';

function App() {

  const [apiData, setApiData] = useState([])
  const [newData, setNewData] = useState([])
  const [presentCurrency, setPresentCurrency] = useState('USD')

  useEffect(() => {
    const fetchData = async () => {
      await fetch('https://api.coindesk.com/v1/bpi/currentprice.json')
      .then((res) => res.json())
      .then((data) => {
        const countries = Object.entries(data.bpi).map(item => ({
          name: item[1].code,
          value: item[1].description
        }))
        setApiData(countries)
      })

      await fetch("https://api.coindesk.com/v1/bpi/historical/close.json")
      .then(res => res.json())
      .then(data => {
        setNewData(data);
      })
    }

    fetchData()
  }, [])
  
  console.log(apiData)

  const onCurrencyChange = async (event) => {
    const currencyCode = event.target.value;

      await fetch(`https://api.coindesk.com/v1/bpi/historical/close.json?currency=${currencyCode}`)
      .then(res => res.json())
      .then(data => {
        setPresentCurrency(currencyCode);
        setNewData(data);
      })
    }

    // const currentValues = Object.values(newData.bpi)
    

  return (
    <div className="App">
      <form>
        <label>1 Bitcoin Equals</label>
        <select 
          name="currencies"
          onChange={onCurrencyChange}
          value={presentCurrency}
        >
          {
            apiData.map((currency)=>(
              <option key={currency.name} value={currency.name}>{currency.value}</option>
            ))
          }
        </select>
        <h1>
          {
            // currentValues[currentValues.length-1].toFixed(2) + " "
          }
          {
             apiData.map(ele => ele.name === presentCurrency ? ele.value : '')
          }
        </h1>

      </form>

      <Chart data={newData} />
    </div>
  );
}

export default App;
