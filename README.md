# Clothing Catalog App

אפליקציית קטלוג בגדים עם SvelteKit ו-MongoDB

## Quick Start

### 1. Clone הפרויקט

```bash
git clone <repository-url>
cd clothing-catalog-app
```

### 2. הגדר environment variables

צור קובץ `.env` ברמת השורש:

```bash
cp .env.example .env
```

ועדכן עם הערכים שקיבלת בנפרד:

```
MONGODB_URI=mongodb+srv://...
JWT_SECRET=...
```

### 3. הרץ עם Docker Compose

```bash
docker-compose up --build
```

האפליקציה תהיה זמינה ב: `http://localhost:3000`

## Development (ללא Docker)

```bash
npm install
npm run dev
```

זמין ב: `http://localhost:5173`

## Features

- 🔐 הרשמה והתחברות
- 👕 קטלוג בגדים
- ❤️ מועדפים
- ✏️ הוספה ועריכה של פריטים
