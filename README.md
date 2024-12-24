######### DOCUMENTATION THOUTH  #########

### API (BACK) ###
1.- Inicializar el proyecto
1.1.- Crear /src/db con el archivo y la configuración y contraseña de la db.
1.2.- Npm install
1.3.- npm run start (esto compilara los archivos TS y creara el dist donde en el dist/index.js levantaremos el servidor)


### ENGLISHAPP (FRONT) ###



### DATABASE ###
1.- Prompt de llenado de data.

Tengo una aplicacion para mejorar el ingles con postgreSQL, con estos niveles y sus IDs , a1 (id = 1),a2 (id = 2),  b1 (id = 3) ,b2 (id = 4) ,c1 (id = 5) y c2 (id = 6). 


Donde hago que el usuario interactue con el sistema, a traves de conversaciones en temas especificos, el objetivo es que mi usuario use esa conversaciones en su dia a dia, para eso necesito que crees dialogos como si el usuario estuviera en esa situacion hablando con otro humano.

Tengo estas areas: 
1 = Software Developer
2 = Human Resources
3 = Graphic Design
4 = Hospitality and tourism
5 = Aviation
6 = International Business
7 = Marketing and Adverstising
8 = Customer Service 

Luego tengo 'specific_topics' que estan vinculadas a las areas a traves de una foreign key de id_area, esos temas en especifico tienen relacion con el area por ejemplo en software developer hay temas especificos como 'React', 'Vue', 'Devops', etc; Y asi tambien las otras areas tienen igual temas especificos acorde a su area.

Luego tengo mi table 'situations' , que igualmente esta vinculada con 'id_area' pero en este caso son situaciones generales que se pueden dar en esa area, como por ejemplo 'job interview', 'daily standup', etc.

Luego  tengo una coleccion 'dialogs' que estos necesito que me devuevas un script para insertar data, yo te dare el nivel de ingles(a1,a2,b1,b2,c1,c2) y el dialogo tiene que estar acorde al nivel, osea poner cosas faciles cuando es nivel bajo y palabras complicadas cuando el nivel es mas alto.
Luego tambien tiiene la columna 'id_situation' y 'id_specific_topic', las conveersaciones tienen que ser diferentes por nivel, osea usar diferentes palabras y tener un enfoque diferente , para que por ejemplo si te digo una situacion y specific topic con el nivel a1 , no se repita en el a2 

Asi es como actualmente estoy insertando data y es un ejemplo, yo te pasare el id_language_level, id_situation, id_specific_topic y me tienes que devolver el dialogo.
Cuando el language level sea de a1 y a2 los dialogos tengan 8 dialogo, b1 y b2 tengan 12 dialogo y c1 y c2 tengan 14 a 16.
La columna 'person' el 1 representa el sistema , y el 2 es el usuario, siempre el  sistema iniciara la conversacion.

Aca esta mi ejemplo


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
    

Hazme saber si entendiste para empezar a mandarte el 'id_specific_topic' , 'id_situation' y 'id_language_level'


_____________________________________________________________________________________________
To keep inserting data you can use this:

listo ahora de otra area que es: Human resources (2)

en specific_topics tengo :
Recruitment and Selection(15)
Employee Onboarding(16)
Performance Management(17)
Training and Development(18)
Employee Engagement(19)

en situations tengo :

New Intern Orientation(8)
Employee Arrives Late(9)
Conflict Between Team Members(10)
Employee Requesting Leave(11)
Performance Issues Discussion(12)
Planning a Team-Building Activity(13)

ahora dame todas las de recruitment and selection en las 3 primeras situations en a1

______________________________________________________________________________________________