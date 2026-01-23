
const globalErrorHandelar=(err,req,res,next)=>{
    console.log("global Error",err);
    res.status(err.statusCode || 500).json({
        success:false,
        message:err.message || "something went wromg ",
    })

}

export default globalErrorHandelar;