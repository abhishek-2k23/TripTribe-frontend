import { create } from "zustand"
import type {BudgetState} from '../types/budget.types'

const useBudgetStore = create<BudgetState>((set, get) => ({


  expenseModel: false,

  openExpenseModel: () =>
    set({ expenseModel: true }),

  closeExpenseModel: () =>
    set({ expenseModel: false }),


  form: {
    amount: 0,
    title: "",
    category: "Food",
    date: null,
    paidBy: "",
    participants: [],
    splitEqually: true,
    notes: ""
  },

  setAmount: (v) =>
    set(state => ({
      form: { ...state.form, amount: v }
    })),

  setTitle: (v) =>
    set(state => ({
      form: { ...state.form, title: v }
    })),

  setCategory: (v) =>
    set(state => ({
      form: { ...state.form, category: v }
    })),

  setDate: (v) =>
    set(state => ({
      form: { ...state.form, date: v }
    })),

  setPaidBy: (v) =>
    set(state => ({
      form: { ...state.form, paidBy: v }
    })),

  setParticipants: (v) =>
    set(state => ({
      form: { ...state.form, participants: v }
    })),

  toggleParticipant: (id) => {

    const participants = get().form.participants

    if (participants.includes(id)) {

      set(state => ({
        form: {
          ...state.form,
          participants: participants.filter(p => p !== id)
        }
      }))

    } else {

      set(state => ({
        form: {
          ...state.form,
          participants: [...participants, id]
        }
      }))

    }

  },

  setSplitEqually: (v) =>
    set(state => ({
      form: { ...state.form, splitEqually: v }
    })),

  setNotes: (v) =>
    set(state => ({
      form: { ...state.form, notes: v }
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
        notes: ""
      }
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
      travelerBalances: data.travelerBalances
    }),

  loading: false,

  setLoading: (v) =>
    set({ loading: v }),


  settleDebt: (expenseId, userId) => {

    const debts = get().debts

    const updated = debts.filter(
      d => !(d.expenseId === expenseId && d.from._id === userId)
    )

    set({ debts: updated })

  }

}))

export default useBudgetStore;