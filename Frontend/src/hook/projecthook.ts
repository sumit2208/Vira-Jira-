import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"; 
import axios from "axios";

export interface project {
    _id:string,
    name:string,
    description:string,
    project_key:string,
    members: string[],
    createdAt:string
}


const FetchProjects = async ():Promise<project[]>=>{
    const {data } = await axios.get("http://localhost:5000/api/project/getproject")
    return data
}
export const useGetProject= ()=>{
    return useQuery<project[]>({
        queryKey: ["project"],
        queryFn:FetchProjects
    })
}  




const createProject = async (newProject: project): Promise<project> => {
    const { data } = await axios.post("http://localhost:5000/api/project/createproject", newProject, {
        headers: {
            "Content-Type": "application/json",
        },
    });
    return data;
};

export const useCreateProject = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: createProject, // Pass the payload to the mutation function
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["project"] }); // Invalidate the cache to refresh data
        },
    });
};


const FetchProjectById = async (id: string): Promise<project> => {
    const { data } = await axios.get(`http://localhost:5000/api/project/${id}`);
    return data;
};


export const useGetProjectById = (id: string) => {
    return useQuery<project>({
        queryKey: ["project", id],
        queryFn: () => FetchProjectById(id),
        enabled: !!id,
    });
};


 const deleteProjectById = async (id: string): Promise<{ message: string }> => {
    const { data } = await axios.delete(`http://localhost:5000/api/project/delete/${id}`);
    return data;
};

export const useDeleteProject = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: deleteProjectById,
        onSuccess: () => { 
            queryClient.invalidateQueries({ queryKey: ["project"] });
        },
    });
};

// Invite member to project
const inviteMemberToProject = async ({ projectId, email }: { projectId: string, email: string}): Promise<{ message: string, project: project }> => {
    const { data } = await axios.post(`http://localhost:5000/api/project/project/${projectId}/invite`, { email }, {
        headers: {
            "Content-Type": "application/json",
        },
    });
    return data;
};

export const useInviteMember = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: inviteMemberToProject,
        onSuccess: (_, variables) => {
            // Invalidate the specific project query and the projects list
            queryClient.invalidateQueries({ queryKey: ["project", variables.projectId] });
            queryClient.invalidateQueries({ queryKey: ["project"] });
        },
    });
};




const fetchUserProjects = async (email:any) => {
  if (!email) {
    throw new Error("Email is required to fetch projects");
  }

  const response = await axios.get("http://localhost:5000/api/project/user-projects", {
    params: { email },
  });

  return response.data;
};

// Custom hook to get user projects
export const useGetUserProjects = (email:any) => {
  return useQuery({
    queryKey: ["userProjects", email], // Cache key, refetches when email changes
    queryFn: () => fetchUserProjects(email),
    enabled: !!email, // Only fetch if email exists 
  });
};