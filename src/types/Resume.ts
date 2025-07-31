export interface Experience {
  id: number;
  title: string;
  companyName: string;
  city: string;
  state: string;
  startDate: string;
  endDate?: string;
  currentlyWorking?: boolean;
  workSummery: string;
}

export interface Education {
  id: number;
  universityName: string;
  startDate: string;
  endDate: string;
  degree: string;
  major: string;
  description?: string;
}

export interface Skill {
  id: number;
  name: string;
  rating: number;
}

export interface Resume {
  id?: string;
  userId?: string;
  title?: string;
  firstName: string;
  lastName: string;
  themeColor?: string;
  jobTitle?: string;
  address?: string;
  phone?: string;
  email?: string;
  summery?: string;
  experience?: Experience[];
  education?: Education[];
  skills?: Skill[];
}
