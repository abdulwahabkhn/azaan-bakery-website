export interface BusinessInfo {
  address: string;
  phone: string;
  email: string;
  hours: readonly string[];
}

export interface FaqItem {
  question: string;
  answer: string;
}
