const styles = {
  pageWrap: {
    py: { xs: 2, md: 4 },
  },
  container: {
    mt: 1,
  },
  backButton: {
    textTransform: "none",
    fontWeight: 700,
    px: 2,
    py: 0.8,
    borderRadius: 99,
    color: "#2c4d3b",
    borderColor: "rgba(44, 77, 59, 0.45)",
    bgcolor: "rgba(255,255,255,0.9)",
    "&:hover": {
      borderColor: "#2c4d3b",
      bgcolor: "#f3f7f5",
    },
    mt: 3,
    mb: 1.5,
  },
  article: {
    border: "1px solid rgba(20, 45, 33, 0.08)",
    borderRadius: 3,
    p: { xs: 2.5, md: 3.5 },
    backgroundColor: "#fff",
    boxShadow: "0 10px 26px rgba(13, 34, 24, 0.08)",
  },
  articleContent: {
    color: "text.secondary",
    fontFamily: '"Inter", "Segoe UI", sans-serif',
    fontSize: { xs: "1rem", md: "1.05rem" },
    lineHeight: 1.75,
    "& p": { margin: 0, padding: 0 },
    "& br": { display: "inline", lineHeight: "1", margin: 0, padding: 0 },
    "& h1,& h2,& h3,& h4,& h5,& h6": {
      marginTop: "0.45em",
      marginBottom: "0.2em",
      lineHeight: 1.25,
      color: "text.primary",
    },
  },
};

export default styles;
