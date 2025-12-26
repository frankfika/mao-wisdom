export interface WisdomResult {
  quote: string;          // 毛选引用
  source: string;         // 出处
  interpretation: string; // 针对用户问题的解读
}

export enum AppState {
  IDLE = 'IDLE',
  LOADING = 'LOADING',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR'
}
