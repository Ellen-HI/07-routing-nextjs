import css from "./LayoutNotes.module.css";
import { ReactNode } from "react";
type Props = {
  children: ReactNode;
  sidebar: ReactNode;
};
const LayoutNotes = ({ children, sidebar }: Props) => {
  return (
    <section className={css.container}>
      <aside className={css.sidebar}>{sidebar}</aside>
      <div className={css.notesWrapper}>{children}</div>
    </section>
  );
};
export default LayoutNotes;
