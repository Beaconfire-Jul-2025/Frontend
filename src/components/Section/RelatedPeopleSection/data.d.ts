import type { RelatedPerson } from '@/components/Information/RelatedPersonDisplay/data.d';

export interface RelatedPeopleSectionProps {
  people?: RelatedPerson[];
  loading?: boolean;
  editable?: boolean;
  onEdit?: () => void;
  onSave?: (people: RelatedPerson[]) => Promise<void>;
  onCancel?: () => void;
  title?: string;
}

export interface RelatedPeopleFormData {
  people: RelatedPerson[];
}
