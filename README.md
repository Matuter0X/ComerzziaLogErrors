# Ultima

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 20.0.5.

## Development server
Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive/pipe/service/class/module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).
Before running the tests make sure you are serving the app via `ng serve`.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

## Generar un cliente OPENAPI (ERP-TO-CZZ / CZZ-TO-ERP)

Para generar un cliente OpenApi y poder conectarte a ella se necesita el siguiente comando MSDOS o Powershell dependiendo del uso. (¡Hay que tener Docker Desktop instalado en local!)

ERP-TO-CZZ:

    -MSDOS: docker run --rm -v %CD%:/local openapitools/openapi-generator-cli generate -i https://suite-5.saas.comerzzia.com/erp-to-czz-processor/openapi.json -g       typescript-angular -o /local/api-typescript-angular

    -Powerhsell: docker run --rm -v ${PWD}:/local openapitools/openapi-generator-cli generate -i https://suite-5.saas.comerzzia.com/erp-to-czz-processor/openapi.json -g typescript-angular -o /local/api-typescript-angular

CZZ-TO-ERP:

    -MSDOS: docker run --rm -v %CD%:/local openapitools/openapi-generator-cli generate -i https://suite-5.saas.comerzzia.com/czz-to-erp-processor/openapi.json -g typescript-angular -o /local/api-typescript-angular

    -Powerhsell: docker run --rm -v ${PWD}:/local openapitools/openapi-generator-cli generate -i https://suite-5.saas.comerzzia.com/czz-to-erp-processor/openapi.json -g typescript-angular -o /local/api-typescript-angular

Esto genera un archivo .zip con todos los pasos a seguir dentro de su propio README.md para utilizarlo dentro de tu proyecto Angular y conectarte con la API corespondiente.

## Usabilidad botonera ajustes

Para utilizar el botón de ajustes, sencillamente pulsamos sobre él y se nos abre una serie de opciones a elegir entre las que se encuentran:

    - Primary: Permite seleccionar el color primario que tendrán los elementos de mi web
    - Surface: Permite seleccionar el color de la superficie/background de mi web
    - Color Scheme: Permite seleccionar el tema de la web. Claro / Oscuro (preferencia del usuario)
    - Menu Type: Permite seleccionar el estilo que tendrá el menu principal de navegación sidebar. Entre los tipos se encuentran:

        - Static: Comportamiento normal del menú (por defecto)
        - Overlay: Superposicion del menu sobre el header (no desplaza contenido)
        - Slim: Reduce el menu en iconos visibles
        - Slim+: Reduce el menu en iconos visibles con texto visible
        - Reveal: Al mantener el raton encima del menu este se despliega automaticamente y se esconde posteriormente.
        - Drawer: Igual que reveal
        - Horizontal: Menu se muestra de forma horizontal en la web

    - Menu Profile: Permite ajustar el menu al comienzo o final de la web (start / end)
    - Menu Themes: Permite ajustar el color del menu de navegacion
    - Topbar Themes: Permite ajustar el color del menu horizontal superior topbar 