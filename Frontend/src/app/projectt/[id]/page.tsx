'use client';

import { useEffect, useState } from 'react';
import { useRouter as useNextRouter, useParams } from 'next/navigation';
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
} from '@mui/joy';
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
  Plus
} from 'lucide-react';

interface Member {
  id: string;
  name: string;
  email: string;
  role: string;
  avatar: string;
}

interface Task {
  id: string;
  title: string;
  description: string;
  assignee: string;
  dueDate: string;
  priority: 'low' | 'medium' | 'high';
}

interface Board {
  id: number;
  name: string;
  status: string;
  tasks?: Task[];
}

interface ProjectData {
  _id: string;
  name: string;
  description: string;
  type: string;
  createdAt: string;
  members: Member[];
  boards: Board[];
}

export default function ProjectDetailPage() {
  
  const { id } = useParams();
  const router = useNextRouter();
  const [projectData, setProjectData] = useState<ProjectData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [inviteModalOpen, setInviteModalOpen] = useState(false);
  const [inviteEmail, setInviteEmail] = useState('');
  const [activeTab, setActiveTab] = useState(0);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [newTaskModalOpen, setNewTaskModalOpen] = useState(false);
  const [selectedBoard, setSelectedBoard] = useState<number | null>(null);

  // Mock data for development
  const mockMembers = [
    { id: '1', name: 'Sarah Johnson', email: 'sarah.j@example.com', role: 'Project Manager', avatar: '/api/placeholder/40/40' },
    { id: '2', name: 'Michael Torres', email: 'michael.t@example.com', role: 'Developer', avatar: '/api/placeholder/40/40' },
    { id: '3', name: 'Aisha Patel', email: 'aisha.p@example.com', role: 'Designer', avatar: '/api/placeholder/40/40' },
    { id: '4', name: 'John Smith', email: 'john.s@example.com', role: 'Developer', avatar: '/api/placeholder/40/40' },
    { id: '5', name: 'Lisa Wong', email: 'lisa.w@example.com', role: 'QA Engineer', avatar: '/api/placeholder/40/40' },
  ];

  const mockBoards = [
    { 
      id: 1, 
      name: 'To Do', 
      status: 'active',
      tasks: [
        { id: 't1', title: 'Design user dashboard', description: 'Create wireframes for dashboard', assignee: 'Aisha Patel', dueDate: '2025-04-28', priority: 'high' as const },
        { id: 't2', title: 'API documentation', description: 'Document REST API endpoints', assignee: 'Michael Torres', dueDate: '2025-04-30', priority: 'medium' as const },
      ]
    },
    { 
      id: 2, 
      name: 'In Progress', 
      status: 'active',
      tasks: [
        { id: 't3', title: 'User authentication', description: 'Implement OAuth flow', assignee: 'John Smith', dueDate: '2025-04-25', priority: 'high' as const },
        { id: 't4', title: 'Mobile responsive layout', description: 'Ensure app works on mobile devices', assignee: 'Aisha Patel', dueDate: '2025-04-27', priority: 'medium' as const },
      ]
    },
    { 
      id: 3, 
      name: 'Review', 
      status: 'active',
      tasks: [
        { id: 't5', title: 'Payment integration', description: 'Review Stripe implementation', assignee: 'Michael Torres', dueDate: '2025-04-23', priority: 'high' as const },
      ]
    },
    { 
      id: 4, 
      name: 'Done', 
      status: 'active',
      tasks: [
        { id: 't6', title: 'Project setup', description: 'Initialize project repository', assignee: 'John Smith', dueDate: '2025-04-15', priority: 'medium' as const },
        { id: 't7', title: 'Requirements gathering', description: 'Document initial requirements', assignee: 'Sarah Johnson', dueDate: '2025-04-10', priority: 'high' as const },
      ]
    },
  ];

  useEffect(() => {
    // Fetch project data based on the ID
    async function fetchProject() {
      try {
       
        const response = await fetch(`http://localhost:5000/api/project/project/${id}`);
        if (!response.ok) throw new Error('Failed to fetch project data');
        const data = await response.json();
        
        // Mock data for development
        const mockData = {
          _id: id as string,
          name: "Project Management System",
          description: "A collaborative tool for managing projects, tasks, and team members with real-time updates.",
          type: "Software Development",
          createdAt: "2025-04-01",
          members: mockMembers,
          boards: mockBoards
        };
        
        setProjectData(mockData);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchProject();
  }, [id]);

  const handleInviteUser = () => { 
    console.log('Inviting user:', inviteEmail);
    setInviteEmail('');
    setInviteModalOpen(false);
  };

  const handleDeleteProject = () => {
    setIsDeleting(true);
    // Simulate deletion process
    setTimeout(() => {
      setIsDeleting(false);
      setDeleteModalOpen(false);
      // Would typically redirect to projects list
      router.push('/projectt');
    }, 1500);
  };

  const navigateToCreateProject = () => {
    router.push('/projectt/createproject');
  };

  const navigateToAllProjects = () => {
    router.push('/projectt');
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'danger';
      case 'medium':
        return 'warning';
      case 'low':
        return 'success';
      default:
        return 'neutral';
    }
  };

  const getBoardIcon = (boardName: string) => {
    switch (boardName) {
      case 'To Do':
        return <Clock size={16} />;
      case 'In Progress':
        return <Activity size={16} />;
      case 'Review':
        return <AlertCircle size={16} />;
      case 'Done':
        return <CheckCircle size={16} />;
      default:
        return <HelpCircle size={16} />;
    }
  };

  const openNewTaskModal = (boardId: number) => {
    setSelectedBoard(boardId);
    setNewTaskModalOpen(true);
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress size="lg" />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ p: 4, textAlign: 'center' }}>
        <Typography level="h4" color="danger">Error</Typography>
        <Typography>{error}</Typography>
        <Button onClick={navigateToAllProjects} sx={{ mt: 2 }}>Go Back to Projects</Button>
      </Box>
    );
  }

  return (
    <Box sx={{ maxWidth: 1200, margin: '0 auto', p: 3 }}>
      {/* Top navigation */}
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
        <Button 
          variant="outlined" 
          color="neutral" 
          startDecorator={<ArrowLeft size={16} />}
          onClick={navigateToAllProjects}
        >
          All Projects
        </Button>
        <Box sx={{ display: 'flex', gap: 2 }}>
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
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
            <Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                <Chip size="sm" variant="soft" color="primary">{projectData?._id}</Chip>
                <Chip size="sm" variant="soft" color="success">Active</Chip>
              </Box>
              <Typography level="h2" sx={{ mb: 1 }}>{projectData?.name}</Typography>
            </Box>
            <Box sx={{ display: 'flex', gap: 1 }}>
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
          <Typography level="body-md" sx={{ mb: 2 }}>{projectData?.description}</Typography>
        </CardContent>
      </Card>

      {/* Main content tabs */}
      <Tabs 
        value={activeTab} 
        onChange={(_, value) => setActiveTab(value as number)}
        sx={{ mb: 3 }}
      >
        <TabList>
          <Tab>Overview</Tab>
          <Tab>Boards</Tab>
          <Tab>Members</Tab>
          <Tab>Settings</Tab>
        </TabList>
        
        <TabPanel value={0}>
          <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap' }}>
            <Card sx={{ flex: '1 1 48%', minWidth: 300 }}>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                  <Typography level="title-md">Team Members</Typography>
                  <Button 
                    size="sm" 
                    variant="plain" 
                    endDecorator={<ArrowLeft size={16} style={{ transform: 'rotate(180deg)' }} />}
                    onClick={() => setActiveTab(2)}
                  >
                    View All
                  </Button>
                </Box>
                <List size="sm">
                  {projectData?.members.slice(0, 3).map((member) => (
                    <ListItem key={member.id}>
                      <ListItemDecorator>
                        <Avatar size="sm" src={member.avatar} />
                      </ListItemDecorator>
                      <ListItemContent>
                        <Typography level="body-sm">{member.name}</Typography>
                        <Typography level="body-xs" color="neutral">{member.role}</Typography>
                      </ListItemContent>
                    </ListItem>
                  ))}
                </List>
                <Button 
                  fullWidth 
                  variant="outlined" 
                  color="neutral" 
                  startDecorator={<UserPlus size={16} />}
                  onClick={() => setInviteModalOpen(true)}
                  sx={{ mt: 2 }}
                >
                  Invite Team Member
                </Button>
              </CardContent>
            </Card>

            <Card sx={{ width: '100%' }}>
              <CardContent>
                <Typography level="title-md" sx={{ mb: 2 }}>Recent Activity</Typography>
                <List size="sm">
                  <ListItem>
                    <ListItemDecorator>
                      <Avatar size="sm" src="/api/placeholder/40/40" />
                    </ListItemDecorator>
                    <ListItemContent>
                      <Typography level="body-sm">Sarah Johnson created a new task: "Implement user authentication"</Typography>
                      <Typography level="body-xs" color="neutral">2 hours ago</Typography>
                    </ListItemContent>
                  </ListItem>
                  <ListItem>
                    <ListItemDecorator>
                      <Avatar size="sm" src="/api/placeholder/40/40" />
                    </ListItemDecorator>
                    <ListItemContent>
                      <Typography level="body-sm">Michael Torres moved "Design review" to Done</Typography>
                      <Typography level="body-xs" color="neutral">Yesterday at 4:23 PM</Typography>
                    </ListItemContent>
                  </ListItem>
                  <ListItem>
                    <ListItemDecorator>
                      <Avatar size="sm" src="/api/placeholder/40/40" />
                    </ListItemDecorator>
                    <ListItemContent>
                      <Typography level="body-sm">Aisha Patel added comments to "API integration"</Typography>
                      <Typography level="body-xs" color="neutral">Yesterday at 2:15 PM</Typography>
                    </ListItemContent>
                  </ListItem>
                </List>
                <Button 
                  fullWidth 
                  variant="outlined" 
                  color="neutral" 
                  sx={{ mt: 2 }}
                >
                  View All Activity
                </Button>
              </CardContent>
            </Card>
          </Box>
        </TabPanel>
        
        {/* Boards Tab */}
        <TabPanel value={1}>
          <Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
              <Typography level="h3">Project Boards</Typography>
              <Button 
                variant="solid" 
                color="primary" 
                startDecorator={<Plus size={16} />}
              >
                Add New Board
              </Button>
            </Box>
            
            <Grid container spacing={2}>
              {projectData?.boards.map((board) => (
                <Grid key={board.id} xs={12} sm={6} md={3}>
                  <Card variant="outlined" sx={{ height: '100%' }}>
                    <CardContent sx={{ p: 2 }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          {getBoardIcon(board.name)}
                          <Typography level="title-md">{board.name}</Typography>
                        </Box>
                        <Badge badgeContent={board.tasks?.length || 0} color="primary" />
                      </Box>
                      <Divider sx={{ my: 1 }} />
                      
                      {board.tasks && board.tasks.length > 0 ? (
                        <Box sx={{ maxHeight: 320, overflowY: 'auto' }}>
                          <Stack spacing={1}>
                            {board.tasks.map((task) => (
                              <Card key={task.id} variant="soft" sx={{ p: 1 }}>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                                  <Typography level="title-sm">{task.title}</Typography>
                                  <Chip 
                                    size="sm" 
                                    variant="soft" 
                                    color={getPriorityColor(task.priority)}
                                  >
                                    {task.priority}
                                  </Chip>
                                </Box>
                                <Typography level="body-xs" noWrap>{task.description}</Typography>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 1 }}>
                                  <Typography level="body-xs" color="neutral">Due: {task.dueDate}</Typography>
                                  <Avatar 
                                    size="sm" 
                                    src="/api/placeholder/24/24" 
                                    title={task.assignee}
                                  />
                                </Box>
                              </Card>
                            ))}
                          </Stack>
                        </Box>
                      ) : (
                        <Box sx={{ py: 3, textAlign: 'center' }}>
                          <Typography level="body-md" color="neutral">No tasks in this board</Typography>
                        </Box>
                      )}
                      
                      <Button 
                        fullWidth 
                        variant="outlined" 
                        color="neutral" 
                        startDecorator={<Plus size={16} />}
                        sx={{ mt: 2 }}
                        onClick={() => openNewTaskModal(board.id)}
                      >
                        Add Task
                      </Button>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>
        </TabPanel>
        
        {/* Members Tab */}
        <TabPanel value={2}>
          <Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
              <Box>
                <Typography level="h3">Team Members</Typography>
                <Typography level="body-md" color="neutral">
                  Currently {projectData?.members.length} members in this project
                </Typography>
              </Box>
              <Button 
                variant="solid" 
                color="primary" 
                startDecorator={<UserPlus size={16} />}
                onClick={() => setInviteModalOpen(true)}
              >
                Invite New Member
              </Button>
            </Box>
            
            <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
              <Input 
                placeholder="Search members..."
                startDecorator={<Search size={16} />}
                sx={{ width: 300 }}
              />
              <Button variant="outlined" color="neutral">Filter</Button>
            </Box>
            
            <Grid container spacing={2}>
              {projectData?.members.map((member) => (
                <Grid key={member.id} xs={12} sm={6} md={4}>
                  <Card variant="outlined">
                    <CardContent>
                      <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
                        <Avatar 
                          src={member.avatar} 
                          sx={{ width: 64, height: 64 }}
                        />
                        <Box>
                          <Typography level="title-md">{member.name}</Typography>
                          <Typography level="body-sm" color="neutral">{member.email}</Typography>
                          <Chip 
                            size="sm" 
                            variant="soft" 
                            color="primary"
                            sx={{ mt: 1 }}
                          >
                            {member.role}
                          </Chip>
                        </Box>
                      </Box>
                      
                      <Divider sx={{ my: 1 }} />
                      
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
                        <Button 
                          size="sm" 
                          variant="outlined" 
                          color="neutral"
                          startDecorator={<MessageSquare size={14} />}
                        >
                          Message
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outlined" 
                          color="neutral"
                          startDecorator={<Edit size={14} />}
                        >
                          Edit Role
                        </Button>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>
        </TabPanel>
        
        <TabPanel value={3}>
          <Box sx={{ p: 4, textAlign: 'center' }}>
            <Typography level="body-lg">Project settings would be displayed here</Typography>
          </Box>
        </TabPanel>
      </Tabs>

      {/* Invite user modal */}
      <Modal open={inviteModalOpen} onClose={() => setInviteModalOpen(false)}>
        <ModalDialog sx={{ width: 400, maxWidth: '100%' }}>
          <ModalClose />
          <Typography level="h4" sx={{ mb: 2 }}>Invite Users to Project</Typography>
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
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
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
      <Modal open={deleteModalOpen} onClose={() => !isDeleting && setDeleteModalOpen(false)}>
        <ModalDialog sx={{ width: 400, maxWidth: '100%' }}>
          <ModalClose disabled={isDeleting} />
          <Typography level="h4" sx={{ mb: 2, color: 'danger.500' }}>Delete Project</Typography>
          <Typography level="body-md" sx={{ mb: 3 }}>
            Are you sure you want to delete this project? This action cannot be undone and all project data will be permanently lost.
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
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
              startDecorator={isDeleting ? <CircularProgress size="sm" /> : <Trash2 size={16} />}
              onClick={handleDeleteProject}
              disabled={isDeleting}
            >
              {isDeleting ? 'Deleting...' : 'Delete Project'}
            </Button>
          </Box>
        </ModalDialog>
      </Modal>

      {/* New Task Modal */}
      <Modal open={newTaskModalOpen} onClose={() => setNewTaskModalOpen(false)}>
        <ModalDialog sx={{ width: 500, maxWidth: '100%' }}>
          <ModalClose />
          <Typography level="h4" sx={{ mb: 2 }}>Add New Task</Typography>
          <Typography level="body-md" sx={{ mb: 3 }}>
            {selectedBoard !== null && `Adding task to ${projectData?.boards.find(b => b.id === selectedBoard)?.name}`}
          </Typography>
          
          <Box sx={{ mb: 3 }}>
            <Box sx={{ mb: 2 }}>
              <Typography level="body-sm" sx={{ mb: 1 }}>Task Title</Typography>
              <Input fullWidth placeholder="Enter task title" />
            </Box>
            
            <Box sx={{ mb: 2 }}>
              <Typography level="body-sm" sx={{ mb: 1 }}>Description</Typography>
              {/* <Textarea fullWidth placeholder="Enter task description"  /> */}
            </Box>
            
            <Grid container spacing={2} sx={{ mb: 2 }}>
              <Grid xs={6}>
                <Typography level="body-sm" sx={{ mb: 1 }}>Assignee</Typography>
                <Input fullWidth placeholder="Select assignee" />
              </Grid>
              <Grid xs={6}>
                <Typography level="body-sm" sx={{ mb: 1 }}>Due Date</Typography>
                <Input fullWidth type="date" />
              </Grid>
            </Grid>
            
            <Box sx={{ mb: 2 }}>
              <Typography level="body-sm" sx={{ mb: 1 }}>Priority</Typography>
              <Box sx={{ display: 'flex', gap: 1 }}>
                <Button variant="soft" color="success" sx={{ flex: 1 }}>Low</Button>
                <Button variant="soft" color="warning" sx={{ flex: 1 }}>Medium</Button>
                <Button variant="soft" color="danger" sx={{ flex: 1 }}>High</Button>
              </Box>
            </Box>
            
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1, mt: 3 }}>
              <Button 
                variant="plain" 
                color="neutral" 
                onClick={() => setNewTaskModalOpen(false)}
              >
                Cancel
              </Button>
              <Button 
                variant="solid" 
                color="primary"
              >
                Add Task
              </Button>
            </Box>
          </Box>
        </ModalDialog>
      </Modal>
    </Box>
  );
}