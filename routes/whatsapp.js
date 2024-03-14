const express = require('express');
const router = express.Router();
const clientCelDB=require('../models/clientsCelDB.js')

///////////////////////////////LIST USER AND FIND FUNCTION 
async function FindCel(Cel){//Cel= "549343XXXXXXX@c.us"
  let partes = Cel.split('@');
  let numero=partes[0];//I divide up to "@"
  const cel = await clientCelDB.findOne({number:numero});
  if(cel){
    cel.LastMsjSending=Date.now()-3 * 60 * 60 * 1000;
    try{
      cel.save();
  
    }catch(err){
      console.log("error al crear",err)
    return
    }
    
    return 
  };
  try{
    const newClientCel=await clientCelDB.create({number:numero})

  }catch(err){
    console.log("error al crear",err)
  return
  }

  return
}

////////////////////////////////////////////////Whatsapp!!
const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode =require('qrcode-terminal')
const client = new Client();
client.on('qr', qr => {
  qrcode.generate(qr, {small: true});
  console.log('QR RECEIVED', qr);
});
client.on('ready', () => {
 console.log('Client is ready!');
});
client.initialize();


client.on('message', message => {
            FindCel(message.from)
               if (!isNaN(message.body)){message.body=message.body.toString()}
                 switch (message.body.toLowerCase().replace(/\s/g, "")){ 
                 case "1":
                   //HACER QUE NOS LLEGUE AL NUMERO QUE PONGAMOS 1 DE CADA 5, LOS OTROS 2 QUE ME LOS ENVIE A MI NUMERO 
                   client.sendMessage(message.from, "  Muy bién, se contactará contigo a la brevedad nuestro cajero oficial!!.  \n  Muchas gracias por elegirnos.  \n  Por mas información recuerda visitar nuestro sitio web donde publicamos próximos sorteos y promociones en 'https: PROXIMAMENTE'" );
                   client.sendMessage("5493436222320@c.us", `El número ${message.from}, desea crearse una cuenta nueva` );
                   break;
                 case "2":
                   client.sendMessage(message.from, 'Necesitas ayuda con tu contraseña?. \n  Elija la opción correspondiente.  \n change: 🔑Cambiar la contraseña  \n reset: 🚫No puedo acceder. \n 8: 🎲Menú principal.');
                   break;
                       case "change":
                         client.sendMessage(message.from, 'Claro! no hay problema!. \n En nuestro canal de YouTube puedes encontrar un instructivo de como hacerlo. \n Puedes encontrarlo en el siguiente link: \n LINK DE VIDEO PARA CAMBIAR CONTRASEÑA \n Espero haberte ayudado!! Mucha Suerte!!. \n  Soporte HORUS.');
                         break;
                       case "reset":
                         client.sendMessage(message.from, 'Si olvidaste o querés resetear tu contraseña... \n debes solicitarlo a tu cajero quién lo hará por ti. \n No olvides pedirle tu nueva contraseña 😎.\n Espero haberte ayudado!! Mucha Suerte!!. \n  Soporte HORUS.' );
                           break;
                 case "3":
                   client.sendMessage(message.from, 'Necesitas ayuda con Apuestas Deportivas?. \n  Elija la opción correspondiente.  \n how: 🔑Como se realiza una apuesta deportiva?  \n know: 🚫Como sé si tomó mi apuesta?.  \n 8: 🎲No me permite realizar una apuesta deportiva. \n 8: 🎲Menú principal.');
                   break;
                 case "4":
                   client.sendMessage(message.from, 'elegiste 4 !!!');
                   break;
                 case "5":
                   client.sendMessage(message.from, 'elegiste 5 !!!');
                   break;
                 case "6":
                   client.sendMessage(message.from, 'elegiste 6 !!!');
                   break;
                 case "7":
                   client.sendMessage(message.from, 'elegiste 7 !!!');
                     break;
                 default: 
                 client.sendMessage(message.from, "  Bienvenidos a Soporte HORUS  \n  Diganos tu inquietud.  \n  Por favor seleccione con un numero una de las opciones:  \n  1: 🎲Cuenta Nueva  \n  2: 🔑Contraseña.   \n   3: ⚽Apuestas Deportivas.  \n  4: 🚫No puedo acceder.  \n  5: 🔎Problemas en General. \n 6: 🎲Soy Independiente o Distribuidor. \n 7: 🔅Otros." );
                 break;
               }
           
              });
              module.exports = router;
