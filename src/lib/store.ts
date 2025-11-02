// Store en memoria para gestionar proyectos, equipo y tareas

export interface Project {
  id: string
  name: string
  description: string
  category: string
  priority: string
  status: string
  progress: number
  teamMembers: string[] // IDs de miembros del equipo
  createdAt: string
  deadline?: string
}

export interface TeamMember {
  userId: string
  role: string
  name: string
  email: string
  position: string
  birthdate: string
  phone: string
  projectId: string
  isActive: boolean
}

export interface Task {
  id: string
  description: string
  projectId: string
  status: string
  priority: string
  userId: string
  deadline: string
  createdAt: string
}

export interface Settings {
  organizationName: string
  email: string
  notifications: boolean
  theme: string
  language: string
  autoSave: boolean
}

class DataStore {
  private projects: Project[] = [
    {
      id: "1",
      name: "E-commerce Platform",
      description: "Plataforma de comercio electrónico con Next.js",
      category: "web",
      priority: "high",
      status: "En progreso",
      progress: 65,
      teamMembers: ["1", "2"],
      createdAt: "2025-10-01",
      deadline: "2025-12-31",
    },
    {
      id: "2",
      name: "Mobile App",
      description: "Aplicación móvil con React Native",
      category: "mobile",
      priority: "medium",
      status: "En revisión",
      progress: 90,
      teamMembers: ["3", "4"],
      createdAt: "2025-09-15",
      deadline: "2025-11-30",
    },
    {
      id: "3",
      name: "Dashboard Analytics",
      description: "Panel de análisis con visualizaciones",
      category: "web",
      priority: "low",
      status: "Planificado",
      progress: 20,
      teamMembers: ["5"],
      createdAt: "2025-10-20",
      deadline: "2026-01-15",
    },
  ]

  private teamMembers: TeamMember[] = [
    {
      userId: "1",
      role: "admin",
      name: "María García",
      email: "maria@example.com",
      position: "Frontend Developer",
      birthdate: "1995-05-15",
      phone: "+34 612 345 678",
      projectId: "1",
      isActive: true,
    },
    {
      userId: "2",
      role: "developer",
      name: "Juan Pérez",
      email: "juan@example.com",
      position: "Backend Developer",
      birthdate: "1992-08-22",
      phone: "+34 623 456 789",
      projectId: "1",
      isActive: true,
    },
    {
      userId: "3",
      role: "designer",
      name: "Ana López",
      email: "ana@example.com",
      position: "UI/UX Designer",
      birthdate: "1998-03-10",
      phone: "+34 634 567 890",
      projectId: "2",
      isActive: false,
    },
    {
      userId: "4",
      role: "developer",
      name: "Carlos Ruiz",
      email: "carlos@example.com",
      position: "DevOps Engineer",
      birthdate: "1990-11-30",
      phone: "+34 645 678 901",
      projectId: "2",
      isActive: true,
    },
    {
      userId: "5",
      role: "manager",
      name: "Laura Martínez",
      email: "laura@example.com",
      position: "Project Manager",
      birthdate: "1993-07-18",
      phone: "+34 656 789 012",
      projectId: "3",
      isActive: true,
    },
  ]

  private tasks: Task[] = [
    {
      id: "1",
      description: "Implementar autenticación",
      projectId: "1",
      status: "En progreso",
      priority: "high",
      userId: "1",
      deadline: "2025-11-15",
      createdAt: "2025-10-25",
    },
    {
      id: "2",
      description: "Diseñar pantalla de perfil",
      projectId: "2",
      status: "Pendiente",
      priority: "medium",
      userId: "3",
      deadline: "2025-11-20",
      createdAt: "2025-10-26",
    },
    {
      id: "3",
      description: "Configurar CI/CD",
      projectId: "1",
      status: "Completado",
      priority: "high",
      userId: "4",
      deadline: "2025-11-10",
      createdAt: "2025-10-20",
    },
    {
      id: "4",
      description: "Optimizar queries SQL",
      projectId: "1",
      status: "En progreso",
      priority: "urgent",
      userId: "2",
      deadline: "2025-11-12",
      createdAt: "2025-10-28",
    },
    {
      id: "5",
      description: "Documentar API endpoints",
      projectId: "1",
      status: "Pendiente",
      priority: "low",
      userId: "5",
      deadline: "2025-11-25",
      createdAt: "2025-10-29",
    },
  ]

  private settings: Settings = {
    organizationName: "Mi Empresa",
    email: "contacto@miempresa.com",
    notifications: true,
    theme: "dark",
    language: "es",
    autoSave: true,
  }

  // CRUD Proyectos
  getProjects(): Project[] {
    return this.projects
  }

  getProject(id: string): Project | undefined {
    return this.projects.find(p => p.id === id)
  }

  addProject(project: Omit<Project, "id" | "createdAt">): Project {
    const newProject: Project = {
      ...project,
      id: Date.now().toString(),
      createdAt: new Date().toISOString().split('T')[0],
    }
    this.projects.push(newProject)
    return newProject
  }

  updateProject(id: string, updates: Partial<Project>): Project | null {
    const index = this.projects.findIndex(p => p.id === id)
    if (index === -1) return null
    this.projects[index] = { ...this.projects[index], ...updates }
    return this.projects[index]
  }

  deleteProject(id: string): boolean {
    const index = this.projects.findIndex(p => p.id === id)
    if (index === -1) return false
    this.projects.splice(index, 1)
    return true
  }

  // CRUD Team Members
  getTeamMembers(): TeamMember[] {
    return this.teamMembers
  }

  getTeamMember(userId: string): TeamMember | undefined {
    return this.teamMembers.find(m => m.userId === userId)
  }

  addTeamMember(member: Omit<TeamMember, "userId">): TeamMember {
    const newMember: TeamMember = {
      ...member,
      userId: Date.now().toString(),
    }
    this.teamMembers.push(newMember)
    return newMember
  }

  updateTeamMember(userId: string, updates: Partial<TeamMember>): TeamMember | null {
    const index = this.teamMembers.findIndex(m => m.userId === userId)
    if (index === -1) return null
    this.teamMembers[index] = { ...this.teamMembers[index], ...updates }
    return this.teamMembers[index]
  }

  deleteTeamMember(userId: string): boolean {
    const index = this.teamMembers.findIndex(m => m.userId === userId)
    if (index === -1) return false
    this.teamMembers.splice(index, 1)
    return true
  }

  // CRUD Tasks
  getTasks(): Task[] {
    return this.tasks
  }

  getTask(id: string): Task | undefined {
    return this.tasks.find(t => t.id === id)
  }

  addTask(task: Omit<Task, "id" | "createdAt">): Task {
    const newTask: Task = {
      ...task,
      id: Date.now().toString(),
      createdAt: new Date().toISOString().split('T')[0],
    }
    this.tasks.push(newTask)
    return newTask
  }

  updateTask(id: string, updates: Partial<Task>): Task | null {
    const index = this.tasks.findIndex(t => t.id === id)
    if (index === -1) return null
    this.tasks[index] = { ...this.tasks[index], ...updates }
    return this.tasks[index]
  }

  deleteTask(id: string): boolean {
    const index = this.tasks.findIndex(t => t.id === id)
    if (index === -1) return false
    this.tasks.splice(index, 1)
    return true
  }

  // Settings
  getSettings(): Settings {
    return this.settings
  }

  updateSettings(updates: Partial<Settings>): Settings {
    this.settings = { ...this.settings, ...updates }
    return this.settings
  }
}

export const dataStore = new DataStore()
