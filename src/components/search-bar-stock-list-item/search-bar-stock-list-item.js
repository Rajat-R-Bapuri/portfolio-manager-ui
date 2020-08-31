import {Box, IconButton, Typography, withStyles} from "@material-ui/core";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import DeleteIcon from "@material-ui/icons/Delete";
import React, {Component} from "react";
import styles from "./styles";

class StockListItem extends Component {
    render() {
        const mClasses = this.props.classes;
        return (
            <Box
                borderBottom={1}
                className={mClasses.listItem}
                onClick={(event) => this.props.handleAdd(this.props.symbol, event)}
            >
                <div>
                    <Typography>{this.props.symbol}</Typography>
                    <Typography color="textSecondary" style={{fontSize: "12px"}}>
                        {this.props.name}
                    </Typography>
                </div>
                <IconButton>
                    {this.props.status ? (
                        <DeleteIcon color="primary"/>
                    ) : (
                        <AddCircleIcon style={{color: "green"}}/>
                    )}
                </IconButton>
            </Box>
        );
    }
}

export default withStyles(styles, {withTheme: true})(StockListItem);
