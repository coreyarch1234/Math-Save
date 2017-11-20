module.exports = (title, topic, latex) => {
    return (
        `<!DOCTYPE html>
    <html>
        <head>
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
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
                background-color: white;
                font-family: 'Avenir-Black';
                font-size: 18px;
            }
            .heading-container{

            }
            #title{
                text-align: center;
                padding-bottom: 1em;
                font-weight: 700;
                color: black;

            }
            #latexElement {
                text-align: center;
                font-weight: 400;
                padding-bottom: 1em;

            }
            #topic{
                text-align: center;
                padding-bottom: 2em;
                font-weight: lighter;
                font-style: italic;
                color: black;


            }
        </style>

        <body>
            <div class= 'heading-container'>
                <h1 id='title'>
                    ${title}
                </h1>
                <div id='latexElement'>
                    ${latex}
                </div>
                <h2 id='topic'>
                    ${topic}
                </h2>
            </div>
        </body>
        

    </html>`
    )
}
