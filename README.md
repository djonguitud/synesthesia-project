# Synesthesia

## Historia de usuario:

* Como usuario de Spotify quiero buscar una canción de un artista específico para:
    * Desplegar la canción y escucharla de forma preliminar
    * Desplegar parte de la letra de la canción
    * Manipular un fondo dinámico de colores combinados basado en las características de la canción

## Criterios de aceptación:

* Cuando abro la aplicación, se muestran dos cuadros de entrada para Canción y Artista para poder buscar una canción en Spotify.
* Cuando presiono el botón de Buscar, se hace una petición a la API de Spotify que trae la primera canción que coincide con la búsqueda y pone una previsualización en la pantalla.
* Cuando presiono el botón de Buscar, se hace una petición a la API de Spotify que trae las características de "energy" y "valence" de la canción. El valor de "energy" corresponde a la medida perceptiva de intensidad y actividad. Mientras que el valor de "valence" describe la positividad musical de la canción.
* Cuando presiono el botón de Buscar, se hace una petición a la API de Musixmatch que trae la letra de la canción buscada y la pone en la pantalla.
* Cuando presiono el botón de Buscar, se utilizan los datos de energy y valence de la canción para generar un fondo dinámico de colores:
    * Se utiliza un arreglo de cuatro colores para formar el fondo dinámico: amarillo, azul, rojo y magenta.
    * El valor de energy define la proporción de rojo y magenta.
    * El valor de valence define la proporción de amarillo azul.
* Cuando se muestra el fondo dinámico de colores y el usuario presiona algún botón de color, entonces el fondo dinámico de colores agrega dos tonos del color seleccionado por el usuario al arreglo de colores para aumentar la presencia del color deseado.

## Descripción de la aplicación

* Permite al usuario buscar una canción utilizando el nombre de la canción y/o el nombre del artista.
* Muestra la previsualización de la canción utilizando la API de Spotify y permite una reproducción parcial.
* Extrae los parámetros "energy" y "valence" de la canción usando la API de Spotify.
* Despliega la letra parcial de la canción utilizando información de la API de Musixmatch.
* Genera un fondo dinámico de colores utilizando amarillo, azul, rojo y magenta, cuya proporción de colores es definida por los parámetros de "energy" y "valence".
* Permite al usuario agregar tonos de color al presionar los botones de colores para aumentar la presencia de cierto color deseado.

## Tecnologías usadas

* ![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)

* ![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)

* ![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)

* ![jQuery](https://img.shields.io/badge/jquery-%230769AD.svg?style=for-the-badge&logo=jquery&logoColor=white)

## APIs usadas

* ### ![Spotify](https://img.shields.io/badge/Spotify-1ED760?style=for-the-badge&logo=spotify&logoColor=white) (https://developer.spotify.com/documentation/web-api/)

* ### API de Musixmatch (https://developer.musixmatch.com/)

## Authors

- [Mauricio García Hernández](https://www.github.com/maugh108)
- [Julio César Del Ángel](https://github.com/JulioCesarDelAngel)
- [Diego Jonguitud Galindo](https://github.com/djonguitud)
- [Jorge Alejandro Ramírez Anzaldo](https://github.com/JorgeRamirezAnzaldo)

## Captura de pantalla de la aplicación



## Animación de la aplicación



## Enlace a la aplicación


 