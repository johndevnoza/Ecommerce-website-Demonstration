declare type ProductData = {
  title: string;
  price?: number | biginit;
  description?: string;
  image?: string;
  category?: string;
  id?: number;
  imageStyle?: string;
};
declare type CardProps = {
  title?: string;
  price?: number | biginit;
  description?: string;
  image?: string;
  category?: string;
  id?: number;
  className?: string;
  created_at?: string;
  updated_at?: string;
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
