export type UserType = {
  ID: string;
  Branch: string;
  GUID: string;
  ArabicDescription: string;
  EnglishDescription: string;
  UserName: string;
  Deleted: string;
};

export type LogItemType = {
  Tag: string;
  Acknowledge: "0" | "1";
  Status: "0" | "1";
  ItemId: string;
  ArabicDescription: string;
  Code: string;
  ItemImage: string;
  UpdatedBy: string;
  CreatedDate: string;
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
