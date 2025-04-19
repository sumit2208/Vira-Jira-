import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"; 
import axios from "axios";

export interface project {
    id:string,
    name:string,
    description:string,
    project_key:string,
    members:[string],
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




const createProject = async (): Promise<project[]>=>{
    const {data} = await axios.post("http://localhost:5000/api/project/createproject")
    return data
} 
export const useCreateProject = ()=>{
    const queryclient = useQueryClient();

    return useMutation({
        mutationFn:createProject,
        onSuccess:()=>{
            queryclient.invalidateQueries({queryKey:["project"]})
        }
    }) 
}


const FetchProjectById = async (id: string): Promise<project> => {
    const { data } = await axios.get(`http://localhost:5000/api/project/getproject/${id}`);
    return data;
};


export const useGetProjectById = (id: string) => {
    return useQuery<project>({
        queryKey: ["project", id],
        queryFn: () => FetchProjectById(id),
        enabled: !!id,
    });
};
