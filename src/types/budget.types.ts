
export interface ExpenseForm {
  amount: number
  title: string
  category: string
  date: Date | null
  paidBy: string
  participants: string[]
  splitEqually: boolean
  notes: string
}

export interface Debt {
  from: any
  to: any
  amount: number
  title: string
  expenseId: string
}

export interface TravelerBalance {
  user: any
  balance: number
}

export interface BudgetState {

  /* ------------------------
     MODAL STATE
  -------------------------*/

  expenseModel: boolean
  openExpenseModel: () => void
  closeExpenseModel: () => void


  /* ------------------------
     EXPENSE FORM
  -------------------------*/

  form: ExpenseForm

  setAmount: (v: number) => void
  setTitle: (v: string) => void
  setCategory: (v: string) => void
  setDate: (v: Date | null) => void
  setPaidBy: (v: string) => void
  setParticipants: (v: string[]) => void
  toggleParticipant: (id: string) => void
  setSplitEqually: (v: boolean) => void
  setNotes: (v: string) => void
  resetForm: () => void


  /* ------------------------
     BUDGET DATA
  -------------------------*/

  totalDebt: number
  yourBalance: number
  debts: Debt[]
  travelerBalances: TravelerBalance[]

  setBudgetData: (data: any) => void


  /* ------------------------
     LOADING STATE
  -------------------------*/

  loading: boolean
  setLoading: (v: boolean) => void


  /* ------------------------
     SETTLE PAYMENT
  -------------------------*/

  settleDebt: (expenseId: string, userId: string) => void
}
