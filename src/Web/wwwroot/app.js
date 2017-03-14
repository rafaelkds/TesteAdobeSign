export class App {
    configureRouter(config, router) {
        this.router = router;
        config.title = 'Teste';
        config.map([
            { route: ['', 'teste'],  name: 'teste',   moduleId: 'teste', nav: true, title: 'Teste' }
        ]);
    }

}