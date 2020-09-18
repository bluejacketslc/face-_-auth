import React, {Component} from 'react'

class Welcome extends Component{
    render(){
        return <h1>Welcome {this.props.name} eating {this.props.food}</h1>
    }
}

export default Welcome