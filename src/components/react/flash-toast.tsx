import React from "react";
// import { toast } from "sonner";
import { Toaster } from "./ui/toaster";
import { useToast } from "@/hooks/react/use-toast";

export const FlashToast = ({
  type,
  message,
}: {
  message: string | null;
  type: string | null;
}) => {
  const { toast } = useToast();

  React.useEffect(() => {
    if (type) {
      switch (type) {
        case "error":
          toast({
            title: "Error",
            description: message,
            variant: "destructive",
          });
          break;
        case "success":
          toast({ title: "Success", description: message });
          break;
        case "warning":
          toast({
            title: "Warning",
            description: message,
            variant: "destructive",
          });
          break;
        default:
          toast({ title: "Info", description: message });
          break;
      }

      // clear toast
      fetch("/toasts?action=clear");
    }
  }, []);

  // React.useEffect(() => {
  //   // Initiate the first call to connect to SSE API
  //   let eventSource: EventSource | null = null;

  //   const messageListener = (event: MessageEvent<any>) => {
  //     const data = event.data;
  //     const tmp = JSON.parse(data);
  //     // Display toast notifications
  //     // toast(tmp);
  //     const type = tmp.type;
  //     const message = tmp.message;
  //     switch (type) {
  //       case "error":
  //         toast.error(message);
  //         break;
  //       case "success":
  //         toast.success(message);
  //         break;
  //       case "warning":
  //         console.log("WARNING");
  //         toast.warning(message);
  //         break;
  //       default:
  //         toast.info(message);
  //         break;
  //     }
  //   };

  //   const closeListener = () => eventSource?.close();

  //   if (type) {
  //     eventSource = new EventSource("/notifications-sse");

  //     // Close the connection to SSE API if any error
  //     eventSource?.addEventListener("error", closeListener);
  //     // Listen to events received via the SSE API
  //     eventSource?.addEventListener("message", messageListener);
  //     // As the component unmounts, close listeners to SSE API
  //   }
  //   return () => {
  //     eventSource?.removeEventListener("error", closeListener);
  //     eventSource?.removeEventListener("message", messageListener);
  //     eventSource?.close();
  //   };
  // }, []);

  return (
    <>
      <Toaster />
    </>
  );
};
