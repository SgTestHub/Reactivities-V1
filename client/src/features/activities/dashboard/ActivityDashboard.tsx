import { Grid2 } from "@mui/material";
import ActivityList from "./ActivityList";
import ActivityDetail from "../details/ActivityDetail";
import ActivityForm from "../form/ActivityForm";
type Props = {
  activities: Activity[];
  onSelectActivity: (id: string) => void;
  onCancelSelectActivity: () => void;
  selectedActivity?: Activity;
  openForm: (id: string) => void;
  closeForm: () => void;
  editMode: boolean;
}
export default function ActivityDashboard({ activities, onSelectActivity, onCancelSelectActivity, selectedActivity, openForm, closeForm, editMode }: Props) {
  return (
    <Grid2 container spacing={3}>
      <Grid2 size={7}>
        <ActivityList activities={activities} onSelectActivity={onSelectActivity} />
      </Grid2>
      <Grid2 size={5}>
        {selectedActivity && !editMode &&
          <ActivityDetail activity={selectedActivity} onCancelSelectActivity={onCancelSelectActivity} openForm={openForm} closeForm={closeForm}
          />
        }

        {editMode && <ActivityForm closeForm={closeForm} activity={selectedActivity} />}
      </Grid2>
    </Grid2>
  )
}
