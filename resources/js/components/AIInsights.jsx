import React from 'react';

const AIInsights = ({ insights }) => {
    // Placeholder for AI insights
    const example = insights || 'This month you spent 20% more on groceries.';
    return (
        <div className="alert alert-info mt-4">
            <h2 className="h5 mb-2">AI Insights</h2>
            <p className="mb-0">{example}</p>
        </div>
    );
};

export default AIInsights;
