import { calculationTypesUrl, executeCalculationUrl } from '../lib/constants'

export async function GetCalculationTypes () {
    const response = await fetch(calculationTypesUrl);
    const data = await response.json();
    return data;
}

export async function Calculate(calculationType, operandA, operandB) {
    const response = await fetch(`${executeCalculationUrl}?type=${calculationType}&operandA=${operandA}&operandB=${operandB}`);
    const data = await response.json();
    return data
}