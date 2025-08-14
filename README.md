# Santex Academy - FootballAPI

## Pasos para correr

1. Instalar Docker Desktop: Si no lo tienen, es el primer paso.
2. Clonar tu repositorio: 
   
   ```bash
   git clone <URL_DE_TU_REPOSITORIO>
   ```
3. Navegar a la carpeta del proyecto:
    ```bash
    cd football-api
   ```
4. Copiar las variable de entorno del archivo de ejemplo al de ambiente
    ```bash
    cp .env.sample .env
   ```
5. Levantar todo con: 
   ```bash
    docker compose up
   ```

### Documentación de la API con Swagger

La API está documentada y disponible mediante Swagger.  
Podés probar todos los endpoints, ver los parámetros y las respuestas desde el navegador.

**Pasos para acceder:**

1. Asegurate de tener la aplicación corriendo con Docker o manualmente.
2. Abrí tu navegador y accedé a:

   ```
   http://localhost:3000/api/docs
   ```

3. Desde ahí podés:
   - Probar los endpoints (GET, POST, PATCH, etc.)
   - Ver los modelos y parámetros requeridos
   - Consultar ejemplos de respuesta y error

**Tip:**  
Si agregás nuevos endpoints, Swagger se actualiza automáticamente al reiniciar el backend.

---

¿Querés que te ayude a agregar ejemplos de uso de endpoints en el README?### Documentación de la API con Swagger

La API está documentada y disponible mediante Swagger.  
Podés probar todos los endpoints, ver los parámetros y las respuestas desde el navegador.

**Pasos para acceder:**

1. Asegurate de tener la aplicación corriendo con Docker o manualmente.
2. Abrí tu navegador y accedé a:

   ```
   http://localhost:3000/api/docs
   ```

3. Desde ahí podés:
   - Probar los endpoints (GET, POST, PATCH, etc.)
   - Ver los modelos y parámetros requeridos
   - Consultar ejemplos de respuesta y error

**Tip:**  
Si agregás nuevos endpoints, Swagger se actualiza automáticamente al reiniciar el backend.




## Alternativa
Aca las instruciones para correr cada servicio por separado

### Reiniciar los datos

``` bash
docker compose down -v # Esto detiene los contenedores y elimina los volúmenes (incluido db_data)
docker compose up -d   # Esto vuelve a crear todo desde cero, ejecutando init.sql
```

### Conectarse a MySQL desde el Terminal / Consola

```bash
mysql -h 127.0.0.1 -P 3306 --user=football_api --password=password football_db
```

```bash
mysql> SHOW TABLES;
```

```bash
mysql> SELECT * FROM users;
```

```bash
mysql> exit;
```

### Inicializar API

```bash
$ npm install
```

### Compilar y correr el BackEnd

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```
