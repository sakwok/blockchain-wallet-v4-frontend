import * as AT from './actionTypes'

export const updateEmail = (email) => ({ type: AT.UPDATE_EMAIL, payload: { email } })

export const verifyEmail = (code) => ({ type: AT.VERIFY_EMAIL, payload: { code } })

export const verifyEmailCode = (code) => ({ type: AT.VERIFY_EMAIL_CODE, payload: { code } })

export const sendConfirmationCodeEmail = (email) => ({ type: AT.SEND_CONFIRMATION_CODE_EMAIL, payload: { email } })

export const getGoogleAuthenticatorSecretUrl = () => ({ type: AT.GET_GOOGLE_AUTHENTICATOR_SECRET_URL })

export const verifyGoogleAuthenticator = (code) => ({ type: AT.VERIFY_GOOGLE_AUTHENTICATOR, payload: { code } })

export const setYubikey = (code) => ({ type: AT.SET_YUBIKEY, payload: { code } })

export const sendMobileVerificationCode = (mobile) => ({ type: AT.SEND_MOBILE_VERIFICATION_CODE, payload: { mobile } })

export const verifyMobile = (code) => ({ type: AT.VERIFY_MOBILE_CODE, payload: { code } })

export const disableTwoStep = () => ({ type: AT.DISABLE_TWO_STEP, payload: { authType: '0' } })
