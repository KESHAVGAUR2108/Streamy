import React from "react";
import Modal from '../Modal';
import withRouter from "../withRouter";
import { deleteStream,fetchStream } from "../../actions";
import {connect} from 'react-redux';
import { Link } from "react-router-dom";
import history from "../../customRoutes/history";

class StreamDelete extends React.Component{

    componentDidMount(){
        this.props.fetchStream(this.props.params.id);
    }

    renderDelete = () => {
        this.props.deleteStream(this.props.params.id);
    }

    onDismiss = () => {
        history.push('/')
    }

    renderActions = () => {
        return (
            <React.Fragment>
                <div onClick={this.renderDelete} className="ui red button">Delete</div>
                <Link to='/' className="ui button">Cancel</Link>
            </React.Fragment>
        );
    }

    renderContent = () => {
        if(!this.props.stream){
            return 'Are you sure you want to delete this stream?';
        }

        return `Are you sure you want to delete the stream with title : ${this.props.stream.title}`;
    }
    
    render(){
        return (
            <Modal content={this.renderContent()} actions={this.renderActions()} onDismiss = {this.onDismiss}/>
        );
    }
}

const mapStateToProps = (state,ownProps) => {
    return {stream : state.streams[ownProps.params.id]};
}

export default withRouter(connect(mapStateToProps,{deleteStream,fetchStream})(StreamDelete));