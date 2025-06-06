"use client";

import React from "react";

type QuickActionButtonProps = {
  text: string;
  onClick?: () => void;
  className?: string; // Ensure `onClick` is optional
};

export const QuickActionButton: React.FC<QuickActionButtonProps> = ({
  text,
  onClick,
}) => {
  return (
    <button
      type="button"
      className="flex-1 rounded-xl bg-white py-4 text-sm font-medium text-[var(--text)] border border-[var(--text)]"
      onClick={onClick}
    >
      {text}
    </button>
  );
};
