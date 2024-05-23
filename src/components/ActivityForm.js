import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useAuthContext } from "../hooks/useAuthContext";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const ActivityForm = (props) => {
  const [title, setTitle] = useState("");
  const [cost, setCost] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [error, setError] = useState(null);
  const { user } = useAuthContext();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const activity = { title, cost, startDate };
    if (!user) {
      toast.error("You must be logged in to create an activity.");
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
      setCost("");
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
        onChange={(e) => setTitle(e.target.value)}
        value={title}
      />
      <label>Cost</label>
      <input
        type="number"
        onChange={(e) => setCost(e.target.value)}
        value={cost}
      />
      <label>Date</label>
      <DatePicker
        selected={startDate}
        onChange={(date) => setStartDate(date)}
        dateFormat="dd/MM/yyyy" 
      />
      <button>Add Activity</button>
      <Toaster />
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default ActivityForm;
