//export const API_URL = 'http://192.168.137.1:3001';
export const API_URL = 'http://localhost:3001';
export class Ebaluazioa {
    constructor(idEbaluazioa, idEpaimahaikidea, idTaldea, idEzaugarria, puntuak, noiz) { 
        this.idEzaugarria = idEzaugarria;
        this.idEbaluazioa = idEbaluazioa;
        this.idEpaimahaikidea = idEpaimahaikidea;
        this.puntuak = puntuak;
        this.idTaldea = idTaldea;
        this.noiz = noiz;
    }
}

export class Txapelketa  {
    constructor(idTxapelketa, lekua, izena, dataOrdua) {
        this.idTxapelketa = idTxapelketa;
        this.lekua = lekua;
       
        this.dataOrdua = dataOrdua;
        this.izena = izena;
        this.faseak = [];
    }
}

export class Fasea {
    constructor(idFasea, idTxapelketa, izena, egoera, hasiera, amaiera, irizpidea) {

        this.idFasea = idFasea;
        this.idTxapelketa = idTxapelketa;
        this.izena = izena;
        
        this.egoera = egoera;
        this.hasiera = hasiera;
        this.amaiera = amaiera;
        this.irizpidea = irizpidea;
        this.ezaugarriak = [];
        this.epaimahaikideak = [];
    }
}

export class Ezaugarria {
    constructor(idEzaugarria, izena, puntuakMax, puntuakMin, idFasea) {
        this.idEzaugarria = idEzaugarria;
        this.izena = izena;
        this.puntuakMax = puntuakMax;
        this.puntuakMin = puntuakMin;
        this.idFasea = idFasea;
    }
}

export class Epaimahaikidea {
    constructor(idEpaimahaikidea, username, idFasea) {
        this.idEpaimahaikidea = idEpaimahaikidea;
        this.username = username;
        this.idFasea = idFasea;
    }
}

export class user{
    constructor(username, email, password, role) {
        this.username = username;
        this.email = email;
        this.password = password;
        this.role = role;
    }
}

export class Taldea {
    constructor(idTaldea, izena, email, telefonoa, puntuakGuztira, egoera) {
        this.idTaldea = idTaldea;
        this.izena = izena;
        this.email = email;
        this.telefonoa = telefonoa;
        this.puntuakGuztira = puntuakGuztira;
        this.egoera = egoera;
       
    }
}