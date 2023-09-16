import jwt from 'jsonwebtoken' ; 

const auth = async (req, res, next) => {

    const token = req.headers.authorization.split(" ")[1];
    try {
        jwt.verify(token, 'test');
        next() ;
    } catch (error) {
        console.log(error);
    }
}

export default auth ;