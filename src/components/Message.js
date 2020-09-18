import React, {Component} from 'react'
import firebase from '../firebase.js'
import Cookies from 'universal-cookie'
import styles from '../styles/recaptcha.module.css'
class Message extends Component{
    
    
    constructor(){
        super()
        this.state = {
            message: 'Welcome Visitor'
        }
    }
    
    storeToken(token){
        const cookies = new Cookies();
        cookies.set('authtoken', token, {path: '/', expires: new Date(Date.now()+2592000)})
        console.log(cookies.get('authtoken'))
    }

    sendOTP(){
        let recaptcha = new firebase.auth.RecaptchaVerifier('recaptcha')
        let number = '+6285695900268'

        firebase.auth().signInWithPhoneNumber(number, recaptcha).then((e) => {

            let code = prompt('enter the OTP', '')

            if(code == null) return
            e.confirm(code).then((result) => {
                this.storeToken(result.user.refreshToken)
            }).catch((error)=>{
                alert(error)
            })
        })
    }

    changeMessage(){
        this.setState({
            message: 'Thank you for subscribing'
        })
    }

    componentDidMount(){
        const cookies = new Cookies()
        const currentCookie = cookies.get('authtoken')

        if(currentCookie === undefined)
            this.sendOTP()
        else
            console.log(cookies.get('authtoken'))
    }

    render(){
        return (
            <div>
                <div id="recaptcha" className={styles.recaptcha}></div>
                {/* <h1>{this.state.message}</h1> */}
            </div>
        )
    }
}

export default Message