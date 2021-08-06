import React from 'react'
import './Email.css'
import SendIcon from '@material-ui/icons/Send';

function Email() {
    return (
        <div className="email">
            <div className="center">
                <h1 className="qu">
                    Are You Effected By Corona ?
                </h1>
                <p className="para">
                    Don't worry.Hope You get well soon.Share your do's and dont's to help others.
                </p>
                <div className="mailbox">
                    Enter your email
                    <form action="mailto:srigayathrikunta999@gmail.com" method="post" enctype="text/plain">
                        <input className="msg" type="mail" />
                        <button className="send">
                       <SendIcon />
                        </button>
                        
                    </form>
                </div>


            </div>
            <div className="footer">
                <p className="name">
                    Developed in react by Sri
                </p>
            </div>
        </div>
    )
}

export default Email
