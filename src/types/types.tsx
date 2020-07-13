export type UserType = {
  ID: string;
  Branch: string;
  GUID: string;
  ArabicDescription: string;
  EnglishDescription: string;
  UserName: string;
  Deleted: string;
};

export type AppDataType = {
  Banners: [{ Image: string; Name: string; Id: number }];
  ContactUs: {
    Activity: string;
    Address: string;
    Description: string;
    Email: string;
    Name: string;
    Fax: string;
    Phone: string;
  };
  HowItWork: string;
  Privacy: string;
  TermAndConditions: string;
};
