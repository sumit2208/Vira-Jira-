"use client";

import React, { useState, useMemo, useEffect } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  Input,
  Grid,
  Stack,
  Chip,
  Avatar,
  LinearProgress,
  IconButton,
  Tooltip,
  Sheet,
  Divider,
  Badge,
} from "@mui/joy";
import {
  Plus,
  Search,
  Filter,
  MoreVertical,
  Users,
  Calendar,
  Activity,
  Star,
  Folder,
  Settings,
  Eye,
  Copy,
  ExternalLink,
  Briefcase,
  Clock,
  ChevronRight,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useGetProject } from "@/hook/projecthook";
import { useUser } from "@clerk/nextjs";
import axios from "axios";


interface project {
    _id:string,
    name:string,
    description:string,
    project_key:string,
    members: string[],
    createdAt:string
}


const ProjectsPage = () => {
  const router = useRouter();
  const { data, isLoading } = useGetProject();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");

  const { user } = useUser();
  const [projects, setProjects] = useState<project[]>([]);

 

   useEffect(() => {
    const fetchProjects = async () => {
      if (user?.primaryEmailAddress?.emailAddress) {
        try {
          const response = await axios.get(
            `http://localhost:5000/api/project/user-projects`,
            {
              params: { email: user.primaryEmailAddress.emailAddress },
            }
          );
          setProjects(response.data);
        } catch (err) {
          console.error("Error fetching user projects:", err);
        }
      }
    };

    fetchProjects();
  }, [user]);
  

  // Filter and search projects
  const filteredProjects = useMemo(() => {
    if (!projects) return [];

    return projects.filter((project) => {
      const matchesSearch =
        project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.description.toLowerCase().includes(searchQuery.toLowerCase());

      // Add more filter logic here based on selectedFilter
      return matchesSearch;
    });
  }, [projects, searchQuery, selectedFilter]);

  const handleCreateProject = () => {
    router.push("/projectt/createproject");
  };

  const handleViewProject = (projectId: string) => {
    router.push(`/projectt/${projectId}`);
  };

  const getProjectInitials = (name: string) => {
    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const getRandomColor = (index: number) => {
    const colors = ["primary", "success", "warning", "danger", "neutral"];
    return colors[index % colors.length];
  };

  const ProjectCard = ({ project, index }: { project: any; index: number }) => (
    <Card
      variant="outlined"
      sx={{
        height: "100%",
        backdropFilter: "blur(10px)",
        border: "1px solid rgba(255,255,255,0.1)",
        borderRadius: "16px",
        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        cursor: "pointer",
        position: "relative",
        overflow: "hidden",
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
          borderColor: "primary.300",
          "& .project-arrow": {
            opacity: 1,
            transform: "translateX(0px)",
          },
        },
        "&:before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "4px",
          background: `linear-gradient(90deg, var(--joy-palette-${getRandomColor(
            index
          )}-500), var(--joy-palette-${getRandomColor(index)}-300))`,
        },
      }}
      onClick={() => handleViewProject(project._id)}
    >
      <CardContent sx={{ p: 3, height: "100%" }}>
        <Stack spacing={3} sx={{ height: "100%" }}>
          {/* Header */}
          <Box
            sx={{
              display: "flex",
              alignItems: "flex-start",
              justifyContent: "space-between",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <Avatar
                variant="soft"
                color={getRandomColor(index) as any}
                sx={{
                  width: 48,
                  height: 48,
                  fontSize: "1.1rem",
                  fontWeight: "bold",
                }}
              >
                {getProjectInitials(project.name)}
              </Avatar>
              <Box>
                <Typography level="title-lg" sx={{ fontWeight: 700, mb: 0.5 }}>
                  {project.name}
                </Typography>
                <Typography
                  level="body-xs"
                  color="neutral"
                  sx={{ textTransform: "uppercase", letterSpacing: "0.5px" }}
                >
                  {project.project_key}
                </Typography>
              </Box>
            </Box>

            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Tooltip title="View Project" variant="soft">
                <IconButton
                  variant="plain"
                  size="sm"
                  sx={{
                    opacity: 0.7,
                    "&:hover": { opacity: 1 },
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleViewProject(project._id);
                  }}
                >
                  <Eye size={16} />
                </IconButton>
              </Tooltip>

              <ChevronRight
                size={20}
                className="project-arrow"
                style={{
                  opacity: 0,
                  transform: "translateX(-10px)",
                  transition: "all 0.3s ease",
                  color: "var(--joy-palette-text-tertiary)",
                }}
              />
            </Box>
          </Box>

          {/* Description */}
          <Box sx={{ flex: 1 }}>
            <Typography
              level="body-md"
              color="neutral"
              sx={{
                lineHeight: 1.6,
                display: "-webkit-box",
                WebkitLineClamp: 3,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
              }}
            >
              {project.description}
            </Typography>
          </Box>

          {/* Members */}
          {project.members && project.members.length > 0 && (
            <Box>
              <Typography
                level="body-sm"
                color="neutral"
                sx={{ mb: 1, fontWeight: 600 }}
              >
                Team Members
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                  flexWrap: "wrap",
                }}
              >
                <Badge
                  badgeContent={project.members.length}
                  color="primary"
                  variant="soft"
                  size="sm"
                >
                  <Users size={16} color="var(--joy-palette-text-secondary)" />
                </Badge>
                <Typography level="body-sm" color="neutral">
                  {project.members.length} member
                  {/* {project.members.length !== 1 ? "s" : ""} */}
                </Typography>
              </Box>
            </Box>
          )}

          {/* Footer */}
          <Divider sx={{ my: 1 }} />
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography
              level="body-xs"
              color="neutral"
              sx={{ display: "flex", alignItems: "center", gap: 0.5 }}
            >
              <Folder size={12} />
              Project
            </Typography>
            <Typography
              level="body-xs"
              color="neutral"
              sx={{ fontFamily: "monospace" }}
            >
              {project._id.slice(-6)}
            </Typography>
          </Box>
        </Stack>
      </CardContent>
    </Card>
  );

  if (isLoading) {
    return (
      <Box sx={{ maxWidth: 1400, margin: "0 auto", p: 4 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "400px",
          }}
        >
          <LinearProgress sx={{ width: 200 }} />
        </Box>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        maxWidth: 1400,
        margin: "0 auto",
        p: 4,
        background: "linear-gradient(135deg, #e0e0e0 0%, #f5f5f5 100%)", // light greys
        minHeight: "100vh",
      }}
    >
      {/* Premium Header */}
      <Sheet
        variant="outlined"
        sx={{
          background: "rgba(255,255,255,0.95)",
          backdropFilter: "blur(20px)",
          borderRadius: "20px",
          border: "1px solid rgba(255,255,255,0.2)",
          p: 4,
          mb: 4,
          boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            mb: 3,
          }}
        >
          <Box>
            <Typography
              level="h1"
              sx={{
                fontSize: "2.5rem",
                fontWeight: 800,
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                mb: 1,
              }}
            >
              Projects
            </Typography>
            <Typography level="body-lg" color="neutral">
              Manage and track your project portfolio
            </Typography>
          </Box>

          <Button
            variant="solid"
            size="lg"
            startDecorator={<Plus size={20} />}
            onClick={handleCreateProject}
            sx={{
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              border: "none",
              borderRadius: "12px",
              px: 3,
              py: 1.5,
              fontWeight: 600,
              fontSize: "1rem",
              boxShadow: "0 4px 20px rgba(102, 126, 234, 0.4)",
              "&:hover": {
                transform: "translateY(-2px)",
                boxShadow: "0 8px 30px rgba(102, 126, 234, 0.5)",
              },
            }}
          >
            Create New Project
          </Button>
        </Box>

        {/* Stats Cards */}
        <Grid container spacing={2} sx={{ mb: 3 }}>
          <Grid xs={12} sm={4}>
            <Card variant="soft" color="primary" sx={{ borderRadius: "12px" }}>
              <CardContent sx={{ p: 2 }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                  <Briefcase size={24} />
                  <Box>
                    <Typography level="h3">{projects?.length || 0}</Typography>
                    <Typography level="body-sm">Total Projects</Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
          <Grid xs={12} sm={4}>
            <Card variant="soft" color="success" sx={{ borderRadius: "12px" }}>
              <CardContent sx={{ p: 2 }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                  <Activity size={24} />
                  <Box>
                    <Typography level="h3">
                      {projects?.filter((p) => p.members?.length > 0).length || 0}
                    </Typography>
                    <Typography level="body-sm">Active Projects</Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
          <Grid xs={12} sm={4}>
            <Card variant="soft" color="warning" sx={{ borderRadius: "12px" }}>
              <CardContent sx={{ p: 2 }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                  <Users size={24} />
                  <Box>
                    <Typography level="h3">
                      {projects?.reduce(
                        (acc, project) => acc + (project.members?.length || 0),
                        0
                      ) || 0}
                    </Typography>
                    <Typography level="body-sm">Team Members</Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Search and Filter */}
        <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
          <Input
            placeholder="Search projects..."
            startDecorator={<Search size={20} />}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            sx={{
              flexGrow: 1,
              borderRadius: "12px",
              "--Input-focusedThickness": "2px",
            }}
          />
          <Button
            variant="outlined"
            startDecorator={<Filter size={18} />}
            sx={{ borderRadius: "12px", minWidth: "120px" }}
          >
            Filter
          </Button>
        </Box>
      </Sheet>

      {/* Projects Grid */}
      {filteredProjects?.length === 0 ? (
        <Sheet
          variant="outlined"
          sx={{
            background: "rgba(255,255,255,0.95)",
            backdropFilter: "blur(20px)",
            borderRadius: "20px",
            border: "1px solid rgba(255,255,255,0.2)",
            textAlign: "center",
            py: 8,
            px: 4,
            boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
          }}
        >
          <Box sx={{ maxWidth: 400, margin: "0 auto" }}>
            <Box
              sx={{
                width: 80,
                height: 80,
                borderRadius: "50%",
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 2rem",
              }}
            >
              <Folder size={40} color="white" />
            </Box>
            <Typography level="h2" sx={{ mb: 2, fontWeight: 700 }}>
              {searchQuery ? "No projects found" : "No projects yet"}
            </Typography>
            <Typography
              level="body-lg"
              color="neutral"
              sx={{ mb: 4, lineHeight: 1.6 }}
            >
              {searchQuery
                ? "Try adjusting your search terms or create a new project."
                : "Get started by creating your first project and begin organizing your work."}
            </Typography>
            <Button
              variant="solid"
              size="lg"
              startDecorator={<Plus size={20} />}
              onClick={handleCreateProject}
              sx={{
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                border: "none",
                borderRadius: "12px",
                px: 4,
                py: 1.5,
                fontWeight: 600,
                boxShadow: "0 4px 20px rgba(102, 126, 234, 0.4)",
                "&:hover": {
                  transform: "translateY(-2px)",
                  boxShadow: "0 8px 30px rgba(102, 126, 234, 0.5)",
                },
              }}
            >
              Create Your First Project
            </Button>
          </Box>
        </Sheet>
      ) : (
        <Grid container spacing={3}>
          {filteredProjects?.map((project, index) => (
            <Grid key={`${project._id}-${index}`} xs={12} sm={6} lg={4}>
              <ProjectCard project={project} index={index} />
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default ProjectsPage;
