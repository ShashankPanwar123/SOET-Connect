function NoticeCard({
  notice,
  onDelete
}) {

  return (

    <div className="dashboard-card">

      <h4>
        {notice.title}
      </h4>

      <p>
        {notice.content}
      </p>

      <span
        className="
        badge bg-primary"
      >
        {notice.category}
      </span>

      <br />

      <small>
        Published:
        {" "}
        {notice.created_at}
      </small>

      {
        onDelete && (

          <div>

            <button
              className="
              btn btn-danger mt-3"
              onClick={() =>
                onDelete(
                  notice.id
                )
              }
            >
              Delete
            </button>

          </div>

        )
      }

    </div>

  );
}

export default NoticeCard;