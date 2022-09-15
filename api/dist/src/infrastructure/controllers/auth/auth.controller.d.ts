import { AuthLoginDto } from './auth-dto.class';
import { IsAuthPresenter } from './auth.presenter';
import { LoginUseCases } from '../../../app/usecases/auth/login.usecases';
import { IsAuthenticatedUseCases } from '../../../app/usecases/auth/isAuthenticated.usecases';
import { LogoutUseCases } from '../../../app/usecases/auth/logout.usecases';
export declare class AuthController {
    private readonly loginUsecaseProxy;
    private readonly logoutUsecaseProxy;
    private readonly isAuthUsecaseProxy;
    constructor(loginUsecaseProxy: LoginUseCases, logoutUsecaseProxy: LogoutUseCases, isAuthUsecaseProxy: IsAuthenticatedUseCases);
    login(auth: AuthLoginDto, request: any): Promise<string>;
    logout(request: any): Promise<string>;
    isAuthenticated(request: any): Promise<IsAuthPresenter>;
    refresh(request: any): Promise<string>;
}
