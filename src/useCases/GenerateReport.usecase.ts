import { ILogParser } from '../interfaces/ILogParser';
import { IReportWriter } from '../interfaces/IReporterWriter';

export class GenerateReports {
  constructor(
    private logParser: ILogParser,
    private reportWriter: IReportWriter
  ) {}

  async execute(logFilePath: string, outputFilePath: string): Promise<void> {
    const games = await this.logParser.parse(logFilePath);
    const report = this.generateReportObject(games);
    this.reportWriter.writeReport(report, outputFilePath);
  }

  private generateReportObject(games: Record<string, any>): Record<string, any> {
    const report: Record<string, any> = {};

    for (const [game, data] of Object.entries(games)) {
      report[game] = {
        total_kills: data.totalKills,
        players: Array.from(data.players),
        kills: data.kills,
        kills_by_means: data.killsByMeans,
      };
    }

    return report;
  }
}
