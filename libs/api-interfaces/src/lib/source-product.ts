export interface SourceProduct {
  isTaxable: boolean;
  _createdAt: string;
  _id: string;
  SKU: string;
  categories?: string[];
  title: string;
  vendor: string;
  clientId: string;
  retailPrice: number;
  wholesalePrice: number;
  fluidWeight: number;
}
