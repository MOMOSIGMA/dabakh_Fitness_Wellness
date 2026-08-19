# Sistema de Cuenta - Dabakh Web

## ¿Qué se ha creado?

Se ha integrado un sistema de autenticación completo en la aplicación dabakh-web que permite a los usuarios:

### 📄 Nuevas Páginas

1. **`/login`** - Página de inicio de sesión
   - Los usuarios pueden ingresar con su email y contraseña
   - Validación en tiempo real
   - Redirección automática al perfil tras login exitoso

2. **`/account`** - Página de perfil del usuario
   - Muestra información de la cuenta (email, ID, fecha de membresía)
   - Botón de desconexión
   - Enlace a panel de seguimiento de progreso en Dabakh Management
   - Acceso restringido solo a usuarios autenticados

### 🔗 Enlaces en Navbar

Se han agregado dos botones dinámicos en la barra de navegación:

- **Si está logueado**: Botón "💙 Mon Compte" → Lleva a `/account`
- **Si no está logueado**: Botón "🔑 Connexion" → Lleva a `/login`

Los botones incluyen:
- ✅ Responsive (funciona en desktop y móvil)
- ✅ Animaciones suaves
- ✅ Verificación automática de sesión

### ⚙️ Configuración Requerida

Antes de usar el sistema, actualiza el archivo `.env.local` en `dabakh-web/`:

```env
NEXT_PUBLIC_SUPABASE_URL=https://tu-proyecto.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu_clave_anonima_aqui
```

Obtén estas claves desde tu panel de [Supabase](https://supabase.com):
1. Ve a Project Settings
2. Copia la URL en "Project URL"
3. Copia la clave en "API keys" → "anon" key

### 📦 Instalación de Dependencias

Se ha agregado `@supabase/supabase-js` al `package.json`.

Instala las dependencias:
```bash
npm install
```

### 🔐 Seguridad

- Las credenciales de Supabase están sincronizadas entre ambas aplicaciones
- Los usuarios usan las mismas credenciales de Dabakh Management
- Las sesiones se mantienen automáticamente
- Se verifica la autenticación en tiempo real

### 🔄 Flujo de Autenticación

```
Navbar (no autenticado)
    ↓
Click "Connexion"
    ↓
/login page
    ↓
Ingresa email y contraseña
    ↓
Supabase autentica
    ↓
Redirige a /account
    ↓
Navbar ahora muestra "Mon Compte"
```

### 📱 Características Adicionales

- **Sincronización automática**: Cualquier cambio de sesión se refleja inmediatamente
- **Responsive**: Funciona perfectamente en móvil, tablet y desktop
- **Integración con Dabakh Management**: Enlace directo al panel de seguimiento
- **Cierre de sesión**: Botón de logout en la página de cuenta

### 🚀 Próximas Mejoras (Opcionales)

- [ ] Recuperación de contraseña
- [ ] Edición de perfil
- [ ] Cambio de contraseña
- [ ] Avatar de usuario
- [ ] Historial de sesiones
- [ ] Notificaciones en tiempo real

## Contacto

Si encuentras problemas con el sistema de autenticación, verifica:
1. ✅ Que NEXT_PUBLIC_SUPABASE_URL esté correctamente configurado
2. ✅ Que NEXT_PUBLIC_SUPABASE_ANON_KEY sea válida
3. ✅ Que el usuario existe en tu base de datos Supabase
4. ✅ Que las políticas de RLS de Supabase lo permitan
