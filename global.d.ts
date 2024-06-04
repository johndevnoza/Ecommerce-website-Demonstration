declare type ProductData = {
  created_at?: string;
  id: string;
  category_name?: string;
  description?: string;
  image?: string;
  price?: number | bigint;
  salePrice?: null | number;
  title: string;
  updated_at?: string;
  onClick?: (event: React.MouseEvent) => void;
  isInCart?: boolean | null;
  isInFavorites?: boolean | null;
  imageStyle?: string;
  link?: string;
  secondId: string;
  showElement?: boolean;
  likedProduct?: LikedProduct;
  cartProduct?: CartProduct;
  className?: string;
  count?: number;
  isPageShopping?: boolean;
  isPageFavorites?: boolean;
  removeCartItem?: boolean;
  isLoading?: boolean;
  total: number | null;
};

declare type CartProduct = {
  cartProduct: {
    category_name: string;
    created_at: string;
    description: string;
    id: string;
    image: string;
    price: number | bigint;
    salePrice: null;
    title: string;
    updated_at: string;
  };
  count: number;
  created_at: string;
  id: string;
  product_id?: string;
  updated_at?: string;
  user_id?: string;
  onClick?: (event: React.MouseEvent) => void;
  imageStyle?: string;
  link?: string;
};

declare type LikedProduct = {
  cartProduct: CartProduct;
  likedProduct: {
    category_name: string;
    created_at: string;
    description: string;
    id: string;
    image: string;
    price: number | bigint;
    salePrice: null;
    title: string;
    updated_at: string;
  };
  count: number;
  created_at: string;
  id: string;
  product_id?: string;
  updated_at?: string;
  user_id?: string;
  onClick?: (event: React.MouseEvent) => void;
  imageStyle?: string;
  link?: string;
};

declare type ProductDataUnion = ProductData | LikedProduct | CartProduct;

declare type CardProps = {
  title?: string;
  price?: number | biginit;
  description?: string;
  image?: string;
  category_name?: string;
  id?: number;
  className?: string;
  created_at?: string;
  updated_at?: string;
  item?: CardProps | null;
  onClick?: (event: React.MouseEvent) => void;
  imageStyle?: string;
  link?: string;
  product_id?: string;
};
declare type User = {
  first_name?: string;
  last_name?: string;
  email?: string;
  password?: string;
  phone_number?: number | string;
  accessToken?: string;
  refresh_token?: string;
  id?: string;
  verified?: boolean;
  role?: string;
};

declare type PaymentProps = {
  product_id: string | undefined;
  totalPrice: number;
  totalItems: number;
};
declare interface linkProps {
  title: string;
  path: string;
}

declare type CategoriesProps = {
  name: string;
  id: string;
};
declare type UserProps = {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  phone_number: number;
};
declare type requestPost = {
  product_id: string;
};
declare type LoginProps = {
  email?: string;
  password?: string;
  accessToken?: string;
};
