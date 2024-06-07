import {
  ArrowBigDownDash,
  ArrowBigUpDash,
  FolderHeart,
  Loader,
  ShoppingCart,
  X,
} from "lucide-react";
interface DisplayFavoriteButtonProps {
  isPageShopping?: boolean | null;
  isLoading?: boolean | null;
  isInFavorites?: boolean | null;
  isPageFavorites?: boolean | null;
}
export const DisplayFavoriteButton: React.FC<DisplayFavoriteButtonProps> = ({
  isPageShopping = false,
  isLoading = false,
  isInFavorites = false,
  isPageFavorites = false,
}) => {
  return (
    <div>
      {isPageShopping ? (
        <ArrowBigUpDash />
      ) : isInFavorites ? (
        <FolderHeart className="animate-bounce" />
      ) : isPageFavorites ? (
        <X className="max-[840px]:text-" />
      ) : isLoading ? (
        <Loader className="animate-spin" />
      ) : (
        <FolderHeart />
      )}
    </div>
  );
};
interface DisplayCartButtonProps {
  isInCart?: boolean | null;
  isPageShopping?: boolean | null;
  isLoading?: boolean | null;
}

export const DisplayCartButton: React.FC<DisplayCartButtonProps> = ({
  isInCart = false,
  isPageShopping = false,
  isLoading = false,
}) => {
  return (
    <div>
      {isInCart ? (
        <ShoppingCart className="animate-pulse" />
      ) : isPageShopping ? (
        <ArrowBigDownDash />
      ) : isLoading ? (
        <Loader className="animate-spin" />
      ) : (
        <ShoppingCart />
      )}
    </div>
  );
};
