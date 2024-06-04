import { useEffect, useState } from "react";
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
import { Link, useNavigate } from "react-router-dom";
import { getAccesToken } from "@/services/baseURLAxios";
const InactivityAlert = () => {
  const [showAlert, setShowAlert] = useState(false);
  const queryClient = useQueryClient();
  const token = getAccesToken();
  const navigate = useNavigate();
  useEffect(() => {
    if (token) {
      let inactivityTimeout: NodeJS.Timeout;
      const resetInactivityTimeout = () => {
        clearTimeout(inactivityTimeout);
        inactivityTimeout = setTimeout(
          () => {
            localStorage.removeItem("accessToken");
            localStorage.removeItem("refreshToken");
            setShowAlert(true);
          },
          (30 * 60 * 1000) / 2,
        );
      };
      resetInactivityTimeout();
      window.addEventListener("mousemove", resetInactivityTimeout);
      window.addEventListener("keydown", resetInactivityTimeout);

      return () => {
        clearTimeout(inactivityTimeout);
        window.removeEventListener("mousemove", resetInactivityTimeout);
        window.removeEventListener("keydown", resetInactivityTimeout);
      };
    }
  }, [token]);

  const handleLogin = async () => {
    navigate("/login");
    queryClient.clear();
    await queryClient.invalidateQueries();
    await queryClient.refetchQueries();
    setShowAlert(false);
  };
  const handleCancel = async () => {
    navigate("/");
    queryClient.clear();
    await queryClient.invalidateQueries();
    await queryClient.refetchQueries();
    setShowAlert(false);
  };
  if (showAlert && !token) {
    return (
      <>
        <AlertDialog open>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Session expired</AlertDialogTitle>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel onClick={handleCancel}>
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction onClick={handleLogin}>
                Log In
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </>
    );
  }

  return null;
};

export default InactivityAlert;
