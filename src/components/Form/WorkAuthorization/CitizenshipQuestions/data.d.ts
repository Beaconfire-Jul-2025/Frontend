// Types for CitizenshipQuestions
export interface CitizenshipQuestionsData {
  workAuthorization: {
    isUsCitizen: boolean;
    greenCardHolder: boolean;
    type: string;
    startDate: string | null;
    endDate: string | null;
    lastModificationDate: string;
  };
}
