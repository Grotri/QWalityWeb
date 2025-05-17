export enum EErrors {
  required = "requiredField",
  email = "invalidEmail",
  password = "passwordMinLength",
  inn = "innInvalidLength",
  link = "invalidLink",
  fields = "fillFormFirst",
  noChanges = "noDataChanged",
  chooseDates = "selectBothDates",
  timeDates = "startDateAfterEndDate",
  futureDate = "dateInFutureNotAllowed",
}
