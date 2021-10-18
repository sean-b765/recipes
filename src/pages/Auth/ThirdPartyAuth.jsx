import React from 'react'
import GoogleLogin from 'react-google-login'

const ThirdPartyAuth = ({ onSuccessFacebook, onSuccessGoogle }) => {
	return (
		<div>
			<GoogleLogin
				clientId="544966638845-agilmeq086cka6f2cpi30d4559g9u4a4.apps.googleusercontent.com"
				onSuccess={onSuccessGoogle}
				className="btn btn--no-border btn--no-bg"
				aria-label="Login with a Google account"
			></GoogleLogin>
		</div>
	)
}

export default ThirdPartyAuth
