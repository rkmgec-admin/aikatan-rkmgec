export type sponsorDataType = {
  role: string;
  name: string;
  logo?: string;
  note?: string;
};

export const sponsorData: sponsorDataType[] = [
  {
    role: "Media Partner",
    name: "Ei Samay",
    note: "News coverage and event visibility",
    logo: "/sponsor/1.png",
  },
  {
    role: "Radio Partner",
    name: "91.9 Friends FM",
    logo: "/sponsor/friends-fm.png",
    note: "On-air promotion and audience reach",
  },
  {
    role: "Food Partner",
    name: "Sorella",
    note: "Food services for event attendees",
    logo: "/sponsor/6.jpeg",
  },
  
  {
    role: "Hospitality Partner",
    name: "Pearl Tree Hotels & Resorts",
    logo: "/sponsor/4.jpeg",
    note: "Guest experience and hospitality support",
  },
  {
    role: "Fitness Partner",
    name: "Gravity Gym",
    note: "Wellness and fitness association",
    logo: "/sponsor/5.jpeg",
  },
  {
    role: "Title Sponsor",
    name: "Delhi World Public School",
    logo: "/sponsor/delhiWorldPublicSchool.jpeg",
    note: "Core event backing and execution support",
  },
];
