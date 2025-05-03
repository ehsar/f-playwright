import fs from 'fs';
import path from 'path';
import { StepCollector } from '../utils/stepCollector';

const outPath = path.resolve('xray-all-export.json');

// Bersihkan file sebelum generate ulang
fs.writeFileSync(outPath, '[]');

const collected = StepCollector.getAll();

const output = collected.map(test => ({
    testKey: test.testKey,
    steps: test.steps.map((s, i) => ({
        step: i + 1,
        action: s.action,
        result: s.expectedResult,
    })),
}));

fs.writeFileSync(outPath, JSON.stringify(output, null, 2));
console.log(`✅ Exported ${output.length} test(s) to ${outPath}`);
