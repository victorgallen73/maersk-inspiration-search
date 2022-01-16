// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import { common } from "./common";

export const environment = {
  ... common,
  production: false,
  isDebugMode: true,
  apiURL: 'https://test.api.amadeus.com/v1',
  AMADEUS_CLIENT_ID: 'Cu21DJB12RIzr6wCDDUMM6KtpCNNkMyS',
  AMADEUS_CLIENT_SECRET: '3XldjzHAmRp0pt3n'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
