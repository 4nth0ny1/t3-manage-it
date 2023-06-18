import type { inferRouterOutputs } from '@trpc/server'
import { z } from 'zod'
import type {AppRouter} from './server/api/root'

type RouterOutputs = inferRouterOutputs<AppRouter>;
type allProjectsOutput = RouterOutputs['project']['getAllProjects']

export type Project = allProjectsOutput[number]