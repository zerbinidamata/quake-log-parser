import { LogFileReader } from './adapters/LogFileReader.adapter';
import { ReportWriter } from './adapters/ReportWriter.adapter';
import { GenerateReports } from './useCases/GenerateReport.usecase';

const args = process.argv.slice(2);
const logFilePath = args[0] || './qgames.log';
const outputFilePath = args[1] || './report.json';

const logFileReader = new LogFileReader();
const reportWriter = new ReportWriter();

const generateReports = new GenerateReports(logFileReader, reportWriter);
generateReports.execute(logFilePath, outputFilePath).catch(console.error);