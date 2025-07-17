import type { RelatedPerson } from '@/components/Information/RelatedPersonDisplay/data.d';

export interface RelatedPeopleDisplayProps {
  people: RelatedPerson[];
  title?: string;
}
