export interface Calculation {
  _createdAt: string;
  _id: string;
  _rev: string;
  _type: string;
  _updatedAt: string;
  catergories: string[];
  city: string;
  county: string;
  fluidRate: number,
  hasFluidRate: boolean,
  hasRetailRate: boolean,
  hasTax: boolean;
  hasWholesaleRate: boolean;
  retailRate: number,
  state: string;
  wholesaleRate: number;
}
