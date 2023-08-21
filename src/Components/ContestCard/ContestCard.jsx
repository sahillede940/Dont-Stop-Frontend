import { Box, Modal, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { temp } from "../../assets/assets";
import Decision from "../Accept/Decline/Decision";
import Note from "../Note/Note";
import "./ContestCard.scss";
import { comp1, comp2, comp3, comp4, comp5, comp6 } from "../../assets/assets";
import axios from "axios";
import { DELETE_COMP } from "../../Url";

function formatDate(date) {
  let readableDate = new Date(date);
  return readableDate.toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  overflow: "scroll",
  p: 4,
};

const ContestCard = (props) => {
  const {
    apply,
    already,
    del,
    posted,
    req,
    name,
    teamSize,
    description,
    deadline,
    createdAt,
    location,
    creator,
    _id,
    status,
  } = props;

  const [open, setOpen] = useState(false);
  const [imgg, setImgg] = useState(null);

  const [open2, setOpen2] = useState(false);
  const navigate = useNavigate();
  const handleOpen = () => setOpen(true);

  const handleClose = () => setOpen(false);

  useEffect(() => {
    console.log(props)
    let vari = name.length % 6;
    if (vari === 0) setImgg(comp1);
    else if (vari === 1) setImgg(comp2);
    else if (vari === 2) setImgg(comp3);
    else if (vari === 3) setImgg(comp4);
    else if (vari === 4) setImgg(comp5);
    else if (vari === 5) setImgg(comp6);
  }, []);

  const handleOpen2 = () => setOpen2(true);
  const handleClose2 = () => setOpen2(false);

  const curUser = JSON.parse(localStorage.getItem("curUser"));

  return (
    <div className="lol">
      <div className="MainCardDiv">
        <div className="card-img">
          <img src={imgg} alt="competition-img" className="Eventlogo" />
        </div>
        <div className="card-data">
          <div className="card-main">
            <h3>{name}</h3>
            {posted && (
              <p>
                Posted By: <span>{creator?.fullName}</span>
              </p>
            )}
          </div>
          <div className="card-des">
            <p>{description}</p>
          </div>
          <div className="card-sec">
            <div className="pro">
              <div className="card-info"> Team-Size</div>
              <p>{teamSize}</p>
            </div>
            <div className="pro">
              <div>Location</div>
              <p>{location}</p>
            </div>
            <div className="pro">
              <div>Created On</div>
              <p>{formatDate(createdAt)}</p>
            </div>
            <div>
              <div>Deadline</div>
              <p>{formatDate(deadline)}</p>
            </div>
          </div>

          <div className="card-btn">
            {!already && apply && <button onClick={handleOpen2} className="Button apply">Apply</button>}
            {/* <button className="Button cancel">Cancel</button> */}
            {!already && del && (
              <button onClick={()=>{
                navigate('/view-application', {state: {...props}})
              }} className="Button apply">
                View Applications
              </button>
            )}
            {!already && del && <button onClick={()=>{
              axios.delete(DELETE_COMP+_id).then(res=>{
                window.location.reload()
              })
            }} className="Button cancel">Delete</button>}
            {already && <button className="Button yellow">Already Applied</button>}
            {/* // modal for admin */}
            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
              disableScrollLock
            >
              <Box sx={style}>
                <Decision {...props} />
              </Box>
            </Modal>
            {/*Modal for apply*/}
            <Modal
              open={open2}
              onClose={handleClose2}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                <Note
                  userApplied={curUser._id}
                  competition={props._id}
                  fullName={curUser.fullName}
                />
              </Box>
            </Modal>
          </div>
        </div>
        <div></div>
      </div>
    </div>
  );
};

export default ContestCard;
