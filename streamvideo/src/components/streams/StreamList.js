import React from "react";
import { connect } from "react-redux";
import { fetchStreams } from "../../actions";
import { Link } from "react-router-dom";

class StreamList extends React.Component{

    componentDidMount(){
        this.props.fetchStreams();
    }

    renderAdmin(stream){
        if(stream.userId === this.props.currentUserId){
            return (
                <div className="right floated content">
                    <Link to={`/streams/edit/${stream.id}`} className="ui button primary">Edit</Link>
                    <Link to={`/streams/delete/${stream.id}`} className="ui button negative">Delete</Link>
                </div>
            );
        }
    }

    renderCreate = () => {
        if(this.props.isSignedIn){
            return (
                <Link to='/streams/new'>
                    <button className="ui button secondary right floated">Create Stream</button>
                </Link>
            );
        }
    }

    renderList(){
        return this.props.streams.map(stream => {
            return ( 
                <div className="item" key = {stream.id}>
                    {this.renderAdmin(stream)}
                    <i className="large middle aligned icon camera"></i>
                    <div className="content">
                        <div className="header">
                            <Link to={`/streams/${stream.id}`} className='header'>
                                {stream.title}
                            </Link>
                        </div>
                        <div className="description">
                            {stream.description}
                        </div> 
                    </div>
                </div>
            );
        });
    }

    render(){
        return (
            <div>
                <h2>Streams</h2>
                <div className="ui celled list">
                    {this.renderList()}
                </div>
                {this.renderCreate()}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        isSignedIn : state.auth.isSignedIn,
        currentUserId : state.auth.userId,
        streams : Object.values(state.streams)
    };
};

export default connect(mapStateToProps,{fetchStreams})(StreamList);