const express = require('express');

const router = express.Router();
const homeController = require("../controllers/homeController");

router.get('/',homeController.allProjects);
router.get('/create-project-page',homeController.createProjectPage);
router.post("/create-project",homeController.createProject);
router.get("/proj/:id",homeController.projectParticular);
router.get('/create-Issue_page/:id',homeController.createIssuePage);
router.post('/create-issue/:id',homeController.createIssue);
router.post('/filter/:id',homeController.filter)

module.exports = router;