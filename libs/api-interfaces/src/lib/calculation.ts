export interface Calculation {
  _createdAt: string;
  _id: string;
  _rev: string;
  _type: string;
  _updatedAt: string;
  hasTax: boolean;
  hasWholesaleRate: boolean;
  wholesaleRate: number;
  hasRetailRate: boolean,
  retailRate: number,
  hasFluidRate: boolean,
  fluidRate: number,
  state: string;
  county: string;
  city: string;
  endsTaxable: boolean;
}
