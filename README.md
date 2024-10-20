# Documentación de la API de InmoMarket

Base URL: `https://inmomarket.me/api/v1`

## Autenticación

### Iniciar sesión con Google

- **URL**: `/auth/google`
- **Método**: `GET`
- **Descripción**: Inicia el proceso de autenticación con Google OAuth.
- **Uso**: Redirige al usuario a la página de inicio de sesión de Google.

### Callback de Google

- **URL**: `/auth/google/callback`
- **Método**: `GET`
- **Descripción**: Maneja la respuesta de autenticación de Google.
- **Uso**: Google redirige a esta URL después de una autenticación exitosa.

### Verificar autenticación

- **URL**: `/auth/check`
- **Método**: `GET`
- **Descripción**: Verifica si el usuario está autenticado.
- **Respuesta**:
  ```json
  {
    "authenticated": true,
    "user": {
      "id": "user_id",
      "name": "User Name",
      "email": "user@example.com"
    }
  }
  ```

### Cerrar sesión

- **URL**: `/auth/logout`
- **Método**: `GET`
- **Descripción**: Cierra la sesión del usuario.
- **Respuesta**: Redirige al usuario a la página principal.

## Usuarios

### Obtener información del usuario

- **URL**: `/users/me`
- **Método**: `GET`
- **Autenticación**: Requerida
- **Descripción**: Obtiene la información del usuario autenticado.
- **Respuesta**:
  ```json
  {
    "id": "user_id",
    "name": "User Name",
    "email": "user@example.com",
    "role": "user"
  }
  ```

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
- **Respuesta**: Detalles de la publicación creada.

### Modificar una publicación

- **URL**: `/publications/:publicationId`
- **Método**: `PUT`
- **Autenticación**: Requerida
- **Parámetros**: `publicationId` - ID de la publicación a modificar
- **Body**: Similar al de crear publicación, con los campos a actualizar.
- **Respuesta**: Detalles de la publicación actualizada.

### Eliminar una publicación

- **URL**: `/publications/:publicationId`
- **Método**: `DELETE`
- **Autenticación**: Requerida
- **Parámetros**: `publicationId` - ID de la publicación a eliminar
- **Respuesta**: Confirmación de eliminación.

## Denuncias

### Denunciar una publicación

- **URL**: `/reports/:publicationId`
- **Método**: `POST`
- **Autenticación**: Requerida
- **Parámetros**: `publicationId` - ID de la publicación a denunciar
- **Body**:
  ```json
  {
    "reason": "Información falsa"
  }
  ```
- **Respuesta**: Confirmación de denuncia registrada.

## Administración

### Obtener todos los usuarios (Admin)

- **URL**: `/admin/users`
- **Método**: `GET`
- **Autenticación**: Requerida (Admin)
- **Descripción**: Obtiene una lista de todos los usuarios registrados.
- **Respuesta**: Lista de usuarios.

### Eliminar un usuario (Admin)

- **URL**: `/admin/users/:userId`
- **Método**: `DELETE`
- **Autenticación**: Requerida (Admin)
- **Parámetros**: `userId` - ID del usuario a eliminar
- **Respuesta**: Confirmación de eliminación.

### Obtener publicaciones denunciadas (Admin)

- **URL**: `/admin/reported-publications`
- **Método**: `GET`
- **Autenticación**: Requerida (Admin)
- **Descripción**: Obtiene una lista de publicaciones que han sido denunciadas.
- **Respuesta**: Lista de publicaciones denunciadas.

### Cambiar estado de una publicación (Admin)

- **URL**: `/admin/publications/:publicationId/status`
- **Método**: `PATCH`
- **Autenticación**: Requerida (Admin)
- **Parámetros**: `publicationId` - ID de la publicación
- **Body**:
  ```json
  {
    "status": "inactive"
  }
  ```
- **Respuesta**: Detalles de la publicación actualizada.

## Notas adicionales

- Todas las rutas requieren HTTPS.
- Las solicitudes que involucran autenticación deben incluir un token JWT válido en el header de la solicitud:
  ```
  Authorization: Bearer <token>
  ```
- Los errores se devuelven con un código de estado HTTP apropiado y un mensaje descriptivo.
- Las solicitudes que involucran creación o modificación de datos pasan por validaciones para asegurar la integridad de los datos.
- Las rutas de administrador solo son accesibles para usuarios con rol de 'admin'.
