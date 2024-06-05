import { z } from "zod";
import { Info } from "lucide-react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { buyItems } from "@/services/useCartsQuery.tsx";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import HoverInfoElement from "../ui/HoverInfoElement.tsx";
import { CARTS_QUERY } from "@/utils/constants.tsx";
import { authAxios } from "@/services/baseURLAxios.ts";
import { useState } from "react";
import { Dialog } from "@radix-ui/react-dialog";
import { AlertDialog } from "@radix-ui/react-alert-dialog";
import {
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../ui/alert-dialog.tsx";
import { Link } from "react-router-dom";

const creditCardSchema = z.object({
  cardNumber: z.string().min(8).max(10),
  cvv: z.string().regex(/^\d{3,4}$/, "CVV must be 3 or 4 digits"),
  holderName: z
    .string()
    .min(2, "Holder name must be at least 2 characters")
    .max(22),
  expiryDate: z
    .string()
    .min(6, "Date cant be less than 6 digits")
    .max(8, "Date cant be greater than 8 digits"),
});
type FormFields = z.infer<typeof creditCardSchema>;

const CreditCardForm = ({
  product_id,
  totalPrice,
  totalItems,
}: PaymentProps) => {
  const requestBody = {
    product_id: product_id,
    totalPrice: totalPrice,
    totalItems: totalItems,
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setError,
  } = useForm<FormFields>({
    resolver: zodResolver(creditCardSchema),
  });

  const queryClient = useQueryClient();
  const [isSuccess, setIsSuccess] = useState(false);
  const handlePayment = useMutation({
    mutationFn: async () => {
      await buyItems(requestBody);
      try {
        const cartItems = await queryClient.getQueryData<any>([CARTS_QUERY]);
        if (cartItems) {
          const deletePromises = cartItems.map((item: CartProduct) => {
            return authAxios.delete(`cart/${item.id}?removeAll=true`);
          });
          await Promise.all(deletePromises);
        } else {
          Promise.reject;
        }
      } catch (error) {
        throw error;
      }
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: [CARTS_QUERY] });
    },
    onSettled: async () => {
      await queryClient.refetchQueries({ queryKey: [CARTS_QUERY] });
      setIsSuccess(true);
    },
    onError: (error) => {
      console.error("Mutation error:", error);
      setError("root", {
        message: error.message,
      });
    },
  });

  const onSubmit: SubmitHandler<FormFields> = async () => {
    handlePayment.mutate();
  };

  const watchFields = watch(["cardNumber", "cvv", "holderName", "expiryDate"]);
  return (
    <>
      {isSuccess ? (
        <AlertDialog defaultOpen>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Payment is Successful!</AlertDialogTitle>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <Link to={"/"}>
                <AlertDialogAction>Continue browsing</AlertDialogAction>
              </Link>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      ) : (
        <div className="flex w-full justify-between gap-2 md:flex-col">
          <div className="flex-grow-1 rounded-md bg-orange-400 md:w-auto">
            <p>Card Number: {watchFields[0]}</p>
            <p>Holder Name: {watchFields[2]}</p>
            <p>Expiry Date: {watchFields[3]}</p>
            <p>CVV: {watchFields[1]}</p>
          </div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex min-h-full w-max flex-col gap-2"
          >
            <div className="relative">
              <Input
                {...register("holderName")}
                placeholder="Card Holder Name"
                className="min-w-full placeholder-red-500"
              />
              <HoverInfoElement
                shouldHover={errors.holderName ? true : false}
                side="right"
                hoverContentStyle="md:absolute md:bottom-0 md:left-44 md:w-56"
                hoverContent={errors.holderName?.message}
              >
                {errors.holderName ? (
                  <Info className="absolute right-2 top-2 text-primary" />
                ) : null}
              </HoverInfoElement>
            </div>
            <div className="relative">
              <Input
                {...register("cardNumber")}
                placeholder="Card Number"
                type="number"
                className="min-w-full"
              />
              <HoverInfoElement
                shouldHover={errors.cardNumber ? true : false}
                side="right"
                hoverContentStyle="md:absolute md:bottom-0 md:left-44 md:w-56"
                hoverContent={errors.cardNumber?.message}
              >
                {errors.cardNumber ? (
                  <Info className="absolute right-2 top-2 text-primary" />
                ) : null}
              </HoverInfoElement>
            </div>
            <div className="relative">
              <Input
                {...register("expiryDate")}
                placeholder="Expiry Date"
                className="min-w-full"
              />
              <HoverInfoElement
                shouldHover={errors.expiryDate ? true : false}
                side="right"
                hoverContentStyle="md:absolute md:bottom-0 md:left-44 md:w-56"
                hoverContent={errors.expiryDate?.message}
              >
                {errors.expiryDate ? (
                  <Info className="absolute right-2 top-2 text-primary" />
                ) : null}
              </HoverInfoElement>
            </div>
            <div className="relative">
              <Input
                {...register("cvv")}
                placeholder="CVV"
                className="min-w-full"
              />
              <HoverInfoElement
                shouldHover={errors.cvv ? true : false}
                side="right"
                hoverContentStyle="md:absolute md:bottom-0 md:left-44 md:w-56"
                hoverContent={errors.cvv?.message}
              >
                {errors.cvv ? (
                  <Info className="absolute right-2 top-2 text-primary" />
                ) : null}
              </HoverInfoElement>
            </div>
            <Button disabled={totalItems === 0} type="submit">
              Submit
            </Button>
          </form>
        </div>
      )}
    </>
  );
};

export default CreditCardForm;
