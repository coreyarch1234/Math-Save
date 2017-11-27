module.exports = (title, topic, latex) => {
    return (
        `<!DOCTYPE html>
    <html>
        <head>
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <!--Google Fonts-->
             <link href="https://fonts.googleapis.com/css?family=Montserrat:300,400,500,700" rel="stylesheet">
            <!-- latex styling -->
            <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js"></script>
              <!-- katex rendering  -->
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.9.0-alpha1/katex.min.css" integrity="sha384-8QOKbPtTFvh/lMY0qPVbXj9hDh+v8US0pD//FcoYFst2lCIf0BmT58+Heqj0IGyx" crossorigin="anonymous">
            <script src="https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.9.0-alpha1/katex.min.js" integrity="sha384-GR8SEkOO1rBN/jnOcQDFcFmwXAevSLx7/Io9Ps1rkxWp983ZIuUGfxivlF/5f5eJ" crossorigin="anonymous"></script>

        </head>

        <style>
            * {
                margin: 0;
                padding: 0;
            }
            html, body {
                font-family: 'Montserrat';
                padding-top: 20px;
                padding-left: 15px;
                padding-right: 15px;
            }

            #topic{
                font-weight: 700;
                color: #232323;
                font-size: 18px;
            }

            #title{
                 font-weight: 400;
                 font-size: 15px;
                 color: #686868;
                 margin-bottom: 20px;
            }

            #latexElement{
                text-align: center;
                font-size: 5vw;
                width: 90%;
                padding: 20px 15px;
                border: 2px dashed #6c6cb2;
            }

        </style>

        <body>
            <div class= 'heading-container'>
                <h2 id='topic'>
                     ${topic}
                 </h2>

                 <h1 id='title'>
                    ${title}
                 </h1>

                 <div id='latexElement'>
                    ${latex}
                 </div>
            </div>
        </body>
    </html>`
    )
}
