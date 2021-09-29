export type SportBook = {
  SportsbookID: number;
  SportsbookName: string;
  PayoutAmerican: number;
  Value: number | null;
};

export type BettingOutcome = {
  BettingOutcomeID: number;
  BettingMarketID: number;
  BettingOutcomeTypeID: number | null;
  BettingOutcomeType: string | null;
  PayoutAmerican: number;
  PayoutDecimal: number;
  Value: string | number | null;
  Participant: string;
  IsAvailable: boolean;
  IsAlternate: boolean;
  Created: string;
  Updated: string;
  Unlisted: string | number | null;
  TeamID: number;
  PlayerID: number;
  GlobalTeamID: null | number;
  SportsbookUrl: null | string;
  SportsBooks: SportBook[];
  SportsBook?: { Name: string; SportsbookID: number };
};

export type BettingMarket = {
  BettingMarketID: number;
  BettingEventID: number;
  BettingMarketTypeID: number;
  BettingMarketType: string;
  BettingBetTypeID: number;
  BettingBetType: string;
  BettingPeriodTypeID: number;
  BettingPeriodType: string;
  Name: string | null;
  TeamID: string | null;
  TeamKey: string | null;
  PlayerID: number | null;
  PlayerName: string | null;
  Created: string;
  Updated: string;
  AnyBetsAvailable: boolean;
  AvailableSportsbooks: Array<SportBook>;
  BettingOutcomes: Array<BettingOutcome>;
  ConsensusOutcomes: string | number | null;
  Season: number;
};
