import { response } from "express";
import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Stripe from 'stripe';

// global variables
const currency = 'inr'
const deliveryCharge = 10

// gateway initialize
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);


// placing orders using COD Method
const placeOrder = async (req,res) => {

    try {

        const { userId, items, amount, address }= req.body;

        const orderData = {
            userId,
            items,
            address,
            amount,
            paymentMethod:"COD",
            Payment:false,
            date: Date.now()
        }

        const newOrder = new orderModel(orderData)
        await newOrder.save()

        await userModel.findByIdAndUpdate(userId,{cartData:{}})

        res.json({success:true,message:"Order placed"})
        
    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }

}


// placing orders using Stripe Method
const placeOrderStripe = async (req,res) => {
    try {

        const { userId, items, amount, address }= req.body;
        const { origin } = req.headers;

        const orderData = {
            userId,
            items,
            address,
            amount,
            paymentMethod:"Stripe",
            Payment:false,
            date: Date.now()
        }

        const newOrder = new orderModel(orderData)
        await newOrder.save()

        const line_items = items.map((item)=>({

            price_data:{
                currency:currency,
                product_data:{
                    name:item.name
                },
                unit_amount: item.price*100
            },
            quantity: item.quantity
        }))
        line_items.push({
            price_data:{
                currency:currency,
                product_data:{
                    name:'Delivery Charges'
                },
                unit_amount: deliveryCharge * 100
            },
            quantity: 1
        })

        const session = await stripe.checkout.sessions.create({
            success_url: `${origin}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url: `${origin}/verify?success=false&orderId=${newOrder._id}`,
            line_items,
            mode: 'payment'
        });
        
        res.json({ success: true, session_url: session.url });
        
        
        
    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }
}

// Verify Stripe
const verifyStripePayment = async (req, res) => {
    try {
      const { success, orderId } = req.body;
  
      if (success === "true") {
        await orderModel.findByIdAndUpdate(orderId, { Payment: true });
        return res.json({ success: true, message: "Payment verified" });
      } else {
        // Optionally: delete or flag the order if payment failed
        return res.json({ success: false, message: "Payment failed" });
      }
    } catch (error) {
      console.log("Stripe verify error:", error);
      res.status(500).json({ success: false, message: error.message });
    }
  };
  


// placing orders using Razor Method
const placeOrderRazorpay = async (req,res) => {

}

// All Orders data for Admin panel
const allOrders = async (req,res) => {

    try {

        const orders = await orderModel.find({})
        res.json({success:true,orders})
        
    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }

}


// user orders using for fornted
const userOrders = async (req,res) => {
    try {

        const { userId } =req.body

        const orders = await orderModel.find( {userId} )
        res.json({success:true,orders})
        
    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }
}

//update order status from Admin Panel
const updateStatus = async (req,res) => {
    try {

        const { orderId, status } = req.body

        await orderModel.findByIdAndUpdate(orderId, {status})
        res.json({success:true,message:'Status Updated'})
        
    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }

}

export { verifyStripePayment,placeOrder, placeOrderStripe, placeOrderRazorpay,allOrders,userOrders,updateStatus};