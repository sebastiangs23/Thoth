######### DOCUMENTATION THOUTH  #########

### API (BACK) ###
1.- Inicializar el proyecto
1.1.- Crear /src/db con el archivo y la configuración y contraseña de la db.
1.2.- Npm install
1.3.- npm run start (esto compilara los archivos TS y creara el dist donde en el dist/index.js levantaremos el servidor)


### ENGLISHAPP (FRONT) ###



### DATABASE ###
1.- Prompt de llenado de data.

Tengo una aplicacion para mejorar el ingles, con niveles, a1 (id = 1),a2 (id = 2),  b1 (id = 3) ,b2 (id = 4) ,c1 (id = 5) y c2 (id = 6).

donde hago que el usuario interactue con el sistema, a traves de conversaciones en temas especificos. la primera imagen  son las areas, la segunda son los 'specific_topics' del area si te das cuenta tiene una forenea con id_area. la tercera son las 'situations' , si te das cuenta tiene una fk con id_area, osea por ejemplo en un area como 'aviation' puede tener una 'situation' como 'Emergency Landing Protocols' . luego esta la cuarta imagen que son los 'dialogs' que dialogs tiene una fk con id_specific_topic, id_situation y id_language_level, yo te pasare el specific_topic , la situation y el language level y tu lo que tienes que hacer es generarme un dialogo tomando en cuenta estas parametros y el nivel de ingles y crear un dialogo, en el cual siempre tu empezaras la conversación, te pido que te metas bien en el personaje y recuerda que son conversaciones en la cual el usuairo tiene que sentir como si estuviera en esa situacion, tienes permitido, ser prepotente, amable, arrogante, cortante, o todo lo necesario para que el usuario sienta como si fuera una conversacion con un humano (recuerda tomar en cuenta los parametros) , dependiendo el nivel de ingles, los diagolos deberan tener entre 12 y 18 dialogos: te pasare un ejemplo de como inserto data en mi tabla dialogos:

INSERT INTO dialogs (id_language_level, id_specific_topic, id_situation, person, dialog, "order", "createdAt", "updatedAt")
VALUES 
    (1, 15, 16, 1, 'Hello, let''s discuss diversity initiatives.', 1, now(), now() ),
    (1, 15, 16, 2, 'Great idea! What do you propose?', 2 , now(), now()),
    (1, 15, 16, 1, 'We can start with training programs.', 3 , now(), now()),
    (1, 15, 16, 2, 'That sounds beneficial.', 4 , now(), now()),
    (1, 15, 16, 1, 'And create employee resource groups.', 5 , now(), now()),
    (1, 15, 16, 2, 'I love that idea.', 6 , now(), now()),
    (1, 15, 16, 1, 'We''ll also review our hiring process.', 7 , now(), now()),
    (1, 15, 16, 2, 'To ensure fairness and inclusion.', 8 , now(), now()),
    (1, 15, 16, 1, 'Exactly. Let''s set goals and metrics.', 9, now(), now()),
    (1, 15, 16, 2, 'And regularly review progress.', 10, now(), now()),
    (1, 15, 16, 1, 'We''re committed to a diverse workplace.', 11, now(), now()),
    (1, 15, 16, 2, 'I appreciate that.', 12, now(), now());
    
   