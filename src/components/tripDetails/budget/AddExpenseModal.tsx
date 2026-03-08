"use client"
import { format } from "date-fns"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from "@/components/ui/tooltip"
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select"

import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover"

import { Calendar } from "@/components/ui/calendar"
import { CalendarIcon } from "lucide-react"
import { Switch } from "@/components/ui/switch"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import useBudgetStore from "@/store/useBudgetStore"
import useTripDetailsStore from "@/store/useTripDetails"
import useMyTripStore from "@/store/useMyTrip"
import useBudget from "@/hooks/useBudget"
import { useEffect } from "react"

export default function AddExpenseModal() {
  // 1. Use Selectors for performance
  const form = useBudgetStore((state) => state.form)
  const setParticipants = useBudgetStore((state) => state.setParticipants)
  const setSplitEqually = useBudgetStore((state) => state.setSplitEqually)
  const { setTitle, setAmount, setCategory, setNotes, setPaidBy, setDate } =
    useBudgetStore()
  const expenseModel = useBudgetStore((state) => state.expenseModel)
  const closeExpenseModel = useBudgetStore((state) => state.closeExpenseModel)
  const selectedTripId = useTripDetailsStore((state) => state.selectedTripId)
  const trips = useMyTripStore((state) => state.trips)
  const { addBudget } = useBudget()

  const currentTrip = trips.find((t) => t._id === selectedTripId)
  const members = currentTrip?.members || []
  const membersIds = members.map((m) => m.user._id)

  useEffect(() => {
    if (form.splitEqually && membersIds.length > 0) {
      // Only update if the lists are actually different to prevent loops
      if (JSON.stringify(form.participants) !== JSON.stringify(membersIds)) {
        setParticipants(membersIds)
      }
    }
  }, [form.splitEqually, membersIds, setParticipants])

  const toggleMember = (id: string) => {
    let nextParticipants
    if (form.participants.includes(id)) {
      nextParticipants = form.participants.filter((m) => m !== id)
    } else {
      nextParticipants = [...form.participants, id]
    }

    setParticipants(nextParticipants)

    if (nextParticipants.length !== members.length) {
      setSplitEqually(false)
    } else {
      setSplitEqually(true)
    }
  }

  const expenseOptions = [
    "Food",
    "Transport",
    "Activities",
    "Shopping",
    "Hotel",
    "Other",
  ]

  return (
    <Dialog open={expenseModel} onOpenChange={closeExpenseModel}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Add New Expense</DialogTitle>
        </DialogHeader>

        <div className="space-y-5">
          {/* Amount */}
          <div className="text-center">
            <p className="text-sm text-muted-foreground">AMOUNT</p>
            <div className="text-4xl font-bold mt-1 text-center">
              <Input
                placeholder="₹0.00"
                type="number"
                autoFocus
                className="
      /* Sizing - Forcing huge text */
      h-auto
      text-xl 
      md:text-4xl
      w-full
      
      border-none 
      bg-transparent
      text-center 
      shadow-none
      focus-visible:ring-0 
      focus-visible:ring-offset-0
      
      placeholder:text-3xl
      md:placeholder:text-3xl
      placeholder:text-muted-foreground/30
      placeholder:font-medium
      
      animate-pulse-slow
      caret-primary
      
      [appearance:textfield] 
      [&::-webkit-outer-spin-button]:appearance-none 
      [&::-webkit-inner-spin-button]:appearance-none
    "
                value={form.amount || ""}
                onChange={(e) => setAmount(Number(e.target.value))}
              />
            </div>
          </div>

          {/* Expense Name */}
          <Input
            placeholder="Title"
            value={form.title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />

          {/* Category + Date */}
          <div className="flex gap-3">
            <Select value={form.category} onValueChange={setCategory}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>

              <SelectContent className="bg-card">
                {expenseOptions.map((expense) => (
                  <SelectItem key={expense} value={expense}>
                    {expense}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="flex-1 justify-start">
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {form.date ? format(form.date, "PPP") : "mm/dd/yyyy"}
                </Button>
              </PopoverTrigger>

              <PopoverContent className="bg-card">
                <Calendar
                  mode="single"
                  selected={form.date ?? undefined}
                  onSelect={(date) => setDate(date ?? null)}
                  className="bg-card"
                />
              </PopoverContent>
            </Popover>
          </div>

          {/* Paid By */}
          <Select value={form.paidBy} onValueChange={setPaidBy}>
            <SelectTrigger>
              <SelectValue placeholder="Paid by" />
            </SelectTrigger>

            <SelectContent className="bg-card">
              {members.map((member) => (
                <SelectItem key={member.user._id} value={member.user._id}>
                  {member.user.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Split Between */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium">Split Between</p>

              <div className="flex items-center gap-2">
                <span className="text-xs text-muted-foreground">
                  Split Equally
                </span>

                <Switch
                  checked={form.splitEqually}
                  onCheckedChange={setSplitEqually}
                />
              </div>
            </div>

            <div className="flex gap-2 flex-wrap">
              {members.map((member) => {
                const selected = form.participants.includes(member.user._id)

                return (
                  <button
                    key={member.user._id}
                    onClick={() => toggleMember(member.user._id)}
                    className={`px-1 py-1 rounded-full border text-sm
                    ${selected ? "bg-primary text-white" : "bg-muted"}
                    `}
                  >
                    <div className="flex gap-2 items-center">
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Avatar>
                              <AvatarImage
                                src={member.user.imageUrl}
                                alt={member.user.name}
                              />
                              <AvatarFallback>
                                {member.user.name.charAt(0) +
                                  member.user.name.split(" ")[1].charAt(0)}
                              </AvatarFallback>
                            </Avatar>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>{member?.user?.name}</p>
                          </TooltipContent>
                        </Tooltip>{" "}
                      </TooltipProvider>
                    </div>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Notes */}
          <Textarea
            placeholder="Add any details..."
            value={form.notes}
            onChange={(e) => setNotes(e.target.value)}
          />

          {/* Buttons */}
          <div className="flex justify-end gap-3">
            <Button variant="outline" onClick={closeExpenseModel}>
              Cancel
            </Button>

            <Button
              className="bg-orange-500 hover:bg-orange-600"
              onClick={addBudget}
            >
              Add Expense
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
