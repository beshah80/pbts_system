export const env = {
  port: Number(process.env.PORT ?? 3005),
  jwtSecret: process.env.JWT_SECRET ?? 'pbts_secret_key_2024',
  corsOrigins: (process.env.CORS_ORIGINS
    ? process.env.CORS_ORIGINS.split(',').map((s) => s.trim())
    : ['http://localhost:3000', 'http://localhost:3001', 'http://localhost:3003']) as string[],
};
