export enum AppStatus {
  IDLE = 'IDLE',
  ANALYZING = 'ANALYZING',
  GENERATING = 'GENERATING',
  COMPLETED = 'COMPLETED',
  ERROR = 'ERROR'
}

export interface GenerationConfig {
  mood: string;
  accessory: string;
}

export interface GeneratedResult {
  imageUrl: string;
  promptUsed: string;
}
