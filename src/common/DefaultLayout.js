import React, { Component, PropTypes } from 'react';
import Header from './Header';
import "./Header.scss"


class DefaultLayout extends Component {
    render() {
      
            return (
                <div className="mainscreen">
                    <Header />
                    <section className="am-content">
                        <div className="main-content">
                            {this.props.children}
                        </div>
                    </section>
                </div>
            )
            }
}

export default DefaultLayout;