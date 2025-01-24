export const envs = {
    appPort: process.env.APP_PORT || 3333,
    mongoURI: process.env.MONGODB_URI || '',
    securityToken: process.env.SECURITY_TOKEN || '',
}