import {Card, CardActionArea, CardContent} from "@material-ui/core";
import {withStyles} from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import React from "react";
import styles from "./styles";

class NewsCard extends React.Component {
    handleClick = (url) => {
        console.log();
        window.open(url, "_blank");
    };

    render() {
        const mClasses = this.props.classes;

        return (
            <Card elevation={5}>
                <CardActionArea onClick={() => this.handleClick(this.props.link)}>
                    <img
                        src={this.props.image}
                        style={{height: "auto", width: "100%"}}
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                            {this.props.title}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                            {this.props.summary}
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>

            // <Paper elevation={5} className={mClasses.root}>
            //   <div>
            //     <Typography className={mClasses.title} gutterBottom>
            //       <Link href={this.props.link} target="_external" color="inherit">
            //         {this.props.title}
            //       </Link>
            //     </Typography>

            //     <Typography color="textSecondary">
            //       {this.props.source} &bull;{" "}
            //       {moment(new Date()).to(new Date(this.props.date))}
            //     </Typography>
            //   </div>

            //   <div style={{ height: "100px", width: "100px" }}>
            //     <img
            //       src={this.props.image}
            //       style={{ height: "auto", width: "100%" }}
            //     />
            //   </div>
            // </Paper>
        );
    }
}

export default withStyles(styles, {withTheme: true})(NewsCard);
