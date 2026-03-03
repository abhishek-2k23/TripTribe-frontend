import { Card, CardContent } from "@/components/ui/card";

function ShimmerCards() {
  return(
  <Card className="overflow-hidden animate-pulse">

      <div className="h-44 w-62 bg-muted" />

      <CardContent className="p-4 space-y-4">

        <div className="h-5 bg-muted rounded w-3/4" />
        <div className="h-4 bg-muted rounded w-1/2" />

        <div className="flex justify-between">
          <div className="h-4 w-10 bg-muted rounded-2xl" />
          <div className="h-4 w-10 bg-muted rounded-2xl" />
          <div className="h-4 w-10 bg-muted rounded-2xl" />
        </div>

        <div className="flex -gap-1">
          <div className="h-8 w-8 bg-muted rounded-full" />
          <div className="h-8 w-8 bg-muted rounded-full" />
          <div className="h-8 w-8 bg-muted rounded-full" />
        </div>

      </CardContent>
    </Card>)
}
export default function TripCardSkeleton() {
  return (
    <div className="flex flex-wrap gap-5 mt-2">{
    [1,2,3,4,5,6].map((v) => <ShimmerCards key={v}/>)
    }</div>
  );
}