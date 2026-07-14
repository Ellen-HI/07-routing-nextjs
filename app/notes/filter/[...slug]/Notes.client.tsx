"use client";

import ErrorMessage from "@/components/ErrorMessage/ErrorMessage";
import NoteForm from "@/components/NoteForm/NoteForm";
import NoteList from "@/components/NoteList/NoteList";
import Pagination from "@/components/Pagination/Pagination";
import SearchBox from "@/components/SearchBox/SearchBox";
import { fetchNotes } from "@/lib/api";
import Loader from "@/components/Loader/Loader";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import css from "./Notes.client.module.css";
import { useDebouncedCallback } from "use-debounce";
import Modal from "@/components/Modal/Modal";

type Props = {
  tag?: string;
};

const NotesClient = ({ tag }: Props) => {
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data, isLoading, isError, isSuccess } = useQuery({
    queryKey: ["notes", page, query, tag],
    queryFn: () => fetchNotes(query, page, 12, tag),
    placeholderData: keepPreviousData,
  });

  useEffect(() => {
    if (isSuccess && data?.notes.length === 0) {
      toast.error("No notes found.");
    }
  }, [isSuccess, data]);
  const totalPages = data?.totalPages ?? 0;
  const debouncedSearch = useDebouncedCallback((value: string) => {
    setQuery(value);
    setPage(1);
  }, 500);

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <Toaster position="top-center" reverseOrder={false} />
        <SearchBox value={query} onChange={debouncedSearch} />
        {isSuccess && totalPages > 1 && (
          <Pagination
            totalPages={totalPages}
            page={page}
            onPageChange={setPage}
          />
        )}
        {isLoading && <Loader />} {isError && <ErrorMessage />}
        <button className={css.button} onClick={() => setIsModalOpen(true)}>
          Create note +
        </button>
      </header>
      {data && data.notes.length > 0 && <NoteList notes={data.notes} />}
      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <NoteForm onClose={() => setIsModalOpen(false)} />
        </Modal>
      )}
    </div>
  );
};

export default NotesClient;
