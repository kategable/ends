import { Category } from './calculation';
export interface SourceProduct {
  taxable: boolean;
  _createdAt: string;
  _id: string;
  sku: string;
  categories?: Category[];
  title: string;
  vendor: string;
  clientId: string;
  retailPrice: number;
  wholesalePrice: number;
  fluidWeight: number;
}
