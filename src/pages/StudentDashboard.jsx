import {
  useEffect,
  useState
} from "react";

import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import NoticeCard from "../components/NoticeCard";
import SkeletonLoader from "../components/SkeletonLoader";

import noticeService from "../services/noticeService";

function StudentDashboard() {

  const [notices, setNotices] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {

    loadNotices();

  }, []);

  const loadNotices =
    async () => {

      try {

        const data =
          await noticeService
          .getNotices();

        setNotices(
          data.slice(0, 5)
        );

      } catch (error) {

        console.log(error);

      } finally {

        setLoading(false);

      }

    };

  return (
    <>
      <Navbar />

      <div className="dashboard-layout">

        <Sidebar />

        <div className="dashboard-content">

          <h2>
            Recent Notices
          </h2>

          {loading ? (
            <>
              <SkeletonLoader />
              <SkeletonLoader />
              <SkeletonLoader />
            </>
          ) : (
            notices.map(
              notice => (

                <NoticeCard
                  key={notice.id}
                  notice={notice}
                />

              )
            )
          )}

        </div>

      </div>
    </>
  );
}

export default StudentDashboard;