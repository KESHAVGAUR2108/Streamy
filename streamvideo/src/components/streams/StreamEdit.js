import _ from "lodash";
import React from "react";
import { connect } from "react-redux";
import { fetchStream,editStream } from "../../actions";
import StreamForm from "./streamForm";
import withRouter from "../withRouter";

class StreamEdit extends React.Component{

  componentDidMount(){
    this.props.fetchStream(this.props.params.id)
  }

  onSubmitHandle = (formValues) => {
    this.props.editStream(this.props.params.id,formValues);
  }

  renderEdit = () => {
    if(!this.props.stream){
      return (
        <div className="ui active inverted dimmer centered inline">
          <div className="ui text loader">Loading...</div>
        </div>
      );
    }

    return (
      <div>
        <h2>Edit a stream</h2>
        <StreamForm onSubmit={this.onSubmitHandle} initialValues={_.pick(this.props.stream,'title','description')} />
      </div>
    );
  }

  render(){
    return <div>{this.renderEdit()}</div>;
  }
};

const mapStateToProps = (state,ownProps) => {
  return {stream : state.streams[ownProps.params.id]};
}

export default withRouter(connect(mapStateToProps,{ fetchStream,editStream })(StreamEdit));