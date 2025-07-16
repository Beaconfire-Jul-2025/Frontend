import type {Address} from '@/components/Information/AddressDisplay/data.d';

export interface AddressFormData {
  addresses: Address[];
}

export interface AddressSectionProps {
  addresses?: Address[];
  loading?: boolean;
  editable?: boolean;
  onEdit?: () => void;
  onSave?: (addresses: Address[]) => Promise<void>;
  onCancel?: () => void;
}
