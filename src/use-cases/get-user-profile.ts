import { UsersRepository } from '@/repositories/users-repository'
import { User } from '@prisma/client'
import { InvalidCredentialsError } from './errors/invalid-credentials-error'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

interface GetUseProfileCaseRequest {
  userId: string
}

interface GetUseProfileUseCaseResponse {
  user: User
}

export class GetUserProfileUseCase {
  constructor(usersRepository: UsersRepository) {
    this.usersRepository = usersRepository
  }

  private usersRepository: UsersRepository

  async execute({
    userId,
  }: GetUseProfileCaseRequest): Promise<GetUseProfileUseCaseResponse> {
    const user = await this.usersRepository.findById(userId)
    
    if (!user) {
      throw new ResourceNotFoundError()
    }

    return { user }
  }
}
