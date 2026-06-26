function NoticeCard({
  notice,
  onDelete,
  onEdit
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

      <small className="text-muted d-block mt-2">
        Published on: {notice.created_at ? new Date(notice.created_at).toLocaleDateString() : "N/A"} | By: {notice.publisher_name || notice.created_by_name || notice.author || "Faculty"}
      </small>

      {
        (onEdit || onDelete) && (

          <div className="mt-3">

            {onEdit && (
              <button
                className="btn btn-warning me-2"
                onClick={() => onEdit(notice)}
              >
                Edit
              </button>
            )}

            {onDelete && (
              <button
                className="btn btn-danger"
                onClick={() => onDelete(notice.id)}
              >
                Delete
              </button>
            )}

          </div>

        )
      }

    </div>

  );
}

export default NoticeCard;