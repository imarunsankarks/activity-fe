import { useState } from "react";
import toast, { Toaster } from 'react-hot-toast';

const ActivityDetails = (props) => {
  const value = props.activity;
  const [title, setTitle] = useState(value.title);
  const [description, setDescription] = useState(value.description);

  const deleteActivity = async (id) => {
    const response = await fetch("/api/routes/" + id, {
      method: "DELETE",
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
    const activity = { title, description };
    const response = await fetch("/api/routes/" + id, {
      method: "PATCH",
      body: JSON.stringify(activity),
      headers: {
        "Content-Type": "application/json",
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
      <h3>{value.title}</h3>
      <p>{value.description}</p>
      <span>{value.createdAt.split('T')[0]}</span>
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
          onChange={(e) => { setDescription(e.target.value); }}
          value={description}
        />
        <button>Update</button>
        <span className="updateFormClose" onClick={() => { showUpdate(props.index); }}>Close</span>
        <Toaster />
      </form>
    </div>
  );
};

export default ActivityDetails;
