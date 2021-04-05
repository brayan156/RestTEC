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


# Manual de usuario para RestTEC.

## App web.
### Sobre el ingreso.
El usuario deberá de introducir sus correo electrónico y contraseña en caso de que este no este registrado la aplicación web tendrá una alerta , en caso contrario la aplicación cargará dos distintas vistas.
![loginFE](https://user-images.githubusercontent.com/38998436/113542852-63690680-95a2-11eb-9e7d-3f26cf3ae701.PNG)



### Sobre el administrador.
#### Pedidos del sistema.
El administrador cuenta con la opción de observar todos los pedidos dentro del sistema, por lo tanto en esta pantalla se logra observar el ID del pedido y la cédula del chef si clickea dentro de este se le mostrará información con respecto al pedido.

![ControlDePedido](https://user-images.githubusercontent.com/38998436/113542823-53e9bd80-95a2-11eb-8036-e60f19b865db.PNG)

#### Gestion de tipos de plato.
Desde este punto el Administrador podrá crear, actualizar, eliminar platos específicos de las opciones del menú.
![GestionDeTipos](https://user-images.githubusercontent.com/38998436/113542825-54825400-95a2-11eb-9dd2-4b465bd7b73f.PNG)

#### Gestion del menu.
En esta vista el administrador tendrá el poder para crear, actualizar y eliminar las opciones del menú.
![gestionDelMenu](https://user-images.githubusercontent.com/38998436/113542826-54825400-95a2-11eb-8fb3-1cf4e9b06406.PNG)

#### Top 10.
Cuando el administrador desde entrar a cualquiera de los TOP, este podrá observar Top 10 de los platos más vendidos, Top 10 de los platos que más ganancias generan, Top 10 de los platos con mejor feedback, Top 10 de los clientes que más órdenes han generado para tener un control sobre este.

Para ingresar a esta vista el administrador deberá de seleccionar cualquiera de los Top dentro del navbar de administrador.

![Top10](https://user-images.githubusercontent.com/38998436/113542820-53512700-95a2-11eb-8cf8-1192b468881f.PNG)




### Sobre el chef.
#### Pedidos en el sistema.
Desde esta vista el Chef tiene accesos a todos sus pedidos por lo tanto este podrá observa todos sus pedidos activos, si da clic dentro del ID podrá encontrar el cuerpo del pedido.

#### Tomar pedido.
Desde esta vista el Chef tiene accesos a todos los pedidos que no han sido asignados si este da click dentro del ID podrá aceptar o rechazar el pedido.

![tomarPedido](https://user-images.githubusercontent.com/38998436/113543245-323d0600-95a3-11eb-89ae-1d53d512f9a9.PNG)

![tomarPedido2](https://user-images.githubusercontent.com/38998436/113543382-821bcd00-95a3-11eb-984c-df568eed3586.PNG)

#### Control del pedido.
Desde esta vista el Chef tiene accesos a todos los pedidos que tiene asignados si este da click dentro del ID podrá observar la información del pedido o finalizar la orden si así lo desea.
![ControlDePedido](https://user-images.githubusercontent.com/38998436/113542823-53e9bd80-95a2-11eb-8036-e60f19b865db.PNG)

![ControlDePedido2](https://user-images.githubusercontent.com/38998436/113543445-a7104000-95a3-11eb-9e29-41f01497eb91.PNG)

#### Reasignar pedido.
Desde esta vista el chef tiene la posibilidad de visualizar los pedidos que han sido tomados por otros chef y tomar el control de este pedido.

![ReasignarPedido](https://user-images.githubusercontent.com/38998436/113542824-54825400-95a2-11eb-9a04-6cac4255b9b8.PNG)
![reasignar2](https://user-images.githubusercontent.com/38998436/113543502-c5763b80-95a3-11eb-8c40-04cc4e14e514.PNG)


## App móvil.
### Sobre el ingreso.
La aplicación le pedirá ingresar su nombre y contraseña de usuario. Si no tiene uno, debe darle al botón de registro e ingresar los datos solicitados. 
![login](https://user-images.githubusercontent.com/38998436/113542197-00c33b00-95a1-11eb-8c25-1c99587d39b7.PNG)![register](https://user-images.githubusercontent.com/38998436/113542196-00c33b00-95a1-11eb-8d7b-22e6d903be13.PNG)



### Sobre el uso del carrito.
Al ingresar en la aplicación, se desplegarán los platos en donde podrá escoger la cantidad que desea de cada uno. Mientras realiza estas acciones, se actualizará el monto total. 

Cuando esté satisfecho con la orden que está construyendo, puede tocar el botón rojo de total y se le desplegarán un par de alertas de confirmación.

A continuación, se le desplegará la factura de pero su compra ya está en progreso. Tocando el botón de continuar, accederá a la pestaña de pedidos.

![carrito](https://user-images.githubusercontent.com/38998436/113542194-002aa480-95a1-11eb-8c31-44b575b24d8a.PNG) ![factura](https://user-images.githubusercontent.com/38998436/113542191-ff920e00-95a0-11eb-9848-21b2e4f444f4.PNG)



### Sobre el uso de la pestaña Pedidos.
En esta pestaña tiene acceso a tres tablas importantes: pedidos viejos, pedidos en progreso y feedback.
- Pedidos: en esta se despliegan todos los pedidos viejos y tienen activado el botón de Feedback si no ha enviado un reporte en relación a ese pedido. Es importante entender que solamente puede enviar un feedback por pedido. También tiene un botón flotante para acceder a los pedidos que están en progreso.
- Pedido en progreso: se muestran los pedidos en progreso.
- Feedback: permite enviar una calificación del 1 al 5 según tu parecer en relación a un pedido específico. Solamente se permite enviar una calificación por pedido.

![pedidos](https://user-images.githubusercontent.com/38998436/113542198-00c33b00-95a1-11eb-8c9d-0453fa24ec56.PNG)


