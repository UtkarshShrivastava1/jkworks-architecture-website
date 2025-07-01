import React, { useEffect, useState } from "react";
import { BarChart3, FileText, Plus, LogOut, Settings, TrendingUp, Users, Eye } from "lucide-react";

// Enhanced AdminSidebar Component
const AdminSidebar = ({ onNavigate, onLogout }) => (
  <aside className="w-full md:w-72 bg-gradient-to-b from-slate-900 to-slate-800 shadow-2xl p-6 flex flex-col gap-3 min-h-screen border-r border-slate-700">
    <div className="mb-8">
      <h2 className="text-2xl font-bold text-white mb-2">Admin Panel</h2>
      <div className="w-12 h-1 bg-blue-500 rounded-full"></div>
    </div>
    
    <div className="flex flex-col gap-2">
      <div className="text-slate-400 text-sm font-semibold uppercase tracking-wider mb-2">Projects</div>
      <button
        className="flex items-center gap-3 bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
        onClick={() => onNavigate("/dashboard/projects")}
      >
        <BarChart3 size={20} />
        <span className="font-medium">Manage Projects</span>
      </button>
      <button
        className="flex items-center gap-3 bg-blue-500 hover:bg-blue-600 text-white px-4 py-3 rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
        onClick={() => onNavigate("/dashboard/projects/create")}
      >
        <Plus size={20} />
        <span className="font-medium">Create Project</span>
      </button>
      
      <div className="text-slate-400 text-sm font-semibold uppercase tracking-wider mb-2 mt-6">Content</div>
      <button
        className="flex items-center gap-3 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-3 rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
        onClick={() => onNavigate("/dashboard/blogs")}
      >
        <FileText size={20} />
        <span className="font-medium">Manage Blogs</span>
      </button>
      <button
        className="flex items-center gap-3 bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-3 rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
        onClick={() => onNavigate("/dashboard/blogs/create")}
      >
        <Plus size={20} />
        <span className="font-medium">Create Blog</span>
      </button>
    </div>
    
    <div className="mt-auto pt-6 border-t border-slate-700">
      <button
        className="flex items-center gap-3 bg-red-600 hover:bg-red-700 text-white px-4 py-3 rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl w-full"
        onClick={onLogout}
      >
        <LogOut size={20} />
        <span className="font-medium">Logout</span>
      </button>
    </div>
  </aside>
);
export default AdminSidebar;