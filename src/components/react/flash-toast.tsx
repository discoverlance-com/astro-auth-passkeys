import React from "react";
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

  return (
    <>
      <Toaster />
    </>
  );
};
