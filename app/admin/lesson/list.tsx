import { Datagrid, List, TextField, ReferenceField, NumberField } from "react-admin";

export const LessonList = () => {
    return (
        <List>
            <Datagrid rowClick="edit">
                <TextField source="id" />
                <TextField source="title" />
                <NumberField source="order" />
                <ReferenceField source="unitId" reference="units" label="Unit">
                    <TextField source="description" />
                </ReferenceField>
            </Datagrid>
        </List>
    )
}