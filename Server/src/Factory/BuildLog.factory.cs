using System.Linq;
using System.Collections.Generic;
using Helper;
using BuildLogger_DB_Context;
using Error_Factory;

namespace BuildLog_Factory
{   

    public class BuildLogFactory
    {
        private BuildLoggerContext db = new BuildLoggerContext();
        private ErrorFactory errorFactory = new ErrorFactory();
        public ServerResult<BuildLog> create(BuildLog entity, bool withMsg = true) 
        {
            ServerResult<BuildLog> sr = passCreateGurd(entity);
            if (!sr.success)
            {
                return sr;
            } 
            if (sr.result.id == null ) {
                sr.result.id = Helper.Helper.RandomId();
            } else  {
                sr = getByUniqueParams(entity, withMsg);
                if(sr.success) {
                    sr.error.addMessage(HttpError.entityExist, withMsg);
                    sr.fail();
                } else {
                    sr.succeed();
                }
            }
            ServerResult<Error> newErrorSR = errorFactory.getOrCreate(sr.result.error, true);
            sr = sr.contatenate<BuildLog, Error> (sr, newErrorSR);
            sr.result.buildStatus=sr.result.buildStatus;
            if ( !sr.success) {
                return sr;
            }

            db.Add(BuildLog.toRef(sr.result));
            db.SaveChanges();                
            return sr;
        }


        public ServerResult<BuildLog> getByUniqueParams(BuildLog entity, bool withMsg = false)
        {   
            ServerResult<BuildLog> sr = ServerResult<BuildLog>.create();
            if (entity.id != null) 
            {
                return getById(entity.id, withMsg);
            }
            string[] parameter = {"id"};
            sr.error.addMessage(Helper.HttpError.getNoUniqueParameter("BuildLog", parameter ));
            sr.fail();
            return sr;
        }
        
        public static BuildLog defaultBuildLog()
        {
            BuildLog newBuildLog = new BuildLog();
            newBuildLog.error = new Error();
            newBuildLog.buildStatus = BuildStatus.None;
            return newBuildLog;

        }

        public ServerResult<BuildLog> getOrCreate(BuildLog buildLog, bool withMsg = false )
        {
            ServerResult<BuildLog> sr = getById(buildLog.id);
            if (sr.success) {
                return sr; 
            } else{
                return create(buildLog, withMsg);
            } 
        }

        public ServerResult<List<BuildLog>> search(BuildLog buildLog, bool withMsg = false)
        {
                ServerResult<List<BuildLog>> sr = ServerResult<List<BuildLog>>.create();
                var buildLogList = db.BuildLog.Where(b => b.id == buildLog.id);
                if (buildLogList.Count() == 0)
                {   
                    sr.error.addMessage(HttpError.getNoTableEntryForValue(TabelList.BuildLog, "id", "name"), withMsg);
                    sr.fail();
                } else 
                {
                    // sr.result = buildLogList.ToList();
                }
                return sr;
        }
        public ServerResult<BuildLog> getById(string id, bool withMsg = true)
        {
            ServerResult<BuildLog> sr = ServerResult<BuildLog>.create();
            if (id == null) {
                sr.error.addMessage(HttpError.getIdNotExist(TabelList.BuildLog, id ), withMsg);
                sr.fail();
                return sr;
            }
            try{
                sr.result = toBuildLog(db.BuildLog.Find(id));
            } catch { 
                sr.error.addMessage(HttpError.getIdNotExist(TabelList.BuildLog, id ), withMsg);
                sr.fail();
            }
            return sr;
        }

        public ServerResult<BuildLog> deleteById(string id, bool withMsg = true)
        {
            ServerResult<BuildLog> sr = getById(id);
            if (sr.success)
            {
                // sr.result.error = null;
                db.Remove(db.BuildLog.Find(sr.result.id));  
                db.SaveChanges();
            } else 
            {
                sr.error.addMessage(HttpError.getIdNotExist(TabelList.BuildLog, id.ToString() ), withMsg);
            }
            return sr;
        }

        public  ServerResult<BuildLog> passCreateGurd(BuildLog entity) {
            ServerResult<BuildLog> sr =  ServerResult<BuildLog>.create();
            sr.result = defaultBuildLog();
            sr.result = entity;

            if (sr.result== null) 
            {
                sr.error.addMessage(HttpError.getProvideNoEntity(TabelList.BuildLog));
                sr.fail();
                return sr;
            }
            if (sr.result.buildStatus == null) {
                sr.error.addMessage(HttpError.getFieldsNotProvidedForTable(TabelList.BuildLog, "builsStatus"));
                sr.fail();
            } 
            if (sr.result.error == null) {
                sr.error.addMessage(HttpError.getFieldsNotProvidedForTable(TabelList.BuildLog, "Error"));
                sr.fail();
            } 
            return sr;
        }

        public BuildLog toBuildLog(BuildLogRef entityRef){
            BuildLog entity = new BuildLog();
            entity.id = entityRef.id;
            entity.description = entityRef.description;
            entity.error = errorFactory.getById(entityRef.errorId, true).result;
            return entity;
        }
    }
}
