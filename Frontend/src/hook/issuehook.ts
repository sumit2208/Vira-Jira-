// hooks/useGetIssues.ts
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export interface Issue {
  id: string;
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
      // Refresh the issues list after successful creation
      queryClient.invalidateQueries({ queryKey: ["issues"] });
    },
  });
};