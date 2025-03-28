import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import data from "./data.json";



export default function ClusterCard({ data } : { data: any }) {
  return (
    <Card className='w-full h-full m-2'>
      <CardHeader>
        <CardTitle>Cluster Name</CardTitle>
        <CardDescription>Cluster Description</CardDescription>
        <CardAction>
          <Button variant='outline'>View</Button>
        </CardAction>
      </CardHeader>
      <CardContent>
      </CardContent>
      <CardFooter></CardFooter>
    </Card>
  );
}
