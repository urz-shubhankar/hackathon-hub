import { createClient } from '@supabase/supabase-js'

const supabaseUrl = "https://bjpynqvkboydkwehwjqn.supabase.co"
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJqcHlucXZrYm95ZGt3ZWh3anFuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQyODYwNzgsImV4cCI6MjA4OTg2MjA3OH0.mwqyOj4kwJwQeOSHru13FsUwFLMW_dmjiU4RAQqLgL0"

export const supabase = createClient(supabaseUrl, supabaseKey)