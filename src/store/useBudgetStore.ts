import { create } from "zustand"
import type { BudgetState } from "../types/budget.types"

const useBudgetStore = create<BudgetState>((set, get) => ({
  expenseModel: false,

  openExpenseModel: () => set({ expenseModel: true }),

  closeExpenseModel: () => set({ expenseModel: false }),

  budgetModal: false,
  openBudgetModal: () => set({ budgetModal: true }),
  closeBudgetModal: () => set({ budgetModal: false }),

  budgetForm: {
    total: 0,
    categories: {
      Food: 0,
      Transport: 0,
      Activities: 0,
      Hotel: 0,
      Shopping: 0,
      Other: 0,
    },
  },
  setBudgetTotal: (v) =>
    set((state) => ({
      budgetForm: { ...state.budgetForm, total: Math.max(0, v) },
    })),

  setCategoryBudget: (category, v) =>
    set((state) => ({
      budgetForm: {
        ...state.budgetForm,
        categories: {
          ...state.budgetForm.categories,
          [category]: Math.max(0, v),
        },
      },
    })),
  resetBudgetForm: () =>
    set(() => ({
      budgetForm: {
        total: 0,
        categories: {
          Food: 0,
          Transport: 0,
          Activities: 0,
          Hotel: 0,
          Shopping: 0,
          Other: 0,
        },
      },
    })),
  form: {
    amount: 0,
    title: "",
    category: "Food",
    date: null,
    paidBy: "",
    participants: [],
    splitEqually: true,
    notes: "",
  },

  dashboard: null,
  setDashboardData: (v) => set({ dashboard: v }),
  addExpenseToDashboard: (newExpense) => set((state) => {
  // 1. Safety check using the correct state key 'dashboard'
  if (!state.dashboard) return state;

  const data = state.dashboard;
  const amount = Number(newExpense.amount);

  // 2. Recalculate global totals
  const newTotalSpent = (data.totalSpent || 0) + amount;
  const newRemaining = (data.totalBudget || 0) - newTotalSpent;
  const newUtilization = data.totalBudget > 0 
    ? (newTotalSpent / data.totalBudget) * 100 
    : 0;

  // 3. Update the specific category slice
  const updatedCategories = data.categories.map((cat) => {
    // Note: We use cat.category to match your DashboardCategory interface
    if (cat.category.toLowerCase() === newExpense.category.toLowerCase()) {
      const updatedSpent = (cat.spent || 0) + amount;
      return {
        ...cat,
        spent: updatedSpent,
        // Recalculate percentage for this specific category progress bar
        percentage: cat.limit > 0 ? (updatedSpent / cat.limit) * 100 : 0,
      };
    }
    return cat;
  });

  // 4. Update the recent list (ensuring it stays an array)
  const updatedRecent = [newExpense, ...(data.recentExpenses || [])].slice(0, 10);

  // 5. Return the update to the 'dashboard' key
  return {
    dashboard: {
      ...data,
      totalSpent: newTotalSpent,
      remaining: newRemaining,
      utilization: newUtilization,
      categories: updatedCategories,
      recentExpenses: updatedRecent as [], // Cast to match your specific interface type
    }
  };
}),

  showSettleMentScreen: false,
  setShowSettleMentScreen: (v) => set({ showSettleMentScreen: v }),

  setAmount: (v) =>
    set((state) => ({
      form: { ...state.form, amount: v },
    })),

  setTitle: (v) =>
    set((state) => ({
      form: { ...state.form, title: v },
    })),

  setCategory: (v) =>
    set((state) => ({
      form: { ...state.form, category: v },
    })),

  setDate: (v) =>
    set((state) => ({
      form: { ...state.form, date: v },
    })),

  setPaidBy: (v) =>
    set((state) => ({
      form: { ...state.form, paidBy: v },
    })),

  setParticipants: (v) =>
    set((state) => ({
      form: { ...state.form, participants: v },
    })),

  toggleParticipant: (id) => {
    const participants = get().form.participants

    if (participants.includes(id)) {
      set((state) => ({
        form: {
          ...state.form,
          participants: participants.filter((p) => p !== id),
        },
      }))
    } else {
      set((state) => ({
        form: {
          ...state.form,
          participants: [...participants, id],
        },
      }))
    }
  },

  setSplitEqually: (v) =>
    set((state) => ({
      form: { ...state.form, splitEqually: v },
    })),

  setNotes: (v) =>
    set((state) => ({
      form: { ...state.form, notes: v },
    })),

  resetForm: () =>
    set({
      form: {
        amount: 0,
        title: "",
        category: "Food",
        date: null,
        paidBy: "",
        participants: [],
        splitEqually: true,
        notes: "",
      },
    }),

  totalDebt: 0,
  yourBalance: 0,
  debts: [],
  travelerBalances: [],

  setBudgetData: (data) =>
    set({
      totalDebt: data.totalDebt,
      yourBalance: data.yourBalance,
      debts: data.debts,
      travelerBalances: data.travelerBalances,
    }),

  loading: false,

  setLoading: (v) => set({ loading: v }),

  settleDebt: (expenseId, userId) => {
    const debts = get().debts

    const updated = debts.filter(
      (d) => !(d.expenseId === expenseId && d.from._id === userId),
    )

    set({ debts: updated })
  },
}))

export default useBudgetStore
