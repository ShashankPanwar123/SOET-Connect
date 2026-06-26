import {
  useState,
  useEffect
} from "react";

import SearchBar from "../components/SearchBar";
import NoticeCard from "../components/NoticeCard";

import noticeService from "../services/noticeService";

function NoticeBoard() {

  const [notices, setNotices] =
    useState([]);

  const [search, setSearch] =
    useState("");

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

  const filteredNotices =
    notices.filter(
      notice =>
        notice.title
        .toLowerCase()
        .includes(
          search.toLowerCase()
        )
    );

  return (
    <div className="container mt-4">

      <h2>
        Notice Board
      </h2>

      <SearchBar
        value={search}
        onChange={setSearch}
      />

      {
        filteredNotices.map(
          notice => (

            <NoticeCard
              key={notice.id}
              notice={notice}
            />

          )
        )
      }

    </div>
  );
}

export default NoticeBoard;