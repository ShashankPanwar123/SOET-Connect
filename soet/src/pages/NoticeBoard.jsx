import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import SearchBar from "../components/SearchBar";
import NoticeCard from "../components/NoticeCard";
import noticeService from "../services/noticeService";

function NoticeBoard() {
  const [notices, setNotices] = useState([]);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [sortOrder, setSortOrder] = useState("newest"); // "newest" or "oldest"

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

  // 1. Text filter matching Title AND Content
  // 2. Category filter matching Category tag
  const filteredNotices = notices.filter((notice) => {
    const matchesSearch =
      notice.title.toLowerCase().includes(search.toLowerCase()) ||
      notice.content.toLowerCase().includes(search.toLowerCase());
    
    const matchesCategory =
      categoryFilter === "all" ||
      notice.category.toLowerCase() === categoryFilter.toLowerCase();

    return matchesSearch && matchesCategory;
  });

  // 3. Sort logic by created_at (newest first vs oldest first)
  const sortedNotices = [...filteredNotices].sort((a, b) => {
    const dateA = new Date(a.created_at || 0);
    const dateB = new Date(b.created_at || 0);
    return sortOrder === "newest" ? dateB - dateA : dateA - dateB;
  });

  return (
    <>
      <Navbar />

      <div className="dashboard-layout">
        <Sidebar />

        <div className="dashboard-content">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h2>Central Notice Board</h2>
          </div>

          {/* Search and Filters Section */}
          <div className="dashboard-card mb-4">
            <div className="row g-3">
              <div className="col-md-6">
                <label className="form-label small text-muted">Search Notices</label>
                <SearchBar value={search} onChange={setSearch} />
              </div>
              <div className="col-md-3">
                <label className="form-label small text-muted">Category</label>
                <select
                  className="form-select"
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                >
                  <option value="all">All Categories</option>
                  <option value="exam">Exam</option>
                  <option value="event">Event</option>
                  <option value="placement">Placement</option>
                  <option value="academic">Academic</option>
                </select>
              </div>
              <div className="col-md-3">
                <label className="form-label small text-muted">Sort By Date</label>
                <select
                  className="form-select"
                  value={sortOrder}
                  onChange={(e) => setSortOrder(e.target.value)}
                >
                  <option value="newest">Newest First</option>
                  <option value="oldest">Oldest First</option>
                </select>
              </div>
            </div>
          </div>

          {/* Notices Feed */}
          {sortedNotices.length === 0 ? (
            <p className="text-muted text-center mt-5">No notices match your filters.</p>
          ) : (
            sortedNotices.map((notice) => (
              <NoticeCard key={notice.id} notice={notice} />
            ))
          )}
        </div>
      </div>
    </>
  );
}

export default NoticeBoard;