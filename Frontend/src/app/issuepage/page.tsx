"use client";
import {
  Button,
  Box,
  Typography, 
  Sheet,
  Table,
  IconButton,
  Modal,
  ModalDialog,
  ModalClose,
  Checkbox,
  FormControl,
  FormLabel,
  Divider,
  Select,
  Option,
} from "@mui/joy";
import Link from "next/link";
import React, { useState } from "react";
import { 
  Filter, 
  Bug,
  FileCode,
  FileText, 
} from "lucide-react";
import { useGetIssues } from "../../hook/issuehook";

// Define TypeScript interfaces for our data
interface Issue {
  id: string;
  title: string;
  priority: "High" | "Medium" | "Low";
  assignee: string;
  project:String,
  type: "bug" | "code" | "doc";
  description?:String
  date?:Date
}

type PriorityColor = "danger" | "warning" | "success" | "neutral";

const IssuePage = () => {
  const [tabValue, setTabValue] = useState(0);
  const [filterOpen, setFilterOpen] = useState(false);

  const { data: issues = [], isLoading, isError } = useGetIssues();

  // Fixed the event handler type to match MUI Joy's Tabs component expectations
  const handleTabChange = (
    event: React.SyntheticEvent | null,
    newValue: string | number | null
  ) => {
    if (typeof newValue === "number") {
      setTabValue(newValue);
    }
  };

  const handleFilterOpen = () => setFilterOpen(true);
  const handleFilterClose = () => setFilterOpen(false);

  

  const getIssueIcon = (type: Issue["type"]) => {
    switch (type) {
      case "bug":
        return <Bug size={16} />;
      case "code":
        return <FileCode size={16} />;
      case "doc":
        return <FileText size={16} />;
      default:
        return <FileText size={16} />;
    }
  };

  const renderPriorityBadge = (priority: Issue["priority"]) => {
    let color: PriorityColor = "neutral";
    if (priority === "High") color = "danger";
    else if (priority === "Medium") color = "warning";
    else if (priority === "Low") color = "success";

    return (
      <Typography
        level="body-sm"
        sx={{
          backgroundColor: `${color}.100`,
          color: `${color}.700`,
          px: 1,
          py: 0.5,
          borderRadius: "sm",
          fontSize: "xs",
          fontWeight: "md",
        }}
      >
        {priority}
      </Typography>
    );
  };

  return (
    <Box sx={{ p: 3, maxWidth: "1200px", mx: "auto" }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
        }}
      >
        <Typography level="h1" component="h1">
          Issues
        </Typography>
        <Link href="/issuepage/create" passHref>
          <Button color="primary" sx={{ borderRadius: "lg" }}>
            Create Issue
          </Button>
        </Link>
      </Box>

      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
        
        <Button
          variant="outlined"
          color="neutral"
          startDecorator={<Filter size={16} />}
          sx={{ ml: 2 }}
          onClick={handleFilterOpen}
        >
          Filter
        </Button>
      </Box>

      {/* Filter Modal */}
      <Modal open={filterOpen} onClose={handleFilterClose}>
        <ModalDialog
          aria-labelledby="filter-modal-title"
          size="md"
          sx={{
            maxWidth: 500,
            borderRadius: "md",
            p: 3,
            boxShadow: "lg",
          }}
        >
          <ModalClose
            variant="outlined"
            sx={{
              top: 10,
              right: 10,
              borderRadius: "50%",
              bgcolor: "background.surface",
            }}
          />
          <Typography
            id="filter-modal-title"
            level="h4"
            textColor="inherit"
            fontWeight="lg"
            mb={2}
          >
            Filter Issues
          </Typography>

          <Divider sx={{ my: 2 }} />

          <Box sx={{ mt: 1 }}>
            <Checkbox label="Assigned to me" sx={{ mb: 2 }} />

            <FormControl sx={{ mb: 2 }}>
              <FormLabel>Priority</FormLabel>
              <Select
                multiple
                placeholder="Select priorities"
                sx={{ width: "100%" }}
                slotProps={{
                  listbox: {
                    sx: { maxHeight: 200, overflow: "auto" },
                  },
                }}
              >
                <Option value="High">High</Option>
                <Option value="Medium">Medium</Option>
                <Option value="Low">Low</Option>
              </Select>
            </FormControl>

            <FormControl sx={{ mb: 2 }}>
              <FormLabel>Type</FormLabel>
              <Select
                multiple
                placeholder="Select types"
                sx={{ width: "100%" }}
                slotProps={{
                  listbox: {
                    sx: { maxHeight: 200, overflow: "auto" },
                  },
                }}
              >
                <Option value="bug">Bug</Option>
                <Option value="code">Code</Option>
                <Option value="doc">Documentation</Option>
              </Select>
            </FormControl>
          </Box>

          <Box
            sx={{ mt: 3, display: "flex", gap: 2, justifyContent: "flex-end" }}
          >
            <Button variant="plain" color="neutral">
              Reset
            </Button>
            <Button>Apply Filters</Button>
          </Box>
        </ModalDialog>
      </Modal>

      <Typography level="body-sm" sx={{ color: "text.secondary", mb: 2 }}>
        Showing 15 issues
      </Typography>

      <Sheet
        variant="outlined"
        sx={{
          borderRadius: "md",
          overflow: "auto",
          mb: 2,
        }}
      >
        <Table
          hoverRow
          sx={{
            "& th": {
              backgroundColor: "background.level1",
              fontWeight: "md",
            },
            "& td, & th": {
              py: 1.5,
              px: 2,
              fontSize: "sm",
            },
          }}
        >
          <thead>
            <tr>
              <th style={{ width: "80px" }}>ID</th>
              <th>Title</th>
              <th style={{ width: "100px" }}>Priority</th> 
              <th style={{ width: "100px" }}>Projects</th> 
              <th style={{ width: "120px" }}>Assignee</th> 
            </tr>
          </thead>
          <tbody>
            {issues.map((issue) => (
              <tr key={issue.id}>
                <td>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    {getIssueIcon(issue.type)}
                    <Typography level="body-sm" fontWeight="md">
                      {issue.id}
                    </Typography>
                  </Box>
                </td>
                <td>
                  <Typography level="body-sm">{issue.title}</Typography>
                </td>
                <td>
                  <Typography level="body-sm">{issue.project}</Typography>
                </td>
                <td>{renderPriorityBadge(issue.priority)}</td>
                <td>
                  <Typography level="body-sm">{issue.assignee}</Typography>
                </td> 
              </tr>
            ))}
          </tbody>
        </Table>
      </Sheet>

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: 2,
        }}
      >
        <Button variant="plain" color="neutral" size="sm">
          Previous
        </Button>
        <Typography level="body-sm">Page 1 of 3</Typography>
        <Button variant="plain" color="primary" size="sm">
          Next
        </Button>
      </Box>
    </Box>
  );
};

export default IssuePage;
