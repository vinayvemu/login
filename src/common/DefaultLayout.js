import React, { Component, PropTypes } from 'react';
import Header from './Header';
import "./Header.scss"


class DefaultLayout extends Component {
    render() {
      let current = window.sessionStorage.getItem("currentuser")
            return (
                <div className="mainscreen">
                    <Header />
                    <section className="am-content">
                        <div className="main-content">
                            {this.props.children}
                        </div>
                    </section>
                    <div style={{textAlign:'center',color:"#fff"}}>  <h5>({current})</h5></div>
                </div>
            )
            }
}

export default DefaultLayout;