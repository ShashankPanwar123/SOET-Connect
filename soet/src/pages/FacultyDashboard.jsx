import { useState, useEffect, useContext } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import NoticeCard from "../components/NoticeCard";
import ConfirmModal from "../components/ConfirmModal";
import noticeService from "../services/noticeService";
import { AuthContext } from "../context/AuthContext";

function FacultyDashboard() {
  const { user } = useContext(AuthContext);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("Academic");
  const [notices, setNotices] = useState([]);
  const [editingId, setEditingId] = useState(null);

  // Deletion confirmation state
  const [showConfirm, setShowConfirm] = useState(false);
  const [noticeToDelete, setNoticeToDelete] = useState(null);

  useEffect(() => {
    loadNotices();
  }, []);

  const loadNotices = async () => {
    try {
      const data = await noticeService.getNotices();
      setNotices(data);
    } catch (error) {
      console.error("Error loading notices:", error);
    }
  };

  const publishNotice = async () => {
    if (!title.trim() || !content.trim()) {
      alert("Please fill in both title and content.");
      return;
    }

    try {
      if (editingId) {
        await noticeService.updateNotice(editingId, {
          title,
          content,
          category,
        });
        setEditingId(null);
      } else {
        await noticeService.createNotice({
          title,
          content,
          category,
        });
      }
      setTitle("");
      setContent("");
      setCategory("Academic");
      loadNotices();
    } catch (error) {
      console.error("Error saving notice:", error);
      alert("Failed to save notice. Please check your connection.");
    }
  };

  const handleEdit = (notice) => {
    setEditingId(notice.id);
    setTitle(notice.title);
    setContent(notice.content);
    setCategory(notice.category);
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setTitle("");
    setContent("");
    setCategory("Academic");
  };

  const handleDeleteClick = (id) => {
    setNoticeToDelete(id);
    setShowConfirm(true);
  };

  const handleConfirmDelete = async () => {
    if (noticeToDelete) {
      try {
        await noticeService.deleteNotice(noticeToDelete);
        loadNotices();
      } catch (error) {
        console.error("Error deleting notice:", error);
      } finally {
        setNoticeToDelete(null);
        setShowConfirm(false);
      }
    }
  };

  const autoCategorize = async () => {
    if (!content.trim()) {
      alert("Please write some content first to auto-categorize.");
      return;
    }
    try {
      const result = await noticeService.classifyNotice(content);
      if (result && result.category) {
        setCategory(result.category);
      }
    } catch (error) {
      console.error("Error classifying notice:", error);
      alert("Classification failed. Please select a category manually.");
    }
  };

  // Filter notices list to show only those created by the logged-in faculty member
  const myNotices = notices.filter(
    (notice) => notice.created_by === user?.id || notice.publisher_id === user?.id
  );

  return (
    <>
      <Navbar />

      <div className="dashboard-layout">
        <Sidebar />

        <div className="dashboard-content">
          <h2>{editingId ? "Edit Notice" : "Create Notice"}</h2>

          <input
            className="form-control mb-2"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <textarea
            className="form-control mb-2"
            rows="4"
            placeholder="Content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />

          <button className="btn btn-info me-2" onClick={autoCategorize}>
            Auto Categorize
          </button>

          <select
            className="form-select mt-2"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option>Exam</option>
            <option>Event</option>
            <option>Placement</option>
            <option>Academic</option>
          </select>

          {editingId && (
            <button className="btn btn-secondary me-2 mt-3" onClick={handleCancelEdit}>
              Cancel Edit
            </button>
          )}

          <button className="btn btn-success mt-3" onClick={publishNotice}>
            {editingId ? "Update Notice" : "Publish Notice"}
          </button>

          <hr />

          <h3>My Notices</h3>

          {myNotices.length === 0 ? (
            <p className="text-muted">You haven't published any notices yet.</p>
          ) : (
            myNotices.map((notice) => (
              <NoticeCard
                key={notice.id}
                notice={notice}
                onDelete={handleDeleteClick}
                onEdit={handleEdit}
              />
            ))
          )}
        </div>
      </div>

      <ConfirmModal
        show={showConfirm}
        title="Delete Notice"
        message="Are you sure you want to delete this notice? This action cannot be undone."
        onConfirm={handleConfirmDelete}
        onClose={() => setShowConfirm(false)}
      />
    </>
  );
}

export default FacultyDashboard;