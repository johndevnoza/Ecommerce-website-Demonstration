import { z } from "zod";
import { Info } from "lucide-react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import HoverInfoElement from "../ui/HoverInfoElement.tsx";
import { authAxios } from "../../services/baseURLAxios.ts";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchCarts } from "@/services/useCartsQuery.tsx";
import Cards from "react-credit-cards-2";
import { CARTS_QUERY } from "@/utils/constants.tsx";
const creditCardSchema = z.object({
  cardNumber: z.string(),
  cvv: z.string().regex(/^\d{3,4}$/, "CVV must be 3 or 4 digits"),
  holderName: z.string().min(2, "Holder name must be at least 2 characters"),
  expiryDate: z
    .string()
    .min(6, "Date cant be less than 6 digits")
    .max(8, "Date cant be greater than 8 digits"),
  // .regex(/^(0[1-9]|1[0-2])\/\d{2}$/, "Expiry date must be in MM/YY format"),
});

type FormFields = z.infer<typeof creditCardSchema>;

const CreditCardForm = ({
  product_id,
  totalPrice,
  totalItems,
}: PaymentProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<FormFields>({
    resolver: zodResolver(creditCardSchema),
  });
  const queryClient = useQueryClient();
  // const { data: cartProduct } = useQuery({
  //   queryKey: ["cart"],
  //   queryFn: fetchCarts,
  // });
  // const isAdded = cartProduct
  //   ? cartProduct.find((item) => item.product_id)
  //   : null;
  const watchFields = watch(["cardNumber", "cvv", "holderName", "expiryDate"]);
  const onSubmit: SubmitHandler<FormFields> = () => {
    const ACCESS_TOKEN = localStorage.getItem("accessToken");
    const requestBody: PaymentProps = {
      product_id: product_id,
      totalPrice: totalPrice,
      totalItems: totalItems,
    };
    authAxios
      .post(`purchases`, requestBody, {
        headers: {
          Authorization: `Bearer ${ACCESS_TOKEN}`,
        },
      })
      .then((response) => {
        if (response) {
          queryClient.refetchQueries({ queryKey: [CARTS_QUERY] });
        }
      });
  };

  return (
    <>
      <div className="flex md:flex-col w-full justify-between gap-2">
        <div className="bg-orange-400 rounded-md flex-grow-1 md:w-auto">
          <p>Card Number: {watchFields[0]}</p>
          <p>Holder Name: {watchFields[2]}</p>
          <p>Expiry Date: {watchFields[3]}</p>
          <p>CVV: {watchFields[1]}</p>
        </div>

        {/* <div>
          <Cards
            number={watchFields[0]}
            expiry={watchFields[3]}
            cvc={watchFields[1]}
            name={watchFields[2]}
          />
        </div> */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex gap-2 flex-col w-max min-h-full"
        >
          <div className="relative">
            <Input
              {...register("holderName")}
              placeholder="Card Holder Name"
              className="min-w-full placeholder-red-500 "
            />
            <HoverInfoElement
              shouldHover={errors.holderName ? true : false}
              side="right"
              hoverContentStyle="md:absolute md:bottom-0 md:left-44 md:w-56"
              hoverContent={errors.holderName?.message}
            >
              {errors.holderName ? (
                <Info className="text-primary absolute right-2 top-2" />
              ) : null}
            </HoverInfoElement>
          </div>
          <div className="relative">
            <Input
              {...register("cardNumber")}
              placeholder="Card Number"
              className="min-w-full"
            />
            <HoverInfoElement
              shouldHover={errors.cardNumber ? true : false}
              side="right"
              hoverContentStyle="md:absolute md:bottom-0 md:left-44 md:w-56"
              hoverContent={errors.cardNumber?.message}
            >
              {errors.cardNumber ? (
                <Info className="text-primary absolute right-2 top-2" />
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
                <Info className="text-primary absolute right-2 top-2" />
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
                <Info className="text-primary absolute right-2 top-2" />
              ) : null}
            </HoverInfoElement>
          </div>
          <Button type="submit">Submit</Button>
        </form>
      </div>
    </>
  );
};

export default CreditCardForm;
