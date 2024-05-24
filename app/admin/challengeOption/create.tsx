import {SimpleForm, Create, SelectInput, TextInput, ReferenceInput, required, NumberInput } from "react-admin";

export const ChallengeOptionCreate = () => {
    return (
        <Create>
            <SimpleForm>
                <TextInput source="text" validate={[required()]} label="Text" />
                <NumberInput source="correct" validate={[required()]} label="Correct" />
                <ReferenceInput source="challengeId" reference="challenges" label="Challenge">
                    <SelectInput optionText="question" />
                </ReferenceInput>
            </SimpleForm>
        </Create>
    )
}