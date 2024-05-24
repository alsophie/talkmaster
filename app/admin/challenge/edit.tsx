import { SimpleForm, Edit, TextInput, ReferenceInput, SelectInput, required, NumberInput } from "react-admin";

export const ChallengeEdit = () => {
    return (
        <Edit>
            <SimpleForm>
                <NumberInput source="id" validate={[required()]} label="Id" />
                <TextInput source="question" validate={[required()]} label="Question" />
                <NumberInput source="order" validate={[required()]} label="Order" />
                <ReferenceInput source="lessonId" reference="lessons" label="Lesson">
                    <SelectInput optionText="title" />
                </ReferenceInput>
                
            </SimpleForm>
        </Edit>
    )
}