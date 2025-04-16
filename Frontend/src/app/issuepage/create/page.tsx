"use client";
import { Calendar, User, Paperclip } from "lucide-react";
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
} from "@mui/joy";
import { useForm, Controller } from "react-hook-form";
import { Issue, useCreateIssue } from "../../../hook/issuehook";

const Page = () => {
  const { mutate } = useCreateIssue();
  const { handleSubmit, control,reset  } = useForm<Issue>({
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
    mutate(data, {
      onSuccess: () => { 
        reset({
          title: "",
          priority: "Medium",
          assignee: "",
          project: "",
          type: "code",
          description: "",
        });
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
                  onChange={(_, value) => field.onChange(value)} // Note the value handler
                  className="bg-[#F8F8F7]"
                  placeholder="Select project"
                >
                  <Option value="project-1">Project 1</Option>
                  <Option value="project-2">Project 2</Option>
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

        {/* Assignee */}
        <Box className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <FormControl>
            <FormLabel>Assignee</FormLabel>
            <Controller
              name="assignee"
              control={control}
              render={({ field }) => (
                <Select
                value={field.value}
                onChange={(_, value) => field.onChange(value)}
                  startDecorator={<User size={16} />}
                  className="bg-[#F8F8F7]"
                  placeholder="Select team member"
                >
                  <Option value="user1">User 1</Option>
                  <Option value="user2">User 2</Option>
                </Select>
              )}
            />
          </FormControl>
        </Box>

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

        {/* Attachments (UI Only) */}
        <FormControl className="mb-6">
          <FormLabel>Attachments</FormLabel>
          <Box className="p-4 border rounded-lg bg-violet-50">
            <Box className="flex items-center mb-2">
              <Paperclip size={16} className="text-violet-500 mr-2" />
              <Typography level="body-sm" fontWeight="md">
                Add Files
              </Typography>
            </Box>
            <Typography level="body-xs" className="text-gray-500 mb-2">
              Drag and drop files here or click to browse
            </Typography>
            <Button size="sm" color="primary" variant="solid">
              Browse Files
            </Button>
          </Box>
        </FormControl>

        {/* Buttons */}
        <Box className="flex justify-end gap-4">
          <Button variant="soft" color="neutral" type="button">
            Cancel
          </Button>
          <Button type="submit" variant="solid" color="primary">
            Create Issue
          </Button>
        </Box>
      </Box>
    </form>
  );
};

export default Page;
