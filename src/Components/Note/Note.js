import axiosInstance from "../../axiosInstance";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { APPLY_COMP } from "../../Url";

export const Note = (props) => {
  const [note, setNote] = useState("");

  const handleSubmit = async () => {
    const t = toast.loading("Please Wait...");
    try {
      const response = await axiosInstance.patch(
        APPLY_COMP + props.competition + "/apply/",
        {
          note: note,
        }
      );
      props.setOpen2(false);
      toast.dismiss(t);
      console.log("Response:", response.response.data.message);
    } catch (error) {
      toast.dismiss(t);
      console.error("Error:", error);
      toast.error(error.response.data.message);
      props.setOpen2(false);
    }
  };

  return (
    <>
      <div className="pc-container">
        <h2>Post competition</h2>
        <div>
          <p>Add a note</p>
          <textarea
            onChange={(e) => {
              setNote(e.target.value);
            }}
            value={note}
            placeholder="Type your personalized note here..."
          ></textarea>
        </div>
        <button onClick={handleSubmit} className="Button apply">
          Send Request
        </button>
      </div>
    </>
  );
};

export default Note;
