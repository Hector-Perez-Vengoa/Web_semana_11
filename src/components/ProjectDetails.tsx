"use client"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Project, dataStore } from "@/lib/store"

interface ProjectDetailsProps {
  readonly project: Project
  readonly trigger: React.ReactNode
}

export function ProjectDetails({ project, trigger }: ProjectDetailsProps) {
  const teamMembers = dataStore.getTeamMembers().filter(m => 
    project.teamMembers.includes(m.userId)
  )
  const tasks = dataStore.getTasks().filter(t => t.projectId === project.id)

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "urgent":
        return <Badge variant="destructive">Urgente</Badge>
      case "high":
        return <Badge>Alta</Badge>
      case "medium":
        return <Badge variant="secondary">Media</Badge>
      case "low":
        return <Badge variant="outline">Baja</Badge>
      default:
        return <Badge variant="outline">{priority}</Badge>
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Completado":
        return <Badge>Completado</Badge>
      case "En progreso":
        return <Badge variant="secondary">En progreso</Badge>
      case "En revisión":
        return <Badge variant="secondary">En revisión</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        {trigger}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">{project.name}</DialogTitle>
          <DialogDescription>
            {project.description}
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-6 py-4">
          {/* Información general */}
          <div className="grid gap-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Estado:</span>
              {getStatusBadge(project.status)}
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Prioridad:</span>
              {getPriorityBadge(project.priority)}
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Categoría:</span>
              <Badge variant="outline">{project.category}</Badge>
            </div>
            
            {project.deadline && (
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Fecha límite:</span>
                <span className="text-sm text-muted-foreground">{project.deadline}</span>
              </div>
            )}
            
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Fecha de creación:</span>
              <span className="text-sm text-muted-foreground">{project.createdAt}</span>
            </div>
          </div>

          {/* Progreso */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="font-medium">Progreso del proyecto</span>
              <span className="font-medium">{project.progress}%</span>
            </div>
            <div className="w-full bg-secondary h-3 rounded-full overflow-hidden">
              <div
                className="h-full bg-primary transition-all"
                style={{ width: `${project.progress}%` }}
              />
            </div>
          </div>

          {/* Equipo */}
          <div className="space-y-3">
            <h3 className="text-sm font-medium">Equipo del proyecto ({teamMembers.length})</h3>
            <div className="space-y-2">
              {teamMembers.length > 0 ? (
                teamMembers.map((member) => (
                  <div key={member.userId} className="flex items-center gap-3 p-2 rounded-lg border">
                    <Avatar>
                      <AvatarFallback>
                        {member.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <p className="text-sm font-medium">{member.name}</p>
                      <p className="text-xs text-muted-foreground">{member.position}</p>
                    </div>
                    <Badge variant={member.isActive ? "default" : "secondary"}>
                      {member.isActive ? "Activo" : "Inactivo"}
                    </Badge>
                  </div>
                ))
              ) : (
                <p className="text-sm text-muted-foreground">No hay miembros asignados</p>
              )}
            </div>
          </div>

          {/* Tareas */}
          <div className="space-y-3">
            <h3 className="text-sm font-medium">Tareas ({tasks.length})</h3>
            <div className="space-y-2">
              {tasks.length > 0 ? (
                tasks.map((task) => {
                  const assignee = dataStore.getTeamMember(task.userId)
                  return (
                    <div key={task.id} className="flex items-center justify-between p-2 rounded-lg border">
                      <div className="flex-1">
                        <p className="text-sm font-medium">{task.description}</p>
                        <p className="text-xs text-muted-foreground">
                          Asignado a: {assignee?.name || "Sin asignar"}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        {getStatusBadge(task.status)}
                        {getPriorityBadge(task.priority)}
                      </div>
                    </div>
                  )
                })
              ) : (
                <p className="text-sm text-muted-foreground">No hay tareas en este proyecto</p>
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
