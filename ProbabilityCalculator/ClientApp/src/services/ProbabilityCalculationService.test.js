import { GetCalculationTypes, Calculate } from './ProbabilityCalculationService';
import { calculationTypesUrl, executeCalculationUrl } from '../lib/constants'

describe('ProbabilityCalculationService', () => {
    beforeEach(() => {
        fetch.resetMocks();
    });

    it('GetCalculationTypes', async () => {
        const mockTypes = ['Either', 'CombinedWith'];
        fetch.mockResponseOnce(JSON.stringify(mockTypes));

        const result = await GetCalculationTypes();
        expect(result).toEqual(mockTypes);
        expect(fetch).toHaveBeenCalledWith(calculationTypesUrl);
    });

    it('GetCalculationTypes', async () => {
        const mockResponse = {probability: 0.3};
        fetch.mockResponseOnce(JSON.stringify(mockResponse));
        const type = 'Either';
        const operandA = 0.2;
        const operandB = 0.6;

        const result = await Calculate(type, operandA, operandB);
        expect(result).toEqual(mockResponse);
        const expectedUrl = `${executeCalculationUrl}?type=${type}&operandA=${operandA}&operandB=${operandB}`
        expect(fetch).toHaveBeenCalledWith(expectedUrl);
    });
});