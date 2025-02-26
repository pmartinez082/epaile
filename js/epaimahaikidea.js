import {API_URL} from './konstanteak.js'
import { getFaseAktiboa } from './fasea.js';
import {autentifikatu} from './user.js';

export const getEpailearenEpaimahaiak = async () => {
    const fasea = await getFaseAktiboa();
    const idFasea = fasea.idFasea;
    const data = {
        username: await autentifikatu(),
        idFasea: idFasea
    };
    try {
        const response = await fetch(`${API_URL}/epaimahaikidea/getEpailearenEpaimahaiak`, {
            method: 'POST',
            mode: 'cors',
            headers: {
                'ngrok-skip-browser-warning': 'true',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        if (response.ok) {
            const data = await response.json();
            if (data[0].idEpaimahaikidea === 0) {
                return false;
            }
            return data[0].idEpaimahaikidea;
        } else {
            //console.log('Error en la respuesta del servidor');
            return null;
        }
    } catch (err) {
        //console.log(err);
        return null;
    }
};
