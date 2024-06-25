export interface IReportWriter {
  writeReport(report: Record<string, any>, outputFilePath: string): void;
  printReport(report: Record<string, any>): void;
}
