function ConfirmModal({
  show,
  title,
  message,
  onConfirm,
  onClose
}) {

  if (!show) return null;

  return (

    <div
      className="
      modal-overlay"
    >

      <div
        className="
        modal-box"
      >

        <h4>
          {title}
        </h4>

        <p>
          {message}
        </p>

        <button
          className="
          btn btn-danger me-2"
          onClick={
            onConfirm
          }
        >
          Confirm
        </button>

        <button
          className="
          btn btn-secondary"
          onClick={
            onClose
          }
        >
          Cancel
        </button>

      </div>

    </div>

  );
}

export default ConfirmModal;