import {Router} from 'express';
const router = Router();

import{getAllCourses, getLecturesByCourseId, createCourse, updateCourse, removeCourseLecturesById, addLecturesToCourseById} from '../controller/course.controller.js'
import { authorizedRoles, authorizedSubscriber, isLoggedIn } from '../middlewares/auth.middleware.js';
import upload from '../middlewares/multer.middleware.js'

// Define course-related routes here
router.route('/')
    .get(getAllCourses)
    .post(
        isLoggedIn, 
        authorizedRoles('ADMIN'),
        upload.single('thumbnail'), createCourse
    );
    

router.route("/:id")
    .get(isLoggedIn, 
        authorizedSubscriber,
        getLecturesByCourseId)
    .put(isLoggedIn,
        authorizedRoles('ADMIN'),
        updateCourse)
    .delete(isLoggedIn,
        authorizedRoles('ADMIN'),
        removeCourseLecturesById)
    .post(
        isLoggedIn,
        authorizedRoles('ADMIN'),
        upload.single('lecture'),
        addLecturesToCourseById
    )
// router.post("", );


export default router;