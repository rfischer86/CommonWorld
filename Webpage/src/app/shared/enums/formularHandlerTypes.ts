

export enum FormularHandlerTypes {
  replaceSubFormular = 'replaceSubFormular',
  replaceFormElement = 'replaceFormElement',
  addSubFormular = 'addSubFormular',
  deleteSubFormular = 'deleteSubFormular',
  deleteAllSubFormular = 'deleteAllSubFormular',
  addFormElement = 'addFormElement',
  deleteFormElement = 'deleteFormElement',
  createOrReplaceSubFormular = 'createOrReplaceSubFormular',
  createOrReplaceFormElement = 'createOrReplaceFormElement'
}

export enum RelationTypes {
  equal = 'equal',
  notEqual = 'notEqual',
  valueInList ='valueInList',
  valueNotInList = 'valueNotInList',
  valueSmallerAs ='valueSmallerAs',
  valueGreaterAs = 'valueGreaterAs'
}