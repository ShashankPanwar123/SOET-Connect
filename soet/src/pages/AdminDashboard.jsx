import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import AnalyticsCard from "../components/AnalyticsCard";
import AnalyticsChart from "../components/AnalyticsChart";
import NoticeCard from "../components/NoticeCard";
import ConfirmModal from "../components/ConfirmModal";
import analyticsService from "../services/analyticsService";
import noticeService from "../services/noticeService";

function AdminDashboard() {
  const [stats, setStats] = useState({ students: 0, faculty: 0, notices: 0 });
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);

  // Deletion confirm modal state
  const [showConfirm, setShowConfirm] = useState(false);
  const [noticeToDelete, setNoticeToDelete] = useState(null);

  useEffect(() => {
    loadStats();
    loadAllNotices();
  }, []);

  const loadStats = async () => {
    try {
      const data = await analyticsService.getAnalytics();
      setStats({
        students: data.total_students || data.students || 0,
        faculty: data.total_faculty || data.faculty || 0,
        notices: data.total_notices || data.notices || data.total_active_notices || 0,
      });
    } catch (error) {
      console.error("Error loading stats:", error);
    }
  };

  const loadAllNotices = async () => {
    try {
      const data = await noticeService.getNotices();
      setNotices(data);
    } catch (error) {
      console.error("Error loading notices:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteClick = (id) => {
    setNoticeToDelete(id);
    setShowConfirm(true);
  };

  const handleConfirmDelete = async () => {
    if (noticeToDelete) {
      try {
        await noticeService.deleteNotice(noticeToDelete);
        loadAllNotices();
        loadStats();
      } catch (error) {
        console.error("Error deleting notice:", error);
      } finally {
        setNoticeToDelete(null);
        setShowConfirm(false);
      }
    }
  };

  return (
    <>
      <Navbar />

      <div className="dashboard-layout">
        <Sidebar />

        <div className="dashboard-content">
          <h2>Analytics Dashboard</h2>

          <div className="row">
            <div className="col-md-4">
              <AnalyticsCard title="Total Students" value={stats.students.toString()} />
            </div>

            <div className="col-md-4">
              <AnalyticsCard title="Total Faculty" value={stats.faculty.toString()} />
            </div>

            <div className="col-md-4">
              <AnalyticsCard title="Total Active Notices" value={stats.notices.toString()} />
            </div>
          </div>

          <br />

          <div className="row">
            <div className="col-lg-7">
              <AnalyticsChart />
            </div>
            <div className="col-lg-5">
              <h4>System Notice Control</h4>
              <p className="text-muted small">Administrative override (Delete any active notice)</p>
              <div style={{ maxHeight: "400px", overflowY: "auto", paddingRight: "10px" }}>
                {loading ? (
                  <p>Loading notices...</p>
                ) : notices.length === 0 ? (
                  <p className="text-muted">No active notices in the system.</p>
                ) : (
                  notices.map((notice) => (
                    <NoticeCard
                      key={notice.id}
                      notice={notice}
                      onDelete={handleDeleteClick}
                    />
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <ConfirmModal
        show={showConfirm}
        title="Admin Override: Delete Notice"
        message="Are you sure you want to delete this notice? As an administrator, this will remove it system-wide."
        onConfirm={handleConfirmDelete}
        onClose={() => setShowConfirm(false)}
      />
    </>
  );
}

export default AdminDashboard;