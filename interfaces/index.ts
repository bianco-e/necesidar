export interface PublicationData {
  id: string;
  publication_type: number;
  title: string;
  description: string;
  images: string[];
  user_id: string;
  user_first_name: string;
  user_last_name: string;
  user_avatar: string;
  province: string;
  city: string;
  neighborhood: string;
  is_urgent?: boolean;
  can_move: boolean;
  created_at: number;
  updated_at?: number;
  deleted_at?: number;
  requests_number: number;
}

export interface Geo {
  id: string;
  nombre: string;
}
export interface GeoData {
  provincias: Geo[];
}

export interface SelectedFilter {
  id: string;
  name: string;
}

export interface PublicationsFilters {
  province?: string;
  city?: string;
  category?: string;
  title?: string;
}

export interface SessionUser {
  email: string;
  image: string;
  name: string;
  first_name: string;
  last_name: String;
  google_id: string;
  can_move?: boolean;
  phone?: string;
  province?: string;
  city?: string;
}

export interface Session {
  expires: Date;
  user: SessionUser;
}
