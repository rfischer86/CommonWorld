using System;
using Helper;
using Auth_DB_Context;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using Microsoft.IdentityModel.Tokens;
using WebApi.Helpers;

namespace Group_Factory
{   
    public class GroupFactory
    {
        private AuthContext db = new AuthContext();
        
        public ServerResult<Group> getByUniqueParams(Group entity, bool withMsg = true)
        {   
            ServerResult<Group> sr = ServerResult<Group>.create();
            if (entity.apiId != null) 
            {
                return getById(entity.apiId, withMsg);
            }
            string[] parameter = {"id"};
            sr.error.addMessage(Helper.HttpError.getNoUniqueParameter("Group", parameter ));
            sr.fail();
            return sr;
        }
        
        public ServerResult<Group> create(Group entity, bool withMsg = true) 
        {
            ServerResult<Group> sr = passCreateGurd(entity);
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
                sr.result = new Group();
                sr.result.apiId = entity.apiId;
                if (sr.result.apiId == null ) {
                    sr.result.apiId = Helper.Helper.RandomId();
                }
                sr.result.name = entity.name;
                sr.error.addInfo(HttpError.getAddIdIntoTable(TabelList.Group, sr.result.apiId));
                db.Add(sr.result);
                db.SaveChanges();
            }
            return sr;
        }


        public ServerResult<Group> update(Group entity, bool withMsg = true) 
        {
            ServerResult<Group> sr = passCreateGurd(entity);
            if ( !sr.success ) {
                return sr;
            }
            Group result;
            result = db.Group.Find(entity.apiId);
            if (result == null ) {
                sr.error.addMessage(HttpError.getNoTableEntryForValue("Group", "id", entity.apiId), withMsg);
                sr.fail();
                return sr;
            }
            sr.error.addInfo(HttpError.getAddIdIntoTable(TabelList.Group, sr.result.apiId));
            db.Update(result);
            db.SaveChanges();
            sr.result = result;
            return sr;
        }

        public ServerResult<Group> search(Group entity, bool withMsg = true) 
        {
            ServerResult<Group> sr = passCreateGurd(entity);
            if ( !sr.success ) {
                return sr;
            }
            Group result;
            Helper.Helper.print("TODO: implement search");
            result = db.Group.Find(entity.apiId);
            if (result == null ) {
                sr.error.addMessage(HttpError.getNoTableEntryForValue("Group", "id", entity.apiId), withMsg);
                sr.fail();
                return sr;
            }
            sr.result = result;
            return sr;
        }

        public ServerResult<Group> getOrCreate(Group entity, bool withMsg = false )
        {
            ServerResult<Group> sr = getByUniqueParams(entity, withMsg);
            if (!sr.success ) 
            {
                sr.succeed();
                sr = create(entity);
            }
            return sr; 
        }
        public ServerResult<Group> getById(string id, bool withMsg = true)
        {
            ServerResult<Group> sr = ServerResult<Group>.create();
            try{
                sr.result = db.Group.Find(id);
            } catch {
                sr.error.addMessage(HttpError.getNoTableEntryForValue(TabelList.Group, "id", id), withMsg);
                sr.fail();
                return sr;
            }; 
            return sr;
        }
      
        public ServerResult<Group> deleteById(string id, bool withMsg = true)
        {
            ServerResult<Group> sr  = getById(id, withMsg);
            if (sr.success)
            {   
                try{
                    sr.result = db.Group.Find(id);
                    db.Remove(sr.result);
                    db.SaveChanges();
                    sr.error.addInfo(HttpError.getDeleteIdFromTable(TabelList.Group, id));
                } catch {
                    sr.error.addInfo(HttpError.getIdNotExist(TabelList.Group, id));
                }
            }
            return sr;
        }

        public  ServerResult<Group> passCreateGurd(Group entity, bool withMsg = true) {
            ServerResult<Group> sr = ServerResult<Group>.create();
            sr.result = entity; 
            if (sr.result == null) 
            {
                sr.error.addMessage(HttpError.getProvideNoEntity(TabelList.Group), withMsg);
                sr.fail();
                return sr;
            }
            return sr;
        }
    }
}
