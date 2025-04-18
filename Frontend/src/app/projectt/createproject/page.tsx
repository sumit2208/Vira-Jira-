"use client"
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { 
  Box, 
  Typography, 
  Sheet, 
  Input, 
  Textarea, 
  Button, 
  Chip, 
  IconButton, 
  Avatar, 
  Card, 
  CardContent, 
  Divider, 
  Stack, 
  Grid
} from '@mui/joy';
import { ChevronLeft, X, Info, Plus } from 'lucide-react';

type ProjectFormData = {
  projectName: string;
  projectKey: string;
  description: string;
  teamMembers: string[];
};

type ProjectTemplate = 'scrum' | 'kanban' | 'basic';

const ProjectCreationPage = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<ProjectFormData>();
  const [selectedTemplate, setSelectedTemplate] = useState<ProjectTemplate | null>(null);
  const [teamMembers, setTeamMembers] = useState([
    { id: 1, name: 'Sarah K.', email: 'sarah.k@example.com', avatar: '/api/placeholder/40/40' },
    { id: 2, name: 'Mike T.', email: 'mike.t@example.com', avatar: '/api/placeholder/40/40' }
  ]);
  const [inviteEmail, setInviteEmail] = useState('');

  const onSubmit = (data: ProjectFormData) => {
    console.log({ ...data, template: selectedTemplate, teamMembers });
    // Handle form submission logic here
  };

  const handleRemoveMember = (id: number) => {
    setTeamMembers(teamMembers.filter(member => member.id !== id));
  };

  const handleTemplateSelect = (template: ProjectTemplate) => {
    setSelectedTemplate(template);
  };

  return (
    <Box sx={{ maxWidth: 800, margin: '0 auto', padding: 2 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <Button 
          variant="plain" 
          startDecorator={<ChevronLeft size={16} />}
          sx={{ mr: 1 }}
        >
          Projects
        </Button>
        <Typography level="body-sm">Create Project</Typography>
      </Box>

      <Typography level="h2" sx={{ mb: 3 }}>Create New Project</Typography>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Box sx={{ mb: 4 }}>
          <Typography level="title-md" sx={{ mb: 2 }}>Project Details</Typography>
          
          <Stack spacing={2}>
            <Box>
              <Typography level="body-sm" sx={{ mb: 1 }}>Project Name</Typography>
              <Input 
                placeholder="Enter project name" 
                {...register('projectName', { required: true })} 
                error={!!errors.projectName}
                fullWidth
              />
            </Box>
            
            <Box>
              <Typography level="body-sm" sx={{ mb: 1 }}>Project Key</Typography>
              <Input 
                placeholder="e.g., PROJ-123-XYZ" 
                {...register('projectKey', { required: true })} 
                error={!!errors.projectKey}
                fullWidth
                endDecorator={<Info size={16} />}
              />
            </Box>
            
            <Box>
              <Typography level="body-sm" sx={{ mb: 1 }}>Description</Typography>
              <Textarea 
                placeholder="Describe the purpose of this project" 
                minRows={3}
                {...register('description')} 
                sx={{ width: '100%' }}
              />
            </Box>
          </Stack>
        </Box>

       
        <Box sx={{ mb: 4 }}>
          <Typography level="title-md" sx={{ mb: 2 }}>Team Members</Typography>
          
          <Box sx={{ mb: 3 }}>
            <Typography level="body-sm" sx={{ mb: 1 }}>Invite Members</Typography>
            <Input 
              placeholder="Enter email addresses..."
              value={inviteEmail}
              onChange={(e) => setInviteEmail(e.target.value)}
              fullWidth
              endDecorator={
                <IconButton 
                  variant="plain" 
                  color="neutral"
                  disabled={!inviteEmail.trim()}
                  onClick={() => setInviteEmail('')}
                >
                  <Info size={16} />
                </IconButton>
              }
            />
          </Box>
          
          <Box>
            <Typography level="body-sm" sx={{ mb: 1 }}>Added Members</Typography>
            <Stack spacing={1}>
              {teamMembers.map(member => (
                <Box 
                  key={member.id}
                  sx={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'space-between',
                    p: 1,
                    borderRadius: 'sm',
                    bgcolor: 'background.surface',
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Avatar 
                      src={member.avatar} 
                      size="sm" 
                      sx={{ mr: 1 }}
                    />
                    <Box>
                      <Typography level="body-sm">{member.name}</Typography>
                      <Typography level="body-xs" color="neutral">{member.email}</Typography>
                    </Box>
                  </Box>
                  <IconButton 
                    variant="plain" 
                    color="neutral" 
                    size="sm"
                    onClick={() => handleRemoveMember(member.id)}
                  >
                    <X size={16} />
                  </IconButton>
                </Box>
              ))}
            </Stack>
          </Box>
        </Box>

        <Box sx={{ mb: 4 }}>
          <Typography level="title-md" sx={{ mb: 2 }}>Board Setup</Typography>
          
          <Box>
            <Typography level="body-sm" sx={{ mb: 1 }}>Default Columns</Typography>
            <Grid container spacing={2}>
              {['To Do', 'In Progress', 'Review', 'Done'].map((column, index) => (
                <Grid key={index} xs={6} sm={3}>
                  <Card variant="outlined" sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                    <CardContent>
                      <Typography level="body-xs" sx={{ mb: 1 }}>DEFAULT</Typography>
                      <Typography level="body-md">{column}</Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>
          
         
        </Box>

        <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-start', mt: 4 }}>
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