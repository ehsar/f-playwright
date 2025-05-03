import fs from 'fs';
import path from 'path';

type Step = { testKey: string; steps: { action: string; expectedResult: string }[] };

const STORAGE_FILE = path.resolve('tmp-step-store.json');

export class StepCollector {
    private static collected: Step[] = [];

    static add(testKey: string, steps: { action: string; expectedResult: string }[]) {
        this.collected.push({ testKey, steps });
        this.saveToFile(); // Simpan langsung ke file setelah update
    }

    static getAll(): Step[] {
        // Load dari file
        if (fs.existsSync(STORAGE_FILE)) {
        const raw = fs.readFileSync(STORAGE_FILE, 'utf-8');
        this.collected = JSON.parse(raw);
        }
        return this.collected;
    }

    private static saveToFile() {
        fs.writeFileSync(STORAGE_FILE, JSON.stringify(this.collected, null, 2));
    }
}
