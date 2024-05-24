import { Datagrid, List, TextField, ReferenceField, NumberField } from "react-admin";

export const ChallengeOptionList = () => {
    return (
        <List>
            <Datagrid rowClick="edit">
                <TextField source="id" />
                <TextField source="text" />
                <NumberField source="correct" />
                <ReferenceField source="challengeId" reference="challenges" label="Challenge">
                    <TextField source="question" />
                </ReferenceField>
            </Datagrid>
        </List>
    )
}