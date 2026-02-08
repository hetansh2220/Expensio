"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { useAddTransaction, useTransactions } from "@/hooks/useTransactions";
import { useToast } from "@/providers/ToastProvider";
import { EXPENSE_CATEGORIES } from "@/lib/constants/categories";
import { ROUTES } from "@/lib/constants/routes";
import { getCurrentMonth } from "@/lib/utils/dateHelpers";
import { formatCurrency } from "@/lib/utils/formatCurrency";
import { Timestamp } from "firebase/firestore";
import { HiOutlineArrowLeft, HiOutlineExclamationTriangle } from "react-icons/hi2";
import clsx from "clsx";
import type { TransactionType, ExpenseCategory } from "@/types/transaction";

export default function AddTransactionPage() {
  const router = useRouter();
  const { showToast } = useToast();
  const addMutation = useAddTransaction();
  const month = getCurrentMonth();
  const { data: transactions = [] } = useTransactions(month);

  const [type, setType] = useState<TransactionType>("expense");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState<ExpenseCategory>("needs");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [showInsufficientModal, setShowInsufficientModal] = useState(false);

  const currentBalance = useMemo(() => {
    const income = transactions.filter((t) => t.type === "income").reduce((s, t) => s + t.amount, 0);
    const expenses = transactions.filter((t) => t.type === "expense").reduce((s, t) => s + t.amount, 0);
    const savings = transactions.filter((t) => t.type === "savings").reduce((s, t) => s + t.amount, 0);
    return income - expenses - savings;
  }, [transactions]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount || Number(amount) <= 0) {
      showToast("Enter a valid amount", "error");
      return;
    }

    const transactionAmount = Number(amount);

    if ((type === "expense" || type === "savings") && transactionAmount > currentBalance) {
      setShowInsufficientModal(true);
      return;
    }

    try {
      const data: Record<string, unknown> = {
        type,
        amount: transactionAmount,
        description: description || type.charAt(0).toUpperCase() + type.slice(1),
        date: Timestamp.fromDate(new Date(date)),
      };
      if (type === "expense") {
        data.category = category;
      }
      await addMutation.mutateAsync(data as Parameters<typeof addMutation.mutateAsync>[0]);
      showToast("Transaction added!", "success");
      router.push(ROUTES.TRANSACTIONS);
    } catch {
      showToast("Failed to add transaction", "error");
    }
  };

  return (
    <div className="min-h-full w-full flex flex-col items-center justify-center py-6">
      <div className="w-full max-w-lg">
        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={() => router.back()}
            className="w-11 h-11 rounded-xl bg-surface-raised border border-border flex items-center justify-center hover:border-primary/30 transition-all"
          >
            <HiOutlineArrowLeft className="w-5 h-5 text-muted" />
          </button>
          <h1 className="text-xl font-bold text-foreground">Add Transaction</h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-3 gap-2">
          {(["income", "expense", "savings"] as TransactionType[]).map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setType(t)}
              className={clsx(
                "h-12 rounded-xl font-semibold text-sm capitalize transition-all",
                type === t
                  ? t === "income"
                    ? "bg-success/15 text-success"
                    : t === "expense"
                    ? "bg-danger/15 text-danger"
                    : "bg-savings/15 text-savings"
                  : "bg-surface-raised text-muted hover:bg-surface-overlay"
              )}
            >
              {t}
            </button>
          ))}
        </div>

        <div>
          <label className="text-xs font-medium text-muted block mb-2">Amount</label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-2xl font-bold text-muted/40">₹</span>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0"
              autoFocus
              className="w-full h-16 pl-12 pr-4 rounded-xl bg-surface border border-border text-3xl font-bold text-foreground placeholder:text-muted/20 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
            />
          </div>
        </div>

        {type === "expense" && (
          <div>
            <label className="text-xs font-medium text-muted block mb-2">Category</label>
            <div className="grid grid-cols-3 gap-2">
              {EXPENSE_CATEGORIES.map((cat) => (
                <button
                  key={cat.value}
                  type="button"
                  onClick={() => setCategory(cat.value)}
                  className={clsx(
                    "h-12 rounded-xl text-sm font-semibold transition-all",
                    category === cat.value
                      ? "text-white"
                      : "bg-surface-raised text-muted hover:bg-surface-overlay"
                  )}
                  style={category === cat.value ? { backgroundColor: cat.color } : {}}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>
        )}

        <div>
          <label className="text-xs font-medium text-muted block mb-2">Description</label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="What was this for?"
            className="w-full h-12 px-4 rounded-xl bg-surface border border-border text-sm text-foreground placeholder:text-muted/40 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
          />
        </div>

        <div>
          <label className="text-xs font-medium text-muted block mb-2">Date</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full h-12 px-4 rounded-xl bg-surface border border-border text-sm text-foreground focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
          />
        </div>

        <button
          type="submit"
          disabled={addMutation.isPending || !amount}
          className={clsx(
            "w-full h-14 rounded-xl font-semibold text-white transition-all disabled:opacity-50",
            type === "income" && "bg-success hover:bg-success/90",
            type === "expense" && "bg-danger hover:bg-danger/90",
            type === "savings" && "bg-savings hover:bg-savings/90"
          )}
        >
          {addMutation.isPending ? "Adding..." : `Add ${type.charAt(0).toUpperCase() + type.slice(1)}`}
        </button>
      </form>
      </div>


      {showInsufficientModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-surface-raised rounded-2xl p-6 max-w-sm w-full border border-border shadow-2xl">
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-danger/15 flex items-center justify-center mb-4">
                <HiOutlineExclamationTriangle className="w-8 h-8 text-danger" />
              </div>
              <h3 className="text-lg font-bold text-foreground mb-2">Insufficient Balance</h3>
              <p className="text-sm text-muted mb-4">
                You don&apos;t have enough balance to complete this transaction.
              </p>
              <div className="w-full p-4 rounded-xl bg-surface mb-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs text-muted">Current Balance</span>
                  <span className={clsx(
                    "text-sm font-bold",
                    currentBalance >= 0 ? "text-success" : "text-danger"
                  )}>
                    {formatCurrency(currentBalance)}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-muted">Transaction Amount</span>
                  <span className="text-sm font-bold text-danger">
                    {formatCurrency(Number(amount))}
                  </span>
                </div>
              </div>
              <button
                onClick={() => setShowInsufficientModal(false)}
                className="w-full h-12 rounded-xl bg-primary text-white font-semibold hover:bg-primary-dark transition-all"
              >
                Got it
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
