import {Webhook} from 'svix'
import User from '../models/User.js'

//⭐ Webhook = Event-driven HTTP notification mtlb Jab koi specific event hota hai  tumhare server ko automatically notify kare

export const clerkWebhooks = async (req , res)=>{
    try{
     // Secret key pass kar rahe ho jo Clerk dashboard se mili hai Ye secret key dono taraf same hai - Clerk ke paas bhi, tumhare paas bhi Taaki verify ho sake ki request actually Clerk se hi aa rahi hai
        const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET)
           await whook.verify(JSON.stringify(req.body),{
            'svix-id' : req.headers['svix-id'],
            'svix-timestamp': req.headers['svix-timestamp'],
            'svix-signature':req.headers['svix-signature']
        })


//  Webhook data extract karte hain
        const {data , type} = req.body;
        console.log("data:", data , "type", type);

        switch(type){
            case 'user.created':{
                const userData ={
                    _id:data.id,
                    email:data.email_address[0].email_address,
                    name:data.first_name + " " + data.last_name,
                    imageUrl: data.image_url
                }

                await User.create(userData)
                res.json({})
                break;
            }

            case 'user.updated':{
                const userData = {
                    email:data.email_address[0].email_address,
                    name:data.first_name + " " + data.last_name,
                    imageUrl: data.image_url
                }

                await User.findByIdAndUpdate(data.id, userData)
                res.json({})
                break;

            }

            case 'user.deleted':{
                await User.findByIdAndDelete(data.id)
                res.json({})
                break;
            }

             default:
                break;

        }
        
    }catch(error){
        // ❌ Webhook verification fail ya database error
     res.json({success:false, message: error.message})
    }
}



//? WORKFLOW OF WEBHOOK WITH CLERK:
// - User signs up via Clerk
// - Clerk stores user info in its own DB
// - Webhook triggers → tumhare backend controller ko notify karta hai
// - Backend controller apni DB me user document create/update
// - Tumhara app app-specific data manage kar sakta hai (courses, preferences, settings)