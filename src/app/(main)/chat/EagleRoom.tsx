import { socket } from "@/app/socket";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import { useSession } from "next-auth/react";
import React from "react";

const EagleRoom = () => {
  const [typing, setTyping] = React.useState<{
    typing: boolean;
    sender: string;
  }>({ typing: false, sender: "" });
  const [messages, setMessages] = React.useState<
    { message: string; sender: string }[]
  >([]);
  const [message, setMessage] = React.useState("");
  const { data: session } = useSession();

  const containerRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    socket.on("message", (data) => {
      setMessages((prev) => [...prev, data]);
    });
    socket.on("user_joined", (data) => {
      toast({
        title: "User Joined",
        description: "User " + data + " joined the room",
      });
      //   setJoined(true);

      setMessages((prev) => [...prev, { message: data, sender: "System" }]);
    });

    socket.on("typing", (data) => {
      setTyping(data);
    });

    return () => {
      socket.off("user_joined");
      socket.off("message");
      socket.on("user_leave", (data) => {
        setMessages((prev) =>
          prev.filter((message) => message.sender !== data)
        );
      });
    };
  }, []);

  React.useEffect(() => {
    containerRef.current?.scrollTo(0, document.body.scrollHeight);
  }, [messages]);

  const sendMessage = (message: string) => {
    setMessages((prev) => [
      ...prev,
      { message, sender: session?.user?.username as string },
    ]);
    socket.emit("message", message);
    handleStopTyping();
    setMessage("");
  };

  const handleTyping = () => {
    setTyping({ typing: true, sender: session?.user?.username as string });
    socket.emit("typing", true);
  };

  const handleStopTyping = () => {
    setTyping({ typing: false, sender: "" });
    socket.emit("typing", false);
  };
  //   if (!joined) {
  //     return <div>Join the room</div>;
  //   }

  return (
    <div className="w-full max-w-md space-y-8">
      <h2 className="text-xl font-bold">Eagle Room</h2>
      <div
        ref={containerRef}
        className="relative w-full max-w-md space-y-8 flex flex-col gap-2 rounded-lg bg-gray-200 h-[500px] overflow-y-scroll mt-auto box-border"
      >
        {messages.map((message, index) => (
          <div
            key={index}
            className={cn("flex flex-col gap-2  w-full p-5", {
              "justify-center items-center": message.sender === "System",
              "justify-end items-end":
                message.sender !== session?.user?.username &&
                message.sender !== "System",
            })}
          >
            <span
              className={cn("w-fit p-3 rounded-md max-w-md", {
                "bg-black text-white rounded-md p-3 justify-center":
                  message.sender === "System",
                "justify-end items-end bg-blue-400":
                  message.sender !== session?.user?.username &&
                  message.sender !== "System",
              })}
            >
              {message.sender !== "System" && (
                <p className="text-sm font-bold">{message.sender}</p>
              )}{" "}
              <p
                className={cn("text-sm text-white", {
                  "text-black": message.sender === session?.user?.username,
                })}
              >
                {message.message}
              </p>
            </span>
          </div>
        ))}
        <div className="relative">
          {typing.typing && typing.sender !== session?.user?.username && (
            <span className=" text-xs bg-amber-100 animate-pulse rounded-md p-1 w-fit absolute bottom-0 left-0">
              Typing...
            </span>
          )}
        </div>
      </div>
      <Textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="message..."
        onKeyDown={(e) => {
          if (e.key === "Enter" && !e.shiftKey) {
            sendMessage(message);
            handleStopTyping();
          }
          handleTyping();
        }}
        onKeyUp={() => {
          setTimeout(() => {
            handleStopTyping();
          }, 2000);
        }}
      />
      <Button onClick={() => sendMessage(message)}>Send</Button>
    </div>
  );
};

export default EagleRoom;
