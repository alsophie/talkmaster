import { SimpleForm, Edit, TextInput, ReferenceInput, SelectInput, required, NumberInput } from "react-admin";

export const ChallengeOptionEdit = () => {
    return (
        <Edit>
            <SimpleForm>
                <NumberInput source="id" validate={[required()]} label="Id" />
                <TextInput source="text" validate={[required()]} label="Text" />
                <NumberInput source="correct" validate={[required()]} label="Correct" />
                <ReferenceInput source="challengeId" reference="challenges" label="Challenge">
                    <SelectInput optionText="question" />
                </ReferenceInput>
                
            </SimpleForm>
        </Edit>
    )
}