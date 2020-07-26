import React from "react";
import NewsCard from "./NewsCard";
import { withStyles } from "@material-ui/core/styles";
import { Grid, Typography } from "@material-ui/core";

const styles = (theme) => ({
  title: {
    fontFamily: "monospace",
    margin: "auto",
    margin: theme.spacing(3),
    fontSize: theme.spacing(5),
  },
});

class News extends React.Component {
  constructor(props) {
    super(props);
    this.state = { data: null, query: this.props.query };
  }

  getNews = async () => {
    const headers = new Headers();
    headers.set("Origin", Math.round(Math.random() * 100));
    let response;
    try {
      response = await fetch(
        `${process.env.REACT_APP_NEWS_API}${this.props.query}`
      );
    } catch (err) {
      console.log(err);
    }

    const strResp = await response.text();
    const parsed = new window.DOMParser().parseFromString(strResp, "text/xml");
    let news = parsed.getElementsByTagName("item");
    let data = [];
    for (let i = 0; i < news.length; i++) {
      const item = news[i];
      let title = item
        .getElementsByTagName("description")[0]
        .innerHTML.split("&gt;");

      if (title.length === 5) {
        data.push({
          title: title[1].slice(0, title[1].length - 6),
          link: item.getElementsByTagName("link")[0].innerHTML,
          date: new Date(item.getElementsByTagName("pubDate")[0].innerHTML),
          source: item.getElementsByTagName("source")[0].innerHTML,
        });
      }
    }

    data.sort((a, b) => b.date - a.date);

    this.setState({ data: data.slice(0, 30) });
  };

  componentDidMount() {
    this.getNews();
  }

  render() {
    if (!this.state.data) {
      return <h3>Loading...</h3>;
    } else {
      const mClasses = this.props.classes;

      return (
        <div>
          <Typography className={mClasses.title}>
            {" "}
            {this.state.query} in the News
          </Typography>
          <Grid container spacing={3}>
            {this.state.data.map((item) => {
              return (
                <Grid key={Math.random().toString()} item xs={6}>
                  <NewsCard
                    title={item.title}
                    link={item.link}
                    date={item.date.toString()}
                    source={item.source}
                  />
                </Grid>
              );
            })}
          </Grid>
        </div>
      );
    }
  }
}

export default withStyles(styles, { withTheme: true })(News);
