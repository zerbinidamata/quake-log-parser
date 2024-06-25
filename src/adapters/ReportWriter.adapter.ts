import * as fs from 'fs';
import { IReportWriter } from '../interfaces/IReporterWriter.d';

export class ReportWriter implements IReportWriter {
  writeReport(report: Record<string, any>, outputFilePath: string): void {
    fs.writeFileSync(outputFilePath, JSON.stringify(report, null, 2), 'utf-8');
  }

  printReport(report: Record<string, any>): void {
    console.log(JSON.stringify(report, null, 2));
  }
}
