type TestStep = {
    action: string;
    expectedResult: string;
};
  
export class StepLogger {
    private steps: TestStep[] = [];
  
    addStep(action: string, expectedResult: string) {
        this.steps.push({ action, expectedResult });
        console.log(`Step: ${action} => Expected: ${expectedResult}`);
    }
  
    getSteps() {
        return this.steps;
    }
}