// Centralized style objects for Header component
export const toolbarSx = {
  borderBottom: 1,
  borderColor: "divider",
  py: 1,
};

export const stackSx = {
  width: "100%",
};

export const titleSx = {
  mr: 2,
  display: "flex",
  fontFamily: "monospace",
  fontWeight: 700,
  letterSpacing: ".3rem",
  color: "inherit",
  textDecoration: "none",
  cursor: "pointer",
  fontSize: { xs: "0.95rem", md: "1.1rem" },
};

export const centerBoxSx = {
  flex: 1,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

export const rightBoxSx = {
  display: "flex",
  alignItems: "center",
};

export const linkSx = {
  textDecoration: "none",
  cursor: "pointer",
  color: "inherit",
  textTransform: "none",
  fontWeight: 500,
};

export const buttonSx = {
  ...linkSx,
  transition: "transform 150ms ease, font-size 150ms ease",
  '&:hover': {
    boxShadow: 'none',
    backgroundColor: 'transparent',
    '& .navLabel': {
      transform: 'scale(1.15)',
      fontWeight: 700,
      color: '#013801ff',
    },
  },
  '& .navLabel': {
    display: 'inline-block',
    transition: 'transform 150ms ease, color 150ms ease, font-weight 150ms ease',
  },
};

export default {};
