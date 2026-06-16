export type Difficulty = 'Easy' | 'Medium' | 'Hard';

export interface CardData {
  id: string;
  content: string;
  type: 'concept' | 'characteristic';
  pairId: number;
  topic: string;
  explanation: string;
  difficulty: Difficulty;
}

export interface GameState {
  cards: CardData[];
  flippedIndices: number[];
  matchedPairIds: number[];
  moves: number;
  score: number;
  difficulty: Difficulty;
  isWon: boolean;
  showExplanation: CardData | null;
  streak: number;
}
