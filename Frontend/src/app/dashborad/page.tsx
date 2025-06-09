"use client";
import React, { useState } from "react";
import {
  BarChart3,
  TrendingUp,
  Users,
  Calendar,
  Download,
  Filter,
  RefreshCw,
  ChevronDown,
  MoreVertical,
  Eye,
  FileText,
  PieChart,
  Activity,
  Target,
  Clock,
  CheckCircle2,
  AlertTriangle,
  Bug,
  Sparkles,
  Zap,
  Star,
} from "lucide-react";
import { useGetProject } from "@/hook/projecthook";
import { useGetIssues } from "../../hook/issuehook";

const page = () => {
  const [selectedTimeRange, setSelectedTimeRange] = useState("Last 30 days");
  const [activeTab, setActiveTab] = useState("overview");
  // 🔥 ADD THIS: State for export dropdown
  const [showExportOptions, setShowExportOptions] = useState(false);

  const { data: Issue, isLoading: IssueLoading, isError } = useGetIssues();
  const { data: Project, isLoading: ProjectLoading } = useGetProject();

  const ProjectValue = Project || [];
  const ProjectLength = Project?.length || 0;

  // Get counts for each type
  const issueTypeCount = {};

  Issue?.forEach((issue) => {
    // @ts-ignore
    issueTypeCount[issue.type] = (issueTypeCount[issue.type] || 0) + 1;
  });

  // Convert to array to map in JSX
  const IssueValue = Object.keys(issueTypeCount).map((type, index) => ({
    type,
    // @ts-ignore
    count: issueTypeCount[type],
    color: getTypeColor(type, index),
    gradient: getTypeGradient(type, index),
  }));

  // Total number of issues
  const IssueLength = Issue?.length || 0;

  const timeRanges = [
    "Last 7 days",
    "Last 30 days",
    "Last 3 months",
    "Last year",
  ];

  // 🔥 ADD THESE EXPORT FUNCTIONS HERE (after your existing variables)
  
  // Export as JSON
  const exportToJSON = () => {
    const dashboardData = {
      metadata: {
        exportDate: new Date().toISOString(),
        timeRange: selectedTimeRange,
        totalProjects: ProjectLength,
        totalIssues: IssueLength,
      },
      projects: ProjectValue.map(project => ({
        name: project.name,
        status: "Active",
        progress: Math.floor(Math.random() * 40 + 40) + "%"
      })),
      issues: {
        breakdown: IssueValue,
        total: IssueLength,
      },
      metrics: {
        resolutionTime: "2.4 days",
        teamProductivity: "94%",
        successRate: "87%"
      }
    };

    const dataStr = JSON.stringify(dashboardData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = `dashboard-report-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // Export as CSV
  const exportToCSV = () => {
    const csvContent = [
      'DASHBOARD REPORT',
      `Export Date: ${new Date().toLocaleDateString()}`,
      `Time Range: ${selectedTimeRange}`,
      `Total Projects: ${ProjectLength}`,
      `Total Issues: ${IssueLength}`,
      '',
      'PROJECTS',
      'Project Name,Status,Progress',
      ...ProjectValue.map(project => 
        `${project.name},Active,${Math.floor(Math.random() * 40 + 40)}%`
      ),
      '',
      'ISSUES BREAKDOWN',
      'Issue Type,Count',
      ...IssueValue.map(issue => `${issue.type},${issue.count}`),
      '',
      'PERFORMANCE METRICS',
      'Metric,Value',
      'Resolution Time,2.4 days',
      'Team Productivity,94%',
      'Success Rate,87%'
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = `dashboard-report-${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // Handle export selection
  const handleExport = (format:any) => {
    switch (format) {
     
      case 'csv':
        exportToCSV();
        break;
      default:
        exportToJSON();
    }
    setShowExportOptions(false);
  };

  // Helper functions for colors and gradients
  function getTypeColor(type:any, index:any) {
    const colors = [
      "from-red-400 to-red-600",
      "from-blue-400 to-blue-600", 
      "from-green-400 to-green-600",
      "from-purple-400 to-purple-600",
      "from-yellow-400 to-yellow-600",
      "from-pink-400 to-pink-600",
      "from-indigo-400 to-indigo-600",
      "from-teal-400 to-teal-600"
    ];
    return colors[index % colors.length];
  }

  function getTypeGradient(type:any, index:any) {
    const gradients = [
      "bg-gradient-to-r from-red-50 to-red-100 border-red-200",
      "bg-gradient-to-r from-blue-50 to-blue-100 border-blue-200",
      "bg-gradient-to-r from-green-50 to-green-100 border-green-200", 
      "bg-gradient-to-r from-purple-50 to-purple-100 border-purple-200",
      "bg-gradient-to-r from-yellow-50 to-yellow-100 border-yellow-200",
      "bg-gradient-to-r from-pink-50 to-pink-100 border-pink-200",
      "bg-gradient-to-r from-indigo-50 to-indigo-100 border-indigo-200",
      "bg-gradient-to-r from-teal-50 to-teal-100 border-teal-200"
    ];
    return gradients[index % gradients.length];
  }

  const getActivityIcon = (type:any) => {
    switch (type) {
      case "issue_created":
        return <Bug className="w-4 h-4 text-red-500" />;
      case "task_completed":
        return <CheckCircle2 className="w-4 h-4 text-green-500" />;
      case "project_updated":
        return <Activity className="w-4 h-4 text-blue-500" />;
      default:
        return <FileText className="w-4 h-4 text-gray-500" />;
    }
  };

  const getPriorityColor = (priority:any) => {
    switch (priority) {
      case "High":
        return "text-red-600 bg-red-50 border-red-200";
      case "Medium":
        return "text-amber-600 bg-amber-50 border-amber-200";
      case "Low":
        return "text-green-600 bg-green-50 border-green-200";
      default:
        return "text-gray-600 bg-gray-50 border-gray-200";
    }
  };

  if (IssueLoading || ProjectLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="relative">
            <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto"></div>
            <Sparkles className="w-6 h-6 text-blue-500 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-pulse" />
          </div>
          <p className="text-slate-600 font-medium">Loading your analytics...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-indigo-400/20 to-pink-400/20 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto p-6 relative z-10">
        {/* Header Section */}
        <div className="bg-white/70 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 mb-8 overflow-hidden">
          <div className="bg-gradient-to-r from-slate-100/50 to-blue-100/50 px-8 py-8 border-b border-white/30">
            <div className="flex justify-between items-center">
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl">
                    <BarChart3 className="w-6 h-6 text-white" />
                  </div>
                  <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
                    Reports & Analytics
                  </h1>
                </div>
                <p className="text-slate-600 ml-14">
                  Comprehensive insights into your project performance
                </p>
              </div>
              <div className="flex items-center gap-4">
                <div className="relative group">
                  <select
                    value={selectedTimeRange}
                    onChange={(e) => setSelectedTimeRange(e.target.value)}
                    className="appearance-none bg-white/80 backdrop-blur-sm border-2 border-slate-200/50 rounded-2xl px-6 py-3 pr-12 text-slate-700 font-medium hover:border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:border-blue-400 transition-all duration-300 shadow-lg"
                  >
                    {timeRanges.map((range) => (
                      <option key={range} value={range}>
                        {range}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-4 top-4 w-5 h-5 text-slate-400 pointer-events-none group-hover:text-slate-600 transition-colors" />
                </div>
                <button className="flex items-center gap-3 px-6 py-3 bg-white/80 backdrop-blur-sm border-2 border-slate-200/50 text-slate-700 rounded-2xl hover:bg-white hover:border-slate-300 hover:shadow-lg transition-all duration-300 font-medium group">
                  <RefreshCw size={18} className="group-hover:rotate-180 transition-transform duration-500" />
                  Refresh
                </button>
                
                {/* 🔥 REPLACE YOUR EXPORT BUTTON WITH THIS */}
                <div className="relative">
                  <button 
                    onClick={() =>  handleExport('csv')}
                    className="flex items-center gap-3 px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 font-semibold shadow-xl hover:shadow-2xl transform hover:scale-105"
                  >
                    <Download size={18} />
                    Export As CSV 
                  </button>
                  
                   
                </div> 
                
              </div>
            </div>
          </div>
        </div>

        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          {[
            {
              title: "Total Projects",
              value: ProjectLength,
              icon: Target,
              gradient: "from-blue-500 to-cyan-500",
              bgGradient: "from-blue-50 to-cyan-50",
              change: "+12%",
              changeColor: "text-emerald-600 bg-emerald-50 border-emerald-200",
            },
            {
              title: "Active Issues",
              value: IssueLength,
              icon: AlertTriangle,
              gradient: "from-amber-500 to-orange-500",
              bgGradient: "from-amber-50 to-orange-50", 
              change: "+8%",
              changeColor: "text-emerald-600 bg-emerald-50 border-emerald-200",
            },
          ].map((card, index) => (
            <div
              key={index}
              className={`bg-gradient-to-br ${card.bgGradient} backdrop-blur-xl rounded-3xl shadow-2xl border border-white/30 p-8 hover:shadow-3xl transition-all duration-500 transform hover:scale-105 group overflow-hidden relative`}
            >
              {/* Decorative background element */}
              <div className={`absolute -top-10 -right-10 w-32 h-32 bg-gradient-to-br ${card.gradient} opacity-10 rounded-full blur-xl group-hover:opacity-20 transition-opacity duration-500`}></div>
              
              <div className="flex items-center justify-between mb-6 relative z-10">
                <div className={`p-4 bg-gradient-to-r ${card.gradient} rounded-2xl shadow-lg group-hover:shadow-xl transition-all duration-300`}>
                  <card.icon className="w-8 h-8 text-white" />
                </div>
                <span className={`text-sm font-semibold px-3 py-2 rounded-full border ${card.changeColor} shadow-sm`}>
                  {card.change}
                </span>
              </div>
              <h3 className="text-slate-600 text-sm font-semibold mb-2 uppercase tracking-wider">
                {card.title}
              </h3>
              <p className="text-4xl font-bold text-slate-800 group-hover:text-slate-900 transition-colors duration-300">
                {card.value.toLocaleString()}
              </p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Project Progress Chart */}
          <div className="bg-white/70 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-8 hover:shadow-3xl transition-all duration-500">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl">
                  <Target className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-slate-800">Project Progress</h3>
              </div>
              <button className="p-3 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-xl transition-all duration-300 group">
                <MoreVertical size={18} className="group-hover:scale-110 transition-transform" />
              </button>
            </div>
            <div className="space-y-6">
              {ProjectValue.length > 0 ? (
                ProjectValue.map((project, index) => (
                  <div key={index} className="space-y-3 group">
                    <div className="flex justify-between items-center">
                      <span className="text-base font-semibold text-slate-700 group-hover:text-slate-900 transition-colors">
                        {project.name}
                      </span>
                      <div className="flex items-center gap-2">
                        <Star className="w-4 h-4 text-yellow-500" />
                        <span className="text-sm text-slate-500 font-medium">Active</span>
                      </div>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-4 overflow-hidden shadow-inner">
                      <div className="bg-gradient-to-r from-green-400 to-emerald-500 h-full rounded-full transition-all duration-1000 ease-out shadow-sm"
                        style={{ width: `${Math.random() * 40 + 40}%` }}
                      ></div>
                    </div>
                    <div className="text-sm text-slate-500 font-medium">In Progress</div>
                  </div>
                ))
              ) : (
                <div className="text-center py-12 text-slate-500">
                  <Target className="w-16 h-16 mx-auto mb-4 text-slate-300" />
                  <p className="text-lg font-medium">No projects found</p>
                </div>
              )}
            </div>
          </div>

          {/* Issue Breakdown */}
          <div className="bg-white/70 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-8 hover:shadow-3xl transition-all duration-500">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-gradient-to-r from-red-500 to-pink-500 rounded-xl">
                  <Bug className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-slate-800">Issue Breakdown</h3>
              </div>
              <button className="p-3 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-xl transition-all duration-300 group">
                <Eye size={18} className="group-hover:scale-110 transition-transform" />
              </button>
            </div>

            <div className="space-y-4">
              {IssueValue.length > 0 ? (
                IssueValue.map((issue, index) => (
                  <div
                    key={index}
                    className={`flex items-center justify-between p-6 ${issue.gradient} border-2 rounded-2xl hover:shadow-lg transition-all duration-300 transform hover:scale-102 group`}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-3 h-3 bg-gradient-to-r ${issue.color} rounded-full shadow-sm group-hover:scale-125 transition-transform duration-300`}></div>
                      <span className="font-semibold text-slate-700 capitalize text-lg">
                        {issue.type}
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-3xl font-bold text-slate-800 group-hover:scale-110 transition-transform duration-300">
                        {issue.count}
                      </span>
                      <span className="text-sm text-slate-500 font-medium">issues</span>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-12 text-slate-500">
                  <Bug className="w-16 h-16 mx-auto mb-4 text-slate-300" />
                  <p className="text-lg font-medium">No issues found</p>
                </div>
              )}
            </div>

            {IssueValue.length > 0 && (
              <div className="mt-8 pt-6 border-t border-slate-200">
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-slate-700 text-lg">Total Issues</span>
                  <div className="flex items-center gap-2">
                    <Zap className="w-5 h-5 text-amber-500" />
                    <span className="text-3xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
                      {IssueLength}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Performance Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              title: "Resolution Time",
              value: "2.4 days",
              subtitle: "Average time to close",
              icon: Clock,
              gradient: "from-purple-500 to-indigo-500",
              bgGradient: "from-purple-50 to-indigo-50",
            },
            {
              title: "Team Productivity", 
              value: "94%",
              subtitle: "Tasks completed on time",
              icon: TrendingUp,
              gradient: "from-green-500 to-teal-500",
              bgGradient: "from-green-50 to-teal-50",
            },
            {
              title: "Success Rate",
              value: "87%",
              subtitle: "Issues resolved successfully", 
              icon: CheckCircle2,
              gradient: "from-blue-500 to-cyan-500",
              bgGradient: "from-blue-50 to-cyan-50",
            },
          ].map((metric, index) => (
            <div
              key={index}
              className={`bg-gradient-to-br ${metric.bgGradient} backdrop-blur-xl rounded-3xl shadow-2xl border border-white/30 p-6 hover:shadow-3xl transition-all duration-500 transform hover:scale-105 group`}
            >
              <div className="flex items-center justify-between mb-6">
                <div className={`p-3 bg-gradient-to-r ${metric.gradient} rounded-2xl shadow-lg`}>
                  <metric.icon className="w-6 h-6 text-white" />
                </div>
                <div className="text-emerald-600 text-sm font-semibold">↗ +5%</div>
              </div>
              <h4 className="text-slate-600 text-sm font-semibold mb-2 uppercase tracking-wider">
                {metric.title}
              </h4>
              <p className="text-3xl font-bold text-slate-800 mb-2 group-hover:text-slate-900 transition-colors">
                {metric.value}
              </p>
              <p className="text-sm text-slate-500 font-medium">{metric.subtitle}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default page;