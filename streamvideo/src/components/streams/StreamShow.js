import React from "react";
import { fetchStream } from "../../actions";
import { connect } from "react-redux";
import flv from 'flv.js'
import withRouter from "../withRouter";

class StreamShow extends React.Component{
    
    constructor(props){
        super(props);

        this.videoRef = React.createRef();
    }

    componentDidMount(){
        const {id} = this.props.params;
        this.props.fetchStream(id);

        this.buildPlayer();
    }

    componentDidUpdate(){
        this.buildPlayer();
    }

    componentWillUnmount(){
        if(this.player)
            this.player.destroy();
    }

    buildPlayer(){
        if(this.player || !this.props.stream){
            return;
        }

        const {id} = this.props.params;

        this.flvPlayer = flv.createPlayer({
            type: 'flv',
            url: `http://localhost:8000/live/${id}.flv`
        });
        this.flvPlayer.attachMediaElement(this.videoRef.current);
        this.flvPlayer.load();
    }
    
    render(){
        if(!this.props.stream){
            return (
                <div className="ui active inverted dimmer centered inline">
                    <div className="ui text loader">Loading...</div>
                </div>
            );
        }

        const {title,description} = this.props.stream;
        return (
            <div>
                <video ref={this.videoRef} controls style={{width:'100%',height:'65vh'}} />
                <div className="ui segment">
                    <h2>{title}</h2>
                    <h5>{description}</h5>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state,ownProps) =>{
    return {stream : state.streams[ownProps.params.id]};
}

export default withRouter(connect(mapStateToProps,{fetchStream})(StreamShow));