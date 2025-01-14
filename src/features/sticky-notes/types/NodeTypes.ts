export interface NoteType {
  id: number | string;
  body: string;
  position: NotePositionType;
  colors: NoteColorsType;
}

export interface NoteResponseType {
  id: number | string;
  body: string;
  position: string;
  colors: string;
}

export interface NotePositionType {
  x: number;
  y: number;
}
export interface NoteColorsType {
  id: string;
  colorHeader: string;
  colorBody: string;
  colorText: string;
}
