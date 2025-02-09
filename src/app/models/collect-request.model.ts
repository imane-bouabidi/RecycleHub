export interface CollectRequest {
  id: string;
  userId: string;
  wasteType: ('plastique' | 'verre' | 'papier' | 'metal')[];
  photos?: string[];
  estimatedWeight: number;
  address: string;
  city: string;
  scheduledDate: Date;
  timeSlot: string;
  notes?: string;
  status: 'en attente' | 'occupée' | 'en cours' | 'validée' | 'rejetée';
}
