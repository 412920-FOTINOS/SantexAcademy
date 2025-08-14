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


#### Ejemplos para testear endpoints
1. GET /api/players/:id
```
1
```
2. PATCH /api/players/:id //CHECKEAR
```
{
  "name": "Juan Pérez",
  "club": "River Plate"
}
```
3. POST /api/players
```
{
  "name": "Juan Pérez",
  "club": "River Plate",
  "position": "CM",
  "nationality": "Argentina",
  "rating": 85,
  "speed": 80,
  "shooting": 75,
  "dribbling": 78,
  "passing": 82
}
```
4. GET /api/players
```
fifaVersion: 16
nationality: Argentina
position: RW
club: FC Barcelona
name: Lionel
limit: 10
page: 1
```


**Tip:**  
Si agregás nuevos endpoints, Swagger se actualiza automáticamente al reiniciar el backend.


---


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
