import { SimpleForm, Edit, TextInput, ReferenceInput, SelectInput, required, NumberInput } from "react-admin";

export const LessonEdit = () => {
    return (
        <Edit>
            <SimpleForm>
                <NumberInput source="id" validate={[required()]} label="Id" />
                <TextInput source="title" validate={[required()]} label="Title" />
                <NumberInput source="order" validate={[required()]} label="Order" />
                <ReferenceInput source="unitId" reference="units" label="Unit">
                    <SelectInput optionText="description" />
                </ReferenceInput>
                
            </SimpleForm>
        </Edit>
    )
}