const styles = {
  gridItem: {
    pb: 3,
  },
  cardStack: {
    flexDirection: { xs: "column-reverse", md: "row" },
    gap: 2.5,
    border: "1px solid rgba(0,0,0,0.08)",
    borderRadius: 3,
    p: { xs: 2, md: 3 },
    backgroundColor: "#fff",
    boxShadow: "0 8px 24px rgba(13,38,59,0.06)",
  },
  contentContainer: {
    flexGrow: 1,
  },
  title: {
    fontFamily: '"Merriweather", "Georgia", serif',
    fontSize: { xs: "1.55rem", md: "1.9rem" },
    fontWeight: 700,
    letterSpacing: "-0.4px",
    lineHeight: 1.2,
    mb: 1,
  },
  date: {
    fontStyle: "italic",
    color: "text.secondary",
    display: "block",
    mb: 1.5,
  },
  postPreview: {
    color: "text.secondary",
    fontFamily: '"Inter", "Segoe UI", sans-serif',
    lineHeight: 1.6,
    "& p": { margin: 0, padding: 0 },
    "& br": { display: "inline", lineHeight: "1", margin: 0, padding: 0 },
    "& h1,& h2,& h3,& h4,& h5,& h6": { margin: 0, padding: 0 },
  },
  actionRow: {
    mt: 2.5,
    flexWrap: "wrap",
  },
  readMoreButton: {
    textTransform: "none",
    fontWeight: 700,
    bgcolor: "#6C7A89",
    color: "#fff",
    px: 2.6,
    py: 1,
    borderRadius: 2,
    boxShadow: "none",
    "&:hover": { bgcolor: "#556270", boxShadow: "none" },
  },
  actionButton: {
    textTransform: "none",
    fontWeight: 600,
  },
  deleteButton: {
    textTransform: "none",
    fontWeight: 600,
    color: "error.main",
  },
  imageColumn: {
    width: { xs: "100%", md: 260 },
    flexShrink: 0,
  },
  imageFrame: {
    width: "100%",
    height: { xs: 230, md: 300 },
    border: "1px solid rgba(0,0,0,0.09)",
    borderRadius: 2.5,
    overflow: "hidden",
    position: "relative",
    boxShadow: "0 10px 24px rgba(0,0,0,0.08)",
  },
  image: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    display: "block",
  },
  authorBadge: {
    position: "absolute",
    bottom: 12,
    right: 12,
    bgcolor: "rgba(0,0,0,0.58)",
    color: "#fff",
    px: 1.2,
    py: 0.45,
    borderRadius: 1,
    fontStyle: "italic",
    fontSize: "0.78rem",
    maxWidth: "68%",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  },
  featuredIcon: {
    position: "absolute",
    fontSize: 34,
    top: 8,
    left: 8,
    color: "orange",
    transition: "transform 0.3s ease-in-out",
  },
  featuredIconHover: {
    "&:hover": {
      transform: "scale(1.3)",
    },
  },
  makeFeaturedIcon: {
    cursor: "pointer",
    "&:hover": {
      transform: "scale(1.4)",
    },
  },
};

export default styles;
