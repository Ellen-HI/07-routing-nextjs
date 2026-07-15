import axios from "axios";
import type { Note } from "@/types/note";
interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}
const token = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;
const api = axios.create({
  baseURL: "https://notehub-public.goit.study/api",
  headers: {
    Authorization: `Bearer ${token}`,
  },
});
export const fetchNotes = async (
  query: string,
  page: number,
  perPage?: number,
  tag?: string,
): Promise<FetchNotesResponse> => {
  const response = await api.get<FetchNotesResponse>("/notes", {
    params: {
      search: query,
      page,
      ...(perPage && { perPage }),
      ...(tag && { tag }),
    },
  });
  return response.data;
};
export interface CreateNoteData {
  title: string;
  content: string;
  tag: string;
}

export const createNote = async (note: CreateNoteData): Promise<Note> => {
  const response = await api.post<Note>("/notes", note);
  return response.data;
};

export const deleteNote = async (id: string): Promise<Note> => {
  const response = await api.delete<Note>(`/notes/${id}`);

  return response.data;
};
export const fetchNoteById = async (id: string): Promise<Note> => {
  const res = await api.get<Note>(`/notes/${id}`);
  return res.data;
};
