import { Box, Button, Paper, TextField, Typography } from "@mui/material";
import type { SyntheticEvent } from "react";
import { useActivities } from "../../../lib/hooks/useActivities";
import { useNavigate, useParams } from "react-router";

export default function ActivityForm() {
    const {id} = useParams<{id:string}>();
    const {updateActivity,createActivity, activity, isLoadingActivity} = useActivities(id);
    const navigate = useNavigate();
    const handleSubmit = async (event: SyntheticEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
         const data: Record<string, FormDataEntryValue> = {};
        for (const [key, value] of formData.entries()) {
            data[key] = value;
        }
        if (activity) {
            data.id = activity.id;
            await updateActivity.mutateAsync(data as unknown as Activity);
            navigate(`/activities/${activity.id}`);

        }
        else {
            await createActivity.mutate(data as unknown as Activity, {
                onSuccess: (id) => {
                    navigate(`/activities/${id}`);
                }
            });

        }
    };
 if(isLoadingActivity) return <Typography variant="h5">Loading activity...</Typography>
    return (
        <Paper sx={{ borderRadius: 3, padding: 3 }}>
            <Typography variant="h4" gutterBottom color="primary">
               {activity ? 'Edit' : 'Create'} activity
            </Typography>
            <Box component='form' onSubmit={handleSubmit} display='flex' flexDirection='column' gap={3}>
                <TextField name='title' label='Title' defaultValue={activity?.title} />
                <TextField name='description' label='Description' multiline rows={3} defaultValue={activity?.description} />
                <TextField name='category' label='Category' defaultValue={activity?.category} />
                <TextField name='date' label='Date' type="date" defaultValue={activity?.date ? new Date(activity.date).toISOString().split('T')[0] : new Date().toISOString().split('T')[0]} />
                <TextField name='city' label='City' defaultValue={activity?.city} />
                <TextField name='venue' label='Venue' defaultValue={activity?.venue} />
                <Box display='flex' justifyContent='end' gap={3}>
                    <Button color="inherit">Cancel</Button>
                    <Button type="submit"  color="success" variant="contained" disabled={updateActivity.isPending || createActivity.isPending}>
                        Submit
                    </Button>
                </Box>
            </Box>
        </Paper>
    )
}