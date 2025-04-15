// types/issue.ts
export interface Issue {
    _id: string;
    title: string;
    priority: 'High' | 'Medium' | 'Low';
    assignee: string;
    type: 'bug' | 'code' | 'doc';
  }
  