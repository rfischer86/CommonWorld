// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  apiURL: 'http://localhost:5000/api/',
  authURL: 'http://localhost:4000/',
  api: {
    nav: 'nav',
    groupNav: 'nav/group',
    accordion: 'accordion',
    accordionGetOrCreate: 'accordion/getOrCreate',
    formulars: 'content/formulars',
    formularSearch: 'content/formulars/search',
    table:'content/table',
    content: {
      text: 'content/text',
      form: 'content/form'
    },
    search: '/search'
  },
  auth: {
    authenticate: 'authenticate',
    users: 'users',
    roles: 'roles',
    groups: 'groups',
    groupsSearch: 'groups/search',
    groupRoleLink: 'groupRoleLink',
    groupUserLink: 'groupUserLink',
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
