"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  Box,
  Typography,
  Input,
  Textarea,
  Button,
  IconButton, 
  Stack, 
} from "@mui/joy";
import { ChevronLeft, X, Info } from "lucide-react";
import { project, useCreateProject } from "../../../hook/projecthook";
import { useRouter } from "next/navigation";

const ProjectCreationPage = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<project>();
  const [teamMembers, setTeamMembers] = useState([
    {  email: "sarah.k@example.com" },
    {  email: "mike.t@example.com" },
  ]);

  const RemoveEmail = (email:string)=>{
    setTeamMembers(teamMembers.filter((member)=>member.email!=email ))
  }
  const [inviteEmail, setInviteEmail] = useState("");
  const { mutate } = useCreateProject();

 
  const onSubmit = async (formData: project) => {
    const payload: project = {
        ...formData,
        members: teamMembers.map((member) => member.email), // Array of emails
        // _id: formData._id || "",
        createdAt: new Date().toISOString(),
    };

    console.log("Payload:", payload);

    mutate(payload, {
        onSuccess: () => {
            alert("Project created successfully!");
            reset(formData);
            router.push("/projectt");
        },
        onError: (error) => {
            console.error("Failed to create project:", error);
            alert("Error creating project");
        },
    });
};


  return (
    <Box sx={{ maxWidth: 800, margin: "0 auto", padding: 2 }}>
      <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
        <Button
          variant="plain"
          startDecorator={<ChevronLeft size={16} />}
          sx={{ mr: 1 }}
        >
          Projects
        </Button>
        <Typography level="body-sm">Create Project</Typography>
      </Box>

      <Typography level="h2" sx={{ mb: 3 }}>
        Create New Project
      </Typography>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Box sx={{ mb: 4 }}>
          <Typography level="title-md" sx={{ mb: 2 }}>
            Project Details
          </Typography>

          <Stack spacing={2}>
            <Box>
              <Typography level="body-sm" sx={{ mb: 1 }}>
                Project Name
              </Typography>
              <Input
              required
                placeholder="Enter project name"
                {...register("name", { required: "Project name is required" })}
                error={!!errors.name}
                fullWidth
              />
              {errors.name && (
                <Typography color="danger" level="body-xs">
                  {errors.name.message}
                </Typography>
              )}
            </Box>

            <Box>
              <Typography level="body-sm" sx={{ mb: 1 }}>
                Project Key
              </Typography>
              <Input
              required
                placeholder="e.g., PROJ-123-XYZ"
                {...register("project_key", {
                  required: "Project key is required",
                })}
                error={!!errors.project_key}
                fullWidth
                endDecorator={<Info size={16} />}
              />
              {errors.project_key && (
                <Typography color="danger" level="body-xs">
                  {errors.project_key.message}
                </Typography>
              )}
            </Box>

            <Box>
              <Typography level="body-sm" sx={{ mb: 1 }}>
                Description
              </Typography>
              <Textarea
              required
                placeholder="Describe the purpose of this project"
                minRows={3}
                {...register("description")}
                sx={{ width: "100%" }}
              />
            </Box>
          </Stack>
        </Box>

        <Box sx={{ mb: 4 }}>
          <Typography level="title-md" sx={{ mb: 2 }}>
            Team Members
          </Typography>

          <Box sx={{ mb: 3 }}>
            <Typography level="body-sm" sx={{ mb: 1 }}>
              Invite Members
            </Typography>
            <Input
              placeholder="Enter email addresses..."
              required
              value={inviteEmail}
              onChange={(e) => setInviteEmail(e.target.value)}
              fullWidth
              endDecorator={
                <IconButton
                  variant="plain"
                  color="neutral"
                  disabled={!inviteEmail.trim()}
                  onClick={() => {
                    if (inviteEmail.trim()) {
                      setTeamMembers([...teamMembers, { email: inviteEmail }]);
                      setInviteEmail("");
                    }
                  }}
                >
                  Add
                </IconButton>
              }
            />
          </Box>

          <Stack spacing={1}>
            {teamMembers.map((member, index) => (
              <Box
                key={index}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  p: 1,
                  borderRadius: "sm",
                  bgcolor: "background.surface",
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Box>
                    <Typography level="body-xs" color="neutral">
                      {member.email}
                    </Typography>
                  </Box>
                </Box>
                <IconButton
                  variant="plain"
                  color="neutral"
                  size="sm"
                  onClick={() => RemoveEmail(member.email)}
                >
                  <X size={16} />
                </IconButton>
              </Box>
            ))}
          </Stack>
        </Box>

        <Box
          sx={{ display: "flex", gap: 2, justifyContent: "flex-start", mt: 4 }}
        >
          <Button type="submit" variant="solid" color="primary">
            Create Project
          </Button>
          <Button variant="plain" color="neutral">
            Cancel
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default ProjectCreationPage;
