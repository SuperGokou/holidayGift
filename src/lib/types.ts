export interface YearData {
  year: number;
  greeting: string;
  message: string;
  videoUrl: string;
  accent: string;
}

export interface YearsConfig {
  years: YearData[];
  fallback: Omit<YearData, "year">;
}
