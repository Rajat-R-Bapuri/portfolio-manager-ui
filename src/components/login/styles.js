export default (theme) => ({
  root: {
    minHeight: "90vh",
  },
  emailSignInButton: {
    fontSize: "18px",
    margin: "10px",
    width: "300px",
    color: "black",
    backgroundColor: "white",
  },
  googleSignInGridItem: {
    margin: "10px",
    width: "500px",
    display: "flex",
    justifyContent: "center",
  },
  title: {
    fontFamily: "monospace",
    margin: theme.spacing(3),
    fontSize: theme.spacing(4.5),
  },
  signUpText: { justifyContent: "center", display: "flex" },
  gButton: {
    width: "300px !important",
    display: "flex !important",
    justifyContent: "center !important",
  },
});
