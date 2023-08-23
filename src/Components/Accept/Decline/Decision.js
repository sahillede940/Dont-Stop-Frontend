import React, { useEffect, useState } from "react";
import ContestCard from "../../ContestCard/ContestCard";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import {   Typography } from "@mui/material";
import { ACCEPT_COMP, COMP_STATUS, REMOVE_REQ } from "../../../Url";
import { useLocation } from "react-router";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";

function groupBy2(xs, prop) {
  var grouped = {};
  for (var i = 0; i < xs.length; i++) {
    var p = xs[i][prop];
    if (!grouped[p]) {
      grouped[p] = [];
    }
    grouped[p].push(xs[i]);
  }
  return grouped;
}

export default function Decision() {
  const location = useLocation();
  const props = location.state;
  // // console.log(props);

  useEffect(() => {
    axios.get(`${COMP_STATUS + props._id}`).then((res) => {
      if (res.data.success) {
        // // console.log(res.data);
        let data = groupBy2(res.data.users, "status");
        if (data.true) setRows2(data.true);
        else setRows2([]);
        if (data.false) setRows(data.false);
        else setRows([]);
      }
    });
  }, []);
  const [rows2, setRows2] = useState([]);
  const [rows, setRows] = useState([]);

  return (
    <>
      <ToastContainer />
      <ContestCard {...props} />
      <div style={{}}>
        {/* Table1 */}
        <Typography variant="h4" sx={{ my: 2 }}>
          Applied Users
        </Typography>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
            <TableHead>
              <TableRow>
                <TableCell>Name of applicant</TableCell>
                <TableCell align="right">Profile</TableCell>
                <TableCell align="right">Note</TableCell>
                <TableCell align="right">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow
                  key={row.name}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.fullName}
                  </TableCell>
                  <TableCell align="right">
                    <button
                      onClick={() => {
                        window.open(
                          `/view-profile/${row.userApplied}`,
                          "_blank"
                        );
                      }}
                      className="Button apply"
                    >
                      View Profile
                    </button>
                  </TableCell>
                  <TableCell align="right">{row.note}</TableCell>
                  <TableCell align="right">
                    <button
                      onClick={() => {
                        console.log(rows2.length, props.teamSize);
                        if (rows2.length < props.teamSize) {
                          axios
                            .put(ACCEPT_COMP, {
                              userSelectorId: row._id,
                            })
                            .then((res) => {
                              if (res.data.success) {
                                window.location.reload();
                              }
                            });
                        } else {
                          toast.error("Team size already full");
                        }
                      }}
                      className="Button apply"
                    >
                      Accept
                    </button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        {/* Table2 */}
        <Typography variant="h4" sx={{ my: 2 }}>
          Selected Users
        </Typography>

        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
            <TableHead>
              <TableRow>
                <TableCell>Name of applicant</TableCell>
                <TableCell align="right">Profile</TableCell>
                <TableCell align="right">Note</TableCell>
                <TableCell align="right">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows2.map((row) => (
                <TableRow
                  key={row.name}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.fullName}
                  </TableCell>
                  <TableCell align="right">
                    <button
                      onClick={() => {
                        window.open(
                          `/view-profile/${row.userApplied}`,
                          "_blank"
                        );
                      }}
                      className="Button yellow"
                    >
                      View Profile
                    </button>
                  </TableCell>
                  <TableCell align="right">{row.note}</TableCell>
                  <TableCell align="right">
                    <button
                      onClick={() => {
                        axios
                          .delete(REMOVE_REQ + row._id)
                          .then((res) => {
                            if (res.data.success) {
                              window.location.reload();
                            }
                          })
                          .catch();
                      }}
                      className="Button cancel"
                    >
                      Remove
                    </button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <div style={{ height: "100px" }}></div>
      </div>
    </>
  );
}
