export interface PublicationData {
  id: string;
  title: string;
  description: string;
  images: string[];
  user_id: string;
  location: {
    province: string;
    city: string;
    neighborhood: string;
  };
  is_urgent?: boolean;
  can_move: boolean;
  created_at: number;
  updated_at?: number;
  deleted_at?: number;
  requests_number: number;
}
