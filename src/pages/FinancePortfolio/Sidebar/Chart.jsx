import React from 'react'
import { useSelector } from 'react-redux';
import { Doughnut } from 'react-chartjs-2';

export default function Chart() {

    const cryptoPortfolio = useSelector(({crypto}) => crypto.portfolio);

    var sum = [];
    var names = [];
    const coinPercent = () => {
        cryptoPortfolio.map(item => {
            names.push(item.buyName)
            sum.push(item.coinValue * item.coinCount)
            return {names,sum}
        })
    }
    coinPercent()

    const data = {
        labels: names,
        datasets: [
          {
            label: '# of Votes',
            data: sum,
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)',
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)',
            ],
            borderWidth: 2,
            borderRadius: 10,
            hoverOffset: 5,
            clip: 10,
          },
        ],
    };

    return (
        <div>
            <Doughnut data={data} className="chart-circle" />
        </div>
    )
}
