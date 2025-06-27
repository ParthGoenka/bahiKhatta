import React from 'react';
import '../../chartSetup';
import { Bar } from 'react-chartjs-2';

const BarChart = ({ data, options }) => {
    // Placeholder data
    const chartData = data || {
        labels: ['Income', 'Expenses'],
        datasets: [
            {
                label: 'Amount',
                data: [1000, 500],
                backgroundColor: ['#4ade80', '#f87171'],
            },
        ],
    };
    return <Bar data={chartData} options={options || { responsive: true }} />;
};

export default BarChart;
