using System.Linq;
using Helper;
// using BuildLogger_DB_Context;
using BuildLogger_DB_Context;

namespace Error_Factory
{   

    public class ErrorFactory
    {
    //     public ErrorMsg errorMsg = new ErrorMsg();
    //     public Error errorItem;
        private BuildLoggerContext db = new BuildLoggerContext();
        
        public ServerResult<Error> getByUniqueParams(Error entity, bool withMsg = false)
        {   
            ServerResult<Error> sr = ServerResult<Error>.create();
            if (entity.id != null) 
            {
                return getById(entity.id, withMsg);
            }
            if (entity.code != null)
            {
                return getByCode(entity.code, withMsg);
            }
            string[] parameter = {"id", "code"};
            sr.error.addMessage(Helper.HttpError.getNoUniqueParameter("Error", parameter ));
            sr.fail();
            return sr;
        }
        
        public ServerResult<Error> create(Error entity, bool withMsg = true) 
        {
            ServerResult<Error> sr = passCreateGurd(entity);
            if ( !sr.success ) {
                return sr;
            }
            sr = getByUniqueParams(entity, withMsg);
            if (sr.success) 
            {
                sr.error.addMessage(HttpError.entityExist, withMsg);
                sr.fail();
            } else {
                sr.succeed();
                sr.result = entity;
                if (sr.result.id == null ) {
                    sr.result.id = Helper.Helper.RandomId();
                }
                sr.error.addInfo(HttpError.getAddIdIntoTable(TabelList.Error, sr.result.id));
                db.Add(sr.result);
                db.SaveChanges();
            }
            return sr;
        }
        public ServerResult<Error> getOrCreate(Error entity, bool withMsg = false )
        {
            ServerResult<Error> sr = getByUniqueParams(entity, withMsg);
            if (!sr.success ) 
            {
                sr.succeed();
                sr = create(entity);
            }
            return sr; 
        }
        public ServerResult<Error> getByCode(string code, bool withMsg = false)
        {
            ServerResult<Error> sr = ServerResult<Error>.create();
            try {sr.result = db.Error.First(b => b.code == code); }
            catch {
                sr.error.addMessage(HttpError.getNoTableEntryForValue("Error", "code", code), withMsg);
                sr.fail();
            };
            return sr;
        }
        public ServerResult<Error> getById(string id, bool withMsg = true)
        {
            ServerResult<Error> sr = ServerResult<Error>.create();
            try {
                sr.result = db.Error.Find(id);
                if (sr.result == null) {
                    sr.error.addMessage(HttpError.getNoTableEntryForValue(TabelList.Error, "id", id), withMsg);
                    sr.fail();
                } 

            }
            catch {
                sr.error.addMessage(HttpError.getNoTableEntryForValue("Error", "id", id), withMsg);
                sr.fail();
            };
            return sr;
        }

        public ServerResult<Error> deleteById(string id, bool withMsg = true)
        {
            ServerResult<Error> sr  = getById(id, withMsg);
            if (sr.success)
            {
                db.Remove(sr.result);  
                db.SaveChanges();
                sr.error.addInfo(HttpError.getDeleteIdFromTable(TabelList.Error, id));
            }
            return sr;
        }

        public  ServerResult<Error> passCreateGurd(Error entity, bool withMsg = true) {
            ServerResult<Error> sr = ServerResult<Error>.create();
            sr.result = entity; 
            if (sr.result == null) 
            {
                sr.error.addMessage(HttpError.getProvideNoEntity(TabelList.Error), withMsg);
                sr.fail();
                return sr;
            }
            if (sr.result.code == null) {
                sr.error.addMessage(HttpError.getFieldsNotProvidedForTable(TabelList.Error, "Error"), withMsg);
                sr.fail();
            } 
            return sr;
        }
    }
}
