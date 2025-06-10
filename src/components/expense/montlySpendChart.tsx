'use client';

import { Doughnut } from 'react-chartjs-2';
import {
  Chart,
  ArcElement,
  Tooltip,
  Legend,
  ChartData,
  ChartOptions,
  TooltipItem,
} from 'chart.js';

Chart.register(ArcElement, Tooltip, Legend);

// Props Type
type MonthlySpendSummaryProps = {
  monthlySpend: number;
  yearlySpend: number;
};

export default function MonthlySpendChart({
  monthlySpend,
  yearlySpend,
}: MonthlySpendSummaryProps) {
  const remainingSpend =
    yearlySpend - monthlySpend > 0 ? yearlySpend - monthlySpend : 0;

  // Fully Typed Chart Data
  const data: ChartData<'doughnut'> = {
    labels: ['Monthly Spend', 'Remaining Yearly Budget'],
    datasets: [
      {
        data: [monthlySpend, remainingSpend],
        backgroundColor: ['#17C6FA', '#000000'],
        hoverBackgroundColor: ['#2563eb', '#9ca3af'],
        borderWidth: 1,
      },
    ],
  };

  // Fully Typed Chart Options
  const options: ChartOptions<'doughnut'> = {
    cutout: '70%',
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          font: {
            size: 14,
          },
        },
      },
      tooltip: {
        callbacks: {
          label: function (context: TooltipItem<'doughnut'>) {
            return `${context.label}: ₹${context.parsed}`;
          },
        },
      },
    },
  };

  return (
    <div className="relative max-w-xs mx-auto p-4 bg-white rounded-lg shadow-md mb-4">
      <h2 className="text-xl font-semibold mb-4 text-center">Monthly Expenses</h2>
      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
        <span className="text-2xl font-bold">₹{monthlySpend}</span>
        <span className="text-sm text-gray-600">Spend</span>
      </div>
      <Doughnut data={data} options={options} />
    </div>
  );
}
