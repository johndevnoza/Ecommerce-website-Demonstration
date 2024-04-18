declare type ProductData = {
  created_at?: string;
  id: string;
  category_name?: string;
  description?: string;
  image?: string;
  price?: number | biginit;
  salePrice?: null;
  title?: string;
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
};
declare type CartProduct = {
  cartProduct: {
    category_name: string;
    created_at: string;
    description: string;
    id: string;
    image: string;
    price: number | biginit;
    salePrice: null;
    title: string;
    updated_at: string;
  };
  count: number ;
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
    // category?: {
    //   created_at: string;
    //   id: string;
    //   name: string;
    //   updated_at: string;
    // };
    category_name: string;
    created_at: string;
    description: string;
    id: string;
    image: string;
    price: number | biginit;
    salePrice: null;
    title: string;
    updated_at: string;
  };
  count: number ;
  created_at: string;
  id: string;
  product_id?: string;
  updated_at?: string;
  user_id?: string;
  onClick?: (event: React.MouseEvent) => void;
  imageStyle?: string;
  link?: string;
};
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
