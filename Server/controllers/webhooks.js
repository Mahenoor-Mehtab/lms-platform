import {Webhook} from 'svix'
import User from '../models/User.js'
import Stripe from 'stripe'
import { Purchase } from '../models/Purchase.js'
import Course from '../models/Course.js'

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
                    email:data.email_addresses[0].email_address,
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


const stripeInstance = new Stripe(process.env.STRIPE_WEBHOOK_SECRET)

export const stripeWebhooks = async(request, response)=>{
   const sig = request.headers['stripe-signature'];

  let event;

  try {
    event = Stripe.webhooks.constructEvent(request.body, sig, process.env.STRIPE_WEBHOOK_SECRET );

     // Handle the event
  switch (event.type) {
    case 'payment_intent.succeeded':{
      const paymentIntent = event.data.object;
      const paymentIntentId = paymentIntent.id

      const session = await stripeInstance.checkout.sessions.list({
        payment_intent: paymentIntentId
      })

      const { purchasedId} = session.data[0].metadata;

      const purchaseData = await Purchase.findById(purchasedId)
      const userData = await User.findById(purchaseData.userId)
      const courseData = await Course.findById(purchaseData.courseId.toString())

      courseData.enrolledStudents.push(userData)
      await courseData.save()

      userData.enrolledCourses.push(courseData._id)
      await userData.save()

      purchaseData.status ='completed'
      await purchaseData.save()
      break;
    }

    case 'payment_intent.payment_failed':{
        const paymentIntent = event.data.object;
      const paymentIntentId = paymentIntent.id

      const session = await stripeInstance.checkout.sessions.list({
        payment_intent: paymentIntentId
      })

      const { purchaseId} = session.data[0].metadata
     const purchaseData = await Purchase.findById(purchaseId)
     purchaseData.status = 'failed'
     await purchaseData.save()



      break;
      }
    // ... handle other event types
    default:
      console.log(`Unhandled event type ${event.type}`);
  }


  response.json({received: true});
  }
  catch (err) {
    response.status(400).send(`Webhook Error: ${err.message}`);
  }
}



//? WORKFLOW OF WEBHOOK WITH CLERK:
// - User signs up via Clerk
// - Clerk stores user info in its own DB
// - Webhook triggers → tumhare backend controller ko notify karta hai
// - Backend controller apni DB me user document create/update
// - Tumhara app app-specific data manage kar sakta hai (courses, preferences, settings)