export const template = (username: string, subject: string, number: string) => {
  return `<!DOCTYPE html>
            <html lang="en">
              <head>
                <meta charset="UTF-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <link
                  rel="preload"
                  href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&display=swap"
                  as="style"
                />
                <link
                  href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&display=swap"
                  rel="stylesheet"
                />
                <link
                  href="https://fonts.googleapis.com/css2?family=Montserrat:wght@700&display=swap"
                  rel="stylesheet"
                />
  
                <link
                  href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&display=swap"
                  rel="stylesheet"
                />
                <link
                  rel="preload"
                  href="https://fonts.googleapis.com/css2?family=Mulish:wght@400;500;600;700&display=swap"
                  as="style"
                />
                <link
                  href="https://fonts.googleapis.com/css2?family=Mulish:wght@400;500;600;700&display=swap"
                  rel="stylesheet"
                />
                <style>
                  *,
                  *::before {
                    margin: 0;
                    padding: 0;
                    box-sizing: border-box;
                  }
                  body {
                    color: #525252;
                    background: #e8ebee;
                    font: 15px Montserrat, Helvetica Neue, Helvetica, sans-serif;
                    font-weight: 300;
                    line-height: 1.4;
                    margin: 0;
                    word-wrap: break-word;
                    -webkit-text-size-adjust: 100%;
                    -ms-text-size-adjust: 100%;
                  }
                  .logo_mammoth {
                    max-width: 125px;
                    max-height: 42px;
                  }
                  .container {
                    background: #ffffff;
                    border: 1px solid #ededed;
                    border-radius: 16px;
                    width: 626px;
                    height: 470px;
                    margin: 0 auto;
                    padding: 0;
                    overflow: hidden;
                    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
                  }
                  header {
                    background-color: #ccc;
                    padding: 24px 40px;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                  }
                  .content {
                    padding: 48px 40px;
                    text-align: center;
                  }
                  .title {
                    width: 546px;
                    margin-top: 8px;
                    margin-bottom: 5px;
                    text-align: center;
                  }
                  .title h1 {
                    color: #171717;
                    font-size: 32px;
                    font-weight: 700;
                    line-height: 40px;
                    font-family: "Montserrat", sans-serif;
                  }
                  .content h2 {
                    color: #171717;
                    font-size: 20px;
                    font-weight: 700;
                    font-family: "Montserrat", sans-serif;
                    margin-bottom: 10px;
                  }
                  .description {
                    width: 546px;
                    margin-bottom: 14px;
                  }
                  .description p {
                    text-align: center;
                    color: #525252;
                    font-size: 14px;
                    line-height: 20px;
                    font-family: Mulish, sans-serif;
                  }
                  .description strong {
                    color: #262626;
                    font-size: 14px;
                  }
  
                  .description p:first-of-type {
                    margin-bottom: 7px;
                  }
                  .button_codigo {
                    background-color: #ccc;
                    color: #262626;
                    border: none;
                    border-radius: 10px;
                    font-size: 20px;
                    height: 48px;
                    width: 312px;
                    cursor: pointer;
                    text-align: center;
                    display: inline-block;
                    margin-bottom: 15px;
                    font-weight: 700;
                    line-height: 40px;
                    font-family: "Montserrat", sans-serif;
                  }
                  footer {
                    width: 546px;
                    height: 24px;
                    font-size: 12px;
                    font-weight: 600;
                  }
  
                  footer p {
                    color: #525252;
                    font-family: Mulish, sans-serif;
                  }
                </style>
              </head>
              <body>
                <div class="container">
                  <header>
                    
                  </header>
                  <section class="content">
                    <div class="title">
                      <h1>Mammoth</h1>
                    </div>
  
                    <h2>¡Hola ${username}!</h2>
  
                    <div class="description">
                      <p>
                        Para completar el proceso de creación de tu cuenta, haz clic en el siguiente enlace para <strong>verificar tu correo electrónico</strong> y activar tu cuenta.
                      </p>
                    </div>
  
                    <div class="button_codigo" >Código: ${number}</div>
  
                    <footer>
                      <p>
                        Si esta solicitud no fue realizada por ti, por favor ignora este
                        correo. Si tienes alguna duda o necesitas asistencia adicional, no
                        dudes en contactarnos.
                      </p>
                       <br>
                      <p>© Mammoth. Todos los derechos reservados 2025.</p>
                    </footer>
                  </section>
                </div>
              </body>
            </html>
            `;
};
