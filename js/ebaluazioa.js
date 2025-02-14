

import {API_URL} from './konstanteak.js'
import * as konstanteak from "./konstanteak.js";


export function getBaloratzekoEzaugarriak(){
    const baloratzekoEzaugarriak = document.getElementsByName('idEzaugarria');
    const puntuMin = document.getElementsByName('puntuakMin');
    const puntuMax = document.getElementsByName('puntuakMax');
    const baloratzekoEzaugarriakArray = [];
    var i = baloratzekoEzaugarriak.length;
    for(var j = 0; j < i; j++){
        baloratzekoEzaugarriakArray.push(new konstanteak.Ezaugarria(baloratzekoEzaugarriak[j].getAttribute('data-idEzaugarria'),"",puntuMax[j].getAttribute('data-puntuakMax'),puntuMin[j].getAttribute('data-puntuakMin'), null));
    }
    //console.log(baloratzekoEzaugarriakArray);
    return baloratzekoEzaugarriakArray;
}

export function getEzaugarrienBalorazioak(){
    const balorazioak = document.getElementsByName('balorazioa');
    const balorazioakArray = [];
    var i = balorazioak.length;
    for(var j = 0; j < i; j++){
        balorazioakArray.push(balorazioak[j].value);
    }
    //console.log(balorazioakArray);
    return balorazioakArray;
}
    


export const createNewEbaluazioa = async (event) => {
    event.preventDefault();
   
    //console.log("createNewEbaluazioa");
    event.preventDefault();
    const balorazioak = getEzaugarrienBalorazioak();
    const ezaugarriak = getBaloratzekoEzaugarriak();
    for(var j = 0; j < balorazioak.length; j++){
               
        //console.log(parseFloat(ezaugarriak[j].puntuakMin));
        //console.log(parseFloat(balorazioak[j]));
        //console.log(parseFloat(ezaugarriak[j].puntuakMax));
        

        if(parseFloat(ezaugarriak[j].puntuakMin) >parseFloat(balorazioak[j])||parseFloat(ezaugarriak[j].puntuakMax )< parseFloat(balorazioak[j])||balorazioak[j] === ""){
            
            return false;
        }
    }
    
    for(var i = 0; i < ezaugarriak.length; i++){


   //console.log(event.target.id);
    const data = {
        idEpaimahaikidea: event.target.id.split('ebaluazioaButton-')[1],
        idEzaugarria: ezaugarriak[i].idEzaugarria,
        idTaldea: document.getElementById('taldeaMenua').value,
        puntuak: balorazioak[i],
        noiz: new Date()
    };
    //console.log(data);
    try {
        const response = await fetch(`${API_URL}/ebaluazioa/add`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        if (response.ok) {
            //console.log("ebaluazioa ondo sortu da");
            
            return true;
        } else {
            const error = await response.json();
            //console.log(`Error: ${error.error}`);
        }
    }
    catch (err) {
        alert('Errorea');
        //console.log(err);
    }

}

};


export const getEpailearenEbaluazioakFaseka = async (event) => {
    event.preventDefault();
    const idEpaimahaikidea = event.target.id.split('buttonEpaimahaikidea-')[1];   
    try {
        const response = await fetch(`${API_URL}/ebaluazioa/get/EpailearenEbaluazioakFaseka/${idEpaimahaikidea}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
           
        });
        if (response.ok) {
            const ebaluazioak = await response.json();
            //console.log(ebaluazioak);
            if (ebaluazioak.length === 0) {
                return [];
            }
            
            const ebaluazioakArray = [];
            ebaluazioak.forEach(ebaluazioa => {
                ebaluazioakArray.push(new konstanteak.Ebaluazioa(ebaluazioa.idEbaluazioa, ebaluazioa.idEpaimahaikidea, ebaluazioa.idTaldea, ebaluazioa.idEzaugarria, ebaluazioa.puntuak, ebaluazioa.noiz));
            });
            //console.log(ebaluazioakArray);
            return ebaluazioakArray;
        } else {
            const error = await response.json();
            //console.log(`Error: ${error.error}`);
        }
    }
    catch (err) {
        alert('Errorea');
        //console.log(err);
    }

} ;