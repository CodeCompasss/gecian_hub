'use client';
type ExpenseFormProps = {
  onClose: () => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  formData: {
    title: string;
    category: string;
    description: string;
    amount: string | number;
    date: string;
  };
};

export default function ExpenseForm({ onClose, onChange, onSubmit, formData }: ExpenseFormProps) {
  return (
    <div className="antialiased flex flex-col items-center">
      <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-3xl relative mx-auto">
        <h2 className="text-xl font-bold text-left mb-6 text-black">Add Your Expenses</h2>
        <form onSubmit={onSubmit} className="space-y-4">
          
          {/* Title */}
          <div>
            <label className="block mb-1 text-sm font-medium text-black">Title</label>
            <input
              type="text"
              name="title"
              placeholder="Title"
              value={formData.title}
              onChange={onChange}
              className="w-full px-4 py-2 border border-black rounded-lg text-black"
              required
            />
          </div>

          {/* Category */}
          <div>
            <label className="block mb-1 text-sm font-medium text-black">Category</label>
            <input
              type="text"
              name="category"
              placeholder="Category"
              value={formData.category}
              onChange={onChange}
              className="w-full px-4 py-2 border border-black rounded-lg text-black"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="block mb-1 text-sm font-medium text-black">Description</label>
            <textarea
              name="description"
              placeholder="Description"
              value={formData.description}
              onChange={onChange}
              className="w-full px-4 py-2 border border-black rounded-lg text-black"
            />
          </div>

          {/* Amount */}
          <div>
            <label className="block mb-1 text-sm font-medium text-black">Amount</label>
            <input
              type="number"
              name="amount"
              placeholder="Amount"
              value={formData.amount}
              onChange={onChange}
              className="w-full px-4 py-2 border border-black rounded-lg text-black"
              required
            />
          </div>

          {/* Date Picker */}
          <div>
            <label className="block mb-1 text-sm font-medium text-black">Date</label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={onChange}
              className="w-full px-4 py-2 border border-black rounded-lg text-black"
              required
            />
          </div>

          {/* Buttons */}
          <div className="flex gap-4 justify-center mt-6">
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-lg"
            >
              Confirm
            </button>
            <button
              type="button"
              onClick={onClose}
              className="bg-red-500 text-white px-4 py-2 rounded-lg"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
