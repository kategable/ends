export interface SourceProduct {
  isTaxable: any;
  _createdAt: string;
  _id: string;
  SKU: string;
  _rev: string;
  _type: string;
  _updatedAt: string;
  blurb: Blurb;
  body: Body;
  categories?: (CategoriesEntity)[] | null;
  defaultProductVariant: DefaultProductVariant;
  slug: Slug;
  tags?: (string)[] | null;
  title: string;
  vendor: AssetOrVendor;
}
export interface Blurb {
  _type: string;
  en: string;
}
export interface Body {
  _type: string;
  en?: (EnEntity)[] | null;
}
export interface EnEntity {
  _key: string;
  _type: string;
  children?: (ChildrenEntity)[] | null;
  markDefs?: (null)[] | null;
  style: string;
}
export interface ChildrenEntity {
  _key: string;
  _type: string;
  marks?: (null)[] | null;
  text: string;
}
export interface CategoriesEntity {
  _key: string;
  _ref: string;
  _type: string;
}
export interface DefaultProductVariant {
  _type: string;
  barcode: Barcode;
  images?: (ImagesEntity)[] | null;
  retailPrice: number;
  wholesalePrice: number;
  fluidWeight: number;
}
export interface Barcode {
  _type: string;
  barcode: string;
  format: string;
}
export interface ImagesEntity {
  _key: string;
  _type: string;
  asset: AssetOrVendor;
}
export interface AssetOrVendor {
  _ref: string;
  _type: string;
}
export interface Slug {
  _type: string;
  current: string;
}
