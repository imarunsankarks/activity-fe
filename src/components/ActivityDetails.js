import { useState } from "react";
import toast, { Toaster } from 'react-hot-toast';
import { useAuthContext } from "../hooks/useAuthContext";


const ActivityDetails = (props) => {
  const value = props.activity;
  const { user } = useAuthContext();

  const [title, setTitle] = useState(value.title);
  const [cost, setCost] = useState(value.cost);
  if (!user) {
    // toast.error("You must be logged in to alter an activity.")
    return;
  }

  const deleteActivity = async (id) => {
    const response = await fetch("/api/routes/" + id, {
      method: "DELETE",
      headers: {
        'Authorization': `Bearer ${user.token}`
      },
    });

    if (!response.ok) {
      const json = await response.json();
      toast.error(json.error)
    } else {
      // props.onDelete(id);
      props.onUpdate();
      toast.error("Activity deleted!")
    }
  };

  const updateValue = async (id) => {
    const activity = { title, cost };
    const response = await fetch("/api/routes/" + id, {
      method: "PATCH",
      body: JSON.stringify(activity),
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${user.token}`
      },
    });

    if (!response.ok) {
      const json = await response.json();
      // console.log(json.error);
      toast.error(json.error)
    } else {
      // const time = await response.json();
      // const createdAt = (time.createdAt);
      // props.onUpdate({ _id: id, title, description, createdAt }); 
      props.onUpdate();
      toast.success('Activity updated')
    }
  };

  const updatedAtDate = new Date(value.updatedAt);
  const differenceInMs = Date.now() - updatedAtDate.getTime();
  const differenceInMinutes = Math.floor(differenceInMs / (1000 * 60));
  const differenceInHr = differenceInMinutes > 60 ? Math.floor(differenceInMinutes / 60) : 0;

  const showUpdate = (index) => {
    const updateForm = document.querySelectorAll(".update");
    updateForm[index].classList.toggle("show");
  };

  return (
    <div className="each-activity">
      <div className="alter-buttons">
        <button onClick={() => { showUpdate(props.index); }}>Edit</button>
        <button onClick={() => { deleteActivity(value._id); }}>x</button>
      </div>
      <span>Added on {value.date.split('T')[0]}</span>
      <h3>{value.title}</h3>
      <p>Rs. {value.cost}</p>
      {differenceInHr > 0 ? <span>{`Updated ${differenceInHr} hours  ago`}</span> : <span>{`Updated ${differenceInMinutes} minutes ago`}</span>}

      <form
        className="update"
        onSubmit={(e) => {
          e.preventDefault();
          updateValue(value._id);
          showUpdate(props.index);
        }}
      >
        <input
          type="text"
          onChange={(e) => { setTitle(e.target.value); }}
          value={title}
        />
        <input
          type="text"
          onChange={(e) => { setCost(e.target.value); }}
          value={cost}
        />
        <button>Update</button>
        <span className="updateFormClose" onClick={() => { showUpdate(props.index); }}>Close</span>
        <Toaster />
      </form>
    </div>
  );
};

export default ActivityDetails;
