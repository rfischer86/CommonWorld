using System;
using Helper;
using Auth_DB_Context;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using Microsoft.IdentityModel.Tokens;
using WebApi.Helpers;

namespace User_Factory
{   
    public class UserFactory
    {
        private AuthContext db = new AuthContext();
        
        public ServerResult<User> getByUniqueParams(User entity, bool withMsg = true)
        {   
            ServerResult<User> sr = ServerResult<User>.create();
            if (entity.apiId != null) 
            {
                return getById(entity.apiId, withMsg);
            }
            if (entity.email != null) 
            {
                return getByEmail(entity.email, withMsg);
            }
            string[] parameter = {"id"};
            sr.error.addMessage(Helper.HttpError.getNoUniqueParameter("User", parameter ));
            sr.fail();
            return sr;
        }
        
        public ServerResult<User> create(User entity, bool withMsg = true) 
        {
            ServerResult<User> sr = passCreateGurd(entity);
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
                sr.result = new User();
                sr.result.apiId = entity.apiId;
                if (sr.result.apiId == null ) {
                    sr.result.apiId = Helper.Helper.RandomId();
                }
                sr.result.name = entity.name;
                sr.result.email = entity.email;
                sr.result.password = entity.password;
                sr.error.addInfo(HttpError.getAddIdIntoTable(TabelList.User, sr.result.apiId));
                db.Add(sr.result);
                db.SaveChanges();
            }
            return sr;
        }


        public ServerResult<User> update(User entity, bool withMsg = true) 
        {
            ServerResult<User> sr = passCreateGurd(entity);
            if ( !sr.success ) {
                return sr;
            }
            User result;
            result = db.User.Find(entity.apiId);
            if (result == null ) {
                sr.error.addMessage(HttpError.getNoTableEntryForValue("User", "id", entity.apiId), withMsg);
                sr.fail();
                return sr;
            }
            sr.error.addInfo(HttpError.getAddIdIntoTable(TabelList.User, sr.result.apiId));
            db.Update(result);
            db.SaveChanges();
            sr.result = result;
            return sr;
        }

        public ServerResult<User> search(User entity, bool withMsg = true) 
        {
            ServerResult<User> sr = passCreateGurd(entity);
            if ( !sr.success ) {
                return sr;
            }
            User result;
            Helper.Helper.print("TODO: implement search");
            result = db.User.Find(entity.apiId);
            if (result == null ) {
                sr.error.addMessage(HttpError.getNoTableEntryForValue("User", "id", entity.apiId), withMsg);
                sr.fail();
                return sr;
            }
            sr.result = result;
            return sr;
        }

        public ServerResult<User> getOrCreate(User entity, bool withMsg = false )
        {
            ServerResult<User> sr = getByUniqueParams(entity, withMsg);
            if (!sr.success ) 
            {
                sr.succeed();
                sr = create(entity);
            }
            return sr; 
        }
        public ServerResult<User> getById(string id, bool withMsg = true)
        {
            ServerResult<User> sr = ServerResult<User>.create();
            try{
                sr.result = db.User.Find(id);
                if (sr.result == null) {
                    sr.error.addMessage(HttpError.getNoTableEntryForValue(TabelList.User, "id", id), withMsg);
                    sr.fail();
                } 
            } catch {
                sr.error.addMessage(HttpError.getNoTableEntryForValue(TabelList.User, "id", id), withMsg);
                sr.fail();
                return sr;
            }; 
            return sr;
        }
        public ServerResult<User> getByEmail(string email, bool withMsg = true)
        {
            ServerResult<User> sr = ServerResult<User>.create();
            try{
                sr.result = db.User.Where(el => el.email == email).First();
            } catch {
                sr.error.addMessage(HttpError.getNoTableEntryForValue(TabelList.User, "email", email), withMsg);
                sr.fail();
                return sr;
            }; 
            return sr;
        }
        public ServerResult<User> deleteById(string id, bool withMsg = true)
        {
            ServerResult<User> sr  = getById(id, withMsg);
            if (sr.success)
            {   
                try{
                    sr.result = db.User.Find(id);
                    db.Remove(sr.result);
                    db.SaveChanges();
                    sr.error.addInfo(HttpError.getDeleteIdFromTable(TabelList.User, id));
                } catch {
                    sr.error.addInfo(HttpError.getIdNotExist(TabelList.User, id));
                }
            }
            return sr;
        }

        public  ServerResult<User> passCreateGurd(User entity, bool withMsg = true) {
            ServerResult<User> sr = ServerResult<User>.create();
            sr.result = entity; 
            if (sr.result == null) 
            {
                sr.error.addMessage(HttpError.getProvideNoEntity(TabelList.User), withMsg);
                sr.fail();
                return sr;
            }
            if (sr.result.email == null) 
            {
                sr.error.addMessage(HttpError.getFieldsNotProvidedForTable(TabelList.User, "email"), withMsg);
                sr.fail();
                return sr;
            }
            return sr;
        }
    }
}
