import { Grid, Slide, Typography } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import React from "react";
import { connect } from "react-redux";
import NewsCard from "../../components/news-card/news-card";
import fetchNews from "../../utils/fetch-news";
import styles from "./styles";

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
    if (this.state.data === null) {
      console.log("dispactch");
      this.props.dispatch(fetchNews(this.state.query));
    }
  }

  render() {
    console.log(this.state);
    if (!this.props.data) {
      return <h3>Loading...</h3>;
    } else {
      const mClasses = this.props.classes;

      return (
        <div>
          <Typography className={mClasses.title}>
            {this.state.query} in the News
          </Typography>
          <Slide
            direction="up"
            in={true}
            mountOnEnter
            unmountOnExit
            timeout={500}
          >
            <Grid container spacing={3} style={{ flexGrow: 1 }}>
              {this.props.data.map((item) => {
                return (
                  <Grid
                    key={Math.random().toString()}
                    item
                    xs={12}
                    lg={6}
                    md={6}
                  >
                    <NewsCard
                      title={item.headline}
                      link={item.url}
                      date={new Date(item.datetime * 1000).toString()}
                      source={item.source}
                      image={item.image}
                      summary={item.summary}
                    />
                  </Grid>
                );
              })}
            </Grid>
          </Slide>
        </div>
      );
    }
  }
}

function mapStateToProps(state, ownProps) {
  return {
    data: state.newsReducer[ownProps.query],
  };
}

export default connect(mapStateToProps)(
  withStyles(styles, { withTheme: true })(News)
);
