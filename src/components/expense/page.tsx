'use client';

import { useState, useMemo } from 'react';
import { Plus } from 'lucide-react';
import ExpenseCard from './ExpenseCard';
import DateSelector from './DateSelector';
import ExpenseForm from '@/components/expense/expenseForm';
import MonthlySpendChart from '@/components/expense/montlySpendChart'
type YearlySpendSummaryProps = {
  year: number;
  totalSpend: number;
  onToggle: () => void;
  isOpen: boolean;
};


const YearlySpendSummary = ({ year, totalSpend, onToggle, isOpen }: YearlySpendSummaryProps) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md mb-4 flex justify-between items-center">
      <span className="text-lg font-semibold">{year}</span>
      <span className="text-lg font-semibold">Total Spend : ₹{totalSpend}</span>
      <span
        className={`text-gray-500 cursor-pointer select-none transition-transform duration-200 ${
          isOpen ? 'rotate-180' : ''
        }`}
        onClick={onToggle}
        aria-label="Toggle monthly details"
        title="Show/Hide monthly breakdown"
      >
        &#9660;
      </span>
    </div>
  );
};


type MonthlyExpenseGroupProps = {
  month: string;
  amount: number;
};

const MonthlyExpenseGroup = ({ month, amount }:MonthlyExpenseGroupProps) => {
  return (
    <div className="p-4 w-full shadow-sm mb-2 flex justify-between items-center border border-black border-6 rounded-lg">
      <span className="font-medium">{month}</span>
      <span className="font-semibold">₹{amount}</span>
    </div>
  );
};

export default function ExpensePage() {
  const today = new Date();

  const dd = String(today.getDate()).padStart(2, '0');
  const mm = String(today.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
  const yyyy = today.getFullYear();

  const formattedDate = `${yyyy}-${mm}-${dd}`;
  const currentMonthName = today.toLocaleString('en-US', { month: 'long' });

  const [expenses, setExpenses] = useState([
    {
      title: 'Paracetamol',
      amount: 50,
      category: 'Medicine',
      description: 'A dialog is a type of modal window that appears in front of app content...',
      date: '2025-06-09',
    },
    {
      title: 'Paracetamol',
      amount: 50,
      category: 'Medicine',
      description: 'A dialog is a type of modal window that appears in front of app content...',
      date: '2025-06-10',
    },
    {
      title: 'Groceries',
      amount: 200,
      category: 'Food',
      description: 'Weekly grocery shopping',
      date: '2025-06-05',
    },
    {
      title: 'Coffee',
      amount: 50,
      category: 'Food',
      description: 'Morning coffee',
      date: '2025-01-15',
    },
    {
      title: 'Bus Ticket',
      amount: 40,
      category: 'Travel',
      description: 'Daily commute',
      date: '2025-01-20',
    },
    {
      title: 'Movie Ticket',
      amount: 40,
      category: 'Entertainment',
      description: 'Evening movie',
      date: '2025-01-25',
    },
  ]);

  const [showForm, setShowForm] = useState(false);
  const [selectedDate, setSelectedDate] = useState(formattedDate);
  const [formData, setFormData] = useState({
    title: '',
    amount: '',
    category: '',
    description: '',
    date: '',
  });

  // For year dropdown and toggle monthly breakdown
  const [selectedYear, setSelectedYear] = useState(yyyy);
  const [showMonthlyDetails, setShowMonthlyDetails] = useState(false);

  // Extract unique years from expenses
  const uniqueYears = useMemo(() => {
    const years = expenses.map((e) => new Date(e.date).getFullYear());
    return [...new Set(years)].sort((a, b) => b - a);
  }, [expenses]);

  // Handle form input change
  const handleChange = (e:any) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Submit new expense
  const handleSubmit = (e:any) => {
    e.preventDefault();

    const newExpense = {
      ...formData,
      amount: parseFloat(formData.amount),
    };

    setExpenses((prev) => [...prev, newExpense]);
    setFormData({
      title: '',
      amount: '',
      category: '',
      description: '',
      date: '',
    });
    setShowForm(false);
  };

  // Calculate monthly spend for current month
  const currentMonthSpend = expenses
    .filter(
      (expense) =>
        new Date(expense.date).getMonth() === today.getMonth() &&
        new Date(expense.date).getFullYear() === today.getFullYear()
    )
    .reduce((sum, e) => sum + e.amount, 0);

  // Calculate total spend for selected year
  const totalSpendForYear = expenses
    .filter((expense) => new Date(expense.date).getFullYear() === Number(selectedYear))
    .reduce((sum, e) => sum + e.amount, 0);

  // Group expenses by month for selected year
  const groupedByMonthForYear: Record<string, number> = expenses
  .filter((expense) => new Date(expense.date).getFullYear() === Number(selectedYear))
  .reduce((acc: Record<string, number>, expense) => {
    const month = new Date(expense.date).toLocaleString('en-US', { month: 'long' });
    acc[month] = (acc[month] || 0) + expense.amount;
    return acc;
  }, {});

  // Filter expenses by selected date for the expense list
  const filteredExpenses = selectedDate
    ? expenses.filter((e) => e.date === selectedDate)
    : expenses;
  const totalAmount = filteredExpenses.reduce((sum, e) => sum + e.amount, 0);

  return (
    <div className="relative min-h-screen bg-white pb-20 px-4 pt-4 text-black ">
      <div className="flex items-center mb-4">
        <h1 className="text-2xl font-bold text-center flex-grow">Expense Tracker</h1>
      </div>

      {!showForm && (
        <>
          
          <MonthlySpendChart monthlySpend={currentMonthSpend} yearlySpend={totalSpendForYear}/>
          {/* Yearly Spend Section with dropdown and toggle arrow */}
          <div className='flex flex-col items-center w-fit mx-auto border border-black border-6 rounded-lg mb-4'>
          <div className="bg-white p-4 rounded-lg shadow-md  flex justify-between items-center border border-black border-6">
            <select
              value={selectedYear}
              onChange={(e) => {
                setSelectedYear(Number(e.target.value));
                setShowMonthlyDetails(false); // Reset monthly breakdown toggle on year change
              }}
              className="text-lg font-semibold border border-gray-300 rounded p-1 cursor-pointer"
            >
              {uniqueYears.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>

            <span className="text-lg font-semibold">Total Spend : ₹{totalSpendForYear}</span>

            <span
              className={`text-gray-500 cursor-pointer select-none transition-transform duration-200 ${
                showMonthlyDetails ? 'rotate-180' : ''
              }`}
              onClick={() => setShowMonthlyDetails((prev) => !prev)}
              aria-label="Toggle monthly details"
              title="Show/Hide monthly breakdown"
            >
              &#9660;
            </span>
            
          </div>
          {/* Conditionally show monthly breakdown */}
          {showMonthlyDetails && (
            <div className="flex flex-col gap-2 my-4 w-4/5 ">
              {Object.entries(groupedByMonthForYear).length === 0 && (
                <p className="text-gray-500 text-center">No monthly data available.</p>
              )}
              {Object.entries(groupedByMonthForYear).map(([month, amount]) => (
                <MonthlyExpenseGroup key={month} month={month} amount={amount} />
              ))}
            </div>
          )}
          </div>

          

          {/* Date Selector */}
          <DateSelector onDateChange={setSelectedDate} selectedDate={selectedDate} />
          <div className="flex justify-between items-center my-4">
            <h2 className="text-xl font-semibold">Expenses</h2>
            <span className="font-semibold">Total : ₹{totalAmount}</span>
          </div>
          {/* List of Expenses for the selected date */}
          <div className="flex flex-col gap-4 mb-8">
            {filteredExpenses.length === 0 ? (
              <p className="text-center text-gray-500">No expenses found for selected date.</p>
            ) : (
              filteredExpenses.map((item, i) => <ExpenseCard key={i} {...item} />)
            )}
          </div>
        </>
      )}

      {/* Expense Form */}
      {showForm && (
        <ExpenseForm onClose={() => setShowForm(false)} onChange={handleChange} onSubmit={handleSubmit} formData={formData} />
      )}

      {/* Floating Add Button */}
      {!showForm && (
        <button
          onClick={() => setShowForm(true)}
          className="fixed bottom-20 right-4 p-3 bg-blue-500 text-white rounded-full shadow-lg z-10"
          aria-label="Add Expense"
        >
          <Plus />
        </button>
      )}
    </div>
  );
}
