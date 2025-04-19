"use client";

import React, { useState } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  IconButton,
  Input,
  Grid,
  Chip,
  Avatar,
  AvatarGroup,
  Dropdown,
  Menu,
  MenuButton,
  MenuItem,
  Divider,
  Badge,
  Sheet,
  Tab,
  TabList,
  Tabs,
} from "@mui/joy";
import {
  Search,
  Plus,
  Filter,
  PlusCircle,
  Grid as GridIcon,
  List as ListIcon,
  MoreVertical,
  Star,
  Calendar,
  Users,
  Settings,
  Trash2,
  ArrowUpRight,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useGetProject } from "../../../src/hook/projecthook"; 

// Mock project data

const ProjectsPage = () => {
  const router = useRouter(); 
  const { data } = useGetProject();

  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState("grid"); 

  const filteredProjects = (data ?? []).filter((project) => {
    // Handle active tab filtering

    // Handle search query
    if (searchQuery.trim() !== "") {
      const query = searchQuery.toLowerCase();
      return (
        project.name.toLowerCase().includes(query) ||
        project.id.toLowerCase().includes(query)
      );
    }

    return true;
  });

  const handleCreateProject = () => {
    router.push("/projectt/createproject");
  };
 


 

  return (
    <Box sx={{ maxWidth: 1200, margin: "0 auto", p: 3 }}>
      
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
        }}
      >
        <Typography level="h2">Projects</Typography>
        <Button
          variant="solid"
          color="primary"
          startDecorator={<Plus size={16} />}
          onClick={handleCreateProject}
        >
          Create Project
        </Button>
      </Box>

      

      {filteredProjects.length === 0 ? (
        <Card sx={{ textAlign: "center", py: 6 }}>
          <CardContent>
            <Typography level="h3" sx={{ mb: 2 }}>
              No projects found
            </Typography>
            <Typography sx={{ mb: 3 }}>
              {searchQuery
                ? "Try adjusting your search or filters"
                : "Get started by creating your first project"}
            </Typography>
            <Button
              variant="solid"
              color="primary"
              startDecorator={<PlusCircle size={16} />}
              onClick={handleCreateProject}
            >
              Create New Project
            </Button>
          </CardContent>
        </Card>
      ) : viewMode === "grid" ? (
        <Grid container spacing={2}>
          {filteredProjects.map((project, index) => (
            <Grid key={`${project.id}-${index}`} xs={12} sm={6} md={4}>
              <Card
                variant="outlined"
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  "&:hover": {
                    boxShadow: "sm",
                    borderColor: "primary.300",
                    cursor: "pointer",
                  },
                }} 
              >
                <CardContent
                  sx={{
                    p: 2,
                    flexGrow: 1,
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                 

                  <Typography level="title-md" sx={{ mb: 1 }}>
                    {project.name}
                  </Typography>
                  <Typography
                    level="body-sm"
                    sx={{ mb: 2, color: "neutral.600", flexGrow: 1 }}
                  >
                    {project.description}
                  </Typography>

                  
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Card variant="outlined">
          <Box
            component="table"
            sx={{ width: "100%", borderCollapse: "collapse" }}
          >
            <Box component="thead">
              <Box
                component="tr"
                sx={{ borderBottom: "1px solid", borderColor: "divider" }}
              >
                <Box component="th" sx={{ textAlign: "left", p: 2, pl: 3 }}>
                  <Typography level="body-xs">Project</Typography>
                </Box>
                <Box component="th" sx={{ textAlign: "left", p: 2 }}>
                  <Typography level="body-xs">Status</Typography>
                </Box>
                <Box component="th" sx={{ textAlign: "left", p: 2 }}>
                  <Typography level="body-xs">Members</Typography>
                </Box>
                <Box component="th" sx={{ textAlign: "left", p: 2 }}>
                  <Typography level="body-xs">Progress</Typography>
                </Box>
                <Box component="th" sx={{ textAlign: "right", p: 2, pr: 3 }}>
                  <Typography level="body-xs">Actions</Typography>
                </Box>
              </Box>
            </Box>
            <Box component="tbody">
              {filteredProjects.map((project) => (
                <Box
                  key={project.id}
                  component="tr"
                  sx={{
                    borderBottom: "1px solid",
                    borderColor: "divider",
                    "&:hover": {
                      bgcolor: "background.level1",
                      cursor: "pointer",
                    },
                  }} 
                >
                  
                  <Box component="td" sx={{ p: 2, pr: 3, textAlign: "right" }}>
                    <Button
                      size="sm"
                      variant="plain"
                      color="neutral"
                      endDecorator={<ArrowUpRight size={14} />}
                     
                    >
                      View
                    </Button>
                  </Box>
                </Box>
              ))}
            </Box>
          </Box>
        </Card>
      )}
    </Box>
  );
};

export default ProjectsPage;
