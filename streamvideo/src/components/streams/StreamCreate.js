import React from "react";
import { streamCreate } from "../../actions";
import { connect } from "react-redux";
import StreamForm from "./streamForm";

class StreamCreate extends React.Component{

    onSubmitHandle = (formValues) => {
        this.props.streamCreate(formValues);
    }

    render(){
        return (
            <div>
                <h2>Create a stream</h2>
                <StreamForm onSubmit ={this.onSubmitHandle} />
            </div>
        );
    }
}

export default connect(null,{streamCreate})(StreamCreate);