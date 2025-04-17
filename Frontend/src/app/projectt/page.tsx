'use client';

import { useState } from 'react';
import { useRouter as useNextRouter } from 'next/navigation';
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
  Stack
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
  MoreVertical
} from 'lucide-react';

// Mock project data
const projectData = {
  id: 'PROJ-123',
  name: 'Customer Portal Redesign',
  description: 'Redesign and rebuild the customer portal with improved UX and additional features.',
  type: 'scrum',
  createdAt: '2025-01-15',
  members: [
    { id: 1, name: 'Sarah Johnson', email: 'sarah.j@example.com', avatar: '/api/placeholder/40/40', role: 'Project Lead' },
    { id: 2, name: 'Michael Torres', email: 'michael.t@example.com', avatar: '/api/placeholder/40/40', role: 'Developer' },
    { id: 3, name: 'Aisha Patel', email: 'aisha.p@example.com', avatar: '/api/placeholder/40/40', role: 'Designer' }
  ],
  boards: [
    { id: 1, name: 'Sprint 1', status: 'In Progress' },
    { id: 2, name: 'Backlog', status: 'Active' }
  ]
};

export default function ProjectDetailPage() {
  const router = useNextRouter();
  const [inviteModalOpen, setInviteModalOpen] = useState(false);
  const [inviteEmail, setInviteEmail] = useState('');
  const [activeTab, setActiveTab] = useState(0);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleInviteUser = () => {
    // Logic to invite user would go here
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
      router.push('/projects');
    }, 1500);
  };

  const navigateToCreateProject = () => {
    router.push('/projects/create');
  };

  const navigateToAllProjects = () => {
    router.push('/projects');
  };

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
                <Chip size="sm" variant="soft" color="primary">{projectData.id}</Chip>
                <Chip size="sm" variant="soft" color="success">Active</Chip>
              </Box>
              <Typography level="h2" sx={{ mb: 1 }}>{projectData.name}</Typography>
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
          <Typography level="body-md" sx={{ mb: 2 }}>{projectData.description}</Typography>
          <Divider sx={{ my: 2 }} />
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Box sx={{ display: 'flex', gap: 3 }}>
              <Box>
                <Typography level="body-xs" color="neutral">Type</Typography>
                <Typography level="body-md">Scrum Project</Typography>
              </Box>
              <Box>
                <Typography level="body-xs" color="neutral">Created</Typography>
                <Typography level="body-md">Jan 15, 2025</Typography>
              </Box>
              <Box>
                <Typography level="body-xs" color="neutral">Members</Typography>
                <Box sx={{ display: 'flex', mt: 0.5 }}>
                  {projectData.members.slice(0, 3).map((member, index) => (
                    <Avatar
                      key={member.id}
                      src={member.avatar}
                      size="sm"
                      sx={{ ml: index > 0 ? -1 : 0 }}
                    />
                  ))}
                  {projectData.members.length > 3 && (
                    <Avatar size="sm" sx={{ ml: -1 }}>+{projectData.members.length - 3}</Avatar>
                  )}
                </Box>
              </Box>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Input
                size="sm"
                placeholder="Search in project..."
                startDecorator={<Search size={16} />}
                sx={{ width: 220 }}
              />
            </Box>
          </Box>
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
            <Card sx={{ width: '100%', mb: 3 }}>
              <CardContent>
                <Typography level="title-md" sx={{ mb: 2 }}>Project Actions</Typography>
                <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                  <Button 
                    variant="soft" 
                    color="primary" 
                    startDecorator={<PlusCircle size={16} />}
                    onClick={navigateToCreateProject}
                  >
                    Create New Project
                  </Button>
                  <Button 
                    variant="soft" 
                    color="neutral" 
                    startDecorator={<Search size={16} />}
                    onClick={navigateToAllProjects}
                  >
                    Get All Projects
                  </Button>
                  <Button 
                    variant="soft" 
                    color="neutral" 
                    startDecorator={<Activity size={16} />}
                  >
                    Get One Project
                  </Button>
                  <Button 
                    variant="soft" 
                    color="danger" 
                    startDecorator={<Trash2 size={16} />}
                    onClick={() => setDeleteModalOpen(true)}
                  >
                    Delete Project
                  </Button>
                  <Button 
                    variant="soft" 
                    color="success" 
                    startDecorator={<UserPlus size={16} />}
                    onClick={() => setInviteModalOpen(true)}
                  >
                    Invite Users
                  </Button>
                </Box>
              </CardContent>
            </Card>

            <Card sx={{ flex: '1 1 48%', minWidth: 300 }}>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                  <Typography level="title-md">Project Boards</Typography>
                  <Button 
                    size="sm" 
                    variant="plain" 
                    endDecorator={<ArrowLeft size={16} style={{ transform: 'rotate(180deg)' }} />}
                  >
                    View All
                  </Button>
                </Box>
                <List size="sm">
                  {projectData.boards.map(board => (
                    <ListItem key={board.id}>
                      <ListItemDecorator>
                        <GridIcon size={18} />
                      </ListItemDecorator>
                      <ListItemContent>{board.name}</ListItemContent>
                      <Chip size="sm" variant="soft" color={board.status === 'In Progress' ? 'warning' : 'success'}>
                        {board.status}
                      </Chip>
                    </ListItem>
                  ))}
                </List>
                <Button 
                  fullWidth 
                  variant="outlined" 
                  color="neutral" 
                  startDecorator={<PlusCircle size={16} />}
                  sx={{ mt: 2 }}
                >
                  Create New Board
                </Button>
              </CardContent>
            </Card>

            <Card sx={{ flex: '1 1 48%', minWidth: 300 }}>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                  <Typography level="title-md">Team Members</Typography>
                  <Button 
                    size="sm" 
                    variant="plain" 
                    endDecorator={<ArrowLeft size={16} style={{ transform: 'rotate(180deg)' }} />}
                  >
                    View All
                  </Button>
                </Box>
                <List size="sm">
                  {projectData.members.map(member => (
                    <ListItem key={member.id}>
                      <ListItemDecorator>
                        <Avatar size="sm" src={member.avatar} />
                      </ListItemDecorator>
                      <ListItemContent>
                        <Typography level="body-sm">{member.name}</Typography>
                        <Typography level="body-xs" color="neutral">{member.email}</Typography>
                      </ListItemContent>
                      <Chip size="sm" variant="soft" color="neutral">
                        {member.role}
                      </Chip>
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
        
        <TabPanel value={1}>
          <Box sx={{ p: 4, textAlign: 'center' }}>
            <Typography level="body-lg">Boards content would be displayed here</Typography>
          </Box>
        </TabPanel>
        
        <TabPanel value={2}>
          <Box sx={{ p: 4, textAlign: 'center' }}>
            <Typography level="body-lg">Members management would be displayed here</Typography>
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
    </Box>
  );
}