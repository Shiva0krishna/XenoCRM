export interface Customer {
  id: string;
  name: string;
  email: string;
  spend: number;
  visits: number;
  lastPurchase: Date | null;
  createdAt: Date;
  updatedAt: Date;
  segmentId: string;
} 