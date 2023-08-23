import { SupabaseUsersRepository } from '@/repositories/supabase/supabase-users-repository'
import { CreateUserUseCase } from '../create-user'

export function makeCreateUserUseCase() {
  const usersRepository = new SupabaseUsersRepository()
  const createUserUseCase = new CreateUserUseCase(usersRepository)

  return createUserUseCase
}
