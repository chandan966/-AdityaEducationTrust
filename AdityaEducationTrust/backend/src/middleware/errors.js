export function notFound(req,res){res.status(404).json({message:'The requested API endpoint was not found.'});}
export function errorHandler(err,req,res,next){console.error(err?.stack||err);if(res.headersSent)return next(err);const status=Number(err.status)||500;res.status(status).json({message:status>=500?'An unexpected server error occurred.':'The request could not be completed.'});}
