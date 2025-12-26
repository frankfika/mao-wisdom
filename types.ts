export interface CardWisdom {
  title: string;          // e.g., "Current Situation", "Strategic View", "Immediate Action"
  keyword: string;        // 2 characters for visual impact, e.g. "矛盾", "星星", "实事"
  quote: string;          // The Mao quote
  source: string;         // Source book/article
  interpretation: string; // Brief specific advice for this card
}

export interface SpreadData {
  cards: CardWisdom[];    // Array of 3 cards
  overallAdvice: string;  // A final summary synthesis
}

export enum AppState {
  IDLE = 'IDLE',
  LOADING = 'LOADING',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR'
}