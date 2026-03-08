import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog'


function DeleteConfirmation() {
  return (
    <div><AlertDialog open={!!deleteConfig} onOpenChange={(open) => !open && setDeleteConfig(null)}>
  <AlertDialogContent className="rounded-3xl">
    <AlertDialogHeader>
      <AlertDialogTitle className="text-xl font-bold">Are you absolutely sure?</AlertDialogTitle>
      <AlertDialogDescription className="text-slate-500">
        This action cannot be undone. This will permanently delete the activity from your itinerary.
      </AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter className="gap-2">
      <AlertDialogCancel className="rounded-full border-slate-200">Cancel</AlertDialogCancel>
      <AlertDialogAction 
        onClick={confirmDelete} 
        className="rounded-full bg-red-500 hover:bg-red-600 text-white"
      >
        Delete Activity
      </AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog></div>
  )
}

export default DeleteConfirmation