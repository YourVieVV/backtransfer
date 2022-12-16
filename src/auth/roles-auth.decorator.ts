import { SetMetadata } from "@nestjs/common";

export const Roles_KEY = 'roles';

export const Roles = (...roles: string[]) => SetMetadata(Roles_KEY, roles);