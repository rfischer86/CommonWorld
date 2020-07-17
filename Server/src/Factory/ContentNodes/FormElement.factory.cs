using System.Linq;
using Helper;
// using BuildLogger_DB_Context;
using BuildLogger_DB_Context;
using System.Collections.Generic;

namespace FormElement_Factory
{   

    public class FormElementFactory
    {
        private BuildLoggerContext db = new BuildLoggerContext();
        public ServerResult<FormElement> getByUniqueParams(FormElement entity, bool withMsg = false)
        {   
            ServerResult<FormElement> sr = ServerResult<FormElement>.create();
            if (entity.apiId != null) 
            {
                return getById(entity.apiId, withMsg);
            }
            string[] parameter = {"id"};
            sr.error.addMessage(Helper.HttpError.getNoUniqueParameter(TabelList.FormElement, parameter ));
            sr.fail();
            return sr;
        }
        
        public ServerResult<FormElement> create(FormElement entity, bool withMsg = true) 
        {
            ServerResult<FormElement> sr = passCreateGurd(entity);
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
                sr.result = new FormElement();
                if (sr.result.apiId == null ) {
                    sr.result.apiId = Helper.Helper.RandomId();
                }
                sr.result.apiId = entity.apiId;
                sr.error.addInfo(HttpError.getAddIdIntoTable(TabelList.FormElement, sr.result.apiId));
                db.Add(sr.result);
                db.SaveChanges();
            }
            return sr;
        }


        public ServerResult<FormElement> update(FormElement entity, bool withMsg = true) 
        {           
            Helper.Helper.printObject(entity);
            using(BuildLoggerContext db = new BuildLoggerContext()){

                ServerResult<FormElement> sr = passCreateGurd(entity);
                if ( !sr.success ) {
                    return sr;
                }
                sr = sr.contatenate( sr, getOrCreate(entity));
                if (sr.result == null ) {
                    sr.error.addMessage(HttpError.getNoTableEntryForValue(TabelList.Form, "id", entity.apiId), withMsg);
                    sr.fail();
                    return sr;
                }
                sr.result.label = entity.label;
                sr.result.version = entity.version;
                sr.result.value = entity.value;
                sr.result.description = entity.description;
                sr.result.formType = entity.formType;
                sr.error.addInfo(sr.result.apiId);
                sr.error.addInfo(HttpError.getUpdateEntityOfId(TabelList.FormElement, sr.result.apiId));
                db.Update(sr.result);
                db.SaveChanges();
                Helper.Helper.printObject(sr);
                return sr;
            }
        }
        public ServerResult<FormElement> removeentityItem (string parentId, string childId,  bool withMsg = true) {
            ServerResult<FormElement> sr = ServerResult<FormElement>.create();
            FormElement parent_entity = db.FormElement.Find(parentId); 
            FormElement child_entity = db.FormElement.Find(childId);
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

        public ServerResult<FormElement> getOrCreate(FormElement entity, bool withMsg = false )
        {
            using(BuildLoggerContext db = new BuildLoggerContext()){
                ServerResult<FormElement> sr = getByUniqueParams(entity, withMsg);
                if (!sr.success ) 
                {
                    sr.succeed();
                    sr = create(entity);
                }
                return sr; 
            }
        }
        public ServerResult<FormElement> getById(string id, bool withMsg = true, int deeps = 5)
        {
            ServerResult<FormElement> sr = ServerResult<FormElement>.create();
            sr.result = db.FormElement.Find(id);
            if (sr.result == null ) {
                sr.error.addMessage(HttpError.getNoTableEntryForValue(TabelList.FormElement, "id", id), withMsg);
                sr.fail();
                return sr;
            };
            return sr;
        }
        public ServerResult<FormElement> deleteById(string id, bool withMsg = true)
        {
            ServerResult<FormElement> sr  = getById(id, withMsg);
            if (sr.success)
            {   
                    sr.result = db.FormElement.Find(id);
                    db.Remove(sr.result);
                    db.SaveChanges();
                    sr.error.addInfo(HttpError.getDeleteIdFromTable(TabelList.FormElement, id));
            } else {
                sr.error.addInfo(HttpError.getDeleteReduceReferencCount(TabelList.FormElement, id));
            }
            return sr;
        }
        public  ServerResult<FormElement> passCreateGurd(FormElement entity, bool withMsg = true) {
            ServerResult<FormElement> sr = ServerResult<FormElement>.create();
            sr.result = entity; 
            string[] parameter = {};
            if (sr.result == null) 
            {
                sr.error.addMessage(HttpError.getProvideNoEntity(TabelList.Form), withMsg);
                sr.fail();
                return sr;
            }
            if (sr.result.version == null) 
            {
                parameter.Append("version");
                sr.fail();
                return sr;
            }
            if (sr.result.label == null) 
            {
                parameter.Append("label");
                sr.fail();
                return sr;
            }
            if (!sr.success) {
                sr.error.addMessage(HttpError.getNoEntryForParameter(TabelList.FormElement, parameter), withMsg);
            }
            return sr;
        }
    }
}
