import {API_URL} from './konstanteak.js'
import * as konstanteak from "./konstanteak.js";

//FASEAREN EZAUGARRIAK LORTU
export const getFasearenEzaugarriak = async () => {
    const fasea = await getFaseAktiboa();
    const idFasea = fasea.idFasea; 
    try {
        const response = await fetch(`${API_URL}/fasea/${idFasea}/ezaugarriak`, {
            method: 'GET',
            mode: 'cors',
            headers: {
                'ngrok-skip-browser-warning': 'true',
                'Content-Type': 'application/json',
            },
        });
        if (response.ok) {
            const data = await response.json();
            const ezaugarriak = [];
            data.forEach(ezaugarri => {
                ezaugarriak.push(new konstanteak.Ezaugarria(ezaugarri.idEzaugarria, ezaugarri.izena, ezaugarri.puntuakMax, ezaugarri.puntuakMin));
            });
            return ezaugarriak;
        }
    } catch (err) {
        //console.log(err);
    }
};

export const getFaseAktiboa = async () => {
    try {
        const response = await fetch(`${API_URL}/fasea/lortu/aktiboa`, {
            method: 'GET',
            mode: 'cors',
            headers: {
                'ngrok-skip-browser-warning': 'true',
                'Content-Type': 'application/json',
            },
        });
        if (response.ok) {
            const data = await response.json();
            return new konstanteak.Fasea(data[0].idFasea, data[0].idTxapelketa, data[0].izena, data[0].egoera, data[0].hasiera, data[0].amaiera, data[0].irizpidea);
        } else {
            return [];
        }
    } catch (err) {
        //console.log(err);
        return [];
    }
};




