# Probability Calculator

This application provides a tool for calculating basic probabilities using a selection of calculation types.
The user is able to enter two valid probabilities (0 to 1 e.g. 0.5 is valid, while 1.1 or -0.1 is not) and can choose from the following functions:
1. CombinedWith: P(A)P(B) e.g. 0.5 * 0.5 = 0.25
2. Either: P(A) + P(B) – P(A)P(B) e.g. 0.5 + 0.5 – 0.5*0.5 = 0.75

## Running the application

The application can be run via VS with the `ProbabilityCalculator` project set as the startup project. The UI opens at https://localhost:44461/ by default, but this can be customised in the project settings for the `ProbabilityCalculator` project. 

### Logging
Details about the calculations that are executed, along with any errors encountered when trying to run them, are recorded to an applog which is stored in the ProbabilityCalculator\logs directory.

## Testing the application

### C#
Unit tests are provided to verify the functionality of the server side code and are written using XUnit. These tests can be executed via visual studio or running the following command from the repository root:

`dotnet test ProbabilityCalculator.sln`

### js
The client app is also covered with unit tests which can  be run with this command:
`npm test`
from the ProbabilityCalculator\ClientApp directory