import { SimpleForm, Create, SelectInput, TextInput, ReferenceInput, required, NumberInput } from "react-admin";

export const UnitCreate = () => {
    return (
        <Create>
            <SimpleForm>
                <TextInput source="title" validate={[required()]} label="Title" />
                <TextInput source="description" validate={[required()]} label="Description" />
                <NumberInput source="order" validate={[required()]} label="Order" />
                <ReferenceInput source="courseId" reference="courses" label="Course">
                    <SelectInput optionText="name" />
                </ReferenceInput>
            </SimpleForm>
        </Create>
    )
}