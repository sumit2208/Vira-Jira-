"use client";

import React  from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  Input,
  Grid,
  Stack,
} from "@mui/joy";
import { Plus  } from "lucide-react";
import { useRouter } from "next/navigation";
import {  useGetProject } from "@/hook/projecthook";

 

const ProjectsPage = () => {
  const router = useRouter();
  const { data, isLoading } = useGetProject(); 

 

 
  const handleCreateProject = () => {
    router.push("/projectt/createproject");
  };

  const handleViewProject = (projectId: string) => {
    router.push(`/projectt/${projectId}`);
    console.log(projectId)
  };

  return (
    <Box sx={{ maxWidth: 1200, margin: "0 auto", p: 3 }}>
      {/* Header section */}
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
 

      {/* Projects display section */}
      {data?.length === 0 ? (
        <Card sx={{ textAlign: "center", py: 6 }}>
          <CardContent>
            <Typography level="h3" sx={{ mb: 2 }}>
              No projects found
            </Typography>
            <Button
              variant="solid"
              color="primary"
              startDecorator={<Plus size={16} />}
              onClick={handleCreateProject}
            >
              Create New Project
            </Button>
          </CardContent>
        </Card>
      ) : (
        <Grid container spacing={2}>
          {data?.map((project, index) => (
            <Grid key={`${project._id}-${index}`} xs={12} sm={6} md={4}>
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
                onClick={() => handleViewProject(project._id)}
              >
                <CardContent
                  sx={{
                    p: 2,
                    flexGrow: 1,
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  {/* Only showing the database values */}
                  <Stack spacing={2}>
                    <Box>
                      <Typography level="body-sm" color="neutral">ID</Typography>
                      <Typography level="body-md">{project._id}</Typography>
                    </Box>
                    
                    <Box>
                      <Typography level="body-sm" color="neutral">Name</Typography>
                      <Typography level="title-md">{project.name}</Typography>
                    </Box>
                    
                    <Box>
                      <Typography level="body-sm" color="neutral">Description</Typography>
                      <Typography level="body-md">{project.description}</Typography>
                    </Box>
                    
                    <Box>
                      <Typography level="body-sm" color="neutral">Project Key</Typography>
                      <Typography level="body-md">{project.project_key}</Typography>
                    </Box>
                    
                    <Box>
                      <Typography level="body-sm" color="neutral">Members</Typography>
                      <Stack spacing={0.5}>
                        {project.members && project.members.map((member: string, i: number) => (
                          <Typography key={i} level="body-md">{member}</Typography>
                        ))}
                      </Stack>
                    </Box>
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default ProjectsPage;