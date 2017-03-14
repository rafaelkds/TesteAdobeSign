import {HttpClient, json} from 'aurelia-fetch-client';

export class Teste {

    buscar(){
        this.get('https://api.na2.echosign.com:443/api/rest/v5/widgets/3AAABLblqZhDYaTD26nx0nNOLRvUJJNGfdu4H5WqbyKH5pC52UMgrhzdXrQzWPlioTSJALUxyGWIO4HSTwN8RBEg9AcaGMCyg/formData', true)
            .then(data => {
                let linhas = data.data.split("\n");
                if(linhas.length > 1){
                    let aux = linhas.slice(1, linhas.length);
                    aux.forEach(function(item, index){
                        aux[index] = aux[index].split(",");
                    });
                    console.log(aux);
                    this.respostas = aux;
                }
                this.titulos = linhas[0].split(",");
            })
            .catch(data => {
                console.log(data);
            });
    }

    buscar2(){
        this.get('https://api.na2.echosign.com:443/api/rest/v5/widgets/3AAABLblqZhDYaTD26nx0nNOLRvUJJNGfdu4H5WqbyKH5pC52UMgrhzdXrQzWPlioTSJALUxyGWIO4HSTwN8RBEg9AcaGMCyg/agreements', false)
            .then(data => {
                console.log(data.data);
            })
            .catch(data => {
                console.log(data);
            });
    }

    get(recurso, isText) {
        let token = this.token;
        return new Promise(
            function(resolve, reject) {
                let client = new HttpClient();
                let myHeaders = new Headers();
                myHeaders.append('Access-Token', token);
                client.fetch(recurso,
                    {
                        headers: myHeaders
                    })
                    .then(response => tratarResposta(response, resolve, reject, isText));
            }
        );
    }
    
}

function tratarResposta(response, resolve, reject, isText){
    
    (isText ? response.text() : response.json()).then(data => {
        let retorno = {
            status: response.status,
            data: data
        };
        if(response.ok)
            resolve(retorno);
        else
            reject(retorno);
    })
    .catch(() => {
        let retorno = {
            status: response.status,
            data: null
        };
        if(response.ok)
            resolve(retorno);
        else
            reject(retorno);
    })
    
}
