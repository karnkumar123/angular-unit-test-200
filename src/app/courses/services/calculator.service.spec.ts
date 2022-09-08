import { TestBed } from "@angular/core/testing";
import { CalculatorService } from "./calculator.service";
import { LoggerService } from "./logger.service";


xdescribe('calculator service', () => {
    let calculatorService: CalculatorService;
    let loggerSpy: any;

    beforeEach(() => {
        loggerSpy = jasmine.createSpyObj('LoggerService', ['log']);
        TestBed.configureTestingModule({
            providers: [
                CalculatorService,
                {provide: LoggerService, useValue: loggerSpy}
            ]
        })
        calculatorService = TestBed.inject(CalculatorService);
    })

    it('function : add', () => {
        const number1 = 10, number2 = 20;
        loggerSpy.log.and.returnValue('The sum of two numbers is:');
        expect(calculatorService.add(number1, number2)).toBe('The sum of two numbers is:'+(number1 + number2));
        expect(loggerSpy.log).toHaveBeenCalledTimes(1);
    })

    it('function : subtract', () => {
        const number1 = 10, number2 = 20;
        loggerSpy.log.and.returnValue('The subtract of two numbers is:');
        expect(calculatorService.subtract(number1, number2)).toBe('The subtract of two numbers is:'+(number1 - number2));
        expect(loggerSpy.log).toHaveBeenCalledTimes(1);
    })
})