export type SportBookItemType = {
  _id: number;
  SportsDataId: number;
  Sportsbook: string;
  list_offer: boolean;
  nice_name: string;
  affiliate_link?: string;
  review_link?: string;
  logo?: string;
  bonus_text?: string;
  sortId?: number;
};
