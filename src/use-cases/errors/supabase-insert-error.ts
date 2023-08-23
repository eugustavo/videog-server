export class SupabaseError extends Error {
  constructor() {
    super('Supabase error occurred')
  }
}
