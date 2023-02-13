export const signupErrorsMap:Record<any,any> = {
    email:{
        email:'wrong email format',
        required:'email is required'
        //TODO: errore in caso di doppia email
    },
    password:{
        digits:'missing digit',
        lowercase:'missing lowercase',
        min:'password should have <%min%> digits',
        uppercase:'missing uppercase',
        required:'password is required'

    },
    username:{
        required:'username is required'
    },
    confirmPassword:{
        required:'confirm password is required'
    },
}