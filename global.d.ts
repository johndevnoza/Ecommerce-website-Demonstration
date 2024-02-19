declare type ProductData = {
  title: string;
  price?: number | biginit;
  description?: string;
  image?: string;
  category?: string;
  id?: number;
};
declare type CardProps = {
  title: string;
  price?: number | biginit;
  description?: string;
  image?: string;
  category?: string;
  id?: number;
  className?: string;
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
