export type Token = {
  base: string;
  pos: string;
  pos_detail_1: string;
  pos_detail_2: string;
  pos_detail_3: string;
  reading_hira: string;
  reading_kata: string;
  romaji: string;
  surface: string;
};

export type ISubtitle = {
  dur: string;
  start: string;
  text: string;
};

export type ICurrentSubtitle = (ISubtitle & { tokens?: Token[] }) | null;

export type WordToken = {
  basic_form: string;
  conjugated_form: string;
  conjugated_type: string;
  pos: string;
  pos_detail_1: string;
  pos_detail_2: string;
  pos_detail_3: string;
  surface_form: string;
  word_id: number;
  word_position: number;
  word_type: string;
  pronunciation?: string;
  reading?: string; 
};

