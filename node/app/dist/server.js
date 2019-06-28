"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const UserCoeHandler_1 = require("./COE/UserCoeHandler");
const authKeeper_1 = require("./DataBase/Authentication/authKeeper");
const FileUpdater_1 = require("./StorageHandling/FileUpdater");
const ProjectDataHandler_1 = require("./StorageHandling/ProjectDataHandler");
const ProjectUploadHandler_1 = require("./StorageHandling/ProjectUploadHandler");
const CoeHandler_1 = require("./COE/CoeHandler");
const authenticationHandler_1 = require("./DataBase/Authentication/authenticationHandler");
const MMCreator_1 = require("./MM/MMCreator");
const SystemSettings_1 = require("./SystemSettings");
const UserElement_1 = require("./UserElement");
const ProjectsDataHandler_1 = require("./StorageHandling/ProjectsDataHandler");
const FMUdescriptionHandler_1 = require("./FMU/FMUdescriptionHandler");
const express = require('express');
const cors = require('cors');
const multer = require('multer');
var fs = require('file-system');
userCoeHandler: UserCoeHandler_1.UserCoeHandler;
authKeeper: authKeeper_1.AuthKeeper;
authenticationHandler: authenticationHandler_1.AuthenticationHandler;
const upload = multer({
    storage: ProjectUploadHandler_1.ProjectUploadHandler.getUploadFileHandler(SystemSettings_1.Settings.destinationFolder, SystemSettings_1.Settings.systemseperator, SystemSettings_1.Settings.filesplitter),
});
const app = express();
app.use(cors());
app.listen(3000, () => {
    console.log('Server started! on port 3000');
    this.userCoeHandler = new UserCoeHandler_1.UserCoeHandler();
    this.authKeeper = new authKeeper_1.AuthKeeper();
    this.authenticationHandler = new authenticationHandler_1.AuthenticationHandler();
});
app.get('/', (req, res) => res.send('Hello World!'));
/*
app.route(Routes.UploadProject).post(
    upload.array('file'), (req: any, res: any) => {
        console.log(req);
        res.send(200, {"File received ": req.files.originalname});
    });*/
app.route(SystemSettings_1.Routes.UploadProject).post(upload.array('file'), (req, res) => {
    res.send(200, { "File received ": req.files.originalname });
    //Unpack model descriptions
    ProjectUploadHandler_1.ProjectUploadHandler.AsyncFmuCrawler(req.body.username, req.body.project, new ProjectDataHandler_1.ProjectDataHandler(req.body, res, new UserElement_1.UserElement(req, res)).getFMUs());
});
app.route(SystemSettings_1.Routes.UserLogin).post(upload.array('body'), (req, res) => {
    this.authenticationHandler.login(this.authKeeper, res, req.body.username, req.body.password);
});
app.route(SystemSettings_1.Routes.UserSignup).post(upload.array('body'), (req, res) => {
    this.authenticationHandler.signup(this.authKeeper, res, req.body.username, req.body.password);
});
app.route(SystemSettings_1.Routes.UserSignout).post(upload.array('body'), (req, res) => {
    this.authenticationHandler.signOut(this.authKeeper, res, req.body.uid);
});
app.route(SystemSettings_1.Routes.UserPassReset).post(upload.array('body'), (req, res) => {
    this.authenticationHandler.resetPassword(res, req.body.email);
});
app.route(SystemSettings_1.Routes.GetListOfProjectFiles).post(upload.array('body'), (req, res) => {
    new ProjectDataHandler_1.ProjectDataHandler(req.body, res, new UserElement_1.UserElement(req, res)).handle();
});
app.route(SystemSettings_1.Routes.GetListOfProjects).post(upload.array('body'), (req, res) => {
    new ProjectsDataHandler_1.ProjectsDataHandler(req.body, res, new UserElement_1.UserElement(req, res)).handle();
});
/*TODO: required for desktop not cloud
app.route(Routes.StartCoe).post(
    upload.array('body'), (req: any, res: any) => {
        new CoeHandler(req.body, res, new UserElement(req, res), this.userCoeHandler).StartCoe(8082);
    });*/
app.route(SystemSettings_1.Routes.InitCoSimulation).post(upload.array('body'), (req, res) => {
    new CoeHandler_1.CoeHandler(req.body, res, new UserElement_1.UserElement(req, res), this.userCoeHandler).createSession(8082);
});
app.route(SystemSettings_1.Routes.RunCoSimulation).post(upload.array('body'), (req, res) => {
    new CoeHandler_1.CoeHandler(req.body, res, new UserElement_1.UserElement(req, res), this.userCoeHandler).initCoeOnSession(8082);
});
app.route(SystemSettings_1.Routes.StatusSimulation).post(upload.array('body'), (req, res) => {
    new CoeHandler_1.CoeHandler(req.body, res, new UserElement_1.UserElement(req, res), this.userCoeHandler).getStatus();
});
app.route(SystemSettings_1.Routes.StopCoSimulation).post(upload.array('body'), (req, res) => {
    new CoeHandler_1.CoeHandler(req.body, res, new UserElement_1.UserElement(req, res), this.userCoeHandler).stopSimulation();
});
app.route(SystemSettings_1.Routes.CreateMMFromSysML).post(upload.array('body'), (req, res) => {
    new MMCreator_1.MMCreator(req.body, res, new UserElement_1.UserElement(req, res)).createMMFromSysML();
});
app.route(SystemSettings_1.Routes.CreateCoSimFromMM).post(upload.array('body'), (req, res) => {
    new MMCreator_1.MMCreator(req.body, res, new UserElement_1.UserElement(req, res)).createCoSim();
});
app.route(SystemSettings_1.Routes.GetMMDescription).post(upload.array('body'), (req, res) => {
    new MMCreator_1.MMCreator(req.body, res, new UserElement_1.UserElement(req, res)).getMM();
});
app.route(SystemSettings_1.Routes.GetFMUDescriptions).post(upload.array('body'), (req, res) => {
    new FMUdescriptionHandler_1.FMUDesciptionHandler(req.body, res, new UserElement_1.UserElement(req, res)).getFMUDescription();
});
app.route(SystemSettings_1.Routes.GetCoSimDescription).post(upload.array('body'), (req, res) => {
    new MMCreator_1.MMCreator(req.body, res, new UserElement_1.UserElement(req, res)).getCoSim();
});
app.route(SystemSettings_1.Routes.UpdateFile).post(upload.array('body'), (req, res) => {
    new FileUpdater_1.FileUpdater(req.body, res, new UserElement_1.UserElement(req, res)).handle();
});
//# sourceMappingURL=server.js.map