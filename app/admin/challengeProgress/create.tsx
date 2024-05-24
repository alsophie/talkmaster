import {SimpleForm, Create, SelectInput, TextInput, ReferenceInput, required, NumberInput } from "react-admin";

export const ChallengeProgressCreate = () => {
    return (
        <Create>
            <SimpleForm>
                <TextInput source="userId" validate={[required()]} label="User" />
                <NumberInput source="completed" validate={[required()]} label="Completed" />
                <ReferenceInput source="challengeId" reference="challenges" label="Challenge">
                    <SelectInput optionText="question" />
                </ReferenceInput>
            </SimpleForm>
        </Create>
    )
}