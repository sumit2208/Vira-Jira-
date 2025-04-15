// hooks/useGetIssues.ts
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export interface Issue {
  id: string;
  title: string;
  priority: "High" | "Medium" | "Low";
  assignee: string;
  type: "bug" | "code" | "doc";
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
