const express = require('express');
const router = express.Router();

const clientCelDB = require('../models/clientsCelDB.js')
const NewAcounts = 0;
//desde pc mesa prueba
///////////////////////////////LIST USER AND FIND FUNCTION 
async function FindCel(Cel) {//Cel= "549343XXXXXXX@c.us"
  console.log("numero del grupo: ", Cel)
  let partes = Cel.split('@');
  let numero = partes[0];//I divide up to "@"
  const cel = await clientCelDB.findOne({ number: numero });
  if (cel) {
    cel.LastMsjSending = Date.now() - 3 * 60 * 60 * 1000;
    try {
      cel.save();

    } catch (err) {
      console.log("error al crear", err)
      return
    }

    return
  };
  try {
    const newClientCel = await clientCelDB.create({ number: numero })

  } catch (err) {
    console.log("error al crear", err)
    return
  }

  return
}

////////////////////////////////////////////////Whatsapp!!
const { Client, LocalAuth, MessageMedia } = require('whatsapp-web.js');
//const qrcode = require('qrcode');
const qrcode = require('qrcode-terminal')
const media=MessageMedia.fromFilePath('./images/cap.jpg');
const client = new Client({puppeteer:{
    args: [
      '--no-sandbox']
}});
client.on('qr', qr => {
  qrcode.generate(qr, { small: true });
  console.log('QR RECEIVED', qr);
});
client.on('ready', () => {
  console.log('Client is ready!');
});
client.initialize();


client.on('message', message => {
  //FindCel(message.from)
  if (!isNaN(message.body)) { message.body = message.body.toString() }
  switch (message.body.toLowerCase().replace(/\s/g, "")) {
    case "1":
      /*
      NewAcounts++;
      if (NewAcounts % 5 === 0) {
           client.sendMessage("5493436118054@c.us", `El número ${message.from}, desea crearse una cuenta nueva` ); PRUEBA 1
           } else {
           client.sendMessage("5493436222320@c.us", `El número ${message.from}, desea crearse una cuenta nueva` ); PRUEBA 2
         }
      
      */
      client.sendMessage(message.from, "  Muy bién, se contactará contigo a la brevedad nuestro cajero oficial!!.  \n  Muchas gracias por elegirnos.  \n  Por mas información recuerda visitar nuestro sitio web donde publicamos próximos sorteos y promociones en 'https://...PÁGINA EN CONSTRUCCION'");
      client.sendMessage("5493436222320@c.us", `El número ${message.from}, desea crearse una cuenta nueva`);
      client.sendMessage("5493434745130@c.us", `El número ${message.from}, desea crearse una cuenta nueva`);
      break;
    case "2":
      client.sendMessage(message.from, 'Necesitas ayuda con tu contraseña?. \n  Escriba la palabra clave SIN COMILLAS de la accion correspondiente.  \n "C": 🔑Cambiar mi contraseña  \n "O": 🚫Olvidé mi contraseña. \n \n "M": 🎲Menú principal.');
      break;
    case "c":  //PONER LINK VIDEO DE YOUTUBE CAMBIAR CONTRASEÑA
      client.sendMessage(message.from, 'Claro! no hay problema!. \n En nuestro canal de YouTube puedes encontrar un instructivo de como hacerlo. \n Puedes encontrarlo en el siguiente link: \n LINK DE VIDEO PARA CAMBIAR CONTRASEÑA \n Espero haberte ayudado!! Mucha Suerte!!. \n  Soporte HORUS.\n "2": 🎲Menú Anterior.\n "M": 🎲Menú principal.');
      break;
    case "o":
      client.sendMessage(message.from, 'Si olvidaste o querés resetear tu contraseña... \n debes solicitarlo a tu cajero o superior quién lo hará por ti. \n No olvides pedirle tu nueva contraseña 😎.\n Espero haberte ayudado!! Mucha Suerte!!. \n  Soporte HORUS.\n "2": 🎲Menú Anterior.\n "M": 🎲Menú principal.');
      break;
    case "3":
      client.sendMessage(message.from, 'Necesitas ayuda con Apuestas Deportivas?. \n  Escriba la palabra clave SIN COMILLAS de la accion correspondiente.  \n -"COMO": 🔑Como se realiza una apuesta deportiva?  \n "CONTROL": 🎲Controlar si tomó mi apuesta?.  \n "AYUDA": 🚫No me permite realizar una apuesta deportiva. \n "M": 🎲Menú principal.');
      break;
    case "4":
      client.sendMessage(message.from, 'Lamento escuchar eso!!! \n "V": 🎲Menú principal.');
      break;
    case "5":
      client.sendMessage(message.from, 'problemas generales !!!');
      break;
    case "6":
      client.sendMessage(message.from, 'INDEPENDIENTE O DISTRIBUIDOR !!! \n "V": 🎲Menú principal.');
      break;
    case "7":
      client.sendMessage(message.from, ' OTROS !!! \n "V": 🎲Menú principal.');
      break;
    default:
      //CONSULTAR Y ENVIAR ESTE MENSAJE SOLO SI ES NUEVO
      //client.sendMessage(message.from, "  Hola, soy tu amigo BotTPL el bot de soporte, estoy para ayudarte en tu consulta. Recuerda que la atención es unicamente por mensajería");
      //si ya ha escrito

      client.sendMessage(message.from, media);
      client.sendMessage(message.from, "  ¿Qué lo trae por aquí hoy?.  \n  Simplemente envíame el número de la opción que desea seleccionar.  \n  1: 🎲Cuenta Nueva  \n  2: 🔑Contraseña.   \n  3: 🚫No puedo acceder.  \n  4: 🔎Problemas en General.  \n  5: 🎲Cargas y Retiros. \n  6: ⚽Deportes y Caballos.  \n  7: 🔅Otros.");

  }

});
module.exports = router;
