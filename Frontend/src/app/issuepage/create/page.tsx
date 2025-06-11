"use client";
import { Calendar, User, Paperclip, X } from "lucide-react";
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Option,
  Select,
  Textarea,
  Typography,
  Box,
  IconButton,
  Stack,
} from "@mui/joy";
import { useForm, Controller } from "react-hook-form";
import { Issue, useCreateIssue } from "../../../hook/issuehook";
import { useGetProject } from "../../../hook/projecthook";
import { useRouter } from "next/navigation";
import { useState } from "react";
const Page = () => {
  const router = useRouter();
  const { mutate } = useCreateIssue();
  const { data } = useGetProject();
  const [teamMembers, setTeamMembers] = useState([
    { email: "sarah.k@example.com" },
    { email: "mike.t@example.com" },
  ]);

  const RemoveEmail = (email: string) => {
    setTeamMembers(teamMembers.filter((member) => member.email != email));
  };
  const [inviteEmail, setInviteEmail] = useState("");

  const { handleSubmit, control, reset } = useForm<Issue>({
    defaultValues: {
      title: "",
      priority: "Medium",
      assignee: "",
      project: "",
      type: "code",
      description: "",
    },
  });

  const onSubmit = (data: Issue) => {
      const issueData = {
    ...data,
    members: teamMembers, // or teamMembers: teamMembers
  };
    mutate(issueData, {
      onSuccess: () => {
        reset({
          title: "",
          priority: "Medium",
          assignee: "",
          project: "",
          type: "code",
          description: "",
        });
        router.push("/issuepage");
      },
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box className="max-w-4xl mx-auto p-6 text-sm">
        <Typography level="h2" className="mb-6">
          Create New Issue
        </Typography>

        {/* Issue Title */}
        <FormControl className="mb-6">
          <FormLabel>Issue Title</FormLabel>
          <Controller
            name="title"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                className="bg-[#F8F8F7]"
                placeholder="Enter a descriptive title"
              />
            )}
          />
        </FormControl>

        {/* Project, Type, Priority */}
        <Box className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <FormControl>
            <FormLabel>Project</FormLabel>
            <Controller
              name="project"
              control={control}
              render={({ field }) => (
                <Select
                  value={field.value}
                  onChange={(_, value) => field.onChange(value)}
                  className="bg-[#F8F8F7]"
                  placeholder="Select project"
                >
                  {data?.map((proj: { name: string }) => (
                    <Option key={proj.name} value={proj.name}>
                      {proj.name}
                    </Option>
                  ))}
                </Select>
              )}
            />
          </FormControl>

          <FormControl>
            <FormLabel>Issue Type</FormLabel>
            <Controller
              name="type"
              control={control}
              render={({ field }) => (
                <Select
                  value={field.value}
                  onChange={(_, value) => field.onChange(value)}
                  className="bg-[#F8F8F7]"
                  placeholder="Select type"
                >
                  <Option value="bug">Bug</Option>
                  <Option value="code">Code</Option>
                  <Option value="doc">Documentation</Option>
                </Select>
              )}
            />
          </FormControl>

          <FormControl>
            <FormLabel>Priority</FormLabel>
            <Controller
              name="priority"
              control={control}
              render={({ field }) => (
                <Select
                  value={field.value}
                  onChange={(_, value) => field.onChange(value)}
                  className="bg-[#F8F8F7]"
                  placeholder="Select priority"
                >
                  <Option value="Low">Low</Option>
                  <Option value="Medium">Medium</Option>
                  <Option value="High">High</Option>
                </Select>
              )}
            />
          </FormControl>
        </Box>

        {/* Description */}
        <FormControl className="mb-6">
          <FormLabel>Description</FormLabel>
          <Controller
            name="description"
            control={control}
            render={({ field }) => (
              <Textarea
                {...field}
                value={field.value ? String(field.value) : ""}
                placeholder="Describe the issue in detail"
                minRows={5}
              />
            )}
          />
        </FormControl>

        {/* Due Date (Optional) */}
        <Box className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <FormControl>
            <FormLabel>Due Date</FormLabel>
            <Input
              type="date"
              className="bg-[#F8F8F7]"
              startDecorator={<Calendar size={16} />}
            />
          </FormControl>
        </Box>

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

      {/* Buttons */}
      <Box className="flex justify-end gap-4">
        <Button variant="soft" color="neutral" type="button">
          Cancel
        </Button>
        <Button type="submit" variant="solid" color="primary">
          Create Issue
        </Button>
      </Box>
    </form>
  );
};

export default Page;
