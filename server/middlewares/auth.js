import jwt from 'jsonwebtoken' ; 

const auth = async (req, res, next) => {

    const authHeader = req.headers.authorization || req.headers.Authorization  ; 

    if(!authHeader?.startsWith('Bearer ')) return res.sendStatus(401) ;

    const token = authHeader.split(' ')[1] ;
    jwt.verify(token, 'test', (err, decoded) => {
        if(err) return res.sendStatus(403) ;
        next() ;
    });
   
}

export default auth ;