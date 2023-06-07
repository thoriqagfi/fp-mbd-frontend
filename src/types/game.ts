export type IdData = {
  id: String;
};

export type SearchData = {
  keyword: string;
};

export type GameDataResponse = {
  data: GameData[];
  code: number;
  message: string;
  success: boolean;
};

export type GameData = {
  id: string;
  nama: string;
  deskripsi: string;
  release_date: string;
  harga: number;
  age_rating: string;
  system_min: string;
  system_rec: string;
  picture: string;
  video: string;
  developer: string;
};