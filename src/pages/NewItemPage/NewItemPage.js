import React, { Component } from 'react';
import { connect } from "react-redux";

const temp =() => (
    <div>Hello Add</div>
)

const mapStateToProps = state => {
    return {
       
    }
}

const mapDispatchToProps = dispatch => {
    return {
    };
};

const NewItemPage = connect(mapStateToProps, mapDispatchToProps)(temp);
export default NewItemPage;

