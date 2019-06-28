import {UserCoeHandler} from "./COE/UserCoeHandler";
import {AuthKeeper} from "./DataBase/Authentication/authKeeper";
import {FileUpdater} from "./StorageHandling/FileUpdater";
import {ProjectDataHandler} from "./StorageHandling/ProjectDataHandler";
import {ProjectUploadHandler} from './StorageHandling/ProjectUploadHandler';
import {CoeHandler} from './COE/CoeHandler';
import {AuthenticationHandler} from './DataBase/Authentication/authenticationHandler';
import {MMCreator} from './MM/MMCreator';
import {Settings, Routes} from './SystemSettings';
import {UserElement} from './UserElement';
import {ProjectsDataHandler} from "./StorageHandling/ProjectsDataHandler";
import {FMUDesciptionHandler} from "./FMU/FMUdescriptionHandler";

const express = require('express');
const cors = require('cors');
const multer = require('multer');
var fs = require('file-system');
userCoeHandler: UserCoeHandler;
authKeeper: AuthKeeper;
authenticationHandler: AuthenticationHandler;

const upload = multer({
    storage: ProjectUploadHandler.getUploadFileHandler(
        Settings.destinationFolder,
        Settings.systemseperator,
        Settings.filesplitter,
    ),
});

const app = express();

app.use(cors());

app.listen(3000, () => {
    console.log('Server started! on port 3000');
    this.userCoeHandler = new UserCoeHandler();
    this.authKeeper = new AuthKeeper();
    this.authenticationHandler = new AuthenticationHandler();
});


app.get('/', (req: any, res: any) => res.send('Hello World!'))
/*
app.route(Routes.UploadProject).post(
    upload.array('file'), (req: any, res: any) => {
        console.log(req);
        res.send(200, {"File received ": req.files.originalname});
    });*/

app.route(Routes.UploadProject).post(
    upload.array('file'), (req: any, res: any) => {
        res.send(200, {"File received ": req.files.originalname});
        //Unpack model descriptions
        ProjectUploadHandler.AsyncFmuCrawler(
            req.body.username,
            req.body.project,
            new ProjectDataHandler(req.body, res, new UserElement(req, res)).getFMUs(),
        );
    });
app.route(Routes.UserLogin).post(
    upload.array('body'), (req: any, res: any) => {
        this.authenticationHandler.login(this.authKeeper, res, req.body.username, req.body.password);
    });
app.route(Routes.UserSignup).post(
    upload.array('body'), (req: any, res: any) => {
        this.authenticationHandler.signup(this.authKeeper, res, req.body.username, req.body.password);
    });
app.route(Routes.UserSignout).post(
    upload.array('body'), (req: any, res: any) => {
        this.authenticationHandler.signOut(this.authKeeper, res, req.body.uid);
    });
app.route(Routes.UserPassReset).post(
    upload.array('body'), (req: any, res: any) => {
        this.authenticationHandler.resetPassword(res, req.body.email);
    });
app.route(Routes.GetListOfProjectFiles).post(
    upload.array('body'), (req: any, res: any) => {
        new ProjectDataHandler(req.body, res, new UserElement(req, res)).handle();
    });
app.route(Routes.GetListOfProjects).post(
    upload.array('body'), (req: any, res: any) => {
        new ProjectsDataHandler(req.body, res, new UserElement(req, res)).handle();
    });
/*TODO: required for desktop not cloud
app.route(Routes.StartCoe).post(
    upload.array('body'), (req: any, res: any) => {
        new CoeHandler(req.body, res, new UserElement(req, res), this.userCoeHandler).StartCoe(8082);
    });*/
app.route(Routes.InitCoSimulation).post(
    upload.array('body'), (req: any, res: any) => {
        new CoeHandler(req.body, res, new UserElement(req, res), this.userCoeHandler).createSession(8082);
    });
app.route(Routes.RunCoSimulation).post(
    upload.array('body'), (req: any, res: any) => {
        new CoeHandler(req.body, res, new UserElement(req, res), this.userCoeHandler).initCoeOnSession(8082);
    });
app.route(Routes.StatusSimulation).post(
    upload.array('body'), (req: any, res: any) => {
        new CoeHandler(req.body, res, new UserElement(req, res), this.userCoeHandler).getStatus();
    });
app.route(Routes.StopCoSimulation).post(
    upload.array('body'), (req: any, res: any) => {
        new CoeHandler(req.body, res, new UserElement(req, res), this.userCoeHandler).stopSimulation();
    });
app.route(Routes.CreateMMFromSysML).post(
    upload.array('body'), (req: any, res: any) => {
        new MMCreator(req.body, res, new UserElement(req, res)).createMMFromSysML();
    });
app.route(Routes.CreateCoSimFromMM).post(
    upload.array('body'), (req: any, res: any) => {
        new MMCreator(req.body, res, new UserElement(req, res)).createCoSim();
    });
app.route(Routes.GetMMDescription).post(
    upload.array('body'), (req: any, res: any) => {
        new MMCreator(req.body, res, new UserElement(req, res)).getMM();
    });
app.route(Routes.GetFMUDescriptions).post(
    upload.array('body'), (req: any, res: any) => {
        new FMUDesciptionHandler(req.body, res, new UserElement(req, res)).getFMUDescription();
    });
app.route(Routes.GetCoSimDescription).post(
    upload.array('body'), (req: any, res: any) => {
        new MMCreator(req.body, res, new UserElement(req, res)).getCoSim();
    });
app.route(Routes.UpdateFile).post(
    upload.array('body'), (req: any, res: any) => {
        new FileUpdater(req.body, res, new UserElement(req, res)).handle();
    });
