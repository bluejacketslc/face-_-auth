import React, {useState, useEffect} from 'react'
import firebase from '../firebase.js'
import Cookies from 'universal-cookie'
import styles from '../styles/recaptcha.module.css'

const storeToken = (token) => {
    const cookies = new Cookies();
    cookies.set('authtoken', token, {path: '/', expires: new Date(Date.now()+2592000)})
    console.log(cookies.get('authtoken'))
}

const sendOTP = () => {
    let recaptcha = new firebase.auth.RecaptchaVerifier('recaptcha')
    let number = '+6285695900268'

    firebase.auth().signInWithPhoneNumber(number, recaptcha).then((e) => {

        let code = prompt('enter the OTP', '')

        if(code == null) return
        e.confirm(code).then((result) => {
            storeToken(result.user.refreshToken)
        }).catch((error)=>{
            alert(error)
        })
    })
}

const OTP = (props) => {

    useEffect(() => {
        const cookies = new Cookies()
        const currentCookie = cookies.get('authtoken')

        if(currentCookie === undefined)
            sendOTP()
        else
            console.log(cookies.get('authtoken'))
    }, [])

    return (
        <div className = {styles.modal}>
            <div>{props.name}</div>
            <div id="recaptcha" className={styles.recaptcha}></div>
        </div>
    )
}

export default OTP