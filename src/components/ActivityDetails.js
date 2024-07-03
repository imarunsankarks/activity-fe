import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useAuthContext } from "../hooks/useAuthContext";
import { motion } from "framer-motion";

const ActivityDetails = (props) => {
  const { activity, cardVariants, index, onUpdate, onDelete } = props;
  const { user } = useAuthContext();

  const [title, setTitle] = useState(activity.title);
  const [cost, setCost] = useState(activity.cost);

  if (!user) {
    return;
  }

  const deleteActivity = async (id) => {
    const response = await fetch(
      `${process.env.REACT_APP_BE_URL}/api/routes/` + id,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      }
    );

    if (!response.ok) {
      const json = await response.json();
      toast(json.error, {
        icon: "❌",
        style: {
          borderRadius: "12px",
          background: "#333",
          color: "#fff",
          boxShadow: "0 3px 0px rgba(0, 0, 0, 0.1)",
        },
        duration: 1500,
      });
    } else {
      // onUpdate();
      onDelete(id);
      toast("Expense deleted!", {
        icon: "👋",
        style: {
          borderRadius: "12px",
          background: "#333",
          color: "#fff",
          boxShadow: "0 3px 0px rgba(0, 0, 0, 0.1)",
        },
        duration: 1500,
      });
    }
  };

  const updateValue = async (id, date) => {
    const updatedActivity = { title, cost, date };
    const response = await fetch(
      `${process.env.REACT_APP_BE_URL}/api/routes/` + id,
      {
        method: "PATCH",
        body: JSON.stringify(updatedActivity),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      }
    );

    if (!response.ok) {
      const json = await response.json();
      toast(json.error, {
        icon: "❌",
        style: {
          borderRadius: "12px",
          background: "#333",
          color: "#fff",
          boxShadow: "0 3px 0px rgba(0, 0, 0, 0.1)",
        },
        duration: 1500,
      });
    } else {
      const time = await response.json();
      const createdAt = time.createdAt;
      const updatedAt = new Date().toISOString();
      onUpdate({ _id: id, title, cost, date, createdAt, updatedAt });
      // onUpdate();
      toast("Expense updated!", {
        icon: "✌️",
        style: {
          borderRadius: "12px",
          background: "#333",
          color: "#fff",
          boxShadow: "0 3px 0px rgba(0, 0, 0, 0.1)",
        },
        duration: 1500,
      });
    }
  };

  const updatedAtDate = new Date(activity.updatedAt);
  const differenceInMs = Date.now() - updatedAtDate.getTime();
  const differenceInMinutes = Math.floor(differenceInMs / (1000 * 60));
  const differenceInHr =
    differenceInMinutes > 60 ? Math.floor(differenceInMinutes / 60) : 0;

  const showUpdate = (index) => {
    const updateForm = document.querySelectorAll(".update");
    updateForm[index].classList.toggle("show");
  };

  const showDelete = (index) => {
    const deleteForm = document.querySelectorAll(".delete-confirm");
    deleteForm[index].classList.toggle("show");
  };
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(date);
  };

  return (
    <motion.div className="card each-activity" variants={cardVariants}>
      <div className="alter-buttons">
        <button
          onClick={() => {
            showUpdate(index);
          }}
        >
          E
        </button>
        <button
          onClick={() => {
            showDelete(index);
          }}
        >
          x
        </button>
      </div>
      {activity.date && <span>{formatDate(activity.date)}</span>}
      <h3>{activity.title}</h3>
      <p>
        {activity.source && (
          <img className="source-icon" src={`/${activity.source}.png`} alt="" />
        )}
        <span>Rs. </span>
        {activity.cost}
      </p>
      {differenceInHr > 0 ? (
        <span>{`Updated ${differenceInHr} hours ago`}</span>
      ) : (
        <span>{`Updated ${differenceInMinutes} minutes ago`}</span>
      )}

      <form
        className="update"
        onSubmit={(e) => {
          e.preventDefault();
          updateValue(activity._id, activity.date);
          showUpdate(index);
        }}
      >
        <input
          type="text"
          onChange={(e) => {
            setTitle(e.target.value);
          }}
          value={title}
        />
        <input
          type="text"
          onChange={(e) => {
            setCost(e.target.value);
          }}
          value={cost}
        />
        <button>U</button>
        <span
          className="updateFormClose"
          onClick={() => {
            showUpdate(index);
          }}
        >
          C
        </span>
        
      </form>

      <div className="delete-confirm">
        <h4>Delete?</h4>
        <div className="buttons">
          <button
            className="yes"
            onClick={() => {
              deleteActivity(activity._id);
            }}
          >
            Y
          </button>
          <button
            className="no"
            onClick={() => {
              showDelete(index);
            }}
          >
            N
          </button>
        </div>
      </div>
      <Toaster />
    </motion.div>
  );
};

export default ActivityDetails;
