import { dark, grey } from "./themeColors";
import { fontFamily, fontSize } from "./typography";

// ========================================================

// =========================================================

export const components = {
  MuiCssBaseline: {
    styleOverrides: theme => ({
      html: {
        scrollBehavior: "smooth"
      },
      "@media (prefers-reduced-motion: reduce)": {
        html: { scrollBehavior: "auto" },
        "*, *::before, *::after": {
          animationDuration: "0.01ms !important",
          animationIterationCount: "1 !important",
          transitionDuration: "0.01ms !important",
          scrollBehavior: "auto !important"
        }
      },
      body: {
        backgroundColor: theme.palette.background.default,
        color: theme.palette.text.primary,
        backgroundImage: theme.palette.mode === "dark"
          ? "linear-gradient(rgba(11, 11, 15, 0.45), rgba(11, 11, 15, 0.45)), url('/assets/images/backgrounds/kids-playroom.png')"
          : "linear-gradient(rgba(255, 255, 255, 0.6), rgba(243, 246, 255, 0.65)), url('/assets/images/backgrounds/kids-playroom.png')",
        backgroundAttachment: "fixed",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center top"
      },
      p: {
        lineHeight: 1.75
      },
      button: {
        fontFamily,
        fontSize
      },
      ".MuiRating-sizeSmall": {
        fontSize: "20px"
      },
      a: {
        textDecoration: "none",
        color: "inherit"
      },
      "a:hover": {
        textDecoration: "underline"
      },
      "a:focus-visible, button:focus-visible, [role=\"button\"]:focus-visible, [tabindex]:focus-visible": {
        outline: `3px solid ${theme.palette.primary.main}`,
        outlineOffset: 3
      },
      ".skip-link": {
        position: "absolute",
        top: 12,
        left: 12,
        zIndex: 9999,
        padding: "10px 16px",
        borderRadius: 8,
        background: theme.palette.primary.main,
        color: theme.palette.primary.contrastText,
        transform: "translateY(-200%)",
        transition: "transform 0.2s ease",
        ":focus-visible": {
          transform: "translateY(0)"
        }
      },
      ul: {
        margin: 0,
        padding: 0,
        listStyle: "none"
      },
      "#nprogress .bar": {
        overflow: "hidden",
        height: "3px !important",
        zIndex: "99999999 !important",
        background: `${theme.palette.primary.main} !important`
      }
    })
  },
  MuiInputLabel: {
    styleOverrides: {
      root: {
        zIndex: 0
      }
    }
  },
  MuiDialog: {
    styleOverrides: {
      paper: {
        borderRadius: 18
      }
    }
  },
  MuiCard: {
    styleOverrides: {
      root: {
        borderRadius: 18,
        border: `1px solid rgba(30, 123, 255, 0.28)`,
        background: "linear-gradient(180deg, rgba(10, 16, 26, 0.98) 0%, rgba(12, 20, 32, 0.92) 100%)",
        boxShadow: "0 18px 45px rgba(2, 6, 23, 0.6)"
      }
    }
  },
  MuiOutlinedInput: {
    styleOverrides: {
      root: {
        borderRadius: 14,
        backgroundColor: "rgba(10, 16, 26, 0.92)",
        "& .MuiOutlinedInput-notchedOutline": {
          borderColor: "rgba(30, 123, 255, 0.45)"
        },
        "&:hover .MuiOutlinedInput-notchedOutline": {
          borderColor: "rgba(30, 123, 255, 0.7)"
        },
        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
          borderColor: "rgba(240, 216, 24, 0.95)"
        }
      }
    }
  },
  MuiPaper: {
    styleOverrides: {
      rounded: {
        borderRadius: 16
      }
    }
  },
  MuiPagination: {
    defaultProps: {
      variant: "outlined",
      color: "primary"
    }
  },
  MuiMenuItem: {
    styleOverrides: {
      root: {
        paddingTop: 8,
        paddingBottom: 8
      }
    }
  },
  MuiSvgIcon: {
    styleOverrides: {
      root: {
        "& .secondary": {
          opacity: 0.4
        }
      }
    }
  },
  MuiTextField: {
    defaultProps: {
      size: "small",
      variant: "outlined"
    },
    styleOverrides: {
      root: ({
        ownerState
      }) => ({
        ...(ownerState.color === "info" && {
          "& .MuiOutlinedInput-root": {
            borderRadius: 12,
            fontWeight: 600
          },
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: grey[300]
          }
        })
      })
    }
  },
  MuiButton: {
    styleOverrides: {
      root: ({
        ownerState,
        theme
      }) => ({
        minWidth: 0,
        minHeight: 0,
        fontWeight: 800,
        textTransform: "none",
        borderRadius: 14,
        letterSpacing: 0.1,
        ...(ownerState.variant === "contained" && ownerState.color === "primary" && {
          color: "#FFFFFF",
          backgroundColor: theme.palette.primary.main,
          backgroundImage: "linear-gradient(180deg, rgba(255, 255, 255, 0.18) 0%, rgba(255, 255, 255, 0) 60%)",
          boxShadow: "0 16px 30px rgba(2, 6, 23, 0.28)",
          ":hover": {
            backgroundColor: theme.palette.primary[600],
            boxShadow: "0 18px 38px rgba(2, 6, 23, 0.36)"
          }
        }),
        ...(ownerState.variant === "contained" && ownerState.color === "secondary" && {
          color: "#FFFFFF",
          backgroundColor: theme.palette.secondary.main,
          backgroundImage: "linear-gradient(180deg, rgba(255, 255, 255, 0.16) 0%, rgba(255, 255, 255, 0) 60%)",
          boxShadow: "0 16px 30px rgba(2, 6, 23, 0.28)",
          ":hover": {
            backgroundColor: theme.palette.secondary[600] || theme.palette.secondary.dark,
            boxShadow: "0 18px 38px rgba(2, 6, 23, 0.36)"
          }
        }),
        ...(ownerState.variant === "contained" && ownerState.color === "warning" && {
          color: theme.palette.warning.contrastText,
          backgroundColor: theme.palette.warning.main,
          backgroundImage: "linear-gradient(180deg, rgba(255, 255, 255, 0.22) 0%, rgba(255, 255, 255, 0) 60%)",
          boxShadow: "0 16px 30px rgba(2, 6, 23, 0.28)",
          ":hover": {
            backgroundColor: theme.palette.warning.dark || theme.palette.warning.main,
            boxShadow: "0 18px 38px rgba(2, 6, 23, 0.36)"
          }
        }),
        ...(ownerState.variant === "outlined" && {
          backgroundColor: "rgba(8, 12, 18, 0.35)",
          backdropFilter: "blur(8px)",
          borderColor: "rgba(255, 255, 255, 0.26)",
          color: theme.palette.text.primary,
          ":hover": {
            backgroundColor: "rgba(8, 12, 18, 0.5)",
            borderColor: "rgba(255, 255, 255, 0.34)"
          }
        }),
        ...(ownerState.variant === "outlined" && ownerState.color === "primary" && {
          borderColor: "rgba(30, 123, 255, 0.55)",
          ":hover": {
            borderColor: "rgba(30, 123, 255, 0.8)",
            backgroundColor: "rgba(30, 123, 255, 0.12)"
          }
        }),
        ...(ownerState.variant === "outlined" && ownerState.color === "warning" && {
          borderColor: "rgba(240, 216, 24, 0.65)",
          ":hover": {
            borderColor: "rgba(240, 216, 24, 0.9)",
            backgroundColor: "rgba(240, 216, 24, 0.12)"
          }
        }),
        ...(ownerState.color === "info" && {
          borderRadius: 12
        }),
        ...(ownerState.color === "dark" && {
          color: "#fff",
          borderRadius: 12,
          transition: "all 0.3s",
          ":hover": {
            backgroundColor: "#343434"
          }
        }),
        ...(ownerState.color === "dark" && ownerState.variant === "outlined" && {
          color: dark.main,
          borderRadius: 12,
          transition: "all 0.3s",
          ":hover": {
            backgroundColor: dark.main,
            color: "white"
          }
        })
      }),
      sizeLarge: {
        padding: ".7rem 2.6rem"
      }
    },
    defaultProps: {
      color: "inherit",
      disableElevation: true
    }
  },
  MuiChip: {
    styleOverrides: {
      root: {
        borderRadius: 12,
        fontWeight: 700
      },
      filledSecondary: {
        color: "#FFFFFF",
        background: "#FF3B30"
      },
      filledWarning: {
        color: "#1F2937"
      }
    }
  },
  MuiBadge: {
    styleOverrides: {
      badge: {
        fontWeight: 700
      }
    }
  },
  MuiIconButton: {
    styleOverrides: {
      root: {
        borderRadius: 12
      }
    }
  }
};
