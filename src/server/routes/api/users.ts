import * as express from 'express';
import { findUserById } from '../../utilities/dataBaseUtilities';
import { ApiError } from '../../utilities/ApiError';

import { ApiResponse } from '../../utilities/ApiResponse';
import { IUser } from 'src/interfaces';
const router = express.Router({ mergeParams: true });

export default router;

//@route    GET api/users/:userId
//@desc     Creates new poll. If Email-address unknown creates new User in database.
//@access   Public
router.get('/:userId', async (req, res, next) => {
    try {
        const user = await findUserById(req.params.userId)
        return res.status(200).json(new ApiResponse<IUser>(user.getUserForFrontend()))
    } catch (error) {
        return next(new ApiError('USER_NOT_FOUND', 404))
    }
})