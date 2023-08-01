import mongoose from "mongoose";

const UserShema = mongoose.Schema(
    {
        name : {
            type : String,
            required : true,
        },

        password :{
            type : String,
            required : true,
        } ,

        email :{
            type : String,
            required : true,
        },

    },

    {timestamps : true}
)

const UserModel = mongoose.model("Users",UserShema);
export default UserModel