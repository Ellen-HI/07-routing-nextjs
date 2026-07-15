"use client";
import { useQuery } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import { fetchNoteById } from "@/lib/api";
import css from "./NoteDetails.client.module.css";

const NoteDetailsClient = () => {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const {
    data: note,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
    refetchOnMount: false,
  });

  const handleGoBack = () => {
    const isSure = confirm("Are you sure?");
    if (isSure) {
      router.back();
    }
  };

  if (isLoading) return <p>Loading, please wait...</p>;

  if (isError || !note) return <p>Something went wrong.</p>;

  return (
    <main className={css.main}>
      <div className={css.container}>
        <div className={css.item}>
          <div className={css.header}>
            <button onClick={handleGoBack}>Back</button>
            <h2>{note.title}</h2>
          </div>
          <p className={css.tag}>{note.tag}</p>
          <p className={css.content}>{note.content} </p>
          <p className={css.date}>{note.createdAt}</p>
        </div>
      </div>
    </main>
  );
};
export default NoteDetailsClient;
