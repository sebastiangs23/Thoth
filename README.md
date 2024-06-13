######### DOCUMENTATION THOUTH  #########

### API (BACK) ###
1.- Inicializar el proyecto
1.1.- Crear /src/db con el archivo y la configuración y contraseña de la db.
1.2.- Npm install
1.3.- npm run start (esto compilara los archivos TS y creara el dist donde en el dist/index.js levantaremos el servidor)


### ENGLISHAPP (FRONT) ###



### DATABASE ###
1.- Prompt de llenado de data.

Te dire un tema de conversacion (ejemplo 'cars'), y te dire un nivel de nivels (ejemplo 'b2').

y tu me tendras que crear una conversacion de 2 personas sobre ese tema, de 4 dialogos cada uno, de preferencia que el tema tiene que ir de acorde al nivel de ingles, y los dialogos no pueden ser tan largos, maximo de 10 palabras.

Ademas por ejemplo en los niveles de A1, A2, B1, B2 que los dialogos sean como introductorios, con esto me refiero por ejemplo , si el tema es 'Hotels' que sea un dialogo entre una persona que se acerca a un hotel para reservar y pregunte si hay habitacion , cuanto cuenta la noche, etc.

Si el tema es de aviones, que le pregunte ala azafata cuanto demora el vuelo, cuando sirven la comida , etc.

la persona 1 , sera normalmente el personal, y la persona 2 , vendriamos a ser los que estamos aprendiendo ingles.

ahora una vez entendido todo esto, necesito que esas conversaciones me las generes como script de insert.
El scrip debe ser asi: 
INSERT INTO dialogs (id_conversation, person, dialog , "order"  , "createdAt", "updatedAt") VALUES
(5, '1', 'Hello! Welcome to our restaurant.',1 , now(), now() ),
(5, '2', 'Hi, do you have a table for two?', 2, now(), now()),
(5, '1', 'Yes, this way please.', 3, now(), now()),
(5, '2', 'Can I see the menu?', 4, now(), now()),
(5, '1', 'Of course, here you go.', 5, now(), now()),
(5, '2', 'What do you recommend?', 6, now(), now()),
(5, '1', 'The pasta is very good.', 7, now(), now()),
(5, '2', 'Okay, I will try the pasta.', 8, now(), now());

aqui hay un ejemplo pero el campo id_conversation dejalo vacio, hazme saber si entendiste para empezar a mandarte los temas de conversacion y el nivel de ingles, recuerda que yo solo te dire por ejemplo. Tema : WashCar - level: 'C1'