export type Product = {
  title: string;
  price: string;
  category: string;
  description: string;
  options: string | string[];
};

export type CartProduct = {
  id: string;
  image: string;
  title: string;
  price: string;
  option: string;
  quantity: number;
};
