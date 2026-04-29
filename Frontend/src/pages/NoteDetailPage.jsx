import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router";
import Navbar from "../components/Navbar";
import axios from "axios";
import toast from "react-hot-toast";
import { ArrowLeftIcon, Trash2Icon, PenSquareIcon, SaveIcon, XIcon } from "lucide-react";
import { formatDate } from "../lib/utils";

function NoteDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const res = await axios.get(`http://localhost:5001/api/notes/${id}`);
        setNote(res.data);
        setTitle(res.data.title);
        setContent(res.data.content);
      } catch (error) {
        if (error.response?.status === 404) {
          toast.error("Note not found");
          navigate("/");
        } else if (error.response?.status === 429) {
          toast.error("Too many requests. Please slow down.");
        } else {
          toast.error("Failed to load note");
        }
      } finally {
        setLoading(false);
      }
    };
    fetchNote();
  }, [id, navigate]);

  const handleSave = async () => {
    if (!title.trim() || !content.trim()) {
      toast.error("Title and content are required");
      return;
    }
    setSaving(true);
    try {
      const res = await axios.put(`http://localhost:5001/api/notes/${id}`, {
        title,
        content,
      });
      setNote(res.data);
      setIsEditing(false);
      toast.success("Note updated!");
    } catch (error) {
      if (error.response?.status === 429) {
        toast.error("Too many requests. Please slow down.");
      } else {
        toast.error("Failed to update note");
      }
    } finally {
      setSaving(false);
    }
  };

  const handleCancelEdit = () => {
    setTitle(note.title);
    setContent(note.content);
    setIsEditing(false);
  };

  const handleDelete = async () => {
    if (!window.confirm("Delete this note? This cannot be undone.")) return;
    setDeleting(true);
    try {
      await axios.delete(`http://localhost:5001/api/notes/${id}`);
      toast.success("Note deleted");
      navigate("/");
    } catch (error) {
      if (error.response?.status === 429) {
        toast.error("Too many requests. Please slow down.");
      } else {
        toast.error("Failed to delete note");
      }
      setDeleting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="text-center text-primary py-20">Loading note...</div>
      </div>
    );
  }

  if (!note) return null;

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="max-w-2xl mx-auto p-4 mt-8">
        <Link to="/" className="btn btn-ghost btn-sm mb-6 gap-2">
          <ArrowLeftIcon className="size-4" />
          Back to Notes
        </Link>

        <div className="card bg-base-100 shadow-md border-t-4 border-[#00FF9D]">
          <div className="card-body">
            {/* Header row */}
            <div className="flex items-start justify-between gap-4 mb-2">
              {isEditing ? (
                <input
                  type="text"
                  className="input input-bordered w-full text-xl font-bold"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  maxLength={100}
                  autoFocus
                />
              ) : (
                <h2 className="card-title text-2xl break-words">{note.title}</h2>
              )}

              <div className="flex items-center gap-2 flex-shrink-0">
                {isEditing ? (
                  <>
                    <button
                      onClick={handleSave}
                      className="btn btn-primary btn-sm gap-1"
                      disabled={saving}
                    >
                      {saving ? (
                        <span className="loading loading-spinner loading-xs" />
                      ) : (
                        <SaveIcon className="size-4" />
                      )}
                      Save
                    </button>
                    <button
                      onClick={handleCancelEdit}
                      className="btn btn-ghost btn-sm"
                      disabled={saving}
                    >
                      <XIcon className="size-4" />
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => setIsEditing(true)}
                      className="btn btn-ghost btn-sm"
                      title="Edit note"
                    >
                      <PenSquareIcon className="size-4" />
                    </button>
                    <button
                      onClick={handleDelete}
                      className="btn btn-ghost btn-sm text-error"
                      title="Delete note"
                      disabled={deleting}
                    >
                      {deleting ? (
                        <span className="loading loading-spinner loading-xs" />
                      ) : (
                        <Trash2Icon className="size-4" />
                      )}
                    </button>
                  </>
                )}
              </div>
            </div>

            {/* Date */}
            <p className="text-sm text-base-content/50 mb-4">
              {formatDate(new Date(note.createdAt))}
              {note.updatedAt !== note.createdAt && (
                <span className="ml-2">(edited {formatDate(new Date(note.updatedAt))})</span>
              )}
            </p>

            {/* Content */}
            {isEditing ? (
              <textarea
                className="textarea textarea-bordered w-full h-64 resize-none"
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
            ) : (
              <p className="text-base-content/80 whitespace-pre-wrap leading-relaxed">
                {note.content}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default NoteDetailPage;
