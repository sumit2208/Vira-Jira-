"use client"
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
  Bug
} from "lucide-react";

// Mock data for reports
const reportData = {
  overview: {
    totalProjects: 24,
    activeIssues: 156,
    completedTasks: 1240,
    teamMembers: 18
  },
  projectStats: [
    { name: "Frontend Development", completed: 85, total: 100, progress: 85 },
    { name: "Backend Services", completed: 72, total: 95, progress: 76 },
    { name: "Mobile App", completed: 45, total: 80, progress: 56 },
    { name: "Documentation", completed: 38, total: 50, progress: 76 },
    { name: "Testing Suite", completed: 62, total: 75, progress: 83 }
  ],
  issueBreakdown: [
    { type: "Bug", count: 45, color: "bg-red-500" },
    { type: "Feature", count: 78, color: "bg-blue-500" },
    { type: "Enhancement", count: 33, color: "bg-green-500" },
    { type: "Documentation", count: 12, color: "bg-yellow-500" }
  ],
  recentActivity: [
    { 
      id: 1, 
      type: "issue_created", 
      title: "New authentication bug reported", 
      project: "Frontend App", 
      time: "2 hours ago",
      priority: "High"
    },
    { 
      id: 2, 
      type: "task_completed", 
      title: "API endpoint optimization completed", 
      project: "Backend Services", 
      time: "4 hours ago",
      priority: "Medium"
    },
    { 
      id: 3, 
      type: "project_updated", 
      title: "Mobile app design review finished", 
      project: "Mobile App", 
      time: "6 hours ago",
      priority: "Low"
    }
  ]
};

const page = () => {
  const [selectedTimeRange, setSelectedTimeRange] = useState("Last 30 days");
  const [activeTab, setActiveTab] = useState("overview");

  const timeRanges = ["Last 7 days", "Last 30 days", "Last 3 months", "Last year"];

  const getActivityIcon = (type: string) => {
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

  const getPriorityColor = (priority: string) => {
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto p-6">
        {/* Header Section */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-200 mb-6 overflow-hidden">
          <div className="bg-gradient-to-r from-gray-100 to-gray-50 px-8 py-6 border-b border-gray-200">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-3xl font-bold text-gray-800 mb-2">Reports & Analytics</h1>
                <p className="text-gray-600">Comprehensive insights into your project performance</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="relative">
                  <select 
                    value={selectedTimeRange}
                    onChange={(e) => setSelectedTimeRange(e.target.value)}
                    className="appearance-none bg-white border-2 border-gray-200 rounded-xl px-4 py-2 pr-10 text-gray-700 font-medium hover:border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-300 transition-all duration-200"
                  >
                    {timeRanges.map((range) => (
                      <option key={range} value={range}>{range}</option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-3 w-4 h-4 text-gray-400 pointer-events-none" />
                </div>
                <button className="flex items-center gap-2 px-4 py-2 bg-white border-2 border-gray-200 text-gray-700 rounded-xl hover:bg-gray-50 hover:border-gray-300 transition-all duration-200 font-medium">
                  <RefreshCw size={16} />
                  Refresh
                </button>
                <button className="flex items-center gap-2 px-6 py-2 bg-gray-800 text-white rounded-xl hover:bg-gray-700 transition-all duration-200 font-semibold shadow-lg hover:shadow-xl">
                  <Download size={16} />
                  Export
                </button>
              </div>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="px-8 py-4 bg-white border-b border-gray-100">
            <div className="flex space-x-8">
              {[
                { id: "overview", label: "Overview", icon: BarChart3 },
                { id: "projects", label: "Projects", icon: Target },
                { id: "issues", label: "Issues", icon: Bug },
                { id: "team", label: "Team", icon: Users }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                    activeTab === tab.id
                      ? "bg-gray-800 text-white shadow-lg"
                      : "text-gray-600 hover:text-gray-800 hover:bg-gray-100"
                  }`}
                >
                  <tab.icon size={16} />
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          {[
            {
              title: "Total Projects",
              value: reportData.overview.totalProjects,
              icon: Target,
              color: "bg-blue-500",
              change: "+12%"
            },
            {
              title: "Active Issues",
              value: reportData.overview.activeIssues,
              icon: AlertTriangle,
              color: "bg-amber-500",
              change: "-8%"
            },
            {
              title: "Completed Tasks",
              value: reportData.overview.completedTasks,
              icon: CheckCircle2,
              color: "bg-green-500",
              change: "+24%"
            },
            {
              title: "Team Members",
              value: reportData.overview.teamMembers,
              icon: Users,
              color: "bg-purple-500",
              change: "+2"
            }
          ].map((card, index) => (
            <div key={index} className="bg-white rounded-2xl shadow-xl border border-gray-200 p-6 hover:shadow-2xl transition-all duration-300">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-xl ${card.color.replace('bg-', 'bg-').replace('-500', '-100')}`}>
                  <card.icon className={`w-6 h-6 ${card.color.replace('bg-', 'text-')}`} />
                </div>
                <span className="text-sm font-medium text-green-600 bg-green-50 px-2 py-1 rounded-full border border-green-200">
                  {card.change}
                </span>
              </div>
              <h3 className="text-gray-600 text-sm font-medium mb-1">{card.title}</h3>
              <p className="text-3xl font-bold text-gray-800">{card.value.toLocaleString()}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Project Progress Chart */}
          <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-gray-800">Project Progress</h3>
              <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-all duration-150">
                <MoreVertical size={16} />
              </button>
            </div>
            <div className="space-y-4">
              {reportData.projectStats.map((project, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-700">{project.name}</span>
                    <span className="text-sm text-gray-500">{project.completed}/{project.total}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                    <div 
                      className="bg-gradient-to-r from-gray-600 to-gray-800 h-full rounded-full transition-all duration-500 ease-out"
                      style={{ width: `${project.progress}%` }}
                    ></div>
                  </div>
                  <div className="text-xs text-gray-500">{project.progress}% complete</div>
                </div>
              ))}
            </div>
          </div>

          {/* Issue Breakdown */}
          <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-gray-800">Issue Breakdown</h3>
              <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-all duration-150">
                <Eye size={16} />
              </button>
            </div>
            <div className="space-y-4">
              {reportData.issueBreakdown.map((issue, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-200">
                  <div className="flex items-center gap-3">
                    <div className={`w-4 h-4 rounded-full ${issue.color}`}></div>
                    <span className="font-medium text-gray-700">{issue.type}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-bold text-gray-800">{issue.count}</span>
                    <span className="text-sm text-gray-500">issues</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 pt-4 border-t border-gray-200">
              <div className="flex justify-between items-center text-sm">
                <span className="font-medium text-gray-700">Total Issues</span>
                <span className="text-xl font-bold text-gray-800">
                  {reportData.issueBreakdown.reduce((sum, issue) => sum + issue.count, 0)}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold text-gray-800">Recent Activity</h3>
            <button className="text-sm text-gray-600 hover:text-gray-800 font-medium transition-colors duration-150">
              View all
            </button>
          </div>
          <div className="space-y-4">
            {reportData.recentActivity.map((activity) => (
              <div key={activity.id} className="flex items-start gap-4 p-4 hover:bg-gray-50 rounded-xl transition-colors duration-150">
                <div className="p-2 bg-gray-100 rounded-lg flex-shrink-0">
                  {getActivityIcon(activity.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-800 mb-1">{activity.title}</p>
                  <div className="flex items-center gap-3 text-xs text-gray-500">
                    <span>{activity.project}</span>
                    <span>•</span>
                    <span>{activity.time}</span>
                  </div>
                </div>
                <span className={`inline-flex items-center px-2 py-1 text-xs font-medium rounded-full border ${getPriorityColor(activity.priority)}`}>
                  {activity.priority}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Performance Metrics */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
          {[
            {
              title: "Average Resolution Time",
              value: "2.4 days",
              subtitle: "12% faster than last month",
              icon: Clock,
              trend: "up"
            },
            {
              title: "Team Productivity",
              value: "94%",
              subtitle: "Tasks completed on time",
              icon: TrendingUp,
              trend: "up"
            },
            {
              title: "Bug Fix Rate",
              value: "87%",
              subtitle: "Within SLA targets",
              icon: Target,
              trend: "stable"
            }
          ].map((metric, index) => (
            <div key={index} className="bg-white rounded-2xl shadow-xl border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-gray-100 rounded-xl">
                  <metric.icon className="w-6 h-6 text-gray-600" />
                </div>
                <div className={`text-xs px-2 py-1 rounded-full font-medium ${
                  metric.trend === 'up' ? 'text-green-600 bg-green-50 border border-green-200' : 
                  metric.trend === 'down' ? 'text-red-600 bg-red-50 border border-red-200' : 
                  'text-gray-600 bg-gray-50 border border-gray-200'
                }`}>
                  {metric.trend === 'up' ? '↗' : metric.trend === 'down' ? '↘' : '→'}
                </div>
              </div>
              <h4 className="text-gray-600 text-sm font-medium mb-2">{metric.title}</h4>
              <p className="text-3xl font-bold text-gray-800 mb-1">{metric.value}</p>
              <p className="text-sm text-gray-500">{metric.subtitle}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default page;