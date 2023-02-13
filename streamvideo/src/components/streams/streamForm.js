import React from "react";
import { Field, reduxForm } from "redux-form";

class StreamForm extends React.Component{
    
    renderError = (meta) => {
        if( meta.touched && meta.error){
            return(
                <div className="ui error message">
                    {meta.error}
                </div>
            );
        }
    }

    renderInput = (formProps) => {
        const meta = formProps.meta;
        const className = `field ${ meta.touched && meta.error ? 'error' : '' }`;
        return (
            <div className={className}>
                <label>{formProps.label}</label>
                <input {...formProps.input} autoComplete = 'off' />
                {this.renderError(meta)}
            </div>
        );
    }

    onSubmitHandle = (formValues) => {
        this.props.onSubmit(formValues);
    }

    render(){
        return (
            <form onSubmit={this.props.handleSubmit(this.onSubmitHandle)} className="ui form error">
                <Field name="title" component={this.renderInput} label="Enter title" />
                <Field name="description" component={this.renderInput} label="Enter Description" />
                <button className="ui button primary">Submit</button>
            </form>
        );
    }
}

const validate = formValues => {
    const errors = {};

    if(!formValues.title){
        errors.title = 'You must enter a title';
    }

    if(!formValues.description){
        errors.description = 'You must enter a description';
    }

    return errors;
}

export default reduxForm({
    form : 'streamForm',
    validate
})(StreamForm);