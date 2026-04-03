const styles = {
  pageContainer: {
    mt: 3,
    mb: 3,
  },
  shell: {
    borderRadius: 3,
    border: "1px solid rgba(18, 48, 33, 0.12)",
    backgroundColor: "rgba(255,255,255,0.88)",
    boxShadow: "0 12px 28px rgba(13, 38, 27, 0.08)",
    p: { xs: 2, md: 3 },
  },
  headerRow: {
    mb: 2,
  },
  title: {
    fontFamily: '"Merriweather", "Georgia", serif',
    fontWeight: 700,
    letterSpacing: "-0.3px",
    fontSize: { xs: "1.35rem", md: "1.6rem" },
  },
  subtitle: {
    mt: 0.4,
    color: "text.secondary",
    fontSize: "0.94rem",
  },
  tableContainer: {
    borderRadius: 2.5,
    border: "1px solid rgba(0,0,0,0.08)",
    overflow: "hidden",
    boxShadow: "0 8px 20px rgba(0,0,0,0.06)",
  },
  tableHeadCell: {
    bgcolor: "rgba(79, 111, 93, 0.12)",
    color: "text.primary",
    fontWeight: 700,
    whiteSpace: "nowrap",
  },
  tableRow: {
    "&:last-child td, &:last-child th": { border: 0 },
    "&:hover": {
      backgroundColor: "rgba(79, 111, 93, 0.05)",
    },
  },
  idCell: {
    fontWeight: 700,
  },
  titleCell: {
    maxWidth: 380,
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  },
  restoreButton: {
    textTransform: "none",
    fontWeight: 700,
    borderRadius: 99,
    px: 1.4,
    py: 0.4,
    color: "#2f5644",
    borderColor: "rgba(37, 70, 55, 0.35)",
    bgcolor: "rgba(255,255,255,0.9)",
    "&:hover": {
      borderColor: "#2f5644",
      bgcolor: "#eef4f0",
    },
  },
  emptyState: {
    py: 4,
    textAlign: "center",
    color: "text.secondary",
    fontStyle: "italic",
  },
  pagination: {
    display: "flex",
    justifyContent: "center",
    pt: 3,
    "& .MuiPaginationItem-root.Mui-selected": {
      bgcolor: "#4f6f5d",
      color: "#fff",
      "&:hover": {
        bgcolor: "#3f5c4d",
      },
    },
  },
};

export default styles;
