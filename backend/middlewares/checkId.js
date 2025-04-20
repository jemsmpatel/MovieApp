import { isValidObjectId } from 'mongoose';

function checkId(req, res, next) {
    if (!isValidObjectId) {
        res.status(404);
        throw new Error(`Invalid Object Of: ${req.params.id}`);
    }
    next();
}

export default checkId;