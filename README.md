![Asset 3@4x](https://user-images.githubusercontent.com/38998436/113538952-c99d5b80-9599-11eb-8e43-9f0396096e59.png)

**Tecnológico de Costa Rica.**

**Área de Ingeniería en Computadores.**

**Bases de Datos.**

**Tarea 1.**

**Semestre I 2021**

**Profesor: Marco Rivera.**

**Repositorio: [link](https://github.com/brayan156/RestTEC)**

**Estudiantes:** 

- Brayan León (2018234632) 
- Juan Solís (2018151673)
- Tomás Segura (2018099729)

# Manual de Instalación


## App web
### Instalación de Angular CLL.
La primera parte para la creación de la página web es la instalación de Angular, para esto se deberá realizar lo siguiente.
 
1.  Deberá revisar que su computador tenga instalado nodeJs en caso de no ser así deberá instalarlo en el siguiente link: [https://nodejs.org](https://nodejs.org)

2.  Si este ya se encuentra instalado deberá escribir el siguiente enunciado en el terminal 
```npm install -g @angular/cli```

Luego,  se abrirá y  se podrá abrir el proyecto.
    
3.  Dentro del proyecto en terminal se deberá de escribir `ng serve` para abrir el proyecto en la web en la URL: http://localhost:4200/

### Instalación de Bootstrap para el proyecto.
1.  Se debe instalar desde la terminal de la aplicación con el siguiente comando npm install --save bootstrap jquery para la instalación de los paquetes de bootstrap en el programa.
  
2.  En el archivo angular.json se deberá cambiar en el constructor de este los siguientes datos

```js
"styles": [

"src/styles.css",

"node_modules/bootstrap/dist/css/bootstrap.css"

],

"scripts": [

"node_modules/jquery/dist/jquery.min.js",

"node_modules/bootstrap/dist/js/bootstrap.js"

]
```


## App móvil

1. Se debe descargar e instalar el paquete `nodeJS` desde el [link](https://nodejs.org/en/download/). Se recomienda usar Windows ya que en él se realizó el desarrollo.
2. Descargar el repositorio de git:
```
https://github.com/brayan156/RestTEC
```
3. Instalar el framework ionic usando el comando `npm`:
```py
> npm uninstall -g ionic

> npm install -g @ionic/cli
```
4. Por último, ubicarse en el directorio donde se encuentra el app y correr el siguiente paso.
```py
> ionic serve -l
```

## API
1. Instalar Visual Studio 2019 desde el [link](https://visualstudio.microsoft.com/vs/).
2.  Descargar el repositorio de git:
```
https://github.com/brayan156/RestTEC
```
3. Ubicarse en el directorio donde se encuentra el API y correr con el botón play, color verde, del IDE.
4. El IDE le preguntará que instale algunas librerías como Crystal Reports pero basta con seguir los pasos.
