

export interface BudgetCategories {
  Food: number;
  Transport: number;
  Activities: number;
  Hotel: number;
  Shopping: number;
  Other: number;
}

export interface BudgetForm {
  total: number;
  categories: BudgetCategories;
}
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
export interface DashboardCategory {
  category: string;
  spent: number;
  limit: number;
  percentage: number;
}

export interface BudgetDashboardData {
  totalBudget: number;
  totalSpent: number;
  remaining: number;
  utilization: number;
  categories: DashboardCategory[];
  recentExpenses: [],
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

  budgetModal: boolean;
  openBudgetModal: () => void;
  closeBudgetModal: () => void;

  showSettleMentScreen : boolean;
  setShowSettleMentScreen: (v: boolean) => void;

   budgetForm: BudgetForm;
   setBudgetTotal: (amount: number) => void;
  setCategoryBudget: (category: keyof BudgetCategories, amount: number) => void;
  resetBudgetForm: () => void
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

  dashboard: BudgetDashboardData | null;
  setDashboardData: (data: BudgetDashboardData) => void;

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
