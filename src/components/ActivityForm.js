import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useAuthContext } from "../hooks/useAuthContext";

const ActivityForm = (props) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState(null);
  const { user } = useAuthContext();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const activity = { title, description };
    if(!user){
        toast.error("You must be logged in to create an activity.")
        return;
    }

    const response = await fetch("/api/routes/", {
      method: "POST",
      body: JSON.stringify(activity),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    });

    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
    }
    if (response.ok) {
      setTitle("");
      setDescription("");
      setError(null);
      // console.log('New activity added');
      toast.success("New activity added");
      // props.onAdd(json);
      props.onUpdate();
    }
  };

  return (
    <form className="create" onSubmit={handleSubmit}>
      <h2>Add a new activity</h2>
      <label>Title</label>
      <input
        type="text"
        onChange={(e) => {
          setTitle(e.target.value);
        }}
        value={title}
      />
      <label>Description</label>
      <input
        type="text"
        onChange={(e) => {
          setDescription(e.target.value);
        }}
        value={description}
      />
      <button>Add Activity</button>
      <Toaster />
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default ActivityForm;
