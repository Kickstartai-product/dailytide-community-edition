const rateLimitConfig = () => ({
  windowMs: 15 * 60 * 1000,
  limit: 1000,
  standardHeaders: "draft-7",
  legacyHeaders: false,
});
export { rateLimitConfig };
