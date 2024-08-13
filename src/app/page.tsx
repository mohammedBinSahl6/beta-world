'use client';

import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Button
        onClick={() => {
          toast({
            title: "What Hi??",
            description: "Start working!😒",
          });
        }}
      >
        Say Hi
      </Button>
    </main>
  );
}
