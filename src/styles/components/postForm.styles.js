const styles = {
  container: {
    mt: 3,
    mb: 3,
  },
  shell: {
    borderRadius: 3,
    border: "1px solid rgba(18, 48, 33, 0.12)",
    backgroundColor: "rgba(255,255,255,0.9)",
    boxShadow: "0 12px 28px rgba(13, 38, 27, 0.08)",
    p: { xs: 2, md: 3 },
  },
  headerTitle: {
    fontFamily: '"Merriweather", "Georgia", serif',
    fontWeight: 700,
    letterSpacing: "-0.3px",
    fontSize: { xs: "1.35rem", md: "1.6rem" },
  },
  headerSubtitle: {
    mt: 0.4,
    color: "text.secondary",
    fontSize: "0.94rem",
  },
  formStack: {
    mt: 2.5,
  },
  titleField: {
    "& .MuiOutlinedInput-root": {
      borderRadius: 2.5,
      bgcolor: "#fcfdfc",
      "& fieldset": {
        borderColor: "rgba(44, 77, 59, 0.24)",
      },
      "&:hover fieldset": {
        borderColor: "rgba(44, 77, 59, 0.42)",
      },
      "&.Mui-focused fieldset": {
        borderColor: "#4f6f5d",
      },
    },
    "& .MuiInputLabel-root.Mui-focused": {
      color: "#355746",
    },
  },
  imageRow: {
    flexDirection: { xs: "column", md: "row" },
    alignItems: { xs: "stretch", md: "flex-start" },
    gap: 2,
    pb: 1,
  },
  imageBox: {
    flex: 1,
    minWidth: 0,
    border: "1px solid rgba(0,0,0,0.08)",
    borderRadius: 2.5,
    p: 1.5,
    backgroundColor: "rgba(255,255,255,0.8)",
  },
  imageLabel: {
    mb: 1,
    fontWeight: 600,
    fontSize: "0.9rem",
    color: "text.secondary",
  },
  editorWrap: {
    borderRadius: 2.5,
    border: "1px solid rgba(44, 77, 59, 0.2)",
    overflow: "hidden",
    bgcolor: "#fff",
    "& .ql-toolbar.ql-snow": {
      border: "none",
      borderBottom: "1px solid rgba(44, 77, 59, 0.18)",
      backgroundColor: "rgba(79, 111, 93, 0.06)",
    },
    "& .ql-container.ql-snow": {
      border: "none",
      minHeight: 280,
      fontSize: "1rem",
      lineHeight: 1.65,
      fontFamily: '"Inter", "Segoe UI", sans-serif',
    },
  },
  contentError: {
    color: "error.main",
    fontSize: 12,
    mt: 0.2,
  },
  submitButton: {
    mt: 1.3,
    textTransform: "none",
    fontWeight: 700,
    borderRadius: 99,
    px: 3,
    py: 1,
    alignSelf: "flex-end",
    bgcolor: "#4f6f5d",
    color: "#fff",
    boxShadow: "0 8px 16px rgba(50, 84, 64, 0.22)",
    "&:hover": {
      bgcolor: "#3f5c4d",
      boxShadow: "0 10px 18px rgba(50, 84, 64, 0.28)",
    },
  },
};

export default styles;
