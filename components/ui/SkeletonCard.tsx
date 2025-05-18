import { Card, CardContent } from "./card";

export default function SkeletonCard() {
  return (
    <Card className="shadow-lg border-none my-12 animate-pulse">
      <div className="h-[200px] w-full bg-gray-200 rounded-t-lg"></div>
      <CardContent>
        <div className="h-4 w-3/4 bg-gray-200 rounded mb-2"></div>
        <div className="h-3 w-1/3 bg-gray-200 rounded mb-4"></div>

        <div className="grid grid-cols-2 gap-2 mt-2">
          <div className="h-3 w-2/3 bg-gray-200 rounded"></div>
          <div className="h-3 w-2/3 bg-gray-200 rounded"></div>
          <div className="h-3 w-2/3 bg-gray-200 rounded"></div>
          <div className="h-3 w-2/3 bg-gray-200 rounded"></div>
        </div>

        <div className="h-3 w-1/2 bg-gray-200 rounded mt-4"></div>
      </CardContent>
    </Card>
  );
}
