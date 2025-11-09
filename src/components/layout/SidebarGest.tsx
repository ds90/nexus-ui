"use client"

import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"
import { useTranslations } from "next-intl"
import { motion, AnimatePresence } from "framer-motion"
import { X, ChevronRight, ChevronDown, FolderKanban, Plus, ListTodo, Folder } from "lucide-react"
import ThemeToggle from "../ui/ThemeToggle"
import LanguageSelector from "../ui/LanguageSelector"

interface Project {
  projectId: number
  projectName: string
  tasks?: Task[]
}

interface Task {
  taskId: number
  taskName: string
  status: string
}

interface SidebarGestProps {
  isOpen: boolean
  onClose: () => void
}

export default function SidebarGest({ isOpen, onClose }: SidebarGestProps) {
  const g = useTranslations("Dictionary")
  const pathname = usePathname()
  const locale = pathname.split("/")[1] || "it"

  const [expandedProjects, setExpandedProjects] = useState<number[]>([])
  const [projects, setProjects] = useState<Project[]>([])
  const [isLoading, setIsLoading] = useState(true)

  // Mock data - replace with real API call
  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setProjects([
        {
          projectId: 1,
          projectName: "Website Redesign",
          tasks: [
            { taskId: 1, taskName: "Design mockups", status: "completed" },
            { taskId: 2, taskName: "Frontend development", status: "in-progress" },
            { taskId: 3, taskName: "Testing", status: "todo" },
          ],
        },
        {
          projectId: 2,
          projectName: "Mobile App",
          tasks: [
            { taskId: 4, taskName: "UI/UX Design", status: "completed" },
            { taskId: 5, taskName: "API Integration", status: "in-progress" },
          ],
        },
        {
          projectId: 3,
          projectName: "Marketing Campaign",
          tasks: [],
        },
      ])
      setIsLoading(false)
    }, 500)
  }, [])

  const toggleProject = (projectId: number) => {
    setExpandedProjects((prev) =>
      prev.includes(projectId) ? prev.filter((id) => id !== projectId) : [...prev, projectId],
    )
  }

  const handleNewProject = () => {
    // Navigate to create project page or open modal
    window.location.href = `/${locale}/projects/new`
  }

  return (
    <>
      {/* Desktop Sidebar - always visible on large screens */}
      <aside className="sticky top-14 hidden h-[calc(100vh-3.5rem)] w-64 overflow-y-auto border-r border-border bg-card lg:flex lg:flex-col">
        <SidebarContent
          projects={projects}
          isLoading={isLoading}
          expandedProjects={expandedProjects}
          toggleProject={toggleProject}
          handleNewProject={handleNewProject}
          locale={locale}
          g={g}
        />
      </aside>

      {/* Mobile Sidebar - overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={onClose}
              className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm lg:hidden"
            />

            {/* Sidebar */}
            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "tween", duration: 0.3 }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.2}
              onDragEnd={(e, info) => {
                if (info.offset.x < -100) {
                  onClose()
                }
              }}
              className="fixed bottom-0 left-0 top-0 z-50 w-80 max-w-[85vw] overflow-y-auto border-r border-border bg-card lg:hidden"
            >
              {/* Header with Close Button */}
              <div className="flex items-center justify-between border-b border-border p-4">
                <h2 className="text-lg font-semibold text-foreground">{g("projects")}</h2>
                <button
                  onClick={onClose}
                  className="rounded-lg p-2 transition-colors hover:bg-muted"
                  aria-label="Close sidebar"
                >
                  <X className="h-5 w-5 text-foreground" />
                </button>
              </div>

              {/* Mobile Theme + Language Controls */}
              <div className="flex items-center gap-2 border-b border-border p-4 md:hidden">
                <ThemeToggle />
                <LanguageSelector />
              </div>

              <SidebarContent
                projects={projects}
                isLoading={isLoading}
                expandedProjects={expandedProjects}
                toggleProject={toggleProject}
                handleNewProject={handleNewProject}
                locale={locale}
                g={g}
                onItemClick={onClose}
              />
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  )
}

// Extracted sidebar content to avoid duplication
function SidebarContent({
  projects,
  isLoading,
  expandedProjects,
  toggleProject,
  handleNewProject,
  locale,
  g,
  onItemClick,
}: {
  projects: Project[]
  isLoading: boolean
  expandedProjects: number[]
  toggleProject: (id: number) => void
  handleNewProject: () => void
  locale: string
  g: any
  onItemClick?: () => void
}) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "text-green-600 dark:text-green-400"
      case "in-progress":
        return "text-blue-600 dark:text-blue-400"
      case "todo":
        return "text-gray-500 dark:text-gray-400"
      default:
        return "text-foreground"
    }
  }

  return (
    <div className="flex h-full flex-col">
      {/* New Project Button */}
      <div className="p-4">
        <button
          onClick={handleNewProject}
          className="hover:bg-fixed/90 flex w-full items-center gap-2 rounded-lg bg-fixed px-4 py-2 text-white transition-colors"
        >
          <Plus className="h-4 w-4" />
          <span className="font-medium">
            {g("new")} {g("project")}
          </span>
        </button>
      </div>

      {/* Projects List */}
      <div className="flex-1 overflow-y-auto px-2">
        {isLoading ? (
          <div className="p-4 text-center text-sm text-muted-foreground">{g("loading")}...</div>
        ) : projects.length === 0 ? (
          <div className="p-4 text-center text-sm text-muted-foreground">No projects yet</div>
        ) : (
          <div className="space-y-1">
            {projects.map((project) => (
              <div key={project.projectId} className="mb-2">
                {/* Project Header */}
                <button
                  onClick={() => toggleProject(project.projectId)}
                  className="group flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left transition-colors hover:bg-muted"
                >
                  {expandedProjects.includes(project.projectId) ? (
                    <ChevronDown className="h-4 w-4 text-muted-foreground" />
                  ) : (
                    <ChevronRight className="h-4 w-4 text-muted-foreground" />
                  )}
                  <Folder className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                  <span className="flex-1 truncate text-sm font-medium text-foreground">
                    {project.projectName}
                  </span>
                  {project.tasks && project.tasks.length > 0 && (
                    <span className="text-xs text-muted-foreground">{project.tasks.length}</span>
                  )}
                </button>

                {/* Tasks List */}
                <AnimatePresence>
                  {expandedProjects.includes(project.projectId) && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <div className="ml-6 mt-1 space-y-1">
                        {project.tasks && project.tasks.length > 0 ? (
                          project.tasks.map((task) => (
                            <a
                              key={task.taskId}
                              href={`/${locale}/projects/${project.projectId}/tasks/${task.taskId}`}
                              onClick={onItemClick}
                              className="group flex items-center gap-2 rounded-lg px-3 py-2 text-left transition-colors hover:bg-muted"
                            >
                              <ListTodo className={`h-3 w-3 ${getStatusColor(task.status)}`} />
                              <span className="flex-1 truncate text-sm text-foreground">
                                {task.taskName}
                              </span>
                            </a>
                          ))
                        ) : (
                          <div className="px-3 py-2 text-xs text-muted-foreground">No tasks</div>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* All Projects Link */}
      <div className="border-t border-border p-4">
        <a
          href={`/${locale}/projects`}
          onClick={onItemClick}
          className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-foreground transition-colors hover:bg-muted"
        >
          <FolderKanban className="h-4 w-4" />
          <span>{g("projects")}</span>
        </a>
      </div>
    </div>
  )
}
