import { MeansOfDeath } from "./MeansofDeath";
export interface KillData {
  totalKills: number;
  players: Set<string>;
  kills: Record<string, number>;
  killsByMeans: Partial<Record<MeansOfDeath, number>>;
}