import { Button } from "@/components/ui/button";
import {TextHoverEffect} from "../components/ui/text-hover-effect";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <TextHoverEffect text="WIP" />
      <Button variant="outline">
        <Link href="/dashboard">Dashboard</Link>
      </Button>
    </div>
  );
}
