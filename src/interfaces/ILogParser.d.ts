import { KillData } from '../entities/KillData';

export interface ILogParser {
  parse(logFilePath: string): Promise<Record<string, KillData>>;
}
