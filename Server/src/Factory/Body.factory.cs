using System.Linq;
using Helper;
// using BuildLogger_DB_Context;
using BuildLogger_DB_Context;
using System.Collections.Generic;

namespace Body_Factory
{   

    public class BodyFactory
    {
        private BuildLoggerContext db = new BuildLoggerContext();
        
        public ServerResult<Nav> getByUniqueParams(Nav entity, bool withMsg = false)
        {   
            ServerResult<Nav> sr = ServerResult<Nav>.create();
            if (entity.apiId != null) 
            {
                return getById(entity.apiId, withMsg);
            }
            string[] parameter = {"id"};
            sr.error.addMessage(Helper.HttpError.getNoUniqueParameter("Nav", parameter ));
            sr.fail();
            return sr;
        }
        
        public ServerResult<Nav> create(Nav entity, bool withMsg = true) 
        {
            ServerResult<Nav> sr = passCreateGurd(entity);
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
                sr.result = new Nav();
                if (sr.result.apiId == null ) {
                    sr.result.apiId = Helper.Helper.RandomId();
                }
                sr.result.link = entity.link;
                sr.result.type = entity.type;
                sr.result.name = entity.name;
                sr.result.apiId = entity.apiId;
                // sr.result.navParents = new List<NavNav>();
                sr.error.addInfo(HttpError.getAddIdIntoTable(TabelList.Nav, sr.result.apiId));
                db.Add(sr.result);
                db.SaveChanges();
            }
            return sr;
        }


        public ServerResult<Nav> update(Nav entity, bool withMsg = true) 
        {
            ServerResult<Nav> sr = passCreateGurd(entity);
            if ( !sr.success ) {
                return sr;
            }
            Nav result;
            result = db.Nav.Find(entity.apiId);
            if (result == null ) {
                sr.error.addMessage(HttpError.getNoTableEntryForValue("Nav", "id", entity.apiId), withMsg);
                sr.fail();
                return sr;
            }
            result.name = entity.name;
            result.link = entity.link;
            sr.error.addInfo(HttpError.getAddIdIntoTable(TabelList.Nav, sr.result.apiId));
            db.Update(result);
            db.SaveChanges();
            sr.result = result;
            return sr;
        }

        public ServerResult<Nav> addNavItem(string parentId, string childId, int index,  bool withMsg = true) {
            ServerResult<Nav> sr = ServerResult<Nav>.create();
            Nav parent_entity = db.Nav.Find(parentId); 
            Nav child_entity = db.Nav.Find(childId);
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
            NavNav navLink = new NavNav();
            navLink.child = child_entity;
            navLink.parent = parent_entity;
            navLink.child_API_Id = child_entity.apiId;
            navLink.parent_API_Id = parent_entity.apiId;
            // if (sr.result.navParents == null ){ sr.result.navParents = new List<NavNav>(); }
            // child_entity.navParents.Add(navLink);
            // parent_entity.navParents.Add(navLink);
            // if (sr.result.navData == null ){ sr.result.navData = new List<NavNav>(); }
            // child_entity.navData.Add(navLink);
            // parent_entity.navData.Add(navLink);
            sr.result = parent_entity;
            db.Add(navLink);
            db.Update(parent_entity);
            db.SaveChanges();
            return sr;
        } 

        public ServerResult<Nav> removeNavItem (string parentId, string childId,  bool withMsg = true) {
            ServerResult<Nav> sr = ServerResult<Nav>.create();
            Nav parent_entity = db.Nav.Find(parentId); 
            Nav child_entity = db.Nav.Find(childId);
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
            try{
                NavNav navLink = db.NavNav
                    .Where(el => el.child_API_Id == childId)
                    .Where(el =>   el.parent_API_Id == parentId)
                    .First();
                db.Remove(navLink);
                db.SaveChanges();
                sr.error.addMessage("Remove Link from Table NavNav.");
            } catch {
                sr.error.addMessage("Can not remove Link from Table NavNav.");
            }
            try{
                int childLinks = db.NavNav
                    .Count(el => el.parent_API_Id == childId);
                if (childLinks == 0) {
                    db.Remove(child_entity);
                    sr.error.addMessage("Remove entity from Table Nav.");
                }
                db.SaveChanges();
            } catch {}

            sr.result = parent_entity;
            db.SaveChanges();
            return sr;
        } 

        public ServerResult<Nav> getOrCreate(Nav entity, bool withMsg = false )
        {
            ServerResult<Nav> sr = getByUniqueParams(entity, withMsg);
            if (!sr.success ) 
            {
                sr.succeed();
                sr = create(entity);
            }
            return sr; 
        }
        public ServerResult<Nav> getById(string id, bool withMsg = true, int deeps = 5)
        {
            ServerResult<Nav> sr = ServerResult<Nav>.create();
            sr.result = db.Nav.Find(id);
            if (sr.result == null ) {
                sr.error.addMessage(HttpError.getNoTableEntryForValue("NavNav", "id", id), withMsg);
                sr.fail();
                return sr;
            };
            try {                
                sr.result.navData = db.NavNav
                    .Where(el => el.parent_API_Id == id)
                    .Select(el => el.child)
                    .ToList();

                int index = 0;
                foreach (Nav navEl in sr.result.navData) {
                    ServerResult<Nav> sr_sub = ServerResult<Nav>.create();
                    sr_sub = getById(navEl.apiId, true, deeps -1);
                    sr.result.navData[index].navData = sr_sub.result.navData;
                    sr = sr.contatenate<Nav, Nav>(sr, sr_sub);
                    index += 1;
                }
            } catch {
                sr.result.navData = new List<Nav>();
            }
            return sr;
        }

        public ServerResult<Nav> deleteById(string id, bool withMsg = true)
        {
            ServerResult<Nav> sr  = getById(id, withMsg);
            if (sr.success)
            {   
                try {
                    sr.result = db.Nav.Find(id);
                    Helper.Helper.print("TO DO: implemnt delete cascade");
                    db.Remove(sr.result);
                    db.SaveChanges();
                    sr.error.addInfo(HttpError.getDeleteIdFromTable(TabelList.Nav, id));
                } catch {
                    sr.error.addInfo(HttpError.getDeleteReduceReferencCount(TabelList.Nav, id));
                }
            }
            return sr;
        }

        public  ServerResult<Nav> passCreateGurd(Nav entity, bool withMsg = true) {
            ServerResult<Nav> sr = ServerResult<Nav>.create();
            sr.result = entity; 
            if (sr.result == null) 
            {
                sr.error.addMessage(HttpError.getProvideNoEntity(TabelList.Nav), withMsg);
                sr.fail();
                return sr;
            }
            return sr;
        }
    }
}
