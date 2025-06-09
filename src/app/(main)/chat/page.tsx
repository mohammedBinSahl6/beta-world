"use client";

import React from "react";
import { useSession } from "next-auth/react";

import { socket } from "@/app/socket";
import { Button } from "@/components/ui/button";
import EagleRoom from "./EagleRoom";
import FunRoom from "./FunRoom";

const ChatPage = () => {
  const [room, setRoom] = React.useState<string>("");

  const { data: session } = useSession();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md flex gap-4">
        <Button
          variant={"outline"}
          onClick={() => {
            socket.emit("join_room", {
              room: "eagle",
              username: session?.user?.username as string,
            });
            setRoom("eagle");
          }}
        >
          Eagele Room
        </Button>

        <Button
          variant={"outline"}
          onClick={() => {
            socket.emit("join_room", {
              room: "fun",
              username: session?.user?.username as string,
            });
            setRoom("fun");
          }}
        >
          Fun Room
        </Button>
      </div>

      {room === "eagle" && <EagleRoom />}
      {room === "fun" && <FunRoom />}
    </div>
  );
};

export default ChatPage;
