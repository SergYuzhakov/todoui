import React from 'react';
import {useForm} from "react-hook-form";

const PostDataUseForm = () => {

    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const submit = (data) => {
        alert(JSON.stringify(data));
    }

    console.log(watch("description")); // watch input value by passing the name of it

    return (
        /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
        <form onSubmit={handleSubmit(submit)}>
            {/* register your input into the hook by invoking the "register" function */}
            <input defaultValue="test" {...register("description")} />

            {/* include validation with required or other standard HTML validation rules */}
            <input {...register("exampleRequired", { required: true })} />
            {/* errors will return when field validation fails  */}
            {errors.exampleRequired && <span>This field is required</span>}

            <input type="submit" />
        </form>
    );
};

export default PostDataUseForm;