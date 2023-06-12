export type User = {
  id: string
  name: string
  email: string
  password: string
  profile_image: string
  role: string
  token: string
  wallet: number;
  list_game: ListGame[]
  list_dlc: ListDLC[]
}

export interface ListGame {
  id: string
  nama: string
  deskripsi: string
  release_date: string
  harga: number
  age_rating: string
  system_min: string
  system_rec: string
  picture: string
  video: string
  developer: string
};

export interface ListDLC {
  id: string
  nama: string
  deskripsi: string
  harga: number
  system_min: string
  system_rec: string
  picture: string
};
