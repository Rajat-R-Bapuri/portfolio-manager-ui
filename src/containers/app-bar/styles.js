export default (theme) => ({
  root: {
    // width: "100%",
    padding: "15px",
    margin: "30px 0px 30px 0px",
    display: "flex",
    justifyContent: "space-between",
    [theme.breakpoints.down("md")]: {
      height: "fit-content",
    },
  },

  text: {
    fontSize: "25px",
  },
});
