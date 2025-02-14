import * as u from "./user.js";

let isLogin = true;
export function toggleLogin() {
  isLogin = !isLogin;
  const formTitle = document.getElementById('formTitle');
  const email = document.getElementById('email');
  const toggleButton = document.getElementById('toggle-button');
  if (isLogin) {
    formTitle.textContent = 'Saioa hasi';
    toggleButton.innerHTML = 'Ez duzu konturik? Erregistratu zaitez';
    email.setAttribute('hidden', '');
    email.removeAttribute('required');

  } 
  
  else {
    formTitle.textContent = 'Erregistratu';
    toggleButton.innerHTML = 'Badaukazu konturik? Saioa hasi';
    email.removeAttribute('hidden');
    email.setAttribute('required', '');

  }
}

export async function login(event) {
    event.preventDefault();
    const authForm = document.getElementById('authForm');
    
    if (isLogin) {
      
      const verify = await u.verifyUser();
      if(!verify){
        
       
        const mezua = document.createElement('h1');
        mezua.textContent = ` ${document.getElementById('username').value} erabiltzailea ez dago erregistratuta edo pasahitza ez da zuzena`;
        authForm.reset();
        logDiv.appendChild(mezua);
        return;
      }
    else{  
    bideratu();
    }
    } else {
        
        const user = await u.findUser();
        if(user){
            
           
            const mezua = document.createElement('h1');
            mezua.textContent = ` ${document.getElementById('username').value} izenarekin erabiltzailea existitzen da`;
            authForm.reset();
            logDiv.appendChild(mezua);
            return;
        }
        else{
        await u.createNewUser();
        bideratu();
        }
    }
    
    authForm.reset();
}



 async function bideratu(){
  const role = await u.getRole();
  const logDiv = document.getElementById('logDiv');
  if(role == "admin"){
    
      const mezua = document.createElement('h1');
      mezua.textContent = "Ez duzu hemen egoteko baimenik";
      const button = document.createElement('button');
      button.textContent = "Atzera";
      button.addEventListener('click', function(){
          window.location.href = "../index.html";
      });
      logDiv.innerHTML = '';
      logDiv.appendChild(mezua);
      logDiv.appendChild(button);

        
  }
  else{
      window.location.href = "/html/epaitu.html";
  }
  
 };

 export const logout = async () => {
  localStorage.removeItem('token');
  window.location.href = '../index.html';
};







