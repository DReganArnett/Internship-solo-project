import { ZodBoolean, z } from 'zod';

export const taskSchema = z.object({
    taskName: z.string().min(1, "Task name is required.").max(255),
    dueOn: z.string().min(1, "Due date is required.").max(255),
    completed: z.boolean()
});
