import type { Address } from '@/components/Information/AddressDisplay/data.d';

export interface RelatedPerson {
  firstName: string;
  lastName: string;
  middleName?: string;
  cellPhone?: string;
  alternatePhone?: string;
  phone?: string;
  email?: string;
  relationship: string;
  address?: Address;
}
