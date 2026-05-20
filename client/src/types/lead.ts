export type Lead = {
  _id: string;
  name: string;
  email: string;
  status: string;
  source: string;
  createdAt: string;
  createdBy?: {
    name: string;
    email: string;
    role: string;
  };
};
