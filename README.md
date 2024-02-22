# Talen Tracker - A Mentors and Learners Platform

[![Framework](https://img.shields.io/badge/framework-next.js-black.svg?style=for-the-badge&logo=next.js)](https://nextjs.org)
[![CSSFramework](https://img.shields.io/badge/css%20framework-tailwind%20css-06B6D4.svg?style=for-the-badge&logo=tailwindcss)](https://tailwindcss.com)
[![MotionLibrary](https://img.shields.io/badge/motion%20library-framer%20motion-0055FF.svg?style=for-the-badge&logo=framer)](https://www.framer.com/motion)
[![Language](https://img.shields.io/badge/language-Typescript-3178C6.svg?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org)
[![PackageManager](https://img.shields.io/badge/package%20manager-pnpm-F69220.svg?style=for-the-badge&logo=pnpm)](https://pnpm.io/)
[![License](https://img.shields.io/badge/license-Proprietary-F40D12.svg?style=for-the-badge&logo=adblock)](https://github.com/next-moov/next-moov-fe/blob/master/LICENSE)

Next.js app configured with:

- Written in [Typescript](https://www.typescriptlang.org/)
- Styled with [Tailwind CSS](https://tailwindcss.com/) and [Framer Motion](https://www.framer.com/motion/)
- Linting with [ESLint](https://eslint.org/)
- Formatting with [Prettier](https://prettier.io/)
- Linting, typechecking and formatting on by default using [husky](https://github.com/typicode/husky) for commit hooks
  and [lint-staged](https://github.com/okonet/lint-staged) for staged files
- Testing with [Jest](https://jestjs.io/)
  and [react-testing-library](https://testing-library.com/docs/react-testing-library/intro)

## How to use

To begin

```sh
pnpm install && pnpm dlx husky install
```

To run development server (PORT = 3000)

```sh
pnpm run dev
```

To format and test code

```sh
pnpm run test-all
```

To build files

```sh
pnpm run build
```

To run production server (PORT = 5001)

```sh
pnpm run start
```

---

##### Copyright (c) 2024 Rigmaster

This software is licensed under Proprietary LICENSE.
