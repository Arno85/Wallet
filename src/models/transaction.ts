export interface Transaction {
  id: string;
  description: string;
  categoryId: string;
  date: Date;
  amount: number;
}
