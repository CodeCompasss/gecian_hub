import { Pencil, Trash2 } from 'lucide-react';
import { Expense } from '@/lib/expense/types';

type Props = Expense & {
  onEdit?: () => void;
  onDelete?: () => void;
};
export default function ExpenseCard({ title, amount, category, description ,onEdit,onDelete,}: Props) {
  return (
    <div className="border border-black rounded-xl p-4 sm:p-5 md:p-6 lg:p-7 xl:p-8 max-w-full w-full text-black">
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
        <Pencil className="w-5 h-5 cursor-pointer" onClick={onEdit} />
        <Trash2 className="w-5 h-5 cursor-pointer" onClick={onDelete} />
      </div>
    </div>
  );
}
