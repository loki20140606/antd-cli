/**
 * Created by Loki on 2017/1/20.
 */
import React, {Component} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {Form, Icon, Input, Button, Checkbox, Row, Col} from 'antd'
import {LocationCascader} from './widgets'
import userAction from '../actions/userAction'
import Style from '../assets/styles/components/Login.scss'

const FormItem = Form.Item

const mapDispatchToProps = (dispatch) => ({
    userAction: bindActionCreators(userAction, dispatch),
})

class Login extends Component {
    static propTypes = {}//props 类型检查

    static defaultProps = {}//默认 props

    static contextTypes = {
    }

    constructor(props) {
        super(props)
        this.state = {
            captchaUrl: ''
        }
    }//初始化 state

    componentWillMount() {
        this.getCaptcha()
    }//插入 DOM 前

    componentDidMount() {
    }//插入 DOM 后

    componentWillReceiveProps(nextProps) {
    }//接收新 props

    shouldComponentUpdate(nextProps, nextState) {
        return true;
    }//更新判断

    componentWillUpdate(nextProps, nextState) {
    }//更新前

    componentDidUpdate(prevProps, prevState) {
    }//更新后

    componentWillUnmount() {
    }//卸载前

    login = (e) => {
        e.preventDefault()
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.props.userAction.setUser({
                    isLogin: true
                })
            }
        })
    }

    getCaptcha = () => {

    }

    render() {
        const {getFieldDecorator} = this.props.form;
        return (
            <div className={Style.box}>
                <div className={Style.logo}>
                    管理后台
                </div>
                <div className={Style.content}>
                    <Form onSubmit={this.login} className={Style.form}>
                        <FormItem>
                            {getFieldDecorator('username', {
                                rules: [
                                    {required: true, message: '请输入您的账户！'}
                                ],
                            })(
                                <Input addonBefore={<Icon type="user"/>} placeholder="账户"/>
                            )}
                        </FormItem>
                        <FormItem>
                            {getFieldDecorator('password', {
                                rules: [{required: true, message: '请输入您的密码！'}],
                            })(
                                //<Input addonBefore={<Icon type="lock"/>} type="password" placeholder="密码"/>
                              <LocationCascader/>
                            )}
                        </FormItem>
                        <FormItem className={Style.key}>
                            {getFieldDecorator('key')(
                                <Input/>
                            )}
                        </FormItem>
                        <Row gutter={20}>
                            <Col span={15}>
                                <FormItem>
                                    {getFieldDecorator('challenge', {
                                        rules: [{required: true, message: '请输入验证码！'}],
                                    })(
                                        <Input addonBefore={<Icon type="qrcode"/>} placeholder="验证码"/>
                                    )}
                                </FormItem>
                            </Col>
                            {
                                this.state.captchaUrl &&
                                <Col span={9}>
                                    <img className={Style.captcha} src={this.state.captchaUrl}
                                         onClick={this.getCaptcha}/>
                                </Col>
                            }
                        </Row>
                        <FormItem>
                            <Button type="primary" htmlType="submit" className={Style.submit}>
                                登录
                            </Button>
                            {window.localStorage &&
                            getFieldDecorator('remember', {
                                valuePropName: 'checked',
                                initialValue: false,
                            })(
                                <Checkbox>自动登录[7天有效]</Checkbox>
                            )}
                        </FormItem>
                    </Form>
                </div>
            </div>
        )
    }//渲染
}

export default connect(
    null,
    mapDispatchToProps
)(Form.create()(Login))