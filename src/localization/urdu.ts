//Uncomment this line on creating a translation file
import { surveyLocalization } from "../surveyStrings";

export var urduStrings = {
  pagePrevText: "Previous",
  pageNextText: "Next",
  completeText: "Complete",
  previewText: "Preview",
  editText: "Edit",
  startSurveyText: "Start",
  otherItemText: "Other (describe)",
  noneItemText: "None",
  selectAllItemText: "Select All",
  progressText: "Page {0} of {1}",
  panelDynamicProgressText: "Record {0} of {1}",
  questionsProgressText: "Answered {0}/{1} questions",
  emptySurvey: "There is no visible page or question in the survey.",
  completingSurvey: "Thank you for completing the survey!",
  completingSurveyBefore:
    "Our records show that you have already completed this survey.",
  loadingSurvey: "Loading Survey...",
  optionsCaption: "Choose...",
  value: "value",
  requiredError: "Please answer the question.",
  requiredErrorInPanel: "Please answer at least one question.",
  requiredInAllRowsError: "Please answer questions in all rows.",
  numericError: "The value should be numeric.",
  minError: "The value should not be less than {0}",
  maxError: "The value should not be greater than {0}",
  textMinLength: "Please enter at least {0} character(s).",
  textMaxLength: "Please enter no more than {0} character(s).",
  textMinMaxLength:
    "Please enter at least {0} and no more than {1} characters.",
  minRowCountError: "Please fill in at least {0} row(s).",
  minSelectError: "Please select at least {0} variant(s).",
  maxSelectError: "Please select no more than {0} variant(s).",
  numericMinMax: "The '{0}' should be at least {1} and at most {2}",
  numericMin: "The '{0}' should be at least {1}",
  numericMax: "The '{0}' should be at most {1}",
  invalidEmail: "Please enter a valid e-mail address.",
  invalidExpression: "The expression: {0} should return 'true'.",
  urlRequestError: "The request returned error '{0}'. {1}",
  urlGetChoicesError:
    "The request returned empty data or the 'path' property is incorrect",
  exceedMaxSize: "The file size should not exceed {0}.",
  otherRequiredError: "Please enter the other value.",
  uploadingFile:
    "Your file is uploading. Please wait several seconds and try again.",
  loadingFile: "Loading...",
  chooseFile: "Choose file(s)...",
  noFileChosen: "No file chosen",
  fileDragAreaPlaceholder: "Drop a file here or click the button below to load the file.",
  confirmDelete: "Do you want to delete the record?",
  keyDuplicationError: "This value should be unique.",
  addColumn: "Add column",
  addRow: "Add row",
  removeRow: "Remove",
  emptyRowsText: "There are no rows.",
  addPanel: "Add new",
  removePanel: "Remove",
  choices_Item: "item",
  matrix_column: "Column",
  matrix_row: "Row",
  multipletext_itemname: "text",
  savingData: "The results are being saved on the server...",
  savingDataError: "An error occurred and we could not save the results.",
  savingDataSuccess: "The results were saved successfully!",
  saveAgainButton: "Try again",
  timerMin: "min",
  timerSec: "sec",
  timerSpentAll: "You have spent {0} on this page and {1} in total.",
  timerSpentPage: "You have spent {0} on this page.",
  timerSpentSurvey: "You have spent {0} in total.",
  timerLimitAll:
    "You have spent {0} of {1} on this page and {2} of {3} in total.",
  timerLimitPage: "You have spent {0} of {1} on this page.",
  timerLimitSurvey: "You have spent {0} of {1} in total.",
  cleanCaption: "Clean",
  clearCaption: "Clear",
  signaturePlaceHolder: "Sign here",
  chooseFileCaption: "Choose file",
  removeFileCaption: "Remove this file",
  booleanCheckedLabel: "Yes",
  booleanUncheckedLabel: "No",
  confirmRemoveFile: "Are you sure that you want to remove this file: {0}?",
  confirmRemoveAllFiles: "Are you sure that you want to remove all files?",
  questionTitlePatternText: "Question Title",
  modalCancelButtonText: "Cancel",
  modalApplyButtonText: "Apply",
};

//Uncomment these two lines on creating a translation file. You should replace "en" and enStrings with your locale ("fr", "de" and so on) and your variable.
surveyLocalization.locales["ur"] = urduStrings;
surveyLocalization.localeNames["ur"] = "Urdu";
