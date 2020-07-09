import React, { createRef } from 'react';


export default class StockPrice extends React.Component {

    constructor(props) {
        super(props);
        let { price } = props;
    }

    render() {
        return <h2>{this.props.price}</h2>
    }
}