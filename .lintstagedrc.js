const lintStagesConfig = {
  '*.@(jsx|ts|tsx)': ['pnpm format', 'pnpm lint'],
};

module.exports = lintStagesConfig;
