"use client"

import { useState } from "react"
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
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from "@/components/ui/tooltip"
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
  PopoverContent
} from "@/components/ui/popover"

import { Calendar } from "@/components/ui/calendar"
import { CalendarIcon } from "lucide-react"
import { Switch } from "@/components/ui/switch"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import useBudgetStore from "@/store/useBudgetStore"
import useTripDetailsStore from "@/store/useTripDetails"
import useMyTripStore from "@/store/useMyTrip"
import useBudget from "@/hooks/useBudget"

export default function AddExpenseModal() {
  
  const expenseModel = useBudgetStore((state) => state.expenseModel)
  const closeExpenseModel = useBudgetStore((state) => state.closeExpenseModel)
  const {setAmount, setTitle, setDate, setCategory, setNotes, setPaidBy, form, setSplitEqually} = useBudgetStore();

  const selectedTripId = useTripDetailsStore((state) => state.selectedTrip);
  const trips = useMyTripStore((state) => state.trips);
  const members = trips.filter((trip) => trip._id === selectedTripId)[0].members;


  const [selectedMembers, setSelectedMembers] = useState<string[]>([])

  const {addBudget} = useBudget();

  const toggleMember = (id: string) => {
    if (selectedMembers.includes(id)) {
      setSelectedMembers(selectedMembers.filter(m => m !== id))
    } else {
      setSelectedMembers([...selectedMembers, id])
    }
  }


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
              <Input placeholder="$0.00" className="border-none text-6xl text-center focus:outline-none" type="number" value={form.amount} onChange={(e) => setAmount(Number(e.target.value))}/>
            </div>
          </div>

          {/* Expense Name */}
          <Input
            placeholder="e.g. Dinner at Gion"
            value={form.title}
            onChange={(e)=>setTitle(e.target.value)}
          />

          {/* Category + Date */}
          <div className="flex gap-3">

            <Select value={form.category} onValueChange={setCategory}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>

              <SelectContent className="bg-card">
                <SelectItem value="Food">Food</SelectItem>
                <SelectItem value="Transport">Transport</SelectItem>
                <SelectItem value="Hotel">Hotel</SelectItem>
                <SelectItem value="Shopping">Shopping</SelectItem>
              </SelectContent>
            </Select>

            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="flex-1 justify-start">
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {form.date ? format(form.date,"PPP") : "mm/dd/yyyy"}
                </Button>
              </PopoverTrigger>

              <PopoverContent>
                <Calendar
                  mode="single"
                  selected={form.date ?? undefined}
                  onSelect={setDate}
                  className="bg-white"
                />
              </PopoverContent>
            </Popover>

          </div>

          {/* Paid By */}
          <Select value={form.paidBy} onValueChange={setPaidBy}>
            <SelectTrigger>
              <SelectValue placeholder="Paid by"/>
            </SelectTrigger>

            <SelectContent className="bg-card">

              {members.map(member => (
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

              {members.map(member => {

                const selected = selectedMembers.includes(member.user._id)

                return (
                  <button
                    key={member.user._id}
                    onClick={()=>toggleMember(member.user._id)}
                    className={`px-1 py-1 rounded-full border text-sm
                    ${selected ? "bg-primary text-white" : "bg-muted"}
                    `}
                  >
                    <div className="flex gap-2 items-center"> 
                        <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                
                            <Avatar>
                        <AvatarImage src={member.user.imageUrl} alt={member.user.name} />
                        <AvatarFallback>{member.user.name.charAt(0) + member.user.name.split(" ")[1].charAt(0)}</AvatarFallback>
                        </Avatar>
                            </TooltipTrigger>
                            <TooltipContent>
                            <p>{member?.user?.name}</p>
                        </TooltipContent>
                        </Tooltip> </TooltipProvider>

                        
                        
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
            onChange={(e)=>setNotes(e.target.value)}
          />

          {/* Buttons */}
          <div className="flex justify-end gap-3">

            <Button
              variant="outline"
              onClick={closeExpenseModel}
            >
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