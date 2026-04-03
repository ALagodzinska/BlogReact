const styles = {
  page: {
    minHeight: "100vh",
    py: { xs: 4, md: 7 },
    backgroundColor: "#f3f7f4",
    backgroundImage:
      "radial-gradient(circle at 10% 12%, rgba(126, 168, 141, 0.28), transparent 36%), radial-gradient(circle at 86% 10%, rgba(52, 94, 67, 0.14), transparent 34%), linear-gradient(180deg, rgba(255,255,255,0.9) 0%, rgba(238, 245, 240, 0.95) 100%)",
  },
  card: {
    width: "100%",
    mt: { xs: 2, md: 4 },
    border: "1px solid rgba(20, 50, 35, 0.12)",
    borderRadius: 3,
    p: { xs: 2.5, md: 3.5 },
    backgroundColor: "rgba(255,255,255,0.9)",
    boxShadow: "0 14px 34px rgba(12, 34, 23, 0.10)",
    backdropFilter: "blur(2px)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    m: 1,
    width: 52,
    height: 52,
    bgcolor: "#4f6f5d",
    boxShadow: "0 8px 18px rgba(50, 84, 64, 0.28)",
  },
  title: {
    fontFamily: '"Merriweather", "Georgia", serif',
    fontWeight: 700,
    letterSpacing: "-0.3px",
  },
  subtitle: {
    mt: 0.6,
    mb: 0.4,
    color: "text.secondary",
    fontSize: "0.9rem",
  },
  form: {
    mt: 1.5,
    width: "100%",
  },
  errorBox: {
    minHeight: 28,
    mb: 0.8,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    textAlign: "center",
    color: "error.main",
    fontWeight: 600,
    fontSize: "0.9rem",
  },
  textField: {
    "& .MuiOutlinedInput-root": {
      borderRadius: 2.5,
      bgcolor: "#fcfdfc",
      "& fieldset": {
        borderColor: "rgba(44, 77, 59, 0.25)",
      },
      "&:hover fieldset": {
        borderColor: "rgba(44, 77, 59, 0.45)",
      },
      "&.Mui-focused fieldset": {
        borderColor: "#4f6f5d",
      },
    },
    "& .MuiInputLabel-root.Mui-focused": {
      color: "#355746",
    },
  },
  submitButton: {
    mt: 2.5,
    mb: 0.5,
    py: 1.1,
    textTransform: "none",
    fontWeight: 700,
    borderRadius: 99,
    bgcolor: "#4f6f5d",
    boxShadow: "0 8px 16px rgba(50, 84, 64, 0.22)",
    "&:hover": {
      bgcolor: "#3f5c4d",
      boxShadow: "0 10px 20px rgba(50, 84, 64, 0.3)",
    },
  },
};

export default styles;
