import { useEffect, useState } from "react";
import ActivityDetails from "../components/ActivityDetails";
import ActivityForm from "../components/ActivityForm";
import { useAuthContext } from "../hooks/useAuthContext";

const Home = () => {
  const [activity, setActivity] = useState(null);
  const [filteredActivities, setFilteredActivities] = useState(null);
  const {user} = useAuthContext();

  const fetchData = () => {
    fetch('/api/routes/',{
      headers:{
        'Authorization':`Bearer ${user.token}`
      }
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((json) => {
        const fetchedActivity = json;
        setActivity(fetchedActivity);
        setFilteredActivities(fetchedActivity);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }

  useEffect(() => {
    if (user) {
    fetchData()
    }
    
  }, [user]);


  // In Home component
  // const handleDelete = (id) => {
  //   setActivity(activity.filter(item => item._id !== id));
  // };

  // const handleUpdate = (updatedActivity) => {
  //   console.log(updatedActivity);
  //   setActivity(activity.map(item => {
  //     if (item._id === updatedActivity._id) {
  //       return updatedActivity;
  //     }
  //     return item;
  //   }));
  // };

  // const handleAdd = (newActivity) => {
  //   console.log(activity);
  //   setActivity([newActivity, ...activity]);
  // }

  const updateData = () => {
    fetchData();
  }

  const handleUpdate = (selectedDate) => {
    if(selectedDate){
      const date = new Date(selectedDate); 
      setFilteredActivities(activity.filter(item => {
        const itemDate = new Date(item.date);
        return itemDate.toDateString() === date.toDateString();
      }));
    }else{
      setFilteredActivities(activity);
    }
  };
  

  return (
    <div className="home">
      <div>
        <input type="date" onChange={(e)=>{handleUpdate(e.target.value)}} />
      </div>
      <div className="all-activities">
        {filteredActivities &&
          filteredActivities.map((item, index) => (
            <ActivityDetails
              activity={item}
              key={item._id}
              index={index}
              onUpdate={updateData}
            />
          ))}
      </div>
      <ActivityForm
        onUpdate={updateData} />
    </div>
  );

};

export default Home;
