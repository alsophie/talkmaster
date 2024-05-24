import { SimpleForm, Create, TextInput, required } from "react-admin";

export const CourseCreate = () => {
    return (
        <Create>
            <SimpleForm>
                <TextInput source="name" validate={[required()]} label="Name" />
                <TextInput source="imageSrc" validate={[required()]} label="Image" />
            </SimpleForm>
        </Create>
    )
}