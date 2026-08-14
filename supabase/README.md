# Supabase setup

This website uses **Supabase Auth** and **Supabase PostgreSQL**. There is no Express/MongoDB backend.

## Required dashboard actions

1. Open the Supabase SQL editor.
2. Run `migrations/20260814_production_security.sql`.
3. Create (or identify) the Auth user that should administer the site.
4. Promote that user to admin. Role cannot be assigned from the browser:

```sql
update public.profiles
set role = 'admin', updated_at = now()
where id = '<auth-user-uuid>';
```

5. Confirm Row Level Security is enabled on `profiles`, `jobs`, `reviews`, and `contact_messages`.

## Access model

| Table | Anonymous / public | Authenticated non-admin | Admin |
| --- | --- | --- | --- |
| `jobs` | Read `active = true` only | Same | Full CRUD |
| `reviews` | Read `approved = true`; insert pending only | Same | Read all; approve/reject/delete |
| `contact_messages` | Insert only | Insert only | Full read/update/delete |
| `profiles` | None | Read own row | Read own row (role changes are SQL-only) |

Admin authorization is stored in `profiles.role`. Frontend route guards are UX only. RLS is authoritative.

## Environment

Frontend (Vite) variables:

```
VITE_SUPABASE_URL=
VITE_SUPABASE_ANON_KEY=
```

Never put the service-role key in the frontend or in Vercel `VITE_*` variables.
