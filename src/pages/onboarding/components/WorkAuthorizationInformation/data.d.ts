export interface WorkAuthorizationData {
  isUsCitizen: boolean;
  greenCardHolder: boolean;
  type: string;
  startDate: string | null;
  endDate: string | null;
  lastModificationDate: string;
  nonCitizenData?: import('@/components/Form/WorkAuthorization/WorkAuthorizationNonCitizen/data.d').WorkAuthorizationNonCitizenData;
}
