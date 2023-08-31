const { createBot, 
    createProvider, 
    createFlow, 
    addKeyword 
    } = require('@bot-whatsapp/bot')

const QRPortalWeb = require('@bot-whatsapp/portal')
const BaileysProvider = require('@bot-whatsapp/provider/baileys')
const MockAdapter = require('@bot-whatsapp/database/mock')

const flujoprincipal = addKeyword (["hola","buenas","que tal","chris","quichi","loquito","hey","oye"])
                        .addAnswer("¡Hola! Soy el chatbot de Christian") 
                        .addAnswer("Estoy muy contento de poder atender tu consulta")
                        .addAnswer("¿Qué es lo que necesitas?",{capture:true},(ctx)=>{
                            console.log("Mensaje capturado: ",ctx.body)                            
                        }).addAnswer("Por favor confirma con un *si* para enviar el pedido",{capture:true},(ctx,{fallBack})=>{
                            if(!ctx.body.includes("si","sii","siii","sí","Si","Sí")){
                                return fallBack()
                            }
                            console.log("Mensaje capturado: ",ctx.body)})
                                .addAnswer("En unos segundos atenderé tu pedido")

const main = async () => {
    const adapterDB = new MockAdapter()
    const adapterFlow = createFlow([flujoprincipal])
    const adapterProvider = createProvider(BaileysProvider)

    createBot({
        flow: adapterFlow,
        provider: adapterProvider,
        database: adapterDB,
    })

    QRPortalWeb()
}

main()