# ANRO Web

Panel administrativo simplificado y sitio público de ANRO en Next.js.

## Arquitectura actual

- **Panel admin**: solo `Inicio`, `Podcast`, `Cerrar sesión`.
- **Persistencia dinámica (MongoDB Atlas + Mongoose)**:
  - autenticación de administrador
  - episodios del podcast
- **Sitio público estático en código**:
  - `/` (Home)
  - `/desarrollo`
  - `/servicios`
  - `/nosotros`
  - `/contacto`
- **Sitio público dinámico**:
  - `/podcast` (solo episodios publicados)

## Variables de entorno

Copia `.env.example` a `.env.local` y completa:

```bash
cp .env.example .env.local
```

Variables requeridas:

- `MONGODB_URI`
- `JWT_SECRET`

Variables para formulario de contacto (Brevo):

- `BREVO_API_KEY`
- `CONTACT_TO_EMAIL`
- `CONTACT_FROM_EMAIL`
- `CONTACT_FROM_NAME`

## Desarrollo local

```bash
npm install
npm run dev
```

Abrir: [http://localhost:3000](http://localhost:3000)

## Flujo de prueba rápido

1. **Crear admin en MongoDB**
   - Usa el script `npm run create-admin` (si aplica a tu entorno) o inserta un `AdminUser` manualmente con `passwordHash` bcrypt.
2. **Login**
   - Ir a `/login`.
   - Iniciar sesión con usuario admin válido.
3. **Panel**
   - Ir a `/admin` y verificar resumen de episodios.
4. **Podcast admin**
   - Ir a `/admin/podcast`.
   - Crear, editar, publicar y destacar episodios.
5. **Podcast público**
   - Ir a `/podcast`.
   - Verificar que solo se listan episodios con estado `published`.
