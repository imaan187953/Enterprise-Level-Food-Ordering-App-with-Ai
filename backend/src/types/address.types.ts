export interface IAddress {
  user: string;
  label: string;
  fullName: string;
  phone: string;
  addressLine: string;
  city: string;
  state?: string | undefined;
  postalCode?: string | undefined;
  latitude?: number | undefined;
  longitude?: number | undefined;
  isDefault: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateAddressInput {
  label: string;
  fullName: string;
  phone: string;
  addressLine: string;
  city: string;
  state?: string | undefined;
  postalCode?: string | undefined;
  latitude?: number | undefined;
  longitude?: number | undefined;
  isDefault?: boolean | undefined;
}

export interface UpdateAddressInput {
  label?: string | undefined;
  fullName?: string | undefined;
  phone?: string | undefined;
  addressLine?: string | undefined;
  city?: string | undefined;
  state?: string | undefined;
  postalCode?: string | undefined;
  latitude?: number | undefined;
  longitude?: number | undefined;
}

export interface UpdateAddressDefaultInput {
  isDefault: boolean;
}