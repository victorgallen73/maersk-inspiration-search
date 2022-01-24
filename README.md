# MaerskInspirationSearch

* This project provides a homework challenge for candidates for Frontend Engineering positions within Maersk. The goal is to see how you approach a problem, how you design, structure, implement, and deliver a solution.

* Source code available on my personal Github: https://github.com/victorgallen73/maersk-inspiration-search

## Prerequisites

* Angular CLI: 13.1.3 (latest)
* Node JS: 16.13.2 (latest)
* Package Manager: npm 8.1.2 (latest)

## Run the application

### From src file

1. Create a new Angular project using Angular CLI with the following command: `ng new {{nameOfProject}}`
2. Run the command `npm i`
3. Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

### From Github

1. Once you have forked the code in your local environment, run the command `npm i`
2. Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

* I haven't had time for testing, but you can ask any questions in a potential future interview.

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Architecture and decisions

* It was decided not to implement a solution following the Redux design pattern as the solution only consisted of a single view and the cost overrun of this architecture was not feasible.
* In a real working environment, there would have been more extensive test coverage, but as I am in several applications, I have not had enough time to do this.

* The MatNativeDateModule had to be used instead of the MatMomentDateModule in order to apply the relevant validations to the date range selector. For this reason, the format of the dates is not shown according to ISO 8601 (although internally the dates are managed with the correct format).

* In the SearcherComponent template, you can uncomment the the list of options that refer to the viewBy parameter of the endpoint. It has been left commented because if we send any value in this parameter, the endpoint returns error 500.

* In FlightInspirationTableComponent, the idea was to use the locations$ observable to map the values coming from the destination field of each of the rows of the table, with the detailedName of the locations$ observable to give us better UX
