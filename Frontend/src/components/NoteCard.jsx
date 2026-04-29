import { PenSquareIcon, Trash2Icon } from "lucide-react";
import { Link, useNavigate } from "react-router";
import { formatDate } from "../lib/utils";
import axios from "axios";
import toast from "react-hot-toast";

const NoteCard = ({ note, onDelete }) => {
  const navigate = useNavigate();

  const handleDelete = async (e) => {
    e.preventDefault(); // prevent Link navigation
    if (!window.confirm("Delete this note?")) return;
    try {
      await axios.delete(`http://localhost:5001/api/notes/${note._id}`);
      toast.success("Note deleted");
      onDelete(note._id);
    } catch {
      toast.error("Failed to delete note");
    }
  };

  const handleEdit = (e) => {
    e.preventDefault();
    navigate(`/note/${note._id}`);
  };

  return (
    <Link
      to={`/note/${note._id}`}
      className="card bg-base-100 hover:shadow-lg transition-all duration-200
    border-t-4 border-solid border-[#00FF9D]"
    >
      <div className="card-body">
        <h3 className="card-title text-base-content">{note.title}</h3>
        <p className="text-base-content/70 line-clamp-3">{note.content}</p>
        <div className="card-actions justify-between items-center mt-4">
          <span className="text-sm text-base-content/60">
            {formatDate(new Date(note.createdAt))}
          </span>
          <div className="flex items-center gap-1">
            <button
              onClick={handleEdit}
              className="btn btn-ghost btn-xs"
              title="Edit note"
            >
              <PenSquareIcon className="size-4" />
            </button>
            <button
              onClick={handleDelete}
              className="btn btn-ghost btn-xs text-error"
              title="Delete note"
            >
              <Trash2Icon className="size-4" />
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default NoteCard;
