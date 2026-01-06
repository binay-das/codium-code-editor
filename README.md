# Codium

A modern, feature-rich web-based code editor for managing and sharing code snippets. Built with Next.js 16, TypeScript, and Monaco Editor.

## Features

- **Monaco Editor Integration** - Full-featured code editing with syntax highlighting for 100+ languages
- **Snippet Management** - Create, save, and organize code snippets with ease
- **Instant Sharing** - Generate unique shareable links for your snippets
- **Authentication** - Secure user authentication powered by Clerk
- **Theme Support** - Beautiful light and dark themes with smooth transitions
- **Responsive Design** - Works seamlessly across all devices
- **Real-time Execution** - Run code directly in the browser
- **Cloud Storage** - Snippets securely stored with Prisma and PostgreSQL

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **Editor:** Monaco Editor
- **Styling:** Tailwind CSS 4
- **UI Components:** Radix UI + shadcn/ui
- **Authentication:** Clerk
- **Database:** Prisma + PostgreSQL
- **Animations:** Framer Motion
- **State Management:** Zustand

## Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/binay-das/codium-code-editor.git
   cd codium-code-editor
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Create a `.env` file in the root directory:
   ```env
   
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=

   CLERK_SECRET_KEY=
   
   DATABASE_URL=
   ```

4. **Set up the database**
   ```bash
   npx prisma generate
   npx prisma db push
   ```

5. **Run the development server**
   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) to view the application.

## Build for Production

```bash
npm run build
npm start
```

## Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.


## Author

**Binay Das**
- GitHub: [@binay-das](https://github.com/binay-das)

## Show Your Support

Give a star if this project helped you!

---

