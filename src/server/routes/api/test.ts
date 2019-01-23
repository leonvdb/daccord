//To be deleted after review
import * as express from 'express';
import { ApiResponse } from '../../utilities/ApiResponse';
const router = express.Router();


//@route    GET api/test
//@desc     Test route
//@access   Public
router.get('/', (req, res) => res.json(new ApiResponse({ test: "success" })));

export default router;