import {
  useParams
} from "react-router-dom";

function NoticeDetails() {

  const { id } =
    useParams();

  return (

    <div
      className="container mt-5"
    >

      <h2>
        Notice Details
      </h2>

      <p>
        Notice ID: {id}
      </p>

    </div>

  );
}

export default NoticeDetails;