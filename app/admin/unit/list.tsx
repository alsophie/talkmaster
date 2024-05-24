import { Datagrid, List, TextField, ReferenceField, NumberField } from "react-admin";

export const UnitList = () => {
    return (
        <List>
            <Datagrid rowClick="edit">
                <TextField source="id" />
                <TextField source="title" />
                <TextField source="description" />
                <NumberField source="order" />
                <ReferenceField source="courseId" reference="courses" label="Course">
                    <TextField source="name" />
                </ReferenceField>
            </Datagrid>
        </List>
    )
}