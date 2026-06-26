import {
  useState,
  useEffect
} from "react";

import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import NoticeCard from "../components/NoticeCard";

import noticeService from "../services/noticeService";

function FacultyDashboard() {

  const [title, setTitle] =
    useState("");

  const [content, setContent] =
    useState("");

  const [category, setCategory] =
    useState("Academic");

  const [notices, setNotices] =
    useState([]);

  useEffect(() => {
    loadNotices();
  }, []);

  const loadNotices =
    async () => {

      const data =
        await noticeService
        .getNotices();

      setNotices(data);
    };

  const createNotice =
    async () => {

      await noticeService
      .createNotice({
        title,
        content,
        category
      });

      setTitle("");
      setContent("");

      loadNotices();
    };

  const deleteNotice =
    async (id) => {

      await noticeService
      .deleteNotice(id);

      loadNotices();
    };

  const autoCategorize =
    async () => {

      const result =
        await noticeService
        .classifyNotice(
          content
        );

      setCategory(
        result.category
      );
    };

  return (
    <>
      <Navbar />

      <div className="dashboard-layout">

        <Sidebar />

        <div className="dashboard-content">

          <h2>
            Create Notice
          </h2>

          <input
            className="form-control mb-2"
            placeholder="Title"
            value={title}
            onChange={(e) =>
              setTitle(
                e.target.value
              )
            }
          />

          <textarea
            className="form-control mb-2"
            rows="4"
            placeholder="Content"
            value={content}
            onChange={(e) =>
              setContent(
                e.target.value
              )
            }
          />

          <button
            className="btn btn-info me-2"
            onClick={autoCategorize}
          >
            Auto Categorize
          </button>

          <select
            className="form-select mt-2"
            value={category}
            onChange={(e) =>
              setCategory(
                e.target.value
              )
            }
          >

            <option>
              Exam
            </option>

            <option>
              Event
            </option>

            <option>
              Placement
            </option>

            <option>
              Academic
            </option>

          </select>

          <button
            className="btn btn-success mt-3"
            onClick={createNotice}
          >
            Publish Notice
          </button>

          <hr />

          <h3>
            My Notices
          </h3>

          {
            notices.map(
              notice => (

                <NoticeCard
                  key={notice.id}
                  notice={notice}
                  onDelete={
                    deleteNotice
                  }
                />

              )
            )
          }

        </div>

      </div>
    </>
  );
}

export default FacultyDashboard;