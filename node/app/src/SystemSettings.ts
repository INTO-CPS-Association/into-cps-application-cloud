export enum Settings { 
    filesplitter = '_!_', 
    systemseperator = '/', 
    destinationFolder = 'data/upload',
    Host = 'localhost',
    Port = 3000,
    OriginHost = 'localhost',
    OriginPort = 4200,
    CoeProtocol = 'http://',
    CoePort = ':8082',
   }
export enum Routes {
    UploadProject = '/upload/project', // Upload entire project to provided user
    UploadFile = '/upload/file', // Uploads a file to the provided project, optional: path
    UpdateFile = '/update/file', // Overwrites an existing file in order to update it
    DeleteFile = '/delete/file', // Delete a file with the provided path and name
    RenameFile = '/rename/file', // Rename a file with the provided path and name
    RenameProject = '/rename/project', // Rename a proejct with the provided name
    DeleteProject = '/delete/project', // Delete a Project with the provided name
    CreateProject = '/create/project', // Create a new Empty project on with the provided name
    GetListOfProjects = '/list/projects', // Return a list of project names
    GetListOfProjectFiles = '/list/project', // Returns a list of files for the provided projectname
    StartCoe = '/coe/start', // Starts a COE instance
    InitCoSimulation = '/coe/init', // Start a Co-Simulation
    RunCoSimulation = '/coe/run', // Start a Co-Simulation
    StatusSimulation = '/coe/status', // Start a Co-Simulation
    StopCoSimulation = '/coe/stop', // Stops a Co-Simulation
    GetCoSimulationStatus = '/coe/active', // Return if a COE is available
    GetActiveCoSimulationStatus = '/coe/log', // Return The COE log, COE console, graph data, process data 
    CreateMMFromSysML = '/mm/create', // Create a MM file from the provided SysMLFile
    GetMMDescription = '/mm/get', // Return the MM with the FMU desciptions in order to create the form on the client-side
    CreateCoSimFromMM = '/cosim/create', // Create a default CoSim file for the provided MM
    GetCoSimDescription = '/cosim/get', // Return the CoSim with the FMU desciptions in order to create the form on the client-side
    GetFMUDescriptions = '/fmus/get', // Return the CoSim with the FMU desciptions in order to create the form on the client-side
    UserLogin = '/login', // Return the users token allowing the user to interact with the platform
    UserSignup = '/signup', // Return the users token allowing the user to interact with the platform
    UserSignout = '/signout', // Return the users token allowing the user to interact with the platform
    UserPassReset = '/passwordReset', // Return the users token allowing the user to interact with the platform
    GitPull = '/git/pull', // Make a Git Fetch->Git Pull on a provided branch and git user arthentication 
    GitPush = '/git/push', // Make a Git Push on a provided branch and git user arthentication 
    GitBranch = '/git/branch', // Change a branch for a project, provided branchname, git authentication, git repository
    GetProjectSettings = '/project/settings', // Returns the list of settings for a given project
    GetDownloadManager = '/downloadmanager', // Returns JSON of the downloadmanager
    GetListOfExapleProjects = '/exampleprojects/list', // Returns JSON of Example Proejcts
    GetExampleProejct = '/exampleprojects/get', // Create new project, GIT PULL the provided example project
    ExportSourceCodeFMU = '/export/fmu/sourcecode', //
    ExportToolWrapperFMU = '/export/fmu/toolwrapper', // 
    GetTraceDaemonLog = '/tracedaemon/log', // 
    GetDSEDescription = '/dse/get', // 
    CreateDSE = '/dse/create', // 
}
export class ReturnCodes{
    static Unauthorized = ()=>{ return {code: 401, message: {"Error ": 'Unauthorized'}} };
    static ForbiddenTask = ()=>{ return {code: 403, message: {"Error ": 'Forbidden'}} };
    static MMWithoutFMU = ()=>{ return {code: 400, message: {"Error ": 'FMU is missing from selected MM'}} };
    static ProjectNotFound = ()=>{ return {code: 404, message: {"Error ": 'Selected project is not found'}} };
    static FileNotFound = ()=>{ return {code: 404, message: {"Error ": 'Selected file is not found'}} };
    static PayloadTooLarge = ()=>{ return {code: 413, message: {"Error ": ' Payload Too Large'}} };
    static TooManyRequests = ()=>{ return {code: 429, message: {"Error ": ' Too Many Requests'}} };
}
