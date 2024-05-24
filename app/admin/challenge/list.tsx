import { Datagrid, List, TextField, ReferenceField, NumberField } from "react-admin";

export const ChallengeList = () => {
    return (
        <List>
            <Datagrid rowClick="edit">
                <TextField source="id" />
                <TextField source="question" />
                <NumberField source="order" />
                <ReferenceField source="lessonId" reference="lessons" label="Lesson">
                    <TextField source="title" />
                </ReferenceField>
            </Datagrid>
        </List>
    )
}