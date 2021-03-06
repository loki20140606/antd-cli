import React, {Component}  from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import userAction from '../actions/userAction'

const mapStateToProps = (state) => ({
    user: state.user
})

const mapDispatchToProps = (dispatch) => ({
    userAction: bindActionCreators(userAction, dispatch)
})

class Home extends React.Component{
    static propTypes = {
    }//props 类型检查

    render() {
        return (
            <p style={{fontSize: 20}}>
                <strong>{this.props.user.name}</strong>，您好，欢迎使用后台管理系统！
            </p>
        );
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Home)