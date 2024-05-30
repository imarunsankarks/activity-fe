import { useEffect, useState } from "react";
import ActivityDetails from "../components/ActivityDetails";
import { useAuthContext } from "../hooks/useAuthContext";
import { motion } from "framer-motion";

const Home = () => {
  const [activity, setActivity] = useState([]);
  const [filteredActivities, setFilteredActivities] = useState([]);
  const { user } = useAuthContext();
  const [total, setTotal] = useState(0);
  const [selectedType, setSelectedType] = useState("all");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");

  const fetchData = () => {
    fetch("/api/routes/", {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((json) => {
        setActivity(json);
        setFilteredActivities(json);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  useEffect(() => {
    if (user) {
      fetchData();
    }
  }, [user]);

  const updateData = () => {
    fetchData();
  };

  const handleUpdate = (selectedDate) => {
    const month = document.getElementById("month-filter");
    month.value = "";
    setSelectedType("all");
    setSelectedMonth("");
    if (selectedDate) {
      const date = new Date(selectedDate);
      setSelectedDate(date.toDateString());
      setFilteredActivities(
        activity.filter((item) => {
          const itemDate = new Date(item.date);
          return itemDate.toDateString() === date.toDateString();
        })
      );
    } else {
      setFilteredActivities(activity);
    }
  };

  const monthUpdate = (selectedDate) => {
    const day = document.getElementById("day-filter");
    day.value = "";
    setSelectedType("all");
    setSelectedDate("");
    if (selectedDate) {
      const date = new Date(selectedDate);
      setSelectedMonth(date.getMonth());
      setFilteredActivities(
        activity.filter((item) => {
          const itemDate = new Date(item.date);
          return (
            itemDate.getMonth() === date.getMonth() &&
            itemDate.getYear() === date.getYear()
          );
        })
      );
    } else {
      setFilteredActivities(activity);
    }
  };

  const typeUpdate = (selectedType) => {
    setSelectedType(selectedType);
    if (selectedMonth || selectedDate) {
      if (selectedType === "all") {
        setFilteredActivities(
          activity.filter((item) => {
            const itemDate = new Date(item.date);
            return (
              itemDate.getMonth() === selectedMonth ||
              itemDate.toDateString() === selectedDate
            );
          })
        );
      } else {
        setFilteredActivities(
          activity.filter((item) => {
            const itemDate = new Date(item.date);
            return (
              (item.type === selectedType &&
                itemDate.getMonth() === selectedMonth) ||
              (item.type === selectedType &&
                itemDate.toDateString() === selectedDate)
            );
          })
        );
      }
    } else {
      if (selectedType === "all") {
        setFilteredActivities(activity);
      } else {
        setFilteredActivities(
          activity.filter((item) => {
            return item.type === selectedType;
          })
        );
      }
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  useEffect(() => {
    if (filteredActivities) {
      const totalCost = filteredActivities.reduce(
        (acc, item) => acc + item.cost,
        0
      );
      setTotal(totalCost);
    }
  }, [filteredActivities]);

  return (
    <div className="home">
      <h1>
        <span>Hi, </span>
        {user.userid.split("@")[0]}
      </h1>
      <div className="dateFilter">
        <div className="day-input">
          <input
            type="date"
            onChange={(e) => {
              handleUpdate(e.target.value);
            }}
            id="day-filter"
          />
          <label>D</label>
        </div>
        <div className="month-input">
          <input
            type="month"
            onChange={(e) => {
              monthUpdate(e.target.value);
            }}
            id="month-filter"
          />
          <label>M</label>
        </div>
      </div>
      <select
        className="typeFilter"
        value={selectedType}
        onChange={(e) => typeUpdate(e.target.value)}
      >
        <option value="all">All</option>
        <option value="expense">Expense</option>
        <option value="savings">Savings</option>
      </select>

      <motion.div
        className="card-list all-activities"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {filteredActivities.map((item, index) => (
          <ActivityDetails
            activity={item}
            key={item._id}
            index={index}
            onUpdate={updateData}
            cardVariants={cardVariants}
          />
        ))}
      </motion.div>
      <p className="total">
        Your {selectedType} &nbsp;
        <span
          style={{
            color:
              selectedType === "savings"
                ? "#479e39"
                : selectedType === "expense"
                ? "#e23d3d"
                : "#f3f3f3",
          }}
        >
          {total}
        </span>
      </p>
    </div>
  );
};

export default Home;
