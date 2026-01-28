
import { LogoStyle, LogoStyleConfig } from './types';

export const LOGO_STYLES: LogoStyleConfig[] = [
  {
    name: LogoStyle.MINIMAL,
    description: "Clean, geometric, and modern. Focuses on essential shapes.",
    promptSuffix: "A minimal, clean professional app logo for 'Fibrecon'. Vector style, flat design, simple geometric shape incorporating the letter F. High contrast, solid colors, white background, no text.",
    icon: "M4 6h16M4 12h8m-8 6h16"
  },
  {
    name: LogoStyle.CLASSIC,
    description: "Timeless, elegant, and authoritative with traditional framing.",
    promptSuffix: "A classic, elegant professional logo for 'Fibrecon'. Sophisticated emblem style, symmetrical frame, timeless design, centered icon. High resolution, professional color palette, white background, no text.",
    icon: "M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"
  },
  {
    name: LogoStyle.CALENDAR,
    description: "Clearly visualizes scheduling and date management functionality.",
    promptSuffix: "An app icon for 'Fibrecon' that clearly incorporates a calendar symbol. Modern UI style, crisp edges, clean lines. Suggesting organization and time management. Professional blue and white theme, white background, no text.",
    icon: "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
  },
  {
    name: LogoStyle.TECH_FIBER,
    description: "High-tech look inspired by fiber optics and connectivity.",
    promptSuffix: "A futuristic tech logo for 'Fibrecon'. Inspired by fiber optics, glowing neon filaments, dynamic curves, high speed connectivity. Premium aesthetic, dark shadows but bright icon, white background, no text.",
    icon: "M13 10V3L4 14h7v7l9-11h-7z"
  },
  {
    name: LogoStyle.ABSTRACT,
    description: "Creative and artistic interpretation of the brand identity.",
    promptSuffix: "An abstract creative logo for 'Fibrecon'. Organic flowing shapes representing connection and data flow. Modern artistic style, vibrant gradients, unique silhouette. White background, no text.",
    icon: "M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707"
  }
];
