import * as fs from 'fs';
import * as readline from 'readline';
import { ILogParser } from '../interfaces/ILogParser';
import { KillData } from '../entities/KillData';
import { MeansOfDeath } from '../entities/MeansofDeath';

export class LogFileReader implements ILogParser {
  async parse(logFilePath: string): Promise<Record<string, KillData>> {
    const games: Record<string, KillData> = {};
    let currentGame: KillData | null = null;
    let gameNumber: number = 0;

    const fileStream = fs.createReadStream(logFilePath);
    const rl = readline.createInterface({
      input: fileStream,
      crlfDelay: Infinity
    });

    for await (const line of rl) {
      if (line.includes('InitGame')) {
        if (currentGame) {
          games[`game_${gameNumber}`] = currentGame;
        }
        currentGame = {
          totalKills: 0,
          players: new Set<string>(),
          kills: {},
          killsByMeans: {},
        };
        gameNumber++;
      } else if (line.includes('Kill:')) {
        this.processKill(line, currentGame!);
      }
    }

    if (currentGame) {
      games[`game_${gameNumber}`] = currentGame;
    }

    return games;
  }

  private processKill(line: string, game: KillData): void {
    const killRegexp = /Kill: \d+ \d+ \d+: (.+) killed (.+) by (.+)/;
    const matches: RegExpExecArray | null = killRegexp.exec(line);

    if (matches && matches.length === 4) {
      const killerName: string = matches[1];
      const victimName: string = matches[2];
      const meansOfDeath = matches[3] as keyof typeof MeansOfDeath;

      game.totalKills += 1;

      const worldPlayer: string = '<world>';

      // Populate players, even if they never get a kill
      if (victimName !== worldPlayer) {
        game.players.add(victimName);
      }

      // What should happen in case of suicide? i.e killerName == victimName. It is a + 1 - 1?

      // When player dies by other player rather than world, does it lose points?
      if (killerName !== worldPlayer) {
        game.players.add(killerName);
        game.kills[killerName] = (game.kills[killerName] || 0) + 1;
      } else {
        game.kills[victimName] = (game.kills[victimName] || 0) - 1;
      }

      game.killsByMeans[meansOfDeath] = (game.killsByMeans[meansOfDeath] || 0) + 1;
    }
  }
}
