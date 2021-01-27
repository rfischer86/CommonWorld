using System.Linq;
using Helper;
// using BuildLogger_DB_Context;
using BuildLogger_DB_Context;
using System.Collections.Generic;

namespace Text_Factory
{   

    public class TextFactory
    {
        private BuildLoggerContext db = new BuildLoggerContext();
        
        public ServerResult<Text> getByUniqueParams(Text entity, bool withMsg = false)
        {   
            ServerResult<Text> sr = ServerResult<Text>.create();
            if (entity.apiId != null) 
            {
                return getById(entity.apiId, withMsg);
            }
            string[] parameter = {"id"};
            sr.error.addMessage(Helper.HttpError.getNoUniqueParameter("Text", parameter ));
            sr.fail();
            return sr;
        }
        
        public ServerResult<Text> create(Text entity, bool withMsg = true) 
        {
            ServerResult<Text> sr = passCreateGurd(entity);
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
                sr.result = new Text();
                if (sr.result.apiId == null ) {
                    sr.result.apiId = Helper.Helper.RandomId();
                }
                sr.result.contentData = entity.contentData;
                sr.result.apiId = entity.apiId;
                sr.error.addInfo(HttpError.getAddIdIntoTable(TabelList.Text, sr.result.apiId));
                db.Add(sr.result);
                db.SaveChanges();
            }
            return sr;
        }


        public ServerResult<Text> update(Text entity, bool withMsg = true) 
        {
            
            using(BuildLoggerContext db = new BuildLoggerContext()){

                ServerResult<Text> sr = passCreateGurd(entity);
                if ( !sr.success ) {
                    return sr;
                }
                sr = sr.contatenate( sr, getOrCreate(entity));
                if (sr.result == null ) {
                    sr.error.addMessage(HttpError.getNoTableEntryForValue(TabelList.Text, "id", entity.apiId), withMsg);
                    sr.fail();
                    return sr;
                }
                sr.result.contentData = entity.contentData;
                sr.error.addInfo(HttpError.getAddIdIntoTable(TabelList.Text, sr.result.apiId));
                db.Update(sr.result);
                db.SaveChanges();
                Helper.Helper.printObject(sr);
                return sr;
            }
        }

        public ServerResult<Text> removeTextItem (string parentId, string childId,  bool withMsg = true) {
            ServerResult<Text> sr = ServerResult<Text>.create();
            Text parent_entity = db.Text.Find(parentId); 
            Text child_entity = db.Text.Find(childId);
            if (parent_entity == null) {
                sr.fail();
                sr.result = parent_entity;
                sr.error.addMessage(HttpError.idNotExist);
            } 
            if (child_entity == null) {
                sr.fail();
                sr.error.addMessage(HttpError.idNotExist);
            } 
            if (!sr.success) {
                return sr;
            }
            
            sr.result = parent_entity;
            db.SaveChanges();
            return sr;
        } 

        public ServerResult<Text> getOrCreate(Text entity, bool withMsg = false )
        {
            using(BuildLoggerContext db = new BuildLoggerContext()){
                ServerResult<Text> sr = getByUniqueParams(entity, withMsg);
                if (!sr.success ) 
                {
                    sr.succeed();
                    sr = create(entity);
                }
                return sr; 
            }
        }
        public ServerResult<Text> getById(string id, bool withMsg = true, int deeps = 5)
        {
            ServerResult<Text> sr = ServerResult<Text>.create();
            sr.result = db.Text.Find(id);
            if (sr.result == null ) {
                sr.error.addMessage(HttpError.getNoTableEntryForValue(TabelList.Text, "id", id), withMsg);
                sr.fail();
                return sr;
            };
            return sr;
        }

        public ServerResult<Text> deleteById(string id, bool withMsg = true)
        {
            ServerResult<Text> sr  = getById(id, withMsg);
            if (sr.success)
            {   
                    sr.result = db.Text.Find(id);
                    Helper.Helper.print("TO DO: implemnt delete cascade");
                    db.Remove(sr.result);
                    db.SaveChanges();
                    sr.error.addInfo(HttpError.getDeleteIdFromTable(TabelList.Text, id));
            } else {
                sr.error.addInfo(HttpError.getDeleteReduceReferencCount(TabelList.Text, id));
            }
            return sr;
        }
        public  ServerResult<Text> passCreateGurd(Text entity, bool withMsg = true) {
            ServerResult<Text> sr = ServerResult<Text>.create();
            sr.result = entity; 
            if (sr.result == null) 
            {
                sr.error.addMessage(HttpError.getProvideNoEntity(TabelList.Text), withMsg);
                sr.fail();
                return sr;
            }
            return sr;
        }
    }
}
