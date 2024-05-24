import { SimpleForm, Edit, TextInput, required, NumberInput } from "react-admin";

export const CourseEdit = () => {
    return (
        <Edit>
            <SimpleForm>
                <NumberInput source="id" validate={[required()]} label="Id" />
                <TextInput source="name" validate={[required()]} label="Name" />
                <TextInput source="imageSrc" validate={[required()]} label="Image" />
            </SimpleForm>
        </Edit>
    )
}