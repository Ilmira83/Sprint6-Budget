export interface Budget {
  title: string;
  description: string;
  price: number;
}

export interface savedBudget{
  name: string;
  email: string;
  phone: string;
  service: string[];
  price: number[]
}
