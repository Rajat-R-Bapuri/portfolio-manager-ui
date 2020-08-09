export default (theme) => ({
  root: {
    padding: 20,
    marginBottom: 5,
    [theme.breakpoints.up("sm")]: {
      height: theme.spacing(17),
    },
    [theme.breakpoints.down("sm")]: {
      minHeight: "fit-content",
    },
    borderRadius: "20px",
    display: "flex",
    justifyContent: "space-between",
  },
  title: {
    fontSize: 18,
  },
  pos: {
    marginBottom: 12,
  },
});
