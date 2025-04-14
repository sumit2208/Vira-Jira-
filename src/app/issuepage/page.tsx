"use client";
import { useState } from "react";
import {
  Calendar,
  User,
  Clock4,
  Paperclip,
  Search,
} from "lucide-react";
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Option,
  Select,
  Textarea,
  Typography,
  Checkbox,
  Modal,
  LinearProgress,
  Box,
} from "@mui/joy";

const IssuePage = () => {
  return (
    <Box className="max-w-4xl mx-auto p-6 text-sm">
      <nav className="text-gray-500 text-xs mb-6 space-x-2">
        <span>Issues</span>
        <span>&gt;</span>
        <span>Create Issue</span>
      </nav>

      <Typography level="h4" className="mb-6">
        Create New Issue
      </Typography>

      {/* Issue Title */}
      <FormControl className="mb-6">
        <FormLabel>Issue Title</FormLabel>
        <Input placeholder="Enter a descriptive title" />
      </FormControl>

      {/* Project, Issue Type, Priority */}
      <Box className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <FormControl>
          <FormLabel>Project</FormLabel>
          <Select placeholder="Select project">
            <Option value="project-1">Project 1</Option>
            <Option value="project-2">Project 2</Option>
          </Select>
        </FormControl>
        <FormControl>
          <FormLabel>Issue Type</FormLabel>
          <Select placeholder="Select type">
            <Option value="bug">Bug</Option>
            <Option value="feature">Feature</Option>
          </Select>
        </FormControl>
        <FormControl>
          <FormLabel>Priority</FormLabel>
          <Select placeholder="Select priority">
            <Option value="low">Low</Option>
            <Option value="medium">Medium</Option>
            <Option value="high">High</Option>
          </Select>
        </FormControl>
      </Box>

      {/* Description */}
      <FormControl className="mb-6">
        <FormLabel>Description</FormLabel>
        <Textarea placeholder="Describe the issue in detail" minRows={5} />
      </FormControl>

      {/* Assignment */}
      <Box className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <FormControl>
          <FormLabel>Assignee</FormLabel>
          <Select startDecorator={<User size={16} />} placeholder="Select team member">
            <Option value="user1">User 1</Option>
          </Select>
        </FormControl>
        <FormControl>
          <FormLabel>Reporter</FormLabel>
          <Input
            startDecorator={<User size={16} />}
            value="John Doe"
            readOnly
          />
        </FormControl>
      </Box>

      {/* Time Tracking */}
      <Box className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <FormControl>
          <FormLabel>Original Estimate</FormLabel>
          <Input
            placeholder="e.g. 4h 30m"
            startDecorator={<Clock4 size={16} />}
          />
        </FormControl>
        <FormControl>
          <FormLabel>Due Date</FormLabel>
          <Input type="date" startDecorator={<Calendar size={16} />} />
        </FormControl>
      </Box>

      {/* Attachments */}
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

      

      {/* Action Buttons */}
      <Box className="flex justify-end gap-4">
        <Button variant="soft" color="neutral">
          Cancel
        </Button>
        <Button variant="solid" color="primary">
          Create Issue
        </Button>
      </Box>
    </Box>
  );
};

export default IssuePage;
