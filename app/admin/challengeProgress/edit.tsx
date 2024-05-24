import { SimpleForm, Edit, TextInput, ReferenceInput, SelectInput, required, NumberInput } from "react-admin";

export const ChallengeProgressEdit = () => {
    return (
        <Edit>
            <SimpleForm>
                <NumberInput source="id" validate={[required()]} label="Id" />
                <TextInput source="userId" validate={[required()]} label="User" />
                <NumberInput source="completed" validate={[required()]} label="Completed" />
                <ReferenceInput source="challengeId" reference="challenges" label="Challenge">
                    <SelectInput optionText="question" />
                </ReferenceInput>
                
            </SimpleForm>
        </Edit>
    )
}