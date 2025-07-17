export interface RelatedPeopleFormProps {
  disabled?: boolean;
  minPeople?: number;
  maxPeople?: number;
  formInstance?: any;
}

export interface RelatedPerson {
  // You can extend this type as needed
  name?: any;
  contact?: any;
  address?: any;
}
