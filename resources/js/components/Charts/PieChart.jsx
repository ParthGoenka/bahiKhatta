import React from 'react';
import '../../chartSetup';
import { Pie } from 'react-chartjs-2';

const PieChart = ({ data, options }) => {
    // Placeholder data
    const chartData = data || {
        labels: ['Groceries', 'Rent', 'Other'],
        datasets: [
            {
                label: 'Categories',
                data: [300, 400, 200],
                backgroundColor: ['#60a5fa', '#fbbf24', '#a78bfa'],
            },
        ],
    };
    return <Pie data={chartData} options={options || { responsive: true }} />;
};

export default PieChart;
