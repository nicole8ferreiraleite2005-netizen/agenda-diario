import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type Task = {
  id: string
  title: string
  description?: string
  due_date: string
  due_time?: string
  category_id?: string
  priority: 'low' | 'medium' | 'high'
  status: 'pending' | 'completed' | 'cancelled'
  recurrence: 'none' | 'daily' | 'weekly' | 'monthly'
  reminder_before_hours: number
  reminder_before_day: boolean
  reminder_before_hours_2?: number
  created_at: string
  updated_at: string
  completed_at?: string | null
  mural_image_url?: string | null
  mural_notes?: string
}

export type Category = {
  id: string
  name: string
  color: string
  created_at: string
}

export type TaskAttachment = {
  id: string
  task_id: string
  file_url: string
  file_name?: string
  file_type?: string
  created_at: string
}

export type TaskNote = {
  id: string
  task_id: string
  note?: string
  created_at: string
  updated_at: string
}
