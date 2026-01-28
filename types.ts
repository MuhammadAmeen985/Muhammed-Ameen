
export enum LogoStyle {
  MINIMAL = 'Minimal',
  CLASSIC = 'Classic',
  CALENDAR = 'Calendar',
  TECH_FIBER = 'Tech Fiber',
  ABSTRACT = 'Abstract'
}

export interface GeneratedLogo {
  id: string;
  style: LogoStyle;
  imageUrl: string;
  prompt: string;
  timestamp: number;
}

export interface LogoStyleConfig {
  name: LogoStyle;
  description: string;
  promptSuffix: string;
  icon: string;
}
