import { SupabaseUsersRepository } from '@/repositories/supabase/supabase-users-repository'
import { GetUserUseCase } from '../get-user'

export function makeGetUserUseCase() {
  const usersRepository = new SupabaseUsersRepository()
  const getUserUseCase = new GetUserUseCase(usersRepository)

  return getUserUseCase
}
