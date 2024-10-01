import { Box, IconButton, List, ListItem } from "@mui/material";
import { alpha, useTheme } from "@mui/material/styles";
import BrushIcon from "@mui/icons-material/Brush";
import HorizontalRuleRoundedIcon from "@mui/icons-material/HorizontalRuleRounded";
import Crop75RoundedIcon from "@mui/icons-material/Crop75Rounded";
import Brightness1OutlinedIcon from "@mui/icons-material/Brightness1Outlined";

const ToolsMenu = () => {
  const theme = useTheme();
  const tools = [
    {
      name: "line",
      icon: (
        <HorizontalRuleRoundedIcon
          sx={{
            color: theme.palette.secondary.main,
          }}
        />
      ),
    },
    {
      name: "rectangle",
      icon: (
        <Crop75RoundedIcon
          sx={{
            color: theme.palette.secondary.main,
          }}
        />
      ),
    },
    {
      name: "circle",
      icon: (
        <Brightness1OutlinedIcon
          sx={{
            color: theme.palette.secondary.main,
          }}
        />
      ),
    },
    {
      name: "brush",
      icon: (
        <BrushIcon
          sx={{
            color: theme.palette.secondary.main,
          }}
        />
      ),
    },
  ];
  return (
    <Box
      width="fit-content"
      mx="auto"
      sx={{
        borderRadius: "1em",
        backgroundColor: alpha(theme.palette.secondary.light, 0.2),
      }}
    >
      <List
        role="menubar"
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          padding: 0,
          margin: 0,
          borderRadius: "1em",
        }}
      >
        {tools.map((tool, index) => {
          return (
            <ListItem
              role="none"
              key={index}
              sx={{
                transform: `${
                  tool.name === "line" ? "rotate(-45deg)" : "rotate(0)"
                }`,
              }}
            >
              <IconButton>{tool.icon}</IconButton>
            </ListItem>
          );
        })}
      </List>
    </Box>
  );
};

export default ToolsMenu;
