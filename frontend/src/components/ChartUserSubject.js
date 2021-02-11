import React from 'react'
import { Doughnut } from 'react-chartjs-2'

const ChartUserSubject = ({ title, data }) => {
    const chartData = {
        labels: ['OK (%)', 'Nope (%)'],
        datasets: [
            {
                label: 'Subjects',
                data: data,
                backgroundColor: ['rgb(86, 204, 157)', 'rgb(243, 150, 154)']
            }
        ]
    }

    return (
        <Doughnut
            data={chartData}
            width={150}
            height={150}
            options={{
                maintainAspectRatio: false,
                title:{
                    display: true,
                    position: 'bottom',
                    text: title,
                },
                legend:{
                    display: false
                }
            }}
        />
    )
}

export default ChartUserSubject
