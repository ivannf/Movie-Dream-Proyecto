Movie Dream
Curso Escolar 2022-2023
Autor: Iván Negrón Fernández (https://github.com/ivannf)
Tutor: Angélica Mora Núñez()
Fecha de Inicio: 14-03-2023
Fecha de Finalización: 14-06-2023
Breve descripción del proyecto
Tras pensar en distintas ideas para el proyecto de fin de ciclo, he decidido decantarme por una página web de cine, ya que soy una persona amante de la cinematografía. Los objetivos de esta aplicación son:
Ofrecer información sobre las películas que se están proyectando, permitir la compra de entradas en línea, ofrecer contenido adicional y crear una comunidad en línea alrededor del cine.

Definir el objetivo de la aplicación
Tener una gran idea o encontrar un punto del mercado al que no se esté dando un producto o servicio es el punto de partida en cada nuevo proyecto. Antes de comenzar debes definir claramente el propósito y la misión de la aplicación web:

¿Qué va a hacer la aplicación?
¿Cuál es su atractivo principal?
¿Qué problema concreto va a resolver?
¿Qué necesidad va a cubrir?
Estructura del Proyecto
En este apartado el alumno explicará el contenido del repositorio y de todas las carpetas relevantes del mismo. Para facilitar la gestión de la entrega, todo el código y documentación debe estar en este repositorio.

Por lo anterior, un proyecto que contenga un Frontend en una tecnología o framework (por ejemplo Angular) y una API REST en otra tecnología o framework (Springboot, Express) deberá tener la siguiente estructura de directorios en el repositorio de entrega:

src-api
src-frontend
docs
README.md
En el caso anterior, si se quiere desplegar de forma automatizada a partir del control de versiones, lo habitual es que estén los dos proyectos en repositorios separados. Por lo que se deberá configurar el despliegue automático para indicarle la raíz del código fuente de cada proyecto (si es posible) o hacer dos folks del repositorio principal uno para la API y otro para el frontend y adaptar los directorios para poder realizar el despliegue automático.

En un proyecto monolítico (tecnología servidor: Springboot, Django, Express, PHP,... con un sistema de templates propio para el frontend: Thymeleaf, jinja, ejs,...) deberá tener la siguiente estructura en el repositorio de entrega:

src
docs
README.md