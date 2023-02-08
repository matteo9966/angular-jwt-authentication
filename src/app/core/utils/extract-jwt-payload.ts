export function extractJWTPayload(jwt:string){
    const sections = jwt.split('.')
    if(sections.length<2) return;
    const payload = atob(sections[1]);
    return payload;
}