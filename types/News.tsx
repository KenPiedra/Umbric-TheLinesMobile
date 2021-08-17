export type NewsItemData = {
  Title: string;
  Author: string;
  AuthorLink?: string;
  Thumb: string;
  Categories: Array<string>;
  PostedAtIso: string;
  DetailLink: string;
};
export type NewCategoriesData = {
  Id: string;
  Name: string;
};
