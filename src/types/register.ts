export interface Register {
  email: string;
  password: string;
  lastName: string;
  firstName: string;
  isOrganization: boolean;
  organizationName?: string;
}
