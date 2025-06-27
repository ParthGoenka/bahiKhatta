import React from 'react';
import '../../chartSetup';
import { Line } from 'react-chartjs-2';

const LineChart = ({ data, options }) => {
    // Placeholder data
    const chartData = data || {
        labels: ['2025-06-01', '2025-06-10', '2025-06-20'],
        datasets: [
            {
                label: 'Balance Over Time',
                data: [1000, 800, 1200],
                borderColor: '#6366f1',
                backgroundColor: '#a5b4fc',
            },
        ],
    };
    return <Line data={chartData} options={options || { responsive: true }} />;
};

export default LineChart;
