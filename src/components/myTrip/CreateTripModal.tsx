import { useState } from "react"
import type { ChangeEvent, FormEvent } from "react"
import AppModal from "../common/AppModal"
import { Input } from "../ui/input"
import { Textarea } from "../ui/textarea"
import { Button } from "../ui/button"
import useMyTrips from "@/hooks/useMyTrips"
interface CreateTripModalProps {
  open: boolean
  onClose: () => void
}

export default function CreateTripModal({
  open,
  onClose,
}: CreateTripModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    description: "",
    startDate: "",
    endDate: "",
    image: null as File | null,
  })
  const {createTrip} = useMyTrips();

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFormData((prev) => ({
        ...prev,
        image: e.target.files![0],
      }))
    }
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()

    console.log("Trip Data:", formData)
    createTrip(formData)
    onClose()
  }

  return (
    <AppModal open={open} onOpenChange={onClose} title="Create New Trip">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <Input
          name="name"
          placeholder="Trip Name"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <Input
          name="location"
          placeholder="Location"
          value={formData.location}
          onChange={handleChange}
          required
        />
        <Input
          type="date"
          name="startDate"
          value={formData.startDate}
          onChange={handleChange}
          required
        />

        <Input
          type="date"
          name="endDate"
          value={formData.endDate}
          onChange={handleChange}
          required
        />

        <Textarea
          name="description"
          placeholder="Description (optional)"
          value={formData.description}
          onChange={handleChange}
        />

        <Input type="file" accept="image/*" onChange={handleImageChange} />

        <div className="flex justify-end gap-2 mt-2">
          <Button type="button" variant="outline" onClick={onClose}>
            Cancel
          </Button>

          <Button type="submit">Create Trip</Button>
        </div>
      </form>
    </AppModal>
  )
}
