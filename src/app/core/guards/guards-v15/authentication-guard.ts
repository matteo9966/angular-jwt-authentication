import { inject } from "@angular/core";
import { AuthenticationService } from "../../services/authentication.service";
/***
 * TODO: quando aggiorni alla versione 15 utilizza questo nuovo metodo !
 */
export const authenticationGuard = (authenticationService:AuthenticationService=inject(AuthenticationService))=>{
    return true;
    return authenticationService.isLoggedIn$
}