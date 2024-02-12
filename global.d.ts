declare type ProductData = {
  title: string;
  price?: number | biginit;
  description?: string;
  image?: string;
  category?: string;
  id?: number;
};

declare interface linkProps {
  title: string;
  path: string;
}

declare type CategoriesProps = {
  name: string;
  id: string;
};
