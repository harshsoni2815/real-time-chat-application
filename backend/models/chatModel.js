const mongoose = require('mongoose');

const chatModel  = mongoose.Schema(
    {
    sender:{type:String,trim:true},
    isGroupChat:{type:Boolean, default:false},
    user:[{type:mongoose.Schema.Types.ObjectId,ref:"user"}],
    latestMessage:{
        type:mongoose.Schema.Types.ObjectId,
    },
    groupAdmin:{type:mongoose.Schema.Types.ObjectId,ref:"user"}
  },
  {
    timestamps:true
  }
);

const Chats = mongoose.model("Chats",chatModel);
module.exports = Chats;