import axios from "axios";
import React, { useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";
import { APPLY_COMP } from "../../Url";
import { useNavigate } from "react-router";

export default function Note(props) {
    const [note, setNote] = useState('')
    const navigate = useNavigate();
    const handleSubmit = () => {
        console.log({
            userApplied: props.userApplied,
            competition: props.competition,
            note: note,
            fullName: props.fullName
        });
        const t = toast.loading("Please Wait...")
        axios.put(APPLY_COMP, {
            userApplied: props.userApplied,
            competition: props.competition,
            note: note,
            fullName: props.fullName
        }).then(res => {
            console.log(res.data);
            if (res.data.success) {
                toast.dismiss(t)
                toast.success("Successfully Applied")
                navigate('/dashboard')
            }
            else {
                toast.dismiss(t)
                toast.error("Some internal error")
            }
        }).catch(er => {
                toast.dismiss(t)
                toast.error("Some internal error")
        })
    }
    return (<>
        <ToastContainer position="top-right"/>
        <div style={{ display: 'flex', minWidth: '40vw', minHeight:"40vh", flexDirection: 'column' }}>
            <label>Add a note</label>
            <textarea onChange={(e) => { setNote(e.target.value) }} value={note}></textarea>
            <button onClick={handleSubmit} className="Button apply">Send Request</button>
        </div>
    </>)
}