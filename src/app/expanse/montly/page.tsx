'use client';

import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getAllExpenses } from '@/lib/expense/idb';
import { Expense } from '@/lib/expense/types';
import MonthlySpendChart from '@/components/expense/montlySpendChart';
import { ChevronDown } from 'lucide-react';

type MonthlyExpenseGroupProps = {
  month: string;
  amount: number;
  onClick: () => void;
  isSelected: boolean;
};

const MonthlyExpenseGroup = ({ month, amount, onClick, isSelected }: MonthlyExpenseGroupProps) => {
  return (
    <div
      onClick={onClick}
      className={`p-4 w-full shadow-sm mb-2 flex justify-between items-center border rounded-lg cursor-pointer hover:bg-gray-100 transition ${
        isSelected ? 'bg-blue-100' : ''
      }`}
    >
      <span className="font-medium">{month}</span>
      <span className="font-semibold">₹{amount}</span>
    </div>
  );
};

export default function MonthlyOverviewPage() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [selectedMonth, setSelectedMonth] = useState(
    new Date().toLocaleString('en-US', { month: 'long' })
  );
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [showMonthlyDetails, setShowMonthlyDetails] = useState(true);

  const router = useRouter();

  useEffect(() => {
    getAllExpenses().then(setExpenses);
  }, []);

  const uniqueYears = useMemo(() => {
    const years = expenses.map((e) => new Date(e.date).getFullYear());
    return [...new Set(years)].sort((a, b) => b - a);
  }, [expenses]);

  const groupedByMonthForYear: Record<string, number> = useMemo(() => {
    return expenses
      .filter((e) => new Date(e.date).getFullYear() === selectedYear)
      .reduce((acc: Record<string, number>, expense) => {
        const month = new Date(expense.date).toLocaleString('en-US', { month: 'long' });
        acc[month] = (acc[month] || 0) + expense.amount;
        return acc;
      }, {});
  }, [expenses, selectedYear]);

  const totalSpendForYear = Object.values(groupedByMonthForYear).reduce((a, b) => a + b, 0);
  const totalSpendForSelectedMonth = groupedByMonthForYear[selectedMonth] || 0;

  return (
    <div className="min-h-screen bg-white p-4 text-black">
      <div
            className={`w-8 h-8 flex items-center justify-center rounded-full border border-gray-400 cursor-pointer transition-transform duration-200 ${
              showMonthlyDetails ? 'rotate-90' : ''
            }`} onClick={() => router.push('/expanse')}
          >
            <ChevronDown className="w-4 h-4 text-gray-500" />
      </div>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold text-center flex-grow text-black">Expense Tracker</h1>
      </div>


      <MonthlySpendChart
        monthlySpend={totalSpendForSelectedMonth}
        yearlySpend={totalSpendForYear}
        currentMonth={selectedMonth}
      />

      <div className="flex flex-col items-center w-fit mx-auto border border-black rounded-lg mb-4">
        <div className="bg-white p-4 rounded-lg shadow-md flex justify-between items-center gap-4">
          <select
            value={selectedYear}
            onChange={(e) => {
              setSelectedYear(Number(e.target.value));
              setShowMonthlyDetails(false);
            }}
            className="text-lg font-semibold border border-gray-300 rounded p-1"
          >
            {uniqueYears.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>

          <span className="text-lg font-semibold">Total: ₹{totalSpendForYear}</span>

          <div
            onClick={() => setShowMonthlyDetails((prev) => !prev)}
            className={`w-8 h-8 flex items-center justify-center rounded-full border border-gray-400 cursor-pointer transition-transform duration-200 ${
              showMonthlyDetails ? 'rotate-180' : ''
            }`}
          >
            <ChevronDown className="w-4 h-4 text-gray-500" />
          </div>

        </div>

        {!showMonthlyDetails && (
          <div className="flex flex-col gap-2 my-4 w-4/5">
            {Object.entries(groupedByMonthForYear).length === 0 ? (
              <p className="text-gray-500 text-center">No monthly data available.</p>
            ) : (
              Object.entries(groupedByMonthForYear).map(([month, amount]) => (
                <MonthlyExpenseGroup
                  key={month}
                  month={month}
                  amount={amount}
                  onClick={() => setSelectedMonth(month)}
                  isSelected={selectedMonth === month}
                />
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}
