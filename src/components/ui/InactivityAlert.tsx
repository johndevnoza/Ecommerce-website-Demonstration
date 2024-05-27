import { useEffect, useState } from "react";
import { getAccesToken } from "@/services/authQuery";
import { useQueryClient } from "@tanstack/react-query";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Link } from "react-router-dom";
const InactivityAlert = () => {
  const [showAlert, setShowAlert] = useState(false);
  const queryClient = useQueryClient();
  const token = getAccesToken();

  useEffect(() => {
    if (token) {
      let inactivityTimeout: NodeJS.Timeout;
      const resetInactivityTimeout = () => {
        clearTimeout(inactivityTimeout);
        inactivityTimeout = setTimeout(() => {
          localStorage.removeItem("accessToken");
          localStorage.removeItem("refreshToken");
          setShowAlert(true);
        }, (30 * 60 * 1000) / 2);
      };
      resetInactivityTimeout();
      window.addEventListener("mousemove", resetInactivityTimeout);
      window.addEventListener("keydown", resetInactivityTimeout);
      queryClient.removeQueries();
      queryClient.invalidateQueries();
      queryClient.refetchQueries();
      return () => {
        clearTimeout(inactivityTimeout);
        window.removeEventListener("mousemove", resetInactivityTimeout);
        window.removeEventListener("keydown", resetInactivityTimeout);
      };
    }
  }, [token]);

  if (showAlert && !token) {
    return (
      <>
        <AlertDialog open>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Session expired</AlertDialogTitle>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel onClick={() => setShowAlert(false)}>
                Cancel
              </AlertDialogCancel>
              <Link to={"/login"}>
                <AlertDialogAction onClick={() => setShowAlert(false)}>
                  Log In
                </AlertDialogAction>
              </Link>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </>
    );
  }

  return null;
};

export default InactivityAlert;
