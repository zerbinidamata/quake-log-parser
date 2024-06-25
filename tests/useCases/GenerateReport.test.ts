// tests/GenerateReports.test.ts
import { describe, it, expect, vi } from 'vitest';
import { GenerateReports } from '../../src/useCases/GenerateReport.usecase';
import { LogFileReader } from '../../src/adapters/LogFileReader.adapter';
import { ReportWriter } from '../../src/adapters/ReportWriter.adapter';

describe('GenerateReports', () => {
  it('should generate a report', async () => {
    const logFileReader = new LogFileReader();
    const reportWriter = new ReportWriter();
    const generateReports = new GenerateReports(logFileReader, reportWriter);

    const logFilePath = './qgames.log';
    const outputFilePath = './report-test.json';

    await generateReports.execute(logFilePath, outputFilePath);

    const fs = require('fs');
    const fileExists = fs.existsSync(outputFilePath);
    expect(fileExists).toBe(true);

    const fileContent = fs.readFileSync(outputFilePath, 'utf-8');
    expect(fileContent).not.toBe('');
    const expectedContent = fs.readFileSync('./tests/useCases/expected-report.json', 'utf-8');
    expect(fileContent).toEqual(expectedContent);
  });
});


