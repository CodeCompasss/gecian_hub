import { Pencil, Trash2 } from 'lucide-react';
type ExpenseItem = {
  title: string;
  amount: number;
  category: string;
  description: string;
  date: string; // or Date, if you prefer
};

export default function ExpenseCard({ title, amount, category, description }:ExpenseItem) {
  return (
    <div className="border border-black rounded-xl p-4 sm:p-5 md:p-6 lg:p-7 xl:p-8 max-w-full w-full">
      <div className="flex justify-between font-bold text-base sm:text-lg md:text-xl">
        <span className="truncate max-w-[70%]">{title}</span>
        <span>₹{amount}</span>
      </div>
      <p className="text-xs sm:text-sm text-gray-500 mt-1 truncate max-w-full">
        Category: {category}
      </p>
      <p className="text-xs sm:text-sm text-gray-600 mt-2 truncate max-w-full">
        {description}
      </p>
      <div className="flex justify-end gap-4 mt-3">
        <Pencil className="w-5 h-5 sm:w-6 sm:h-6 cursor-pointer" />
        <Trash2 className="w-5 h-5 sm:w-6 sm:h-6 cursor-pointer" />
      </div>
    </div>
  );
}
