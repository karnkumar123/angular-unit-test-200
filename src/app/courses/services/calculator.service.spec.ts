import { CalculatorService } from "./calculator.service";
import { LoggerService } from "./logger.service";

describe('calculator service', () => {
    it('function : add', () => {
        const logger = jasmine.createSpyObj('LoggerService', ['log']);
        const calculatorService = new CalculatorService(logger);
        const number1 = 10,
              number2 = 20;

        logger.log.and.returnValue('The sum of two numbers is:');

        expect(calculatorService.add(number1, number2)).toBe('The sum of two numbers is:'+(number1+number2));
        expect(logger.log).toHaveBeenCalledTimes(1);
    })

    // it('function : subtract', () => {
    //     const calculatorService = new CalculatorService(new LoggerService());
    //     const number1 = 10,
    //           number2 = 20;

    //     expect(calculatorService.subtract(number1, number2)).toBe(number1-number2, 'subtract function failed');
    // })
})