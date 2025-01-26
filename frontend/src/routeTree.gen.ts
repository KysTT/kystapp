/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as AboutImport } from './routes/about'
import { Route as AuthenticatedImport } from './routes/_authenticated'
import { Route as IndexImport } from './routes/index'
import { Route as AuthenticatedProfileImport } from './routes/_authenticated/profile'
import { Route as AuthenticatedExpensesTrackerIndexImport } from './routes/_authenticated/ExpensesTracker/index'
import { Route as AuthenticatedExpensesTrackerExpensesImport } from './routes/_authenticated/ExpensesTracker/expenses'
import { Route as AuthenticatedExpensesTrackerCreateExpenseImport } from './routes/_authenticated/ExpensesTracker/createExpense'
import { Route as AuthenticatedExpensesTrackerAboutImport } from './routes/_authenticated/ExpensesTracker/about'

// Create/Update Routes

const AboutRoute = AboutImport.update({
  id: '/about',
  path: '/about',
  getParentRoute: () => rootRoute,
} as any)

const AuthenticatedRoute = AuthenticatedImport.update({
  id: '/_authenticated',
  getParentRoute: () => rootRoute,
} as any)

const IndexRoute = IndexImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => rootRoute,
} as any)

const AuthenticatedProfileRoute = AuthenticatedProfileImport.update({
  id: '/profile',
  path: '/profile',
  getParentRoute: () => AuthenticatedRoute,
} as any)

const AuthenticatedExpensesTrackerIndexRoute =
  AuthenticatedExpensesTrackerIndexImport.update({
    id: '/ExpensesTracker/',
    path: '/ExpensesTracker/',
    getParentRoute: () => AuthenticatedRoute,
  } as any)

const AuthenticatedExpensesTrackerExpensesRoute =
  AuthenticatedExpensesTrackerExpensesImport.update({
    id: '/ExpensesTracker/expenses',
    path: '/ExpensesTracker/expenses',
    getParentRoute: () => AuthenticatedRoute,
  } as any)

const AuthenticatedExpensesTrackerCreateExpenseRoute =
  AuthenticatedExpensesTrackerCreateExpenseImport.update({
    id: '/ExpensesTracker/createExpense',
    path: '/ExpensesTracker/createExpense',
    getParentRoute: () => AuthenticatedRoute,
  } as any)

const AuthenticatedExpensesTrackerAboutRoute =
  AuthenticatedExpensesTrackerAboutImport.update({
    id: '/ExpensesTracker/about',
    path: '/ExpensesTracker/about',
    getParentRoute: () => AuthenticatedRoute,
  } as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexImport
      parentRoute: typeof rootRoute
    }
    '/_authenticated': {
      id: '/_authenticated'
      path: ''
      fullPath: ''
      preLoaderRoute: typeof AuthenticatedImport
      parentRoute: typeof rootRoute
    }
    '/about': {
      id: '/about'
      path: '/about'
      fullPath: '/about'
      preLoaderRoute: typeof AboutImport
      parentRoute: typeof rootRoute
    }
    '/_authenticated/profile': {
      id: '/_authenticated/profile'
      path: '/profile'
      fullPath: '/profile'
      preLoaderRoute: typeof AuthenticatedProfileImport
      parentRoute: typeof AuthenticatedImport
    }
    '/_authenticated/ExpensesTracker/about': {
      id: '/_authenticated/ExpensesTracker/about'
      path: '/ExpensesTracker/about'
      fullPath: '/ExpensesTracker/about'
      preLoaderRoute: typeof AuthenticatedExpensesTrackerAboutImport
      parentRoute: typeof AuthenticatedImport
    }
    '/_authenticated/ExpensesTracker/createExpense': {
      id: '/_authenticated/ExpensesTracker/createExpense'
      path: '/ExpensesTracker/createExpense'
      fullPath: '/ExpensesTracker/createExpense'
      preLoaderRoute: typeof AuthenticatedExpensesTrackerCreateExpenseImport
      parentRoute: typeof AuthenticatedImport
    }
    '/_authenticated/ExpensesTracker/expenses': {
      id: '/_authenticated/ExpensesTracker/expenses'
      path: '/ExpensesTracker/expenses'
      fullPath: '/ExpensesTracker/expenses'
      preLoaderRoute: typeof AuthenticatedExpensesTrackerExpensesImport
      parentRoute: typeof AuthenticatedImport
    }
    '/_authenticated/ExpensesTracker/': {
      id: '/_authenticated/ExpensesTracker/'
      path: '/ExpensesTracker'
      fullPath: '/ExpensesTracker'
      preLoaderRoute: typeof AuthenticatedExpensesTrackerIndexImport
      parentRoute: typeof AuthenticatedImport
    }
  }
}

// Create and export the route tree

interface AuthenticatedRouteChildren {
  AuthenticatedProfileRoute: typeof AuthenticatedProfileRoute
  AuthenticatedExpensesTrackerAboutRoute: typeof AuthenticatedExpensesTrackerAboutRoute
  AuthenticatedExpensesTrackerCreateExpenseRoute: typeof AuthenticatedExpensesTrackerCreateExpenseRoute
  AuthenticatedExpensesTrackerExpensesRoute: typeof AuthenticatedExpensesTrackerExpensesRoute
  AuthenticatedExpensesTrackerIndexRoute: typeof AuthenticatedExpensesTrackerIndexRoute
}

const AuthenticatedRouteChildren: AuthenticatedRouteChildren = {
  AuthenticatedProfileRoute: AuthenticatedProfileRoute,
  AuthenticatedExpensesTrackerAboutRoute:
    AuthenticatedExpensesTrackerAboutRoute,
  AuthenticatedExpensesTrackerCreateExpenseRoute:
    AuthenticatedExpensesTrackerCreateExpenseRoute,
  AuthenticatedExpensesTrackerExpensesRoute:
    AuthenticatedExpensesTrackerExpensesRoute,
  AuthenticatedExpensesTrackerIndexRoute:
    AuthenticatedExpensesTrackerIndexRoute,
}

const AuthenticatedRouteWithChildren = AuthenticatedRoute._addFileChildren(
  AuthenticatedRouteChildren,
)

export interface FileRoutesByFullPath {
  '/': typeof IndexRoute
  '': typeof AuthenticatedRouteWithChildren
  '/about': typeof AboutRoute
  '/profile': typeof AuthenticatedProfileRoute
  '/ExpensesTracker/about': typeof AuthenticatedExpensesTrackerAboutRoute
  '/ExpensesTracker/createExpense': typeof AuthenticatedExpensesTrackerCreateExpenseRoute
  '/ExpensesTracker/expenses': typeof AuthenticatedExpensesTrackerExpensesRoute
  '/ExpensesTracker': typeof AuthenticatedExpensesTrackerIndexRoute
}

export interface FileRoutesByTo {
  '/': typeof IndexRoute
  '': typeof AuthenticatedRouteWithChildren
  '/about': typeof AboutRoute
  '/profile': typeof AuthenticatedProfileRoute
  '/ExpensesTracker/about': typeof AuthenticatedExpensesTrackerAboutRoute
  '/ExpensesTracker/createExpense': typeof AuthenticatedExpensesTrackerCreateExpenseRoute
  '/ExpensesTracker/expenses': typeof AuthenticatedExpensesTrackerExpensesRoute
  '/ExpensesTracker': typeof AuthenticatedExpensesTrackerIndexRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/': typeof IndexRoute
  '/_authenticated': typeof AuthenticatedRouteWithChildren
  '/about': typeof AboutRoute
  '/_authenticated/profile': typeof AuthenticatedProfileRoute
  '/_authenticated/ExpensesTracker/about': typeof AuthenticatedExpensesTrackerAboutRoute
  '/_authenticated/ExpensesTracker/createExpense': typeof AuthenticatedExpensesTrackerCreateExpenseRoute
  '/_authenticated/ExpensesTracker/expenses': typeof AuthenticatedExpensesTrackerExpensesRoute
  '/_authenticated/ExpensesTracker/': typeof AuthenticatedExpensesTrackerIndexRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths:
    | '/'
    | ''
    | '/about'
    | '/profile'
    | '/ExpensesTracker/about'
    | '/ExpensesTracker/createExpense'
    | '/ExpensesTracker/expenses'
    | '/ExpensesTracker'
  fileRoutesByTo: FileRoutesByTo
  to:
    | '/'
    | ''
    | '/about'
    | '/profile'
    | '/ExpensesTracker/about'
    | '/ExpensesTracker/createExpense'
    | '/ExpensesTracker/expenses'
    | '/ExpensesTracker'
  id:
    | '__root__'
    | '/'
    | '/_authenticated'
    | '/about'
    | '/_authenticated/profile'
    | '/_authenticated/ExpensesTracker/about'
    | '/_authenticated/ExpensesTracker/createExpense'
    | '/_authenticated/ExpensesTracker/expenses'
    | '/_authenticated/ExpensesTracker/'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  IndexRoute: typeof IndexRoute
  AuthenticatedRoute: typeof AuthenticatedRouteWithChildren
  AboutRoute: typeof AboutRoute
}

const rootRouteChildren: RootRouteChildren = {
  IndexRoute: IndexRoute,
  AuthenticatedRoute: AuthenticatedRouteWithChildren,
  AboutRoute: AboutRoute,
}

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/",
        "/_authenticated",
        "/about"
      ]
    },
    "/": {
      "filePath": "index.tsx"
    },
    "/_authenticated": {
      "filePath": "_authenticated.tsx",
      "children": [
        "/_authenticated/profile",
        "/_authenticated/ExpensesTracker/about",
        "/_authenticated/ExpensesTracker/createExpense",
        "/_authenticated/ExpensesTracker/expenses",
        "/_authenticated/ExpensesTracker/"
      ]
    },
    "/about": {
      "filePath": "about.tsx"
    },
    "/_authenticated/profile": {
      "filePath": "_authenticated/profile.tsx",
      "parent": "/_authenticated"
    },
    "/_authenticated/ExpensesTracker/about": {
      "filePath": "_authenticated/ExpensesTracker/about.tsx",
      "parent": "/_authenticated"
    },
    "/_authenticated/ExpensesTracker/createExpense": {
      "filePath": "_authenticated/ExpensesTracker/createExpense.tsx",
      "parent": "/_authenticated"
    },
    "/_authenticated/ExpensesTracker/expenses": {
      "filePath": "_authenticated/ExpensesTracker/expenses.tsx",
      "parent": "/_authenticated"
    },
    "/_authenticated/ExpensesTracker/": {
      "filePath": "_authenticated/ExpensesTracker/index.tsx",
      "parent": "/_authenticated"
    }
  }
}
ROUTE_MANIFEST_END */
