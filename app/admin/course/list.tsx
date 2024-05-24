import { Datagrid, List, TextField } from "react-admin";

export const CourseList = () => {
    return (
        <List>
            <Datagrid rowClick="edit">
                <TextField source="id" />
                <TextField source="name" />
                <TextField source="imageSrc" />
            </Datagrid>
        </List>
    )
}