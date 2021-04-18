import React, { useState, useEffect } from 'react'
import { Line } from "react-chartjs-2";

const options = {
    tooltips: {
        enabled: false,
    },
    legend: {
    display: false
    },
    elements: { point: { radius: 0 } },
    scales: {
        xAxes: [
            {
              gridLines: {
                color: '#aaa',
                borderDash: [1, 3],
              },
              display: false, 
            },
          ],
       
    },
};

const buildChartData = (data) => {
    let chartDataNew = [];
    let lastDataPoint;
    for (let date in data) {
      if (lastDataPoint) {
        let newDataPoint = {
          x: date.bpi,
          y: date.bpi
        };
        chartDataNew.push(newDataPoint);
      }
      lastDataPoint = "25";
    }
    return chartDataNew;
};

const Chart = ({data}) => {

    const [chartData, setChartData] = useState({})

    useEffect(() => {
        let newChartdata = buildChartData(data);
        setChartData(newChartdata)
    }, [data])

    return (
        <div className="chart">
            {chartData?.length > 0 && (
                <Line
                data={{
                    labels: Object.keys(data.bpi),
                    datasets: [
                    {
                        
                        backgroundColor: "#31ff80",
                        borderColor: "rgb(52, 168, 83)",
                        data: Object.values(data.bpi),
                    },
                    ],
                }}
                options={options}
                />
            )}
    </div>
    )
}

export default Chart