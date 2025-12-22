export type Application = {
  applicationId: number;
  status: string;
  submittedAt: string;
  applicant: {
    firstName: string;
    lastName: string;
    email: string;
  };
};
