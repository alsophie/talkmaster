import { Datagrid, List, TextField, ReferenceField, NumberField } from "react-admin";

export const ChallengeProgressList = () => {
    return (
        <List>
            <Datagrid rowClick="edit">
                <TextField source="id" />
                <TextField source="userId" />
                <NumberField source="completed" />
                <ReferenceField source="challengeId" reference="challenges" label="Challenge">
                    <TextField source="question" />
                </ReferenceField>
            </Datagrid>
        </List>
    )
}