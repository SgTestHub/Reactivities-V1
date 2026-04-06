import {  useState } from "react"
import { Box, Container, CssBaseline, Typography } from "@mui/material";
import axios from "axios";
import NavBar from "./NavBar";
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard";
import { useQuery } from "@tanstack/react-query";
function App() {

  const [selectedActivity, setSelectedActivity] = useState<Activity | undefined>(undefined);
  const [editMode, setEditMode] = useState(false);

  const { data: activities, isPending } = useQuery({
    queryKey: ['activities'],
    queryFn: async () => {
      const response = await axios.get<Activity[]>('https://localhost:5001/api/activities');
      return response.data;
    }
  });

  const handleSelectActivity = (id: string) => {
    setSelectedActivity(activities!.find(x => x.id === id))
  }
  const handleCancelSelectActivity = () => {
    setSelectedActivity(undefined);
    setSelectedActivity(undefined);
  }
  const handleFormOpen = (id?: string) => {
    if (id) {
      handleSelectActivity(id);
    } else {
      handleCancelSelectActivity();
    }
    setEditMode(true);
  }
  const handleFormClose = () => {
    setEditMode(false);
  }

  const handleSubmitForm = (activity: Activity) => {
    // if (activity.id) {
    //   //setActivities([...activities.filter(x => x.id !== activity.id), activity]);
    //   setActivities(activities.map(x => x.id === activity.id ? activity : x));
    //   setSelectedActivity(activity);
    // } else {
    //   const newActivity = { ...activity, id: crypto.randomUUID() };
    //   setSelectedActivity(newActivity);
    //   setActivities([...activities, newActivity]);
    // }
    console.log(activity);
    setEditMode(false);
  }

  const handleDeleteActivity = (id: string) => {
    //setActivities(activities.filter(x => x.id !== id));
    console.log(id);
    setEditMode(false);
  }

  return (
    <Box sx={{ bgcolor: "#eeeeee", minHeight: '100vh' }}>
      <CssBaseline />
      <NavBar openForm={handleFormOpen} />
      <Container maxWidth='xl' sx={{ mt: 3 }}>
        {!activities || isPending ? (<Typography variant="h3" color="primary">Loading...</Typography> ) : (
        <ActivityDashboard activities={activities}
          onSelectActivity={handleSelectActivity}
          onCancelSelectActivity={handleCancelSelectActivity}
          selectedActivity={selectedActivity}
          editMode={editMode}
          openForm={handleFormOpen}
          closeForm={handleFormClose}
          submitForm={handleSubmitForm}
          deleteActivity={handleDeleteActivity}
        />
        )}
      </Container>
    </Box>
  )
}

export default App
