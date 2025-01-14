import NoteCard from "@/features/sticky-notes/components/NoteCard";
import { NOTES_FAKE_DATA } from "@/features/sticky-notes/data/notes";

function StickyNotesMain() {
  return (
    <div className="flex justify-center items-center">
      {NOTES_FAKE_DATA.map((note) => (
        <NoteCard note={note} key={note.id} />
      ))}
    </div>
  );
}

export default StickyNotesMain;
