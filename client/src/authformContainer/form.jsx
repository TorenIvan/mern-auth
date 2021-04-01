import React from 'react';

class authForm extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            title: this.props.title,
            subtitle: this.props.subtitle,
            textbutton: this.props.textbutton,
            link: this.props.link,
        }
    }
    render(){
        return (
            <div className="formContainer">
                <div className="header">this.state.title</div>
                <p>this.state.subtitle</p>
                <div className="form">
                    <div className="formElement">
                        
                    </div>
                    <div className="formElement">
                        
                    </div>
                    <div className="formButton">
                        <button>this.props.textbutton</button>
                    </div>
                </div>
            </div>
        );
    }
}