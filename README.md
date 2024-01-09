2:06:00

## TECH STACK

1. REACT
2. TAILWIND
   2.1 tailwindcss-animate
3. APPWRITE: Firebase alternative, To implement backend.
   _Services:_

- Auth
- Database
- Functions
- Storage
  _Features:_
- Easy Server Setup
- Secure
- User Auth
- Scaling
- Secure file manage and storage
- Optimized API Performance
- Easy and Fast to implement

4. REACT QUERY
5. React Context API
6. React Router -> Outlet
7. React Query / Tanstack Query: To simplify data fetching + mutation, with benifits of caching, infinite scroll and more out of the box

- Auto caching
- Refetching
- Parallel queries
- First class mutations
- Loading, state management

8. Shadcn
9. Typescript

## FEATURES

1. Infinite Scroll
2. Search func.
3. Drag Drop Image
4. AMAZING PERFORMANCE

## Just for understanding (fyi for me)

- \_auth folder for private route pages
- \_root folder for public route pages

## New Learning

1. React Router DOM

- index parameter for home route or "/" (App.tsx)
- Working with Outlet: page with repatative component / Layout can be nested under route component wihtout path.
  Similar to children
- Working with NavLink
- useLocation
- usePArams for :id in route

2. File Structure:

- Use index.ts to work with multiple exports
- Keep external import at top and inProject import + ui ele. at bottom

3. Shadcn for creating form. Which has built in react-hook-form with zod support.
4. Tailwind

- group + group-hover: :-
- whitespace: no-wrap

5. React Query:

- useMutation: make changes(create, update)
- useQueryClient: example it invalidates/prevents to get recent post from cache. Always recall no cache storing for freshness
- useQuery: fetch data
- pass id in queryKey to differentiate similar ones
- useQuery + enabled: If same id don't refectch. If diff then refetch

6. Rename object element
   `const {data:posts isPending:isPostLoading, isError:isErrorPosts}`
   Here `data` can be accessed through naming `posts`

7. e.stopPropagation: Prevent parent link to work
8. !!: Not not operator
9.

# Ref

[JSM](https://www.youtube.com/watch?v=_W3R2VwRyF4)
