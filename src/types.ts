import type { inferRouterOutputs } from '@trpc/server'
import { z } from 'zod'
import type {AppRouter} from './server/api/root'

type RouterOutputs = inferRouterOutputs<AppRouter>;

type allProjectsOutput = RouterOutputs['project']['getAllProjects']
export type Project = allProjectsOutput[number]

type allSprintsOutput = RouterOutputs['sprint']['getAllSprints']
export type Sprint = allSprintsOutput[number]

export const getAllSprints = z.object({
    projectId: z.string().cuid()
  })

  type allTodosOutput = RouterOutputs['todo']['getAllTodos']
  export type Todo = allTodosOutput[number]
  
  export const getAllTodos = z.object({
      sprintId: z.string().cuid()
    })