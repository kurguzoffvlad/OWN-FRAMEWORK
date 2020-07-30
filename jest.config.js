module.exports = {
  moduleFileExtensions: [
'js',
'jsx',
'json',
  ],
  transform: {
'.+\\.(js|jsx|ts|tsx|css|styl|less|sass|scss|svg|png|jpg|ttf|woff|woff2)$':
  'babel-jest',
  },
  transformIgnorePatterns: [
'<rootDir>/(node_modules)/',
  ],
  moduleNameMapper: {
'^@/(.*)$': '<rootDir>/src/',
  },
  testURL: 'http://localhost/',
};