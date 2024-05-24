import {SimpleForm, Create, SelectInput, TextInput, ReferenceInput, required, NumberInput } from "react-admin";

export const ChallengeCreate = () => {
    return (
        <Create>
            <SimpleForm>
                <TextInput source="question" validate={[required()]} label="Title" />
                <NumberInput source="order" validate={[required()]} label="Order" />
                <ReferenceInput source="lessonId" reference="lessons" label="Lesson">
                    <SelectInput optionText="title" />
                </ReferenceInput>
            </SimpleForm>
        </Create>
    )
}