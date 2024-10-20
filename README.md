# Documentación de la API de Ventas de Propiedades

Base URL: `http://localhost:3000/api/v1`

## Autenticación

### Iniciar sesión con Google
- **URL**: `/auth/google`
- **Método**: `GET`
- **Descripción**: Inicia el proceso de autenticación con Google OAuth.
- **Caso de uso**: Un usuario hace clic en "Iniciar sesión con Google" en la aplicación.

### Callback de Google
- **URL**: `/auth/google/callback`
- **Método**: `GET`
- **Descripción**: Maneja la respuesta de autenticación de Google.
- **Caso de uso**: Google redirige al usuario a esta URL después de una autenticación exitosa.

### Verificar autenticación
- **URL**: `/auth/check`
- **Método**: `GET`
- **Descripción**: Verifica si el usuario está autenticado.
- **Caso de uso**: La aplicación verifica el estado de autenticación del usuario al cargar.

### Cerrar sesión
- **URL**: `/auth/logout`
- **Método**: `GET`
- **Descripción**: Cierra la sesión del usuario.
- **Caso de uso**: Un usuario hace clic en "Cerrar sesión" en la aplicación.

## Usuarios

### Obtener información del usuario
- **URL**: `/users/me`
- **Método**: `GET`
- **Autenticación**: Requerida
- **Descripción**: Obtiene la información del usuario autenticado.
- **Caso de uso**: La aplicación carga el perfil del usuario después de iniciar sesión.

## Publicaciones

### Crear una publicación
- **URL**: `/publications/create`
- **Método**: `POST`
- **Autenticación**: Requerida
- **Body**:
  ```json
  {
    "propertyType": "Casa",
    "neighborhood": "Centro",
    "municipality": "Ciudad Capital",
    "department": "Departamento Central",
    "propertyAddress": "Calle 123 #456",
    "longitude": -34.12345,
    "latitude": 56.78901,
    "propertySize": "150m2",
    "propertyBedrooms": "3",
    "propertyBathrooms": "2",
    "propertyFloors": "2",
    "propertyParking": 1,
    "propertyFurnished": "No",
    "propertyDescription": "Hermosa casa en el centro de la ciudad",
    "propertyPrice": "250000"
  }
  ```
- **Descripción**: Crea una nueva publicación de propiedad.
- **Caso de uso**: Un usuario publica una nueva propiedad para venta.

### Modificar una publicación
- **URL**: `/publications/:publicationId`
- **Método**: `PUT`
- **Autenticación**: Requerida
- **Body**: Similar al de crear publicación, pero solo con los campos a actualizar.
- **Descripción**: Modifica una publicación existente del usuario.
- **Caso de uso**: Un usuario actualiza el precio o la descripción de su propiedad publicada.

### Eliminar una publicación
- **URL**: `/publications/:publicationId`
- **Método**: `DELETE`
- **Autenticación**: Requerida
- **Descripción**: Elimina una publicación del usuario.
- **Caso de uso**: Un usuario decide retirar su propiedad del mercado.

## Denuncias

### Denunciar una publicación
- **URL**: `/reports/:publicationId`
- **Método**: `POST`
- **Autenticación**: Requerida
- **Body**:
  ```json
  {
    "reason": "Información falsa"
  }
  ```
- **Descripción**: Permite a un usuario denunciar una publicación.
- **Caso de uso**: Un usuario encuentra información incorrecta o inapropiada en una publicación.

## Administración

### Obtener todos los usuarios
- **URL**: `/admin/users`
- **Método**: `GET`
- **Autenticación**: Requerida (Admin)
- **Descripción**: Obtiene una lista de todos los usuarios registrados.
- **Caso de uso**: Un administrador revisa la lista de usuarios de la plataforma.

### Eliminar un usuario
- **URL**: `/admin/users/:userId`
- **Método**: `DELETE`
- **Autenticación**: Requerida (Admin)
- **Descripción**: Elimina un usuario específico.
- **Caso de uso**: Un administrador elimina una cuenta de usuario problemática.

### Obtener publicaciones denunciadas
- **URL**: `/admin/reported-publications`
- **Método**: `GET`
- **Autenticación**: Requerida (Admin)
- **Descripción**: Obtiene una lista de publicaciones que han sido denunciadas.
- **Caso de uso**: Un administrador revisa las publicaciones que han recibido denuncias.

### Cambiar estado de una publicación
- **URL**: `/admin/publications/:publicationId/status`
- **Método**: `PATCH`
- **Autenticación**: Requerida (Admin)
- **Body**:
  ```json
  {
    "status": "inactive"
  }
  ```
- **Descripción**: Cambia el estado de una publicación (active, inactive, rejected).
- **Caso de uso**: Un administrador desactiva una publicación después de revisar una denuncia.

## Notas adicionales

- Todas las rutas autenticadas requieren un token JWT válido en el header de la solicitud:
  ```
  Authorization: Bearer <token>
  ```
- Los errores se devuelven con un código de estado HTTP apropiado y un mensaje descriptivo.
- Las solicitudes que involucran creación o modificación de datos pasan por validaciones para asegurar la integridad de los datos.
- Las rutas de administrador solo son accesibles para usuarios con rol de 'admin'.