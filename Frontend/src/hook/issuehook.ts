// hooks/useGetIssues.ts
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export interface Issue {
  _id: string;
  title: string;
  priority: "High" | "Medium" | "Low";
  assignee: string;
  project:String,
  type: "bug" | "code" | "doc";
  description?:String
  date?:Date
}

const fetchIssues = async (): Promise<Issue[]> => {
  const { data } = await axios.get("http://localhost:5000/api/issues/get");
  return data;
};
export const useGetIssues = () => {
  return useQuery<Issue[]>({
    queryKey: ["issues"],
    queryFn: fetchIssues,
  });
};




const createIssue = async (issue: Issue): Promise<Issue> => {
  const { data } = await axios.post("http://localhost:5000/api/issues/create", issue);
  return data;
};

export const useCreateIssue = () => {
  const queryClient = useQueryClient();
  
    return useMutation({
    mutationFn: createIssue,
    onSuccess: () => { 
      queryClient.invalidateQueries({ queryKey: ["issues"] });
    },
  });
};



const DeleteIsuue = async (_id:string):Promise<{message:string}>=>{
  const {data}= await axios.delete(`http://localhost:5000/api/issues/delete/${_id}`)
  return data
}

export const useDeleteIsuue = ()=>{
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn:DeleteIsuue,
    onSuccess:()=>[
      queryClient.invalidateQueries({queryKey:["issues"]})
    ]
  })
}

export const useGetIssuesByProject = (projectName:string) => {
  return useQuery({
    queryKey: ["issues", projectName],
    queryFn: async () => {
      const res = await axios.get(`http://localhost:5000/api/issues/projectissue/${projectName}`);
      return res.data;
    },
    enabled: !!projectName, // only run when projectName is not null
  });
};