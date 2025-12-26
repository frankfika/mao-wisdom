export interface WisdomResult {
  keyword: string;        // 2个字的核心词
  quote: string;          // 毛选引用
  source: string;         // 出处
  advice: string;         // 一句话建议
  encouragement: string;  // 鼓励的话
}

export enum AppState {
  IDLE = 'IDLE',
  LOADING = 'LOADING',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR'
}
