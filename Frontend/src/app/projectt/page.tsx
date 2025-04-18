'use client';

import React, { useState } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  IconButton,
  Input,
  Grid,
  Chip,
  Avatar,
  AvatarGroup,
  Dropdown,
  Menu,
  MenuButton,
  MenuItem,
  Divider,
  Badge,
  Sheet,
  Tab,
  TabList,
  Tabs
} from '@mui/joy';
import {
  Search,
  Plus,
  Filter,
  PlusCircle,
  Grid as GridIcon,
  List as ListIcon,
  MoreVertical,
  Star,
  Calendar,
  Users,
  Settings,
  Trash2,
  ArrowUpRight
} from 'lucide-react';
import { useRouter } from 'next/navigation';

// Mock project data
const projectsData = [
  {
    id: 'PROJ-123',
    name: 'Customer Portal Redesign',
    description: 'Redesign and rebuild the customer portal with improved UX and additional features.',
    type: 'scrum',
    status: 'Active',
    favorite: true,
    createdAt: '2025-01-15',
    progress: 65,
    members: [
      { id: 1, name: 'Sarah J.', avatar: '/api/placeholder/40/40' },
      { id: 2, name: 'Michael T.', avatar: '/api/placeholder/40/40' },
      { id: 3, name: 'Aisha P.', avatar: '/api/placeholder/40/40' }
    ]
  },
  {
    id: 'PROJ-456',
    name: 'Mobile App Development',
    description: 'Create a new mobile app for iOS and Android platforms.',
    type: 'kanban',
    status: 'Active',
    favorite: false,
    createdAt: '2025-02-03',
    progress: 32,
    members: [
      { id: 4, name: 'David L.', avatar: '/api/placeholder/40/40' },
      { id: 2, name: 'Michael T.', avatar: '/api/placeholder/40/40' }
    ]
  },
  {
    id: 'PROJ-789',
    name: 'API Integration',
    description: 'Integrate third-party payment APIs into the existing platform.',
    type: 'basic',
    status: 'Completed',
    favorite: false,
    createdAt: '2024-12-10',
    progress: 100,
    members: [
      { id: 5, name: 'Jennifer K.', avatar: '/api/placeholder/40/40' },
      { id: 6, name: 'Robert M.', avatar: '/api/placeholder/40/40' },
      { id: 7, name: 'Emma S.', avatar: '/api/placeholder/40/40' },
      { id: 8, name: 'Jason P.', avatar: '/api/placeholder/40/40' }
    ]
  },
  {
    id: 'PROJ-101',
    name: 'Data Analytics Dashboard',
    description: 'Build a real-time analytics dashboard for business metrics.',
    type: 'scrum',
    status: 'On Hold',
    favorite: true,
    createdAt: '2024-11-22',
    progress: 45,
    members: [
      { id: 9, name: 'Lisa N.', avatar: '/api/placeholder/40/40' },
      { id: 10, name: 'Carlos R.', avatar: '/api/placeholder/40/40' }
    ]
  },
  {
    id: 'PROJ-112',
    name: 'Security Audit',
    description: 'Conduct a comprehensive security audit and implement improvements.',
    type: 'kanban',
    status: 'Active',
    favorite: false,
    createdAt: '2025-03-01',
    progress: 18,
    members: [
      { id: 11, name: 'Richard T.', avatar: '/api/placeholder/40/40' },
      { id: 12, name: 'Sophie W.', avatar: '/api/placeholder/40/40' }
    ]
  },
  {
    id: 'PROJ-131',
    name: 'Infrastructure Migration',
    description: 'Migrate server infrastructure to cloud-based solution.',
    type: 'basic',
    status: 'Active',
    favorite: false,
    createdAt: '2025-02-15',
    progress: 72,
    members: [
      { id: 13, name: 'Alex M.', avatar: '/api/placeholder/40/40' },
      { id: 14, name: 'Victoria C.', avatar: '/api/placeholder/40/40' },
      { id: 15, name: 'Derek P.', avatar: '/api/placeholder/40/40' }
    ]
  }
];

const ProjectsPage = () => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState('grid');
  const [activeTab, setActiveTab] = useState('all');
  
  const filteredProjects = projectsData.filter(project => {
    // Handle active tab filtering
    if (activeTab === 'favorites' && !project.favorite) return false;
    if (activeTab === 'active' && project.status !== 'Active') return false;
    if (activeTab === 'completed' && project.status !== 'Completed') return false;
    
    // Handle search query
    if (searchQuery.trim() !== '') {
      const query = searchQuery.toLowerCase();
      return (
        project.name.toLowerCase().includes(query) ||
        project.description.toLowerCase().includes(query) ||
        project.id.toLowerCase().includes(query)
      );
    }
    
    return true;
  });

  const handleCreateProject = () => {
    router.push('/projectt/createproject');
  };

//   const navigateToProject = (projectId) => {
//     router.push(`/projectt`);
//   };

  return (
    <Box sx={{ maxWidth: 1200, margin: '0 auto', p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
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

      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Tabs 
          value={activeTab} 
          onChange={(_, value) => setActiveTab(value as string)}
          sx={{ width: 'auto' }}
        >
          <TabList>
            <Tab value="all">All Projects</Tab>
            <Tab value="favorites">Favorites</Tab>
            <Tab value="active">Active</Tab>
            <Tab value="completed">Completed</Tab>
          </TabList>
        </Tabs>

        <Box sx={{ display: 'flex', gap: 2 }}>
          <Input
            placeholder="Search projects..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            startDecorator={<Search size={16} />}
            sx={{ width: 220 }}
          />
          <Box sx={{ display: 'flex', border: '1px solid', borderColor: 'divider', borderRadius: 'sm' }}>
            <IconButton 
              variant={viewMode === 'grid' ? 'soft' : 'plain'} 
              color={viewMode === 'grid' ? 'primary' : 'neutral'}
              onClick={() => setViewMode('grid')}
            >
              <GridIcon size={18} />
            </IconButton>
            <IconButton 
              variant={viewMode === 'list' ? 'soft' : 'plain'} 
              color={viewMode === 'list' ? 'primary' : 'neutral'}
              onClick={() => setViewMode('list')}
            >
              <ListIcon size={18} />
            </IconButton>
          </Box>
          <Button 
            variant="outlined" 
            color="neutral" 
            startDecorator={<Filter size={16} />}
          >
            Filter
          </Button>
        </Box>
      </Box>

      {filteredProjects.length === 0 ? (
        <Card sx={{ textAlign: 'center', py: 6 }}>
          <CardContent>
            <Typography level="h3" sx={{ mb: 2 }}>No projects found</Typography>
            <Typography sx={{ mb: 3 }}>
              {searchQuery ? 'Try adjusting your search or filters' : 'Get started by creating your first project'}
            </Typography>
            <Button 
              variant="solid" 
              color="primary" 
              startDecorator={<PlusCircle size={16} />}
              onClick={handleCreateProject}
            >
              Create New Project
            </Button>
          </CardContent>
        </Card>
      ) : viewMode === 'grid' ? (
        <Grid container spacing={2}>
          {filteredProjects.map(project => (
            <Grid key={project.id} xs={12} sm={6} md={4}>
              <Card 
                variant="outlined" 
                sx={{ 
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  '&:hover': { 
                    boxShadow: 'sm',
                    borderColor: 'primary.300',
                    cursor: 'pointer'
                  }
                }}
                // onClick={() => navigateToProject(project.id)}
              >
                <CardContent sx={{ p: 2, flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Chip size="sm" variant="soft" color="primary">{project.id}</Chip>
                      {project.favorite && <Star size={16} color="#F9A825" fill="#F9A825" />}
                    </Box>
                    <Dropdown>
                      <MenuButton
                        slots={{ root: IconButton }}
                        slotProps={{ root: { variant: 'plain', color: 'neutral', size: 'sm' } }}
                        onClick={(e) => e.stopPropagation()}
                      >
                        <MoreVertical size={16} />
                      </MenuButton>
                      <Menu size="sm" placement="bottom-end">
                        <MenuItem>View details</MenuItem>
                        <MenuItem>Edit project</MenuItem>
                        <MenuItem>Add members</MenuItem>
                        <Divider />
                        <MenuItem color="danger">Delete project</MenuItem>
                      </Menu>
                    </Dropdown>
                  </Box>

                  <Typography level="title-md" sx={{ mb: 1 }}>{project.name}</Typography>
                  <Typography level="body-sm" sx={{ mb: 2, color: 'neutral.600', flexGrow: 1 }}>
                    {project.description}
                  </Typography>

                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 'auto' }}>
                    <Chip 
                      size="sm" 
                      variant="soft" 
                      color={
                        project.status === 'Active' ? 'success' : 
                        project.status === 'Completed' ? 'neutral' : 'warning'
                      }
                    >
                      {project.status}
                    </Chip>
                    <AvatarGroup size="sm" sx={{ '--Avatar-size': '24px' }}>
                      {project.members.slice(0, 3).map(member => (
                        <Avatar key={member.id} src={member.avatar} />
                      ))}
                      {project.members.length > 3 && (
                        <Avatar>+{project.members.length - 3}</Avatar>
                      )}
                    </AvatarGroup>
                  </Box>

                  <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
                    <Box 
                      sx={{ 
                        flexGrow: 1, 
                        bgcolor: 'neutral.200', 
                        borderRadius: 'lg', 
                        height: 6, 
                        overflow: 'hidden',
                        position: 'relative'
                      }}
                    >
                      <Box 
                        sx={{ 
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          height: '100%',
                          width: `${project.progress}%`,
                          bgcolor: 
                            project.progress === 100 ? 'success.500' : 
                            project.progress > 60 ? 'primary.500' : 
                            project.progress > 30 ? 'warning.500' : 'neutral.400'
                        }}
                      />
                    </Box>
                    <Typography level="body-xs" sx={{ ml: 1 }}>{project.progress}%</Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Card variant="outlined">
          <Box component="table" sx={{ width: '100%', borderCollapse: 'collapse' }}>
            <Box component="thead">
              <Box component="tr" sx={{ borderBottom: '1px solid', borderColor: 'divider' }}>
                <Box component="th" sx={{ textAlign: 'left', p: 2, pl: 3 }}>
                  <Typography level="body-xs">Project</Typography>
                </Box>
                <Box component="th" sx={{ textAlign: 'left', p: 2 }}>
                  <Typography level="body-xs">Status</Typography>
                </Box>
                <Box component="th" sx={{ textAlign: 'left', p: 2 }}>
                  <Typography level="body-xs">Members</Typography>
                </Box>
                <Box component="th" sx={{ textAlign: 'left', p: 2 }}>
                  <Typography level="body-xs">Progress</Typography>
                </Box>
                <Box component="th" sx={{ textAlign: 'right', p: 2, pr: 3 }}>
                  <Typography level="body-xs">Actions</Typography>
                </Box>
              </Box>
            </Box>
            <Box component="tbody">
              {filteredProjects.map((project) => (
                <Box 
                  key={project.id}
                  component="tr" 
                  sx={{ 
                    borderBottom: '1px solid', 
                    borderColor: 'divider',
                    '&:hover': { bgcolor: 'background.level1', cursor: 'pointer' }
                  }}
                //   onClick={() => navigateToProject(project.id)}
                >
                  <Box component="td" sx={{ p: 2, pl: 3 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Sheet 
                        variant="soft" 
                        color="primary" 
                        sx={{ width: 40, height: 40, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 'sm' }}
                      >
                        {project.type === 'scrum' ? <Calendar size={20} /> : 
                         project.type === 'kanban' ? <GridIcon size={20} /> : 
                         <Settings size={20} />}
                      </Sheet>
                      <Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <Typography level="body-md">{project.name}</Typography>
                          {project.favorite && <Star size={14} color="#F9A825" fill="#F9A825" />}
                        </Box>
                        <Typography level="body-xs" color="neutral">
                          {project.id} • Created {project.createdAt}
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                  <Box component="td" sx={{ p: 2 }}>
                    <Chip 
                      size="sm" 
                      variant="soft" 
                      color={
                        project.status === 'Active' ? 'success' : 
                        project.status === 'Completed' ? 'neutral' : 'warning'
                      }
                    >
                      {project.status}
                    </Chip>
                  </Box>
                  <Box component="td" sx={{ p: 2 }}>
                    <AvatarGroup size="sm" sx={{ '--Avatar-size': '24px' }}>
                      {project.members.slice(0, 3).map(member => (
                        <Avatar key={member.id} src={member.avatar} />
                      ))}
                      {project.members.length > 3 && (
                        <Avatar>+{project.members.length - 3}</Avatar>
                      )}
                    </AvatarGroup>
                  </Box>
                  <Box component="td" sx={{ p: 2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Box 
                        sx={{ 
                          flexGrow: 1, 
                          bgcolor: 'neutral.200', 
                          borderRadius: 'lg', 
                          height: 6, 
                          width: 100,
                          overflow: 'hidden',
                          position: 'relative'
                        }}
                      >
                        <Box 
                          sx={{ 
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            height: '100%',
                            width: `${project.progress}%`,
                            bgcolor: 
                              project.progress === 100 ? 'success.500' : 
                              project.progress > 60 ? 'primary.500' : 
                              project.progress > 30 ? 'warning.500' : 'neutral.400'
                          }}
                        />
                      </Box>
                      <Typography level="body-xs">{project.progress}%</Typography>
                    </Box>
                  </Box>
                  <Box component="td" sx={{ p: 2, pr: 3, textAlign: 'right' }}>
                    <Button 
                      size="sm" 
                      variant="plain" 
                      color="neutral" 
                      endDecorator={<ArrowUpRight size={14} />}
                    //   onClick={(e) => {
                    //     e.stopPropagation();
                    //     navigateToProject(project.id);
                    //   }}
                    >
                      View
                    </Button>
                  </Box>
                </Box>
              ))}
            </Box>
          </Box>
        </Card>
      )}
    </Box>
  );
};

export default ProjectsPage;