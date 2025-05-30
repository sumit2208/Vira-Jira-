"use client";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useRouter as useNextRouter, useParams } from "next/navigation";
import { useDeleteProject } from "@/hook/projecthook";
import {
  Box,
  Typography,
  Sheet,
  Card,
  CardContent,
  Button,
  IconButton,
  Divider,
  Chip,
  Avatar,
  Modal,
  ModalDialog,
  ModalClose,
  Input,
  Tabs,
  TabList,
  Tab,
  TabPanel,
  List,
  ListItem,
  ListItemContent,
  ListItemDecorator,
  CircularProgress,
  Grid,
  AspectRatio,
  Stack,
  Badge,
  Textarea,
} from "@mui/joy";
import {
  Users,
  Trash2,
  Mail,
  ArrowLeft,
  UserPlus,
  Settings,
  PlusCircle,
  Activity,
  Calendar,
  Grid as GridIcon,
  HelpCircle,
  Search,
  MessageSquare,
  MoreVertical,
  CheckCircle,
  Clock,
  AlertCircle,
  Edit,
  Plus,
} from "lucide-react";
import { useGetIssuesByProject } from "@/hook/issuehook";

interface Issue {
  _id: string;
  title: string;
  description: string;
  status: "todo" | "in-progress" | "review" | "done";
  priority: "low" | "medium" | "high";
  assignee?: string;
  createdAt: string;
}

interface ProjectData {
  _id: string;
  name: string;
  description: string;
  type: string;
  members: string[];
  createdAt: string;
  project_key: string;
}

export default function ProjectDetailPage() {
  const { id } = useParams();
  const router = useNextRouter();
  const [projectData, setProjectData] = useState<ProjectData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [inviteModalOpen, setInviteModalOpen] = useState(false);
  const [inviteEmail, setInviteEmail] = useState("");
  const [activeTab, setActiveTab] = useState(0);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [newTaskModalOpen, setNewTaskModalOpen] = useState(false);
  const [selectedBoard, setSelectedBoard] = useState<number | null>(null);
  const [draggedIssue, setDraggedIssue] = useState<Issue | null>(null);
  const [issues, setIssues] = useState<Issue[]>([]);

  const { mutate: deleteProject } = useDeleteProject();
  const { data } = useGetIssuesByProject(projectData?.name || "");

  useEffect(() => {
    if (data) {
      // Map your data to the Issue interface format
      const mappedIssues = data.map((issue: any) => ({
        _id: issue._id,
        title: issue.title || issue.name || "Untitled Issue",
        description: issue.description || "",
        status: issue.status || "todo",
        priority: issue.priority || "medium",
        assignee: issue.assignee,
        createdAt: issue.createdAt,
      }));
      setIssues(mappedIssues);
    }
  }, [data]);

  const columns = [
    { id: "todo", title: "To Do", color: "neutral" },
    { id: "in-progress", title: "In Progress", color: "primary" },
    { id: "review", title: "Review", color: "warning" },
    { id: "done", title: "Done", color: "success" },
  ];

  const handleDragStart = (e: React.DragEvent, issue: Issue) => {
    setDraggedIssue(issue);
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  };

  const handleDrop = (e: React.DragEvent, newStatus: string) => {
    e.preventDefault();
    if (draggedIssue && draggedIssue.status !== newStatus) {
      setIssues((prev) =>
        prev.map((issue) =>
          issue._id === draggedIssue._id
            ? { ...issue, status: newStatus as Issue["status"] }
            : issue
        )
      );
    }
    setDraggedIssue(null);
  };

  const getIssuesByStatus = (status: string) => {
    return issues.filter((issue) => issue.status === status);
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "danger";
      case "medium":
        return "warning";
      case "low":
        return "success";
      default:
        return "neutral";
    }
  };

  useEffect(() => {
    async function fetchProject() {
      try {
        const response = await fetch(
          `http://localhost:5000/api/project/project/${id}`
        );
        if (!response.ok) throw new Error("Failed to fetch project data");
        const data = await response.json();

        setProjectData(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchProject();
  }, [id]);

  const handleInviteUser = () => {
    console.log("Inviting user:", inviteEmail);
    setInviteEmail("");
    setInviteModalOpen(false);
  };

  const handleDeleteProject = (_id: string) => {
    setIsDeleting(true);
    deleteProject(_id);
    setTimeout(() => {
      setIsDeleting(false);
      setDeleteModalOpen(false);
      router.push("/projectt");
    }, 1500);
  };

  const navigateToCreateProject = () => {
    router.push("/projectt/createproject");
  };

  const navigateToAllProjects = () => {
    router.push("/projectt");
  };

  console.log(data);

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress size="lg" />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ p: 4, textAlign: "center" }}>
        <Typography level="h4" color="danger">
          Error
        </Typography>
        <Typography>{error}</Typography>
        <Button onClick={navigateToAllProjects} sx={{ mt: 2 }}>
          Go Back to Projects
        </Button>
      </Box>
    );
  }

  return (
    <Box sx={{ maxWidth: 1200, margin: "0 auto", p: 3 }}>
      {/* Top navigation */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          mb: 3,
        }}
      >
        <Button
          variant="outlined"
          color="neutral"
          startDecorator={<ArrowLeft size={16} />}
          onClick={navigateToAllProjects}
        >
          All Projects
        </Button>
        <Box sx={{ display: "flex", gap: 2 }}>
          <Button
            variant="solid"
            color="primary"
            startDecorator={<PlusCircle size={16} />}
            onClick={navigateToCreateProject}
          >
            Create New Project
          </Button>
          <IconButton variant="soft" color="neutral">
            <Settings size={20} />
          </IconButton>
        </Box>
      </Box>

      {/* Project header */}
      <Card sx={{ mb: 3 }}>
        <CardContent sx={{ p: 3 }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              mb: 2,
            }}
          >
            <Box>
              <Box
                sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}
              >
                <Chip size="sm" variant="soft" color="primary">
                  {projectData?._id}
                </Chip>
                <Chip size="sm" variant="soft" color="success">
                  Active
                </Chip>
              </Box>
              <Typography level="h2" sx={{ mb: 1 }}>
                {projectData?.name}
              </Typography>
            </Box>
            <Box sx={{ display: "flex", gap: 1 }}>
              <Button
                variant="outlined"
                color="danger"
                startDecorator={<Trash2 size={16} />}
                onClick={() => setDeleteModalOpen(true)}
              >
                Delete Project
              </Button>
              <Button
                variant="outlined"
                color="primary"
                startDecorator={<UserPlus size={16} />}
                onClick={() => setInviteModalOpen(true)}
              >
                Invite Users
              </Button>
            </Box>
          </Box>
          <Typography level="body-md" sx={{ mb: 2 }}>
            {projectData?.project_key}
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            {projectData?.members && projectData.members.length > 0 ? (
              <>
                <Box sx={{ display: "flex", alignItems: "center", mr: 1 }}>
                  {projectData.members
                    .slice(0, 3)
                    .map((member: any, index: number) => (
                      <Avatar
                        key={member._id || index}
                        size="sm"
                        sx={{
                          width: 32,
                          height: 32,
                          ml: index > 0 ? -1 : 0,
                          border: "2px solid",
                          borderColor: "background.surface",
                          zIndex: 3 - index,
                        }}
                      >
                        {member ? member.charAt(0).toUpperCase() : "Z"}
                      </Avatar>
                    ))}
                  {projectData.members.length > 3 && (
                    <Avatar
                      size="sm"
                      sx={{
                        width: 32,
                        height: 32,
                        ml: -1,
                        border: "2px solid",
                        borderColor: "background.surface",
                        bgcolor: "neutral.softBg",
                        color: "neutral.softColor",
                      }}
                    >
                      +{projectData.members.length - 3}
                    </Avatar>
                  )}
                </Box>
                <Typography level="body-sm" sx={{ color: "text.secondary" }}>
                  {projectData.members.length} member
                  {projectData.members.length !== 1 ? "s" : ""}
                </Typography>
              </>
            ) : (
              <Typography level="body-sm" sx={{ color: "text.secondary" }}>
                No members yet
              </Typography>
            )}
          </Box>
        </CardContent>
      </Card>

      {/* Issue Board */}
      <Card>
        <CardContent sx={{ p: 3 }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 3,
            }}
          >
            <Typography level="h3">Issue Board</Typography>
            <Button
              variant="solid"
              color="primary"
              startDecorator={<Plus size={16} />}
              onClick={() => setNewTaskModalOpen(true)}
            >
              Add Issue
            </Button>
          </Box>

          <Grid container spacing={2} sx={{ minHeight: "500px" }}>
            {columns.map((column) => (
              <Grid xs={3} key={column.id}>
                <Card
                  variant="outlined"
                  sx={{ height: "100%", minHeight: "500px" }}
                  onDragOver={handleDragOver}
                  onDrop={(e) => handleDrop(e, column.id)}
                >
                  <CardContent sx={{ p: 2 }}>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        mb: 2,
                      }}
                    >
                      <Typography level="title-md" sx={{ fontWeight: "bold" }}>
                        {column.title}
                      </Typography>
                      <Chip
                        size="sm"
                        variant="soft"
                        color={column.color as any}
                      >
                        {getIssuesByStatus(column.id).length}
                      </Chip>
                    </Box>

                    <Stack spacing={2}>
                      {getIssuesByStatus(column.id).map((issue) => (
                        <Card
                          key={issue._id}
                          variant="soft"
                          sx={{
                            cursor: "grab",
                            "&:active": { cursor: "grabbing" },
                            "&:hover": { bgcolor: "background.level2" },
                          }}
                          draggable
                          onDragStart={(e) => handleDragStart(e, issue)}
                        >
                          <CardContent sx={{ p: 2 }}>
                            <Box
                              sx={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "flex-start",
                                mb: 1,
                              }}
                            >
                              <Typography
                                level="title-sm"
                                sx={{ fontWeight: "bold", flex: 1 }}
                              >
                                {issue.title}
                              </Typography>
                              <Chip
                                size="sm"
                                variant="soft"
                                color={getPriorityColor(issue.priority) as any}
                              >
                                {issue.priority}
                              </Chip>
                            </Box>

                            {issue.description && (
                              <Typography
                                level="body-xs"
                                sx={{ mb: 2, color: "text.secondary" }}
                              >
                                {issue.description.length > 100
                                  ? `${issue.description.substring(0, 100)}...`
                                  : issue.description}
                              </Typography>
                            )}

                            <Box
                              sx={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                mt: 1,
                              }}
                            >
                              {issue.assignee && (
                                <Avatar
                                  size="sm"
                                  sx={{ width: 24, height: 24 }}
                                >
                                  {issue.assignee.charAt(0).toUpperCase()}
                                </Avatar>
                              )}
                              <Typography
                                level="body-xs"
                                sx={{ color: "text.tertiary" }}
                              >
                                {new Date(issue.createdAt).toLocaleDateString()}
                              </Typography>
                            </Box>
                          </CardContent>
                        </Card>
                      ))}
                    </Stack>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </CardContent>
      </Card>

      {/* Invite user modal */}
      <Modal open={inviteModalOpen} onClose={() => setInviteModalOpen(false)}>
        <ModalDialog sx={{ width: 400, maxWidth: "100%" }}>
          <ModalClose />
          <Typography level="h4" sx={{ mb: 2 }}>
            Invite Users to Project
          </Typography>
          <Typography level="body-md" sx={{ mb: 3 }}>
            Enter email addresses of users you want to invite to this project.
          </Typography>
          <Box sx={{ mb: 3 }}>
            <Input
              fullWidth
              placeholder="Enter email address"
              value={inviteEmail}
              onChange={(e) => setInviteEmail(e.target.value)}
              startDecorator={<Mail size={16} />}
              sx={{ mb: 2 }}
            />
            <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 1 }}>
              <Button
                variant="plain"
                color="neutral"
                onClick={() => setInviteModalOpen(false)}
              >
                Cancel
              </Button>
              <Button
                variant="solid"
                color="primary"
                startDecorator={<UserPlus size={16} />}
                onClick={handleInviteUser}
                disabled={!inviteEmail.trim()}
              >
                Send Invitation
              </Button>
            </Box>
          </Box>
        </ModalDialog>
      </Modal>

      {/* Delete project confirmation modal */}
      <Modal
        open={deleteModalOpen}
        onClose={() => !isDeleting && setDeleteModalOpen(false)}
      >
        <ModalDialog sx={{ width: 400, maxWidth: "100%" }}>
          <ModalClose disabled={isDeleting} />
          <Typography level="h4" sx={{ mb: 2, color: "danger.500" }}>
            Delete Project
          </Typography>
          <Typography level="body-md" sx={{ mb: 3 }}>
            Are you sure you want to delete this project? This action cannot be
            undone and all project data will be permanently lost.
          </Typography>
          <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 1 }}>
            <Button
              variant="plain"
              color="neutral"
              onClick={() => setDeleteModalOpen(false)}
              disabled={isDeleting}
            >
              Cancel
            </Button>
            <Button
              variant="solid"
              color="danger"
              startDecorator={
                isDeleting ? (
                  <CircularProgress size="sm" />
                ) : (
                  <Trash2 size={16} />
                )
              }
              onClick={() => {
                if (projectData && projectData._id) {
                  handleDeleteProject(projectData._id);
                } else {
                  console.error("Project ID is missing");
                }
              }}
              disabled={isDeleting}
            >
              {isDeleting ? "Deleting..." : "Delete Project"}
            </Button>
          </Box>
        </ModalDialog>
      </Modal>

      {/* New Task Modal */}
      <Modal open={newTaskModalOpen} onClose={() => setNewTaskModalOpen(false)}>
        <ModalDialog sx={{ width: 500, maxWidth: "100%" }}>
          <ModalClose />
          <Typography level="h4" sx={{ mb: 2 }}>
            Add New Task
          </Typography>

          <Box sx={{ mb: 3 }}>
            <Box sx={{ mb: 2 }}>
              <Typography level="body-sm" sx={{ mb: 1 }}>
                Task Title
              </Typography>
              <Input fullWidth placeholder="Enter task title" />
            </Box>

            <Box sx={{ mb: 2 }}>
              <Typography level="body-sm" sx={{ mb: 1 }}>
                Description
              </Typography>
              {/* <Textarea fullWidth placeholder="Enter task description"  /> */}
            </Box>

            <Grid container spacing={2} sx={{ mb: 2 }}>
              <Grid xs={6}>
                <Typography level="body-sm" sx={{ mb: 1 }}>
                  Assignee
                </Typography>
                <Input fullWidth placeholder="Select assignee" />
              </Grid>
              <Grid xs={6}>
                <Typography level="body-sm" sx={{ mb: 1 }}>
                  Due Date
                </Typography>
                <Input fullWidth type="date" />
              </Grid>
            </Grid>

            <Box sx={{ mb: 2 }}>
              <Typography level="body-sm" sx={{ mb: 1 }}>
                Priority
              </Typography>
              <Box sx={{ display: "flex", gap: 1 }}>
                <Button variant="soft" color="success" sx={{ flex: 1 }}>
                  Low
                </Button>
                <Button variant="soft" color="warning" sx={{ flex: 1 }}>
                  Medium
                </Button>
                <Button variant="soft" color="danger" sx={{ flex: 1 }}>
                  High
                </Button>
              </Box>
            </Box>

            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                gap: 1,
                mt: 3,
              }}
            >
              <Button
                variant="plain"
                color="neutral"
                onClick={() => setNewTaskModalOpen(false)}
              >
                Cancel
              </Button>
              <Button variant="solid" color="primary">
                Add Task
              </Button>
            </Box>
          </Box>
        </ModalDialog>
      </Modal>
    </Box>
  );
}
